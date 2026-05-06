"use client";

import { useState } from "react";
import Image from "next/image";
import { HiOutlineEye, HiOutlineEyeOff, HiOutlineTrash } from "react-icons/hi";
import LocaleLink from "../../global/LocaleLink";
import { getCategoryColor, DEFAULT_CATEGORY } from "@/app/constants/serviceCards";

export interface ServiceCardProps {
  service: {
    id: string;
    title: string;
    shortDescription: string;
    isPublished: boolean;
    categoryName: string;
    imageUrl: string | null;
    slug: string;
  };
  onDelete: (id: string) => void;
  onTogglePublish: (id: string) => Promise<void>;
  translations: {
    status: { published: string; draft: string };
    actions: { manage: string; unpublish: string; publish: string; delete: string };
    category: { uncategorized: string };
  };
}

/**
 * Service Card Component
 * Individual service display card with actions
 */
export function ServiceCard({
  service,
  onDelete,
  onTogglePublish,
  translations,
}: ServiceCardProps) {
  const [isLoading, setIsLoading] = useState(false);

  const categoryKey = service.categoryName.toLowerCase().replace(/\s+/g, "");
  const categoryColor = getCategoryColor(categoryKey);

  // Local reference for translations
  const t = translations;

  const handleTogglePublish = async () => {
    setIsLoading(true);
    try {
      await onTogglePublish(service.id);
    } catch (error) {
      console.error("Failed to toggle publish status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = () => {
    onDelete(service.id);
  };

  return (
    <div className="bg-stone-50 rounded-xl overflow-hidden group hover:shadow-xl hover:shadow-stone-200/50 transition-all border border-transparent hover:border-orange-200">
      {/* Image */}
      <div className="h-40 overflow-hidden relative">
        {service.imageUrl ? (
          <Image
            alt={service.title}
            src={service.imageUrl}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-stone-200 flex items-center justify-center">
            <span className="text-4xl text-stone-400">📦</span>
          </div>
        )}

        {/* Category badge */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span
            className={`text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-md ${categoryColor}`}
          >
            {service.categoryName || DEFAULT_CATEGORY}
          </span>
        </div>

        {/* Status badge */}
        <div className="absolute top-3 right-3">
          <span
            className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
              service.isPublished
                ? "bg-green-50 text-green-600"
                : "bg-orange-50 text-orange-600"
            }`}
          >
            <span
              className={`w-1 h-1 rounded-full ${
                service.isPublished ? "bg-green-600" : "bg-orange-600"
              } ${service.isPublished ? "animate-pulse" : ""}`}
            />
            {service.isPublished
              ? t.status.published
              : t.status.draft}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-4">
        {/* Title and description */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <h4 className="font-bold text-stone-900 line-clamp-1">
              {service.title}
            </h4>
          </div>
          <p className="text-xs text-stone-500 line-clamp-2">
            {service.shortDescription}
          </p>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center mt-2">
          <LocaleLink
            href={`/dashboard/services/${service.id}`}
            className="bg-stone-200 text-stone-900 px-4 py-2 rounded-lg text-xs font-bold hover:bg-orange-500 hover:text-white transition-colors"
          >
            {t.actions.manage}
          </LocaleLink>

          {/* Action buttons */}
          <div className="flex items-center gap-1">
            <button
              onClick={handleTogglePublish}
              disabled={isLoading}
              className="p-2 hover:bg-blue-50 text-stone-400 hover:text-blue-600 rounded-lg transition-colors disabled:opacity-50"
              title={
                service.isPublished
                  ? t.actions.unpublish
                  : t.actions.publish
              }
            >
              {service.isPublished ? (
                <HiOutlineEyeOff className="text-lg" />
              ) : (
                <HiOutlineEye className="text-lg" />
              )}
            </button>
            <button
              onClick={handleDelete}
              className="p-2 hover:bg-red-50 text-stone-400 hover:text-red-600 rounded-lg transition-colors"
              title={t.actions.delete}
            >
              <HiOutlineTrash className="text-lg" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceCard;