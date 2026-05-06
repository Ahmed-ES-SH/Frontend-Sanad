import { Dispatch, SetStateAction } from "react";

export interface FieldErrors {
  title?: string;
  shortDesc?: string;
  longDesc?: string;
  liveUrl?: string;
  repoUrl?: string;
  coverImage?: string;
  newImage?: string;
}

export const validateField = (name: string, value: string): string | undefined => {
  switch (name) {
    case "title":
      return value.trim().length === 0 ? "Project title is required" : undefined;
    case "shortDesc":
      return value.trim().length === 0
        ? "A short description is required"
        : value.length > 150
          ? `Short description must be under 150 characters (currently ${value.length})`
          : undefined;
    case "longDesc":
      return value.trim().length < 20 && value.trim().length > 0
        ? "Description is too short — add at least 20 characters"
        : undefined;
    case "liveUrl":
    case "repoUrl":
    case "coverImage":
    case "newImage":
      return value.length > 0 && !/^https?:\/\/.+/.test(value)
        ? "Please enter a valid URL starting with http:// or https://"
        : undefined;
    default:
      return undefined;
  }
};

export const validateAll = (values: {
  title: string;
  shortDesc: string;
  longDesc: string;
  liveUrl: string;
  repoUrl: string;
  coverImage: string;
}): FieldErrors => {
  const allErrors: FieldErrors = {};
  const titleErr = validateField("title", values.title);
  if (titleErr) allErrors.title = titleErr;
  const descErr = validateField("shortDesc", values.shortDesc);
  if (descErr) allErrors.shortDesc = descErr;
  const longErr = validateField("longDesc", values.longDesc);
  if (longErr) allErrors.longDesc = longErr;
  const liveErr = validateField("liveUrl", values.liveUrl);
  if (liveErr) allErrors.liveUrl = liveErr;
  const repoErr = validateField("repoUrl", values.repoUrl);
  if (repoErr) allErrors.repoUrl = repoErr;
  const coverErr = validateField("coverImage", values.coverImage);
  if (coverErr) allErrors.coverImage = coverErr;
  return allErrors;
};

export const removeTechHelper = (
  tech: string,
  techStack: string[],
  setTechStack: Dispatch<SetStateAction<string[]>>
) => {
  setTechStack(techStack.filter((t) => t !== tech));
};

export const addTechHelper = (
  e: React.KeyboardEvent<HTMLInputElement>,
  newTech: string,
  techStack: string[],
  setTechStack: Dispatch<SetStateAction<string[]>>,
  setNewTech: Dispatch<SetStateAction<string>>
) => {
  if (e.key === "Enter" && newTech.trim()) {
    e.preventDefault();
    if (!techStack.includes(newTech.trim())) {
      setTechStack([...techStack, newTech.trim()]);
    }
    setNewTech("");
  }
};

export const removeImageHelper = (
  url: string,
  images: string[],
  setImages: Dispatch<SetStateAction<string[]>>
) => {
  setImages(images.filter((img) => img !== url));
};

export const addImageHelper = (
  e: React.KeyboardEvent<HTMLInputElement>,
  newImage: string,
  images: string[],
  setImages: Dispatch<SetStateAction<string[]>>,
  setNewImage: Dispatch<SetStateAction<string>>,
  setErrors: Dispatch<SetStateAction<FieldErrors>>,
  setTouched: Dispatch<SetStateAction<Set<string>>>
) => {
  if (e.key === "Enter" && newImage.trim()) {
    e.preventDefault();
    const err = validateField("newImage", newImage.trim());
    if (err) {
      setErrors((prev) => ({ ...prev, newImage: err }));
      setTouched((prev) => new Set(prev).add("newImage"));
      return;
    }
    if (!images.includes(newImage.trim())) {
      setImages([...images, newImage.trim()]);
    }
    setNewImage("");
    setErrors((prev) => ({ ...prev, newImage: undefined }));
    setTouched((prev) => {
      const next = new Set(prev);
      next.delete("newImage");
      return next;
    });
  }
};

export const markTouchedHelper = (
  field: string,
  setTouched: Dispatch<SetStateAction<Set<string>>>
) => {
  setTouched((prev) => new Set(prev).add(field));
};

export const handleFieldChangeHelper = (
  name: string,
  value: string,
  touched: Set<string>,
  setErrors: Dispatch<SetStateAction<FieldErrors>>
) => {
  if (touched.has(name)) {
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  }
};

export const toggleSectionHelper = (
  section: string,
  setOpenSections: Dispatch<SetStateAction<Set<string>>>
) => {
  setOpenSections((prev) => {
    const next = new Set(prev);
    if (next.has(section)) next.delete(section);
    else next.add(section);
    return next;
  });
};
