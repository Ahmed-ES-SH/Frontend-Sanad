"use client";

import Image from "next/image";
import { FiCheck } from "react-icons/fi";
import type { User } from "@/app/types/user";

interface UserTableRowProps {
  user: User;
  isSelected: boolean;
  mode: "single" | "multiple";
  onSelect: (userId: number) => void;
}

export function UserTableRow({
  user,
  isSelected,
  mode,
  onSelect,
}: UserTableRowProps) {
  return (
    <tr
      className={`border-b border-surface-100 hover:bg-surface-50/50 cursor-pointer transition-colors ${
        isSelected ? "bg-primary/5" : ""
      }`}
      onClick={() => onSelect(user.id)}
    >
      {mode === "multiple" && (
        <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => onSelect(user.id)}
              className="w-5 h-5 rounded border-surface-300 text-primary focus:ring-primary/20 cursor-pointer"
            />
          </div>
        </td>
      )}
      <td className="px-6 py-4 font-semibold text-surface-900">{user.id}</td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          {user.avatar ? (
            <Image
              src={user.avatar}
              width={75}
              height={75}
              alt="user image"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-surface-100"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-surface-100 border border-surface-200 flex items-center justify-center text-[10px] font-bold text-surface-500 uppercase">
              {user.name?.[0] || user.email[0]}
            </div>
          )}
          <span className="text-surface-900 font-medium">
            {user.name || "-"}
          </span>
        </div>
      </td>
      <td className="px-6 py-4 text-surface-500">{user.email}</td>
      <td className="px-6 py-4">
        <span
          className={`surface-badge whitespace-nowrap ${
            user.role === "admin" ? "bg-accent-amber/10 text-accent-amber" : ""
          }`}
        >
          {user.role}
        </span>
      </td>
      {mode === "single" && (
        <td className="px-6 py-4 text-left" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            onClick={() => onSelect(user.id)}
            className={`w-6 h-6 rounded-full mx-auto flex items-center justify-center border-2 transition-all duration-200 cursor-pointer ${
              isSelected
                ? "bg-primary border-primary text-white"
                : "border-surface-300 hover:border-primary hover:bg-primary/5"
            }`}
            aria-label={isSelected ? "Deselect user" : "Select user"}
          >
            {isSelected && <FiCheck className="w-4 h-4" />}
          </button>
        </td>
      )}
    </tr>
  );
}
