"use client";

import { useState } from "react";

// ============================================================================
// AVATAR UPLOAD - Allows admin to set user avatar URL
// Currently uses URL input; can be extended for file upload later
// ============================================================================

interface AvatarUploadProps {
  onAvatarChange?: (url: string) => void;
}

export default function AvatarUpload({ onAvatarChange }: AvatarUploadProps) {
  const [avatarUrl, setAvatarUrl] = useState("");

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setAvatarUrl(url);
    if (onAvatarChange) {
      onAvatarChange(url);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-4">
        {/* Avatar Preview */}
        <div className="w-20 h-20 rounded-full bg-stone-100 flex items-center justify-center overflow-hidden border-2 border-white shrink-0">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="Avatar preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          ) : (
            <svg className="w-10 h-10 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          )}
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold">Profile Photo</p>
          <p className="text-xs text-stone-500">Enter image URL or leave empty for default avatar.</p>
        </div>
      </div>
      <input
        type="url"
        value={avatarUrl}
        onChange={handleUrlChange}
        placeholder="https://example.com/avatar.jpg"
        className="w-full bg-stone-50 border border-stone-200 rounded-md px-4 py-2.5 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none"
      />
    </div>
  );
}
