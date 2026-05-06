"use client";

import { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";

interface ImageUrlModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (url: string) => void;
  initialUrl?: string;
  title: string;
}

export default function ImageUrlModal({
  isOpen,
  onClose,
  onSave,
  initialUrl = "",
  title,
}: ImageUrlModalProps) {
  const [url, setUrl] = useState(initialUrl);

  useEffect(() => {
    setUrl(initialUrl);
  }, [initialUrl, isOpen]);

  const handleSave = () => {
    if (url.trim()) {
      onSave(url.trim());
      setUrl("");
      onClose();
    }
  };

  const handleCancel = () => {
    setUrl("");
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleCancel}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-stone-200">
          <h3 className="text-lg font-bold text-stone-800">{title}</h3>
          <button
            type="button"
            onClick={handleCancel}
            className="text-stone-400 hover:text-stone-600 transition-colors p-1 hover:bg-stone-100 rounded-lg"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-stone-500">
              Image URL <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-stone-50 border border-stone-200 rounded-lg p-3 focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 text-stone-800 placeholder:text-stone-400 outline-none"
              placeholder="https://example.com/image.png"
              autoFocus
            />
            <p className="text-[11px] text-stone-400">
              Paste a direct link to your image (PNG, JPG, WebP)
            </p>
          </div>

          {/* Preview */}
          {url && (
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-stone-500">
                Preview
              </label>
              <div className="aspect-video bg-stone-100 rounded-lg overflow-hidden border border-stone-200">
                <img
                  src={url}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                    (e.target as HTMLImageElement).parentElement!.innerHTML = `
                      <div class="flex items-center justify-center h-full text-stone-400 text-sm">
                        Invalid image URL
                      </div>
                    `;
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex gap-3 p-6 pt-0">
          <button
            type="button"
            onClick={handleCancel}
            className="flex-1 px-4 py-2.5 rounded-lg font-semibold text-sm bg-stone-100 text-stone-600 hover:bg-stone-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!url.trim()}
            className="flex-1 px-4 py-2.5 rounded-lg font-semibold text-sm bg-orange-500 text-white shadow-md shadow-orange-500/25 hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
