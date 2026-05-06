"use client";

import { useState, useEffect, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiSave, FiInfo, FiImage, FiGrid } from "react-icons/fi";
import { Service, ServiceFormData } from "@/app/types/service";
import { updateService } from "@/app/actions/servicesActions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Category } from "@/app/types/global";
import { useLocale } from "@/app/hooks/useLocale";

interface EditServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service;
  categories: Category[];
}

export default function EditServiceModal({
  isOpen,
  onClose,
  service,
  categories,
}: EditServiceModalProps) {
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const isRTL = locale === "ar";

  const [formData, setFormData] = useState<ServiceFormData>({
    title: service.title,
    shortDescription: service.shortDescription,
    longDescription: service.longDescription || "",
    iconUrl: service.iconUrl || "",
    coverImageUrl: service.coverImageUrl || "",
    categoryId: service.categoryId || "",
  });

  // Sync with service data when it changes or modal opens
  useEffect(() => {
    function handleFormData(service: Service) {
      setFormData({
        title: service.title,
        shortDescription: service.shortDescription,
        longDescription: service.longDescription || "",
        iconUrl: service.iconUrl || "",
        coverImageUrl: service.coverImageUrl || "",
        categoryId: service.categoryId || "",
      });
    }

    if (isOpen) handleFormData(service);
  }, [isOpen, service]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      try {
        const result = await updateService(service.id, formData);
        if (result.success) {
          toast.success("Service updated successfully");
          router.refresh();
          onClose();
        } else {
          toast.error(result.message || "Failed to update service");
        }
      } catch (error) {
        toast.error("An unexpected error occurred");
        console.log(error);
      }
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            dir={isRTL ? "rtl" : "ltr"}
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between bg-stone-50/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <FiInfo size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-stone-900 font-display">
                    Edit Service
                  </h3>
                  <p className="text-xs text-stone-500 font-medium">
                    Update service details and configuration
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-stone-100 rounded-full transition-colors text-stone-400 hover:text-stone-600"
              >
                <FiX size={24} />
              </button>
            </div>

            {/* Form Body */}
            <form
              onSubmit={handleSubmit}
              id="edit-service-form"
              className="flex-1 overflow-y-auto p-6 md:p-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Side: General Info */}
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-stone-700">
                      <FiGrid className="text-primary" />
                      <h4 className="text-sm font-bold uppercase tracking-wider">
                        Basic Information
                      </h4>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ps-1">
                        Service Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        required
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full bg-stone-50 border border-stone-200 rounded-2xl p-4 text-stone-900 font-bold focus:ring-4 focus:ring-primary/5 focus:border-primary/20 transition-all outline-none"
                        placeholder="Enter service title..."
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ps-1">
                        Category
                      </label>
                      <select
                        name="categoryId"
                        value={formData.categoryId}
                        onChange={handleInputChange}
                        className="w-full bg-stone-50 border border-stone-200 rounded-2xl p-4 text-stone-900 font-medium focus:ring-4 focus:ring-primary/5 focus:border-primary/20 transition-all outline-none appearance-none"
                      >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ps-1">
                        Short Description
                      </label>
                      <textarea
                        name="shortDescription"
                        required
                        value={formData.shortDescription}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full bg-stone-50 border border-stone-200 rounded-2xl p-4 text-stone-700 text-sm focus:ring-4 focus:ring-primary/5 focus:border-primary/20 transition-all outline-none resize-none"
                        placeholder="Brief summary of the service..."
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-stone-700 pt-2">
                      <FiImage className="text-primary" />
                      <h4 className="text-sm font-bold uppercase tracking-wider">
                        Media Assets
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ps-1">
                          Icon URL
                        </label>
                        <input
                          type="text"
                          name="iconUrl"
                          value={formData.iconUrl}
                          onChange={handleInputChange}
                          className="w-full bg-stone-50 border border-stone-200 rounded-2xl p-4 text-stone-900 text-sm focus:ring-4 focus:ring-primary/5 focus:border-primary/20 transition-all outline-none"
                          placeholder="https://..."
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ps-1">
                          Cover Image URL
                        </label>
                        <input
                          type="text"
                          name="coverImageUrl"
                          value={formData.coverImageUrl}
                          onChange={handleInputChange}
                          className="w-full bg-stone-50 border border-stone-200 rounded-2xl p-4 text-stone-900 text-sm focus:ring-4 focus:ring-primary/5 focus:border-primary/20 transition-all outline-none"
                          placeholder="https://..."
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side: Detailed Content */}
                <div className="space-y-6 flex flex-col">
                  <div className="flex items-center gap-2 text-stone-700">
                    <FiInfo className="text-primary" />
                    <h4 className="text-sm font-bold uppercase tracking-wider">
                      Detailed Description
                    </h4>
                  </div>

                  <div className="flex-1 space-y-2 min-h-[300px] flex flex-col">
                    <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ps-1">
                      Long Description (HTML Supported)
                    </label>
                    <textarea
                      name="longDescription"
                      value={formData.longDescription}
                      onChange={handleInputChange}
                      className="flex-1 w-full bg-stone-50 border border-stone-200 rounded-2xl p-4 text-stone-700 text-sm focus:ring-4 focus:ring-primary/5 focus:border-primary/20 transition-all outline-none resize-none font-mono"
                      placeholder="Enter detailed content here..."
                    />
                  </div>

                  {/* Preview Box */}
                  <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10">
                    <h5 className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2">
                      Live Preview Hint
                    </h5>
                    <p className="text-[11px] text-stone-500 leading-relaxed">
                      Changes will be reflected on the public page immediately
                      after saving. Make sure to check the description
                      formatting.
                    </p>
                  </div>
                </div>
              </div>
            </form>

            {/* Footer Actions */}
            <div className="px-6 py-6 border-t border-stone-100 bg-stone-50/50 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-xs text-stone-400 font-medium italic">
                Last updated: {new Date(service.updatedAt).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-3 w-full md:w-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 md:flex-none px-8 py-3 rounded-2xl font-bold text-stone-500 hover:bg-stone-200/50 transition-all active:scale-95"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="edit-service-form"
                  disabled={isPending}
                  className="flex-1 md:flex-none px-10 py-3 rounded-2xl font-bold text-white bg-gradient-to-r from-primary to-orange-600 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isPending ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <FiSave />
                  )}
                  Save Changes
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
