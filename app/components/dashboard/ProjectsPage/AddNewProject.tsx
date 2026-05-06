"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { createProject } from "@/app/actions/portfolioActions";
import { toast } from "sonner";
import { FiLoader } from "react-icons/fi";
import BasicInfoSection from "./_AddProject/BasicInfoSection";
import ProjectIdentitySection from "./_AddProject/ProjectIdentitySection";
import TechnicalDetailsSection from "./_AddProject/TechnicalDetailsSection";
import ProjectPreview from "./_AddProject/ProjectPreview";
import FormProgress from "./_AddProject/FormProgress";
import ErrorSummary from "./_AddProject/ErrorSummary";
import { Category } from "@/app/types/global";
import { useTranslation } from "@/app/hooks/useTranslation";

//////////////////////////////////////////////////////
///////  FieldErrors interface for validation results
///////  Maps field names to optional error messages.
//////////////////////////////////////////////////////
interface FieldErrors {
  title?: string;
  category?: string;
  shortDesc?: string;
  longDesc?: string;
  liveUrl?: string;
  repoUrl?: string;
}

export default function AddNewProject({
  categories,
}: {
  categories: Category[];
}) {
  const t = useTranslation("ProjectsPage.AddNewProject");
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [longDesc, setLongDesc] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [techStack, setTechStack] = useState<string[]>([]);
  const [liveUrl, setLiveUrl] = useState("");
  const [repoUrl, setRepoUrl] = useState("");
  const [newTech, setNewTech] = useState("");
  const [touched, setTouched] = useState<Set<string>>(new Set());
  const [errors, setErrors] = useState<FieldErrors>({});
  const [openSections, setOpenSections] = useState<Set<string>>(
    new Set(["basic"]),
  );
  const [submitErrors, setSubmitErrors] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const removeTech = (tech: string) => {
    setTechStack(techStack.filter((t) => t !== tech));
  };

  const addTech = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newTech.trim()) {
      e.preventDefault();
      if (!techStack.includes(newTech.trim())) {
        setTechStack([...techStack, newTech.trim()]);
      }
      setNewTech("");
    }
  };

  const markTouched = (field: string) => {
    setTouched((prev) => new Set(prev).add(field));
  };

  // Real-time form completion tracking
  const formState = useMemo(() => {
    const fields = {
      title: title.trim().length > 0,
      category: category.length > 0,
      shortDesc: shortDesc.trim().length > 0,
      longDesc: longDesc.trim().length > 20,
      techStack: techStack.length > 0,
      coverImage: false, // placeholder — wire to actual upload state later
      liveUrl: liveUrl.trim().length > 0,
      repoUrl: repoUrl.trim().length > 0,
    };

    const completed = Object.values(fields).filter(Boolean).length;
    const total = Object.keys(fields).length;
    const progress = Math.round((completed / total) * 100);

    return { fields, completed, total, progress };
  }, [title, category, shortDesc, longDesc, techStack, liveUrl, repoUrl]);

  // Inline validation
  const validateField = (name: string, value: string) => {
    switch (name) {
      case "title":
        return value.trim().length === 0
          ? "Project title is required"
          : undefined;
      case "category":
        return value.length === 0 ? "Please select a category" : undefined;
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
        return value.length > 0 && !/^https?:\/\/.+/.test(value)
          ? "Please enter a valid URL starting with http:// or https://"
          : undefined;
      case "repoUrl":
        return value.length > 0 && !/^https?:\/\/.+/.test(value)
          ? "Please enter a valid URL"
          : undefined;
      default:
        return undefined;
    }
  };

  const handleFieldChange = (name: string, value: string) => {
    if (touched.has(name)) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  // Track which required fields are missing
  const missingFields = useMemo(() => {
    const missing: string[] = [];
    if (!formState.fields.title)
      missing.push(t?.basicInfo?.projectTitle || "Project Title");
    if (!formState.fields.category)
      missing.push(t?.basicInfo?.category || "Category");
    if (!formState.fields.shortDesc)
      missing.push(t?.basicInfo?.shortDesc || "Short Description");
    if (!formState.fields.techStack)
      missing.push(t?.technicalDetails?.techStack || "Tech Stack");
    return missing;
  }, [formState, t]);

  const toggleSection = (section: string) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(section)) {
        next.delete(section);
      } else {
        next.add(section);
      }
      return next;
    });
  };

  const validateAll = (): FieldErrors => {
    const allErrors: FieldErrors = {};
    const titleErr = validateField("title", title);
    if (titleErr) allErrors.title = titleErr;
    const catErr = validateField("category", category);
    if (catErr) allErrors.category = catErr;
    const descErr = validateField("shortDesc", shortDesc);
    if (descErr) allErrors.shortDesc = descErr;
    const longErr = validateField("longDesc", longDesc);
    if (longErr) allErrors.longDesc = longErr;
    const liveErr = validateField("liveUrl", liveUrl);
    if (liveErr) allErrors.liveUrl = liveErr;
    const repoErr = validateField("repoUrl", repoUrl);
    if (repoErr) allErrors.repoUrl = repoErr;
    return allErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Mark all fields as touched
    setTouched(
      new Set([
        "title",
        "category",
        "shortDesc",
        "longDesc",
        "liveUrl",
        "repoUrl",
      ]),
    );
    const allErrors = validateAll();
    setErrors(allErrors);

    const errorMessages = Object.entries(allErrors)
      .filter(([, msg]) => msg !== undefined)
      .map(([field, msg]) => `${field}: ${msg}`);

    if (errorMessages.length > 0) {
      setSubmitErrors(errorMessages);
      // Open the first section that has an error
      if (
        allErrors.title ||
        allErrors.category ||
        allErrors.shortDesc ||
        allErrors.longDesc
      ) {
        setOpenSections((prev) => new Set(prev).add("basic"));
      }
      if (allErrors.liveUrl || allErrors.repoUrl) {
        setOpenSections((prev) => new Set(prev).add("technical"));
      }
      return;
    }

    setSubmitErrors([]);
    setSubmitting(true);

    try {
      const result = await createProject({
        title: title.trim(),
        shortDescription: shortDesc.trim(),
        longDescription: longDesc.trim() || undefined,
        coverImageUrl: coverImage || undefined,
        images:
          galleryImages.filter((img) => img.trim()).length > 0
            ? galleryImages.filter((img) => img.trim())
            : undefined,
        techStack: techStack.length > 0 ? techStack : undefined,
        liveUrl: liveUrl.trim() || undefined,
        repoUrl: repoUrl.trim() || undefined,
      });

      if (result.success) {
        toast.success(result.message);
        router.push("/en/dashboard/projects");
      } else {
        toast.error(result.message);
        setSubmitErrors([result.message]);
      }
    } catch {
      toast.error("Failed to create project");
      setSubmitErrors(["An unexpected error occurred. Please try again."]);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-6 pb-12 px-8">
      {/* Header Section */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-stone-800 tracking-tight">
            {t?.title || "Create New Project"}
          </h2>
          <p className="text-sm text-stone-500 mt-1">
            {t?.subtitle ||
              "Fill in the required fields to create your project. Drafts are saved automatically."}
          </p>
        </div>
      </div>

      {/* Layout Grid */}
      <div className="grid grid-cols-12 gap-8">
        {/* Left Column: Form */}
        <form
          onSubmit={handleSubmit}
          className="col-span-8 space-y-8"
          noValidate
        >
          {/* Error Summary Banner */}
          <ErrorSummary submitErrors={submitErrors} />

          {/* Section 1: Basic Info */}
          <BasicInfoSection
            t={t}
            open={openSections.has("basic")}
            toggleSection={toggleSection}
            title={title}
            category={category}
            shortDesc={shortDesc}
            longDesc={longDesc}
            setTitle={setTitle}
            setCategory={setCategory}
            setShortDesc={setShortDesc}
            setLongDesc={setLongDesc}
            touched={touched}
            errors={errors}
            markTouched={markTouched}
            handleFieldChange={handleFieldChange}
            categories={categories}
          />

          {/* Section 2: Project Identity */}
          <ProjectIdentitySection
            t={t}
            open={openSections.has("identity")}
            toggleSection={toggleSection}
            coverImage={coverImage}
            galleryImages={galleryImages}
            onCoverImageChange={setCoverImage}
            onGalleryImagesChange={setGalleryImages}
          />

          {/* Section 3: Technical Details */}
          <TechnicalDetailsSection
            t={t}
            open={openSections.has("technical")}
            toggleSection={toggleSection}
            techStack={techStack}
            liveUrl={liveUrl}
            repoUrl={repoUrl}
            newTech={newTech}
            setTechStack={setTechStack}
            setLiveUrl={setLiveUrl}
            setRepoUrl={setRepoUrl}
            setNewTech={setNewTech}
            removeTech={removeTech}
            addTech={addTech}
            touched={touched}
            errors={errors}
            markTouched={markTouched}
            handleFieldChange={handleFieldChange}
          />

          {/* Form Actions */}
          <div className="flex gap-3 justify-end pt-4">
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 rounded-xl font-bold text-sm bg-white text-stone-600 border border-stone-300 hover:bg-stone-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t?.saveDraft || "Save Draft"}
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-8 py-3 rounded-xl font-bold text-sm bg-orange-500 text-white shadow-md shadow-orange-500/25 hover:bg-orange-600 active:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {submitting && <FiLoader className="animate-spin" size={16} />}
              {t?.publishProject || "Publish Project"}
            </button>
          </div>
        </form>

        {/* Right Column: Sidebar */}
        <div className="col-span-4 space-y-8">
          {/* Project Preview */}
          <ProjectPreview
            t={t}
            title={title}
            category={category}
            shortDesc={shortDesc}
          />

          {/* Form Completion Progress */}
          <FormProgress
            t={t}
            formState={formState}
            missingFields={missingFields}
          />
        </div>
      </div>
    </div>
  );
}
