"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { getTranslations } from "@/app/helpers/getTranslations";
import {
  createService,
  togglePublishService,
} from "@/app/actions/servicesActions";
import { useRouter } from "next/navigation";
import { useLocale } from "@/app/hooks/useLocale";
import { useAddServiceForm } from "@/app/hooks/useAddServiceForm";
import {
  createServicePayload,
  validateServiceForPublish,
} from "@/app/helpers/_dashboard/serviceHelpers";

import AddServiceHeader from "./AddServiceHeader";
import BasicInfoCard from "./BasicInfoCard";
import MediaCard from "./MediaCard";
import PublishingSettingsCard from "./PublishingSettingsCard";
import ServicePreviewCard from "./ServicePreviewCard";

export default function AddServiceContent() {
  const router = useRouter();
  const locale = useLocale();
  const isRTL = locale === "ar";

  const { AddServicePage } = getTranslations(locale);
  const t = AddServicePage;

  const { formData, handleInputChange } = useAddServiceForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSaveDraft = async () => {
    setError(null);
    setIsSubmitting(true);

    try {
      const payload = createServicePayload(formData);
      const result = await createService(payload);

      if (result.success) {
        router.push(`/${locale}/dashboard/services`);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError(t.failedToSave || "Failed to save service");
      console.log(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePublishNow = async () => {
    const validation = validateServiceForPublish(formData, {
      pleaseAddTitle:
        t.pleaseAddTitle || "Please add a title before publishing",
      pleaseAddShortDescription:
        t.pleaseAddShortDescription ||
        "Please add a short description before publishing",
    });

    if (!validation.isValid) {
      setError(validation.errors[0]);
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      const payload = createServicePayload(formData, formData.title);
      const result = await createService(payload);

      if (result.success && result.data) {
        await togglePublishService(result.data.id);
        router.push(`/${locale}/dashboard/services`);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError(t.failedToPublish || "Failed to publish service");
      console.log(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const basicInfoTranslations = {
    basicInformation: t.basicInformation || "Basic Information",
    title: t.title || "Title",
    titlePlaceholder:
      t.titlePlaceholder || "e.g. Premium Structural Consulting",
    shortDescription: t.shortDescription || "Short Description",
    shortDescriptionPlaceholder:
      t.shortDescriptionPlaceholder || "One-sentence hook for the service",
    longDescription: t.longDescription || "Long Description",
    longDescriptionPlaceholder:
      t.longDescriptionPlaceholder ||
      "Detail the full scope of work and deliverables...",
  };

  const mediaTranslations = {
    media: t.media || "Media",
    iconUrl: t.iconUrl || "Icon URL",
    iconUrlPlaceholder: t.iconUrlPlaceholder || "https://example.com/icon.svg",
    coverImageUrl: t.coverImageUrl || "Cover Image URL",
    coverImageUrlPlaceholder:
      t.coverImageUrlPlaceholder || "https://example.com/cover.jpg",
    cover: t.cover || "Cover",
  };

  const publishingTranslations = {
    publishingSettings: t.publishingSettings || "Publishing Settings",
    visibility: t.visibility || "Visibility",
    draft: t.draft || "Draft",
    publishingNote: t.publishingNote || "Save as draft to publish later.",
  };

  const previewTranslations = {
    servicePreview: t.servicePreview || "Service Preview",
    title: t.title || "Title",
    description: t.description || "Description",
    hasCover: t.hasCover || "Has Cover",
    yes: "Yes",
    no: "No",
    untitled: t.untitledService || "Untitled",
    set: "Set",
    empty: "Empty",
  };

  const headerTranslations = {
    title: t.addNewService || "Add New Service",
    backToServices: t.backToServices || "Back to Services",
    status: t.status || "Status:",
    untitledService: t.untitledService || "Untitled Service",
    saveDraft: t.saveDraft || "Save Draft",
    publishNow: t.publishNow || "Publish Now",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="p-4 md:p-8 w-full space-y-8"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-medium"
        >
          {error}
        </motion.div>
      )}

      <AddServiceHeader
        title={headerTranslations.title}
        backToServices={headerTranslations.backToServices}
        status={headerTranslations.status}
        untitledService={headerTranslations.untitledService}
        saveDraft={headerTranslations.saveDraft}
        publishNow={headerTranslations.publishNow}
        currentTitle={formData.title}
        local={locale}
        isRTL={isRTL}
        onSaveDraft={handleSaveDraft}
        onPublishNow={handlePublishNow}
        isSubmitting={isSubmitting}
      />

      <div className="flex flex-col  mx-auto w-full space-y-12 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full"
        >
          <BasicInfoCard
            formData={formData}
            translations={basicInfoTranslations}
            onInputChange={handleInputChange}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full"
        >
          <MediaCard
            formData={formData}
            translations={mediaTranslations}
            onInputChange={handleInputChange}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-full"
        >
          <PublishingSettingsCard translations={publishingTranslations} />
        </motion.div>


      </div>
    </motion.div>
  );
}
