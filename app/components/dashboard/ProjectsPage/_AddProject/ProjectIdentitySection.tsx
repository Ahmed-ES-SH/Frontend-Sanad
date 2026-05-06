"use client";

import { useState } from "react";
import { FiImage, FiUploadCloud, FiPlus, FiX } from "react-icons/fi";
import ImageUrlModal from "./ImageUrlModal";

interface ProjectIdentitySectionProps {
  t: Record<string, any>;
  open: boolean;
  toggleSection: (section: string) => void;
  coverImage: string;
  galleryImages: string[];
  onCoverImageChange: (url: string) => void;
  onGalleryImagesChange: (images: string[]) => void;
}

export default function ProjectIdentitySection({
  t,
  open,
  toggleSection,
  coverImage,
  galleryImages,
  onCoverImageChange,
  onGalleryImagesChange,
}: ProjectIdentitySectionProps) {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: "cover" | "gallery";
    index?: number;
    initialUrl?: string;
  }>({
    isOpen: false,
    type: "cover",
  });

  const openModal = (type: "cover" | "gallery", index?: number) => {
    const initialUrl =
      type === "gallery" && index !== undefined ? galleryImages[index] || "" : coverImage;
    setModalState({ isOpen: true, type, index, initialUrl });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, type: "cover" });
  };

  const handleSaveImage = (url: string) => {
    if (modalState.type === "cover") {
      onCoverImageChange(url);
    } else if (modalState.type === "gallery" && modalState.index !== undefined) {
      const newImages = [...galleryImages];
      newImages[modalState.index] = url;
      onGalleryImagesChange(newImages);
    }
  };

  const removeGalleryImage = (index: number) => {
    const newImages = galleryImages.filter((_, i) => i !== index);
    onGalleryImagesChange(newImages);
  };

  return (
    <>
      <section className="bg-white rounded-xl border border-stone-200/50 overflow-hidden">
        <button
          type="button"
          onClick={() => toggleSection("identity")}
          className="w-full flex items-center justify-between p-8 text-left hover:bg-stone-50/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600">
              <FiImage size={20} />
            </div>
            <h3 className="text-xl font-bold">
              {t?.projectIdentity?.title || "Project Identity"}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            {!open && (
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                Cover, gallery
              </span>
            )}
            {open ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-stone-400 shrink-0"><path d="m18 15-6-6-6 6"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-stone-400 shrink-0"><path d="m6 9 6 6 6-6"/></svg>
            )}
          </div>
        </button>
        {open && (
          <div className="px-8 pb-8">
            <div className="grid gap-8">
              {/* Cover Image */}
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-3 block">
                  {t?.projectIdentity?.coverImage || "Cover Image"}
                </label>
                <div
                  onClick={() => openModal("cover")}
                  className="border-2 border-dashed border-stone-300 rounded-xl p-8 text-center bg-stone-50 hover:bg-orange-50/30 transition-colors cursor-pointer group overflow-hidden"
                >
                  {coverImage ? (
                    <div className="relative">
                      <img
                        src={coverImage}
                        alt="Cover"
                        className="w-full aspect-video object-cover rounded-lg"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                        <p className="text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                          Click to change
                        </p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <FiUploadCloud
                        size={40}
                        className="mx-auto text-stone-400 mb-2 group-hover:text-orange-500 transition-colors"
                      />
                      <p className="text-sm font-semibold">
                        {t?.projectIdentity?.dropText || "Click to add cover image"}
                      </p>
                      <p className="text-xs text-stone-500 mt-1">
                        {t?.projectIdentity?.recommendedSize ||
                          "Recommended: 1600x900px, PNG or JPG"}
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* Gallery Images */}
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-3 block">
                  {t?.projectIdentity?.galleryUpload || "Gallery Images"}
                </label>
                <div className="grid grid-cols-4 gap-4">
                  {Array.from({ length: Math.max(4, galleryImages.length + 1) }).map((_, i) => {
                    if (i < galleryImages.length) {
                      return (
                        <div
                          key={i}
                          className="aspect-square relative group cursor-pointer"
                          onClick={() => openModal("gallery", i)}
                        >
                          <img
                            src={galleryImages[i]}
                            alt={`Gallery ${i + 1}`}
                            className="w-full h-full object-cover rounded-lg border-2 border-stone-200 group-hover:border-orange-500 transition-colors"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = "none";
                            }}
                          />
                          {/* Hover Overlay */}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors rounded-lg flex items-center justify-center gap-2">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                openModal("gallery", i);
                              }}
                              className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-xs font-semibold"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeGalleryImage(i);
                              }}
                              className="text-white opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-white/20 rounded"
                            >
                              <FiX size={16} />
                            </button>
                          </div>
                        </div>
                      );
                    } else if (i < 8) {
                      // Max 8 gallery images
                      return (
                        <div
                          key={i}
                          className="aspect-square bg-stone-50 border-2 border-dashed border-stone-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-orange-500 hover:bg-orange-50/30 transition-colors"
                          onClick={() => openModal("gallery", i)}
                        >
                          <FiPlus size={20} className="text-stone-400" />
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
                <p className="text-[11px] text-stone-400 mt-2">
                  {t?.projectIdentity?.galleryHelp || "Add up to 8 screenshots to showcase your project. PNG or JPG, max 5MB each."}
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Image URL Modal */}
      <ImageUrlModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        onSave={handleSaveImage}
        initialUrl={modalState.initialUrl}
        title={
          modalState.type === "cover"
            ? "Set Cover Image URL"
            : "Set Gallery Image URL"
        }
      />
    </>
  );
}
