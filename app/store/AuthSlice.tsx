"use client";

import { create } from "zustand";
import { useRouter } from "next/navigation";
import { User } from "../types/user";
import { logoutAction } from "../actions/authActions";
import { toast } from "sonner";

interface AuthStore {
  user: User | null;
  isLoading: boolean;

  isAuthenticated: boolean;

  hydrateUser: (user: User | null) => void;
  setUser: (user: User | null) => void;
  clearUser: () => void;
  logout: (router: ReturnType<typeof useRouter>) => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  isLoading: false,

  get isAuthenticated() {
    return !!get().user;
  },

  hydrateUser: (user) => {
    set({ user });
  },

  setUser: (user) => {
    set({ user });
  },

  clearUser: () => {
    set({ user: null });
  },

  logout: async (router) => {
    set({ isLoading: true });

    try {
      const response = await logoutAction();

      if (!response.success) {
        toast.error(response.message);
        return;
      }

      set({ user: null });

      router.push("/");
      router.refresh();
    } catch {
      toast.error("Logout failed");
    } finally {
      set({ isLoading: false });
    }
  },
}));
