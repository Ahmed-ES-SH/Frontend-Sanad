"use client";

import { FiInfo } from "react-icons/fi";
import { User } from "@/app/types/user";

// ============================================================================
// PENDING BANNER - Shows count of users awaiting email verification
// Only displays when there are unverified users in the system
// ============================================================================

interface PendingBannerProps {
  users: User[];
}

export default function PendingBanner({ users }: PendingBannerProps) {
  const pendingUsers = users.filter((u) => !u.isEmailVerified);

  // Don't render if no pending users
  if (pendingUsers.length === 0) {
    return null;
  }

  return (
    <div className="bg-sky-50 text-sky-800 p-4 rounded-xl flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center shrink-0">
        <FiInfo size={20} className="text-sky-600" />
      </div>
      <p className="text-sm font-medium">
        {pendingUsers.length} {pendingUsers.length === 1 ? "user is" : "users are"} pending email verification.{" "}
        <a
          className="underline font-bold text-sky-700 hover:text-sky-900"
          href="/dashboard/users?status=unverified"
        >
          Review pending users
        </a>
      </p>
    </div>
  );
}
