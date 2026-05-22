"use client";

import Image from "next/image";
import type { SelectedUserInfo } from "@/app/types/notification";

interface UserSummaryBarProps {
  users: SelectedUserInfo[];
  totalSelected: number;
}

export function UserSummaryBar({ users, totalSelected }: UserSummaryBarProps) {
  if (users.length === 0) return null;

  if (users.length === 1) {
    const user = users[0];
    return (
      <div className="flex items-center gap-3">
        {user.avatar ? (
          <Image
            src={user.avatar}
            width={75}
            height={75}
            alt="user image"
            className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-linear-to-br from-primary to-accent-amber flex items-center justify-center text-white font-bold">
            {user.name?.[0]?.toUpperCase() || user.email[0].toUpperCase()}
          </div>
        )}
        <div>
          <p className="text-sm font-semibold text-stone-900">
            {user.name || "Unknown User"}
          </p>
          <p className="text-xs text-stone-500">{user.email}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex -space-x-2">
        {users.slice(0, 3).map((user) =>
          user.avatar ? (
            <Image
              key={user.id}
              src={user.avatar}
              width={75}
              height={75}
              alt="user image"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-white"
            />
          ) : (
            <div
              key={user.id}
              className="w-8 h-8 rounded-full bg-linear-to-br from-primary to-accent-amber flex items-center justify-center text-white text-xs font-bold ring-2 ring-white"
            >
              {user.name?.[0]?.toUpperCase() || user.email[0].toUpperCase()}
            </div>
          ),
        )}
        {users.length > 3 && (
          <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center text-xs font-bold text-stone-600 ring-2 ring-white">
            +{users.length - 3}
          </div>
        )}
      </div>
      <div>
        <p className="text-sm font-semibold text-stone-900">
          {totalSelected} user{totalSelected !== 1 ? "s" : ""} selected
        </p>
        <p className="text-xs text-stone-500">
          {users.slice(0, 2).map((u) => u.name || u.email).join(", ")}
          {users.length > 2 && ` +${users.length - 2} more`}
        </p>
      </div>
    </div>
  );
}
