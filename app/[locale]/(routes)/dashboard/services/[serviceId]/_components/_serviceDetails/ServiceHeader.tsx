"use client";

import { useState } from "react";
import { FiEdit, FiPower } from "react-icons/fi";
import PublishToggleModal from "./PublishToggleModal";
import { Service } from "@/app/types/service";
import { togglePublishService } from "@/app/actions/servicesActions";
import { useRouter } from "next/navigation";

interface ServiceHeaderProps {
  service?: Service | null;
  onEditClick: () => void;
}

export default function ServiceHeader({
  service,
  onEditClick,
}: ServiceHeaderProps) {
  const [showStatusModal, setShowStatusModal] = useState(false);
  const router = useRouter();

  const handleToggleStatus = async () => {
    if (service) {
      try {
        await togglePublishService(service.id);
        router.refresh();
      } catch (error) {
        console.error("Failed to toggle publish status:", error);
      }
    }
    setShowStatusModal(false);
  };

  const serviceTitle = service?.title || "Untitled Service";
  const serviceId = service?.id || "N/A";
  const isPublished = service?.isPublished || false;

  return (
    <>
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-extrabold tracking-tight text-surface-900 font-display">
              {serviceTitle}
            </h2>
            <span
              className={`px-3 py-1 text-xs font-bold rounded-full flex items-center gap-1 border ${
                isPublished
                  ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                  : "bg-amber-50 text-amber-700 border-amber-200"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${isPublished ? "bg-emerald-500" : "bg-amber-400"}`}
              ></span>
              {isPublished ? "Published" : "Draft"}
            </span>
          </div>
          <p className="text-surface-600 font-medium flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider opacity-60 font-body">
              Service ID:
            </span>
            <code className="bg-surface-100 px-2 py-0.5 rounded text-sm font-mono text-surface-700">
              {serviceId}
            </code>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onEditClick}
            className="px-6 py-2.5 bg-surface-card border border-stone-200 text-stone-700 font-semibold rounded-xl hover:bg-stone-50 hover:border-stone-300 transition-all flex items-center gap-2 shadow-sm"
          >
            <FiEdit className="text-lg" />
            Edit Service
          </button>
          <button
            onClick={() => setShowStatusModal(true)}
            className={`px-6 py-2.5 border font-semibold rounded-xl transition-all flex items-center gap-2 ${
              isPublished
                ? "bg-amber-50 border-amber-200 text-amber-600 hover:bg-amber-100 shadow-amber-100/50"
                : "bg-emerald-50 border-emerald-200 text-emerald-600 hover:bg-emerald-100 shadow-emerald-100/50"
            } shadow-sm`}
          >
            <FiPower className="text-lg" />
            {isPublished ? "Unpublish Service" : "Publish Service"}
          </button>
        </div>
      </section>

      {/* Publish Toggle Modal */}
      <PublishToggleModal
        isOpen={showStatusModal}
        onClose={() => setShowStatusModal(false)}
        onConfirm={handleToggleStatus}
        serviceName={serviceTitle}
        isPublished={isPublished}
      />
    </>
  );
}
