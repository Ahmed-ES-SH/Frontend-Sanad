import { ServiceFormData } from "../../hooks/useAddServiceForm";

export interface ServicePayload {
  title: string;
  shortDescription: string;
  longDescription?: string;
  iconUrl?: string;
  coverImageUrl?: string;
  categoryId?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export function createServicePayload(
  formData: ServiceFormData,
  title?: string,
): ServicePayload {
  return {
    title: title || formData.title || "Untitled Service",
    shortDescription: formData.shortDescription || "",
    longDescription: formData.longDescription || undefined,
    iconUrl: formData.iconUrl || undefined,
    coverImageUrl: formData.coverImageUrl || undefined,
    categoryId: formData.categoryId || undefined,
  };
}

export function validateServiceForPublish(
  formData: ServiceFormData,
  translations: {
    pleaseAddTitle: string;
    pleaseAddShortDescription: string;
  },
): ValidationResult {
  const errors: string[] = [];

  if (!formData.shortDescription.trim()) {
    errors.push(translations.pleaseAddShortDescription);
  }

  if (!formData.title.trim()) {
    errors.push(translations.pleaseAddTitle);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
