"use client";

import { useRef, useState, useCallback } from "react";
import { FiImage, FiUploadCloud, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import {
  isDataUrl,
  isHttpUrl,
  MAX_COVER_IMAGE_BYTES,
} from "@/app/helpers/_dashboard/articleHelpers";

interface MediaPreviewCardProps {
  coverImageUrl: string;
  coverImageUrlError?: string;
  cover: string;
  uploadLabel: string;
  uploadHint: string;
  removeLabel: string;
  pasteUrlLabel: string;
  pasteUrlPlaceholder: string;
  urlInputLabel: string;
  fileTooLarge: string;
  invalidFileType: string;
  invalidUrl: string;
  isRTL: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onFileSelect: (dataUrl: string | null) => void;
}

const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/webp", "image/gif"];

export default function MediaPreviewCard({
  coverImageUrl,
  coverImageUrlError,
  cover,
  uploadLabel,
  uploadHint,
  removeLabel,
  pasteUrlLabel,
  pasteUrlPlaceholder,
  urlInputLabel,
  fileTooLarge,
  invalidFileType,
  onInputChange,
  onFileSelect,
}: MediaPreviewCardProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [imageBroken, setImageBroken] = useState(false);
  const [isUrlModalOpen, setIsUrlModalOpen] = useState(false);
  const [modalUrlValue, setModalUrlValue] = useState("");
  const [modalPreviewError, setModalPreviewError] = useState(false);
  const [modalPreviewLoaded, setModalPreviewLoaded] = useState(false);

  const hasImage = !!coverImageUrl && !imageBroken;

  const handleFile = (file: File) => {
    setLocalError(null);
    setImageBroken(false);
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setLocalError(invalidFileType);
      return;
    }
    if (file.size > MAX_COVER_IMAGE_BYTES) {
      setLocalError(fileTooLarge);
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result === "string") {
        onFileSelect(result);
      }
    };
    reader.onerror = () => setLocalError(invalidFileType);
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleRemove = () => {
    onFileSelect(null);
    setLocalError(null);
    setImageBroken(false);
  };

  const openUrlModal = useCallback(() => {
    setModalUrlValue(coverImageUrl || "");
    setModalPreviewError(false);
    setModalPreviewLoaded(false);
    setIsUrlModalOpen(true);
  }, [coverImageUrl]);

  const closeUrlModal = useCallback(() => {
    setIsUrlModalOpen(false);
    setModalPreviewError(false);
    setModalPreviewLoaded(false);
  }, []);

  const handleModalUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModalUrlValue(e.target.value);
    setModalPreviewError(false);
    setModalPreviewLoaded(false);
  };

  const handleModalConfirm = () => {
    const value = modalUrlValue.trim();
    if (!value) {
      closeUrlModal();
      return;
    }
    if (!isHttpUrl(value) && !isDataUrl(value)) {
      setModalPreviewError(true);
      return;
    }
    const syntheticEvent = {
      target: {
        name: "coverImageUrl",
        value,
      },
    } as React.ChangeEvent<HTMLInputElement>;
    onInputChange(syntheticEvent);
    setLocalError(null);
    setImageBroken(false);
    closeUrlModal();
  };

  const displayError = localError || coverImageUrlError;

  return (
    <div className="rounded-2xl bg-white border border-stone-200 shadow-sm flex flex-col">
      <div className="flex items-center justify-between px-5 md:px-6 pt-5 md:pt-6 pb-3">
        <h2 className="heading-sm text-stone-900 text-balance">{cover}</h2>
        {coverImageUrl && (
          <button
            type="button"
            onClick={handleRemove}
            aria-label={removeLabel}
            className="text-xs font-medium text-stone-500 hover:text-red-600 transition-colors px-2 py-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            {removeLabel}
          </button>
        )}
      </div>

      <div className="px-5 md:px-6 pb-5 md:pb-6 space-y-3">
        <AnimatePresence mode="wait" initial={false}>
          {hasImage ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative overflow-hidden rounded-xl border border-stone-200 bg-stone-50"
              style={{ aspectRatio: "16 / 9" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={coverImageUrl}
                alt={cover}
                onError={() => setImageBroken(true)}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ) : (
            <motion.div
              key="dropzone"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !hasImage && openUrlModal()}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`relative rounded-xl border-2 border-dashed transition-colors p-6 flex flex-col items-center justify-center text-center min-h-[200px] cursor-pointer ${
                isDragging
                  ? "border-primary bg-primary/5"
                  : "border-stone-200 bg-stone-50 hover:border-stone-300"
              }`}
            >
              <div className="w-11 h-11 rounded-full bg-white border border-stone-200 flex items-center justify-center mb-3 text-stone-500">
                <FiUploadCloud size={20} />
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                className="text-sm font-semibold text-stone-800 hover:text-primary transition-colors focus:outline-none focus-visible:underline underline-offset-2"
              >
                {uploadLabel}
              </button>
              <p className="text-xs text-stone-500 mt-1.5 max-w-[18ch] mx-auto">
                {uploadHint}
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept={ACCEPTED_TYPES.join(",")}
                onChange={handleFileChange}
                className="sr-only"
                aria-label={uploadLabel}
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  openUrlModal();
                }}
                className="text-xs text-stone-500 hover:text-stone-800 mt-4 underline-offset-2 hover:underline focus:outline-none focus-visible:underline"
              >
                {pasteUrlLabel}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {hasImage && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-9 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 transition-colors px-3 text-xs font-medium text-stone-700 flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            <FiImage size={14} />
            {uploadLabel}
          </button>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept={ACCEPTED_TYPES.join(",")}
          onChange={handleFileChange}
          className="sr-only"
          aria-label={uploadLabel}
        />

        {displayError && hasImage && (
          <p className="text-xs text-red-600" role="alert">
            {displayError}
          </p>
        )}
      </div>

      {/* URL Input Modal */}
      <AnimatePresence>
        {isUrlModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeUrlModal}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden"
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={urlInputLabel}
            >
              <div className="flex items-center justify-between px-5 pt-5 pb-3">
                <h3 className="text-base font-semibold text-stone-900">
                  {urlInputLabel}
                </h3>
                <button
                  type="button"
                  onClick={closeUrlModal}
                  className="p-1 text-stone-400 hover:text-stone-700 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                >
                  <FiX size={18} />
                </button>
              </div>

              <div className="px-5 pb-5 space-y-4">
                <input
                  type="url"
                  value={modalUrlValue}
                  onChange={handleModalUrlChange}
                  placeholder={pasteUrlPlaceholder}
                  autoFocus
                  className="w-full bg-white border border-stone-200 rounded-xl px-3.5 py-3 text-sm text-stone-700 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                />

                <div
                  className="relative rounded-xl border border-stone-200 bg-stone-50 overflow-hidden flex items-center justify-center"
                  style={{ aspectRatio: "16 / 9" }}
                >
                  {modalUrlValue && isHttpUrl(modalUrlValue) && !modalPreviewError ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={modalUrlValue}
                      alt="Preview"
                      onError={() => setModalPreviewError(true)}
                      onLoad={() => setModalPreviewLoaded(true)}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-stone-400">
                      <FiImage size={32} className="mb-2" />
                      <span className="text-xs">
                        {modalPreviewError
                          ? "Invalid or broken URL"
                          : "Image preview will appear here"}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={closeUrlModal}
                    className="px-4 py-2 text-sm font-medium text-stone-600 hover:text-stone-800 rounded-lg hover:bg-stone-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleModalConfirm}
                    className="px-5 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-dark rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
