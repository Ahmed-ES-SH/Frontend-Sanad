/* eslint-disable @typescript-eslint/no-explicit-any */
import io from "socket.io-client";
import { SOCKET_CONFIG } from "@/app/constants/notifications";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://sanad-backend.vercel.app";

/**
 * Creates a Socket.IO connection for notifications.
 * @param token - Optional authentication token (sent manually via auth handshake)
 */
export function createNotificationSocket(token?: string) {
  return io(API_BASE_URL, {
    auth: {
      token,
    },
    withCredentials: true,
    transports: [...SOCKET_CONFIG.TRANSPORTS],
    reconnection: SOCKET_CONFIG.RECONNECTION,
    reconnectionDelay: SOCKET_CONFIG.RECONNECTION_DELAY,
    reconnectionDelayMax: SOCKET_CONFIG.RECONNECTION_DELAY_MAX,
    reconnectionAttempts: SOCKET_CONFIG.RECONNECTION_ATTEMPTS,
  } as any);
}

/**
 * Disconnects and cleans up a Socket.IO connection.
 * @param socket - Socket.IO instance to disconnect
 */
export function disconnectNotificationSocket(
  socket: ReturnType<typeof createNotificationSocket> | null,
): void {
  if (socket) {
    socket.disconnect();
  }
}
