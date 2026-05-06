import { useState } from "react";
import { FiImage, FiChevronUp, FiChevronDown, FiX, FiLink, FiAlertCircle } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import MediaPopup from "./MediaPopup";

interface FieldErrors {
  title?: string;
  shortDesc?: string;
  longDesc?: string;
  liveUrl?: string;
  repoUrl?: string;
  coverImage?: string;
  newImage?: string;
}

interface MediaSectionProps {
  coverImage: string;
  setCoverImage: (val: string) => void;
  images: string[];
  setImages: (val: string[]) => void;
  newImage: string;
  setNewImage: (val: string) => void;
  addImage: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  removeImage: (url: string) => void;
  touched: Set<string>;
  errors: FieldErrors;
  handleFieldChange: (name: string, value: string) => void;
  markTouched: (field: string) => void;
  isOpen: boolean;
  toggleSection: () => void;
}

export default function MediaSection({
  coverImage,
  setCoverImage,
  images,
  setImages,
  newImage,
  setNewImage,
  addImage,
  removeImage,
  touched,
  errors,
  handleFieldChange,
  markTouched,
  isOpen,
  toggleSection
}: MediaSectionProps) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [tempUrl, setTempUrl] = useState("");

  const handleOpenPopup = (index: number, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setSelectedSlot(index);
    setTempUrl(images[index] || "");
    setIsPopupOpen(true);
  };

  const handleClosePopup = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsPopupOpen(false);
    setSelectedSlot(null);
    setTempUrl("");
  };

  const handleSaveSlot = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (selectedSlot === null) return;
    const newImages = [...images];
    while (newImages.length < 4) newImages.push("");
    newImages[selectedSlot] = tempUrl.trim();
    setImages(newImages);
    handleClosePopup();
  };

  const handleClearSlot = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (selectedSlot === null) return;
    const newImages = [...images];
    while (newImages.length < 4) newImages.push("");
    newImages[selectedSlot] = "";
    setImages(newImages);
    setTempUrl("");
    handleClosePopup();
  };

  return (
    <section className="bg-white rounded-xl border border-stone-200/50 overflow-hidden">
      <button
        type="button"
        onClick={toggleSection}
        className="w-full flex items-center justify-between p-8 text-left hover:bg-stone-50/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600">
            <FiImage size={20} />
          </div>
          <h3 className="text-xl font-bold">Media & Images</h3>
        </div>
        {isOpen ? (
          <FiChevronUp size={20} className="text-stone-400 shrink-0" />
        ) : (
          <FiChevronDown size={20} className="text-stone-400 shrink-0" />
        )}
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-8 pb-8 space-y-8">
              {/* Cover Image Input */}
              <div className="grid gap-4">
                <label className="text-xs font-bold uppercase tracking-widest text-stone-500">
                  Cover Image URL
                </label>
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Preview Box */}
                  <div className="w-full md:w-1/3 aspect-video rounded-xl overflow-hidden bg-stone-50 border-2 border-dashed border-stone-200 flex items-center justify-center relative group shrink-0">
                    {coverImage ? (
                      <>
                        <img 
                          src={coverImage} 
                          alt="Cover Preview" 
                          className="w-full h-full object-cover relative z-10" 
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.parentElement?.classList.add('error-state');
                          }} 
                        />
                        <div className="absolute inset-0 hidden error-state-content flex-col items-center justify-center text-stone-400 bg-stone-50 p-4 text-center z-0">
                            <FiAlertCircle size={24} className="mb-2 text-red-400 opacity-50" />
                            <span className="text-[10px] font-bold uppercase tracking-wider text-red-400">Invalid Image URL</span>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center text-stone-400 p-4 text-center">
                        <FiImage size={32} className="mb-2 opacity-50" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">No Cover Image</span>
                      </div>
                    )}
                  </div>
                  <style>{`.error-state .error-state-content { display: flex !important; }`}</style>
                  
                  {/* Input Field */}
                  <div className="flex-1 grid gap-2 content-start">
                    <div className={`flex items-center bg-stone-50 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-orange-500/50 ${
                        touched.has("coverImage") && errors.coverImage
                          ? "ring-2 ring-red-400/40"
                          : ""
                      }`}>
                      <FiLink className="ml-4 text-stone-400" size={16} />
                      <input
                        type="url"
                        value={coverImage}
                        onChange={(e) => {
                          setCoverImage(e.target.value);
                          handleFieldChange("coverImage", e.target.value);
                        }}
                        onBlur={() => markTouched("coverImage")}
                        className="w-full bg-transparent border-none p-4 text-sm focus:ring-0 placeholder:text-stone-400"
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                    {touched.has("coverImage") && errors.coverImage && (
                      <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                        <FiAlertCircle size={12} /> {errors.coverImage}
                      </p>
                    )}
                    <p className="text-xs text-stone-400 leading-relaxed">
                      This image will be used as the primary thumbnail for the project across the platform.
                    </p>
                  </div>
                </div>
              </div>

              <hr className="border-stone-100" />

              {/* Four Image Slots */}
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-widest text-stone-500">
                    Project Gallery Images
                  </label>
                  <span className="text-xs font-bold text-stone-400 bg-stone-100 px-2 py-1 rounded-md">
                    {images.filter(Boolean).length} / 4 Added
                  </span>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                  {[0, 1, 2, 3].map((index) => {
                    const imgUrl = images[index];
                    return (
                      <div 
                        key={index} 
                        onClick={(e) => handleOpenPopup(index, e)}
                        className="w-full aspect-square rounded-xl overflow-hidden bg-stone-50 border-2 border-dashed border-stone-200 relative group cursor-pointer hover:border-orange-400 hover:bg-orange-50/30 transition-all duration-300"
                      >
                        {imgUrl ? (
                          <>
                            <img 
                              src={imgUrl} 
                              alt={`Gallery ${index + 1}`} 
                              className="w-full h-full object-cover relative z-10"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.parentElement?.classList.add('error-state-grid');
                              }} 
                            />
                            <div className="absolute inset-0 hidden error-state-content flex-col items-center justify-center text-stone-400 bg-stone-50 p-2 text-center z-0">
                                <FiAlertCircle size={20} className="mb-1 text-red-400 opacity-50" />
                                <span className="text-[9px] font-bold uppercase tracking-wider text-red-400 line-clamp-2 break-all">{imgUrl}</span>
                            </div>
                            {/* Overlay to edit */}
                            <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 z-20">
                              <span className="bg-white text-stone-800 text-xs font-bold px-3 py-1 rounded-full shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all">
                                Edit Image
                              </span>
                            </div>
                          </>
                        ) : (
                          <div className="flex flex-col items-center justify-center h-full text-stone-400 p-4 text-center transform group-hover:scale-105 transition-transform">
                            <FiImage size={24} className="mb-2 opacity-40 group-hover:opacity-80 group-hover:text-orange-500 transition-colors" />
                            <span className="text-[10px] font-bold uppercase tracking-wider group-hover:text-orange-600 transition-colors">Slot {index + 1}</span>
                            <span className="text-[9px] mt-1 text-stone-300 group-hover:text-orange-400 transition-colors">Click to edit</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                <style>{`.error-state-grid .error-state-content { display: flex !important; }`}</style>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Popup Modal */}
      <AnimatePresence>
        {isPopupOpen && (
          <MediaPopup
            isOpen={isPopupOpen}
            selectedSlot={selectedSlot}
            tempUrl={tempUrl}
            setTempUrl={setTempUrl}
            images={images}
            onClose={handleClosePopup}
            onSave={handleSaveSlot}
            onClear={handleClearSlot}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
