/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { create } from "zustand";
import { NotificationState, Notification } from "@/app/types/notification";
import {
  createNotificationSocket,
  disconnectNotificationSocket,
} from "@/app/helpers/notificationSocket";
import * as api from "@/app/actions/notificationApi";
import { NOTIFICATION_CONSTANTS } from "@/app/constants/notifications";

interface NotificationStore extends NotificationState {
  popupNotifications: Notification[];
  isAuthenticated: boolean;

  syncAuth: (isAuthenticated: boolean) => void;
  setPreferences: (preferences: NotificationState["preferences"]) => void;
  setError: (error: string | null) => void;
  clearTransientState: () => void;

  fetchNotifications: (page?: number, limit?: number) => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
  refreshUnreadCount: () => Promise<void>;

  dismissPopup: (id: string) => void;
  connectSocket: () => void;
  disconnectSocket: () => void;
}

const initialState: NotificationState = {
  notifications: [],
  unreadCount: 0,
  preferences: null,
  isLoading: false,
  hasFetchedInitial: false,
  isSocketConnected: false,
  error: null,
  pagination: {
    page: NOTIFICATION_CONSTANTS.DEFAULT_PAGE,
    limit: NOTIFICATION_CONSTANTS.DEFAULT_LIMIT,
    total: 0,
  },
};

function mergeByNotificationId(
  current: Notification[],
  incoming: Notification[],
): Notification[] {
  const map = new Map<string, Notification>();

  for (const item of current) {
    map.set(item.id, item);
  }

  for (const item of incoming) {
    map.set(item.id, item);
  }

  return Array.from(map.values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

/**
 * socketRef خارج الـ store حتى لا ندخل object غير serializable في كل تحديث
 */
let socketRef: ReturnType<typeof createNotificationSocket> | null = null;

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  ...initialState,
  popupNotifications: [],
  isAuthenticated: false,

  syncAuth: (isAuthenticated) => {
    set({ isAuthenticated });

    if (!isAuthenticated) {
      get().disconnectSocket();
      set({
        notifications: [],
        popupNotifications: [],
        unreadCount: 0,
        isSocketConnected: false,
        error: null,
        hasFetchedInitial: false,
      });
    }
  },

  setPreferences: (preferences) => {
    set({ preferences });
  },

  setError: (error) => {
    set({ error });
  },

  clearTransientState: () => {
    set({
      popupNotifications: [],
      unreadCount: 0,
      isSocketConnected: false,
    });
  },

  dismissPopup: (id: string) => {
    set((state) => ({
      popupNotifications: state.popupNotifications.filter(
        (item) => item.id !== id,
      ),
    }));
  },

  fetchNotifications: async (page?: number, limit?: number) => {
    if (!get().isAuthenticated) return;

    set({ isLoading: true, error: null });

    try {
      const current = get();
      const p = page ?? current.pagination.page;
      const l = limit ?? current.pagination.limit;

      const res = await api.fetchNotifications(p, l);

      const append = p > NOTIFICATION_CONSTANTS.DEFAULT_PAGE;

      set((state) => {
        const notifications = append
          ? mergeByNotificationId(state.notifications, res.data)
          : res.data;

        return {
          notifications,
          hasFetchedInitial: true,
          pagination: {
            page: res.page,
            limit: res.limit,
            total: res.total,
          },
        };
      });
    } catch (err: any) {
      set({
        error: err?.message || "Failed to fetch notifications",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  refreshUnreadCount: async () => {
    if (!get().isAuthenticated) return;

    try {
      const res = await api.fetchUnreadCount();
      set({ unreadCount: res.unreadCount });
    } catch (err) {
      console.error("Failed to fetch unread count:", err);
    }
  },

  markAsRead: async (id: string) => {
    const prevUnread =
      get().notifications.find((n) => n.id === id)?.isRead === false;

    // Optimistic UI
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, isRead: true } : n,
      ),
      unreadCount: prevUnread
        ? Math.max(0, state.unreadCount - 1)
        : state.unreadCount,
    }));

    try {
      await api.markAsRead(id);
    } catch (err: any) {
      // Revert via refetch
      await get().fetchNotifications();
      await get().refreshUnreadCount();
      set({
        error: err?.message || "Failed to mark as read",
      });
    }
  },

  markAllAsRead: async () => {
    // Optimistic UI
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
      unreadCount: 0,
    }));

    try {
      await api.markAllAsRead();
    } catch (err: any) {
      await get().fetchNotifications();
      await get().refreshUnreadCount();
      set({
        error: err?.message || "Failed to mark all as read",
      });
    }
  },

  deleteNotification: async (id: string) => {
    const wasUnread =
      get().notifications.find((n) => n.id === id)?.isRead === false;

    // Optimistic UI
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
      unreadCount: wasUnread
        ? Math.max(0, state.unreadCount - 1)
        : state.unreadCount,
    }));

    try {
      await api.deleteNotification(id);
    } catch (err: any) {
      await get().fetchNotifications();
      await get().refreshUnreadCount();
      set({
        error: err?.message || "Failed to delete notification",
      });
    }
  },

  connectSocket: async () => {
    const { isAuthenticated } = get();
    if (!isAuthenticated) return;
    if (socketRef) return;

    try {
      const token = await api.getNotificationToken();
      const socket = createNotificationSocket(token);
      socketRef = socket;

      socket.on("connect", async () => {
        set({ isSocketConnected: true, error: null });

        // مزامنة بعد الاتصال أو إعادة الاتصال
        await get().fetchNotifications(1, get().pagination.limit);
        await get().refreshUnreadCount();
      });

      socket.on("disconnect", () => {
        set({ isSocketConnected: false });
      });

      socket.on("connect_error", (error: Error) => {
        set({
          isSocketConnected: false,
          error: error.message || "Notification socket connection failed",
        });
      });

      socket.on("notification:new", (notification: Notification) => {
        set((state) => {
          if (state.notifications.some((n) => n.id === notification.id)) {
            return state;
          }

          return {
            notifications: [notification, ...state.notifications],
          };
        });

        set((state) => {
          if (
            state.popupNotifications.some((item) => item.id === notification.id)
          ) {
            return state;
          }

          return {
            popupNotifications: [notification, ...state.popupNotifications].slice(
              0,
              10,
            ),
          };
        });
      });

      socket.on("notification:read", (data: { notificationId: string }) => {
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === data.notificationId ? { ...n, isRead: true } : n,
          ),
        }));

        set((state) => {
          const wasUnread =
            state.notifications.find((n) => n.id === data.notificationId)
              ?.isRead === false;

          return {
            unreadCount: wasUnread
              ? Math.max(0, state.unreadCount - 1)
              : state.unreadCount,
          };
        });
      });

      socket.on("notification:read_all", () => {
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
          unreadCount: 0,
        }));
      });

      socket.on("notification:count", (data: { unreadCount: number }) => {
        set({ unreadCount: data.unreadCount });
      });

      socket.on("notification:delete", (data: { notificationId: string }) => {
        set((state) => ({
          notifications: state.notifications.filter(
            (n) => n.id !== data.notificationId,
          ),
        }));

        set((state) => {
          const isUnread =
            state.notifications.find((n) => n.id === data.notificationId)
              ?.isRead === false;

          return {
            unreadCount: isUnread
              ? Math.max(0, state.unreadCount - 1)
              : state.unreadCount,
          };
        });
      });
    } catch (error: any) {
      set({
        isSocketConnected: false,
        error: error.message || "Failed to initialize notification socket",
      });
    }
  },

  disconnectSocket: () => {
    if (!socketRef) return;

    socketRef.off("connect");
    socketRef.off("disconnect");
    socketRef.off("connect_error");
    socketRef.off("notification:new");
    socketRef.off("notification:read");
    socketRef.off("notification:read_all");
    socketRef.off("notification:count");
    socketRef.off("notification:delete");

    disconnectNotificationSocket(socketRef);
    socketRef = null;

    set({ isSocketConnected: false });
  },
}));
