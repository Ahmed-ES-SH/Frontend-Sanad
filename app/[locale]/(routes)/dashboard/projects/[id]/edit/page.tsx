"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import {
  getAdminProjects,
  updateProject,
} from "@/app/actions/portfolioActions";
import type { Project } from "@/app/types/project";
import { FiChevronRight, FiAlertCircle, FiLoader, FiChevronDown } from "react-icons/fi";
import TechnicalDetailsSection from "@/app/components/dashboard/ProjectsPage/_editProject/TechnicalDetailsSection";
import MediaSection from "@/app/components/dashboard/ProjectsPage/_editProject/MediaSection";
import BasicInfoSection from "@/app/components/dashboard/ProjectsPage/_editProject/BasicInfoSection";
import {
  FieldErrors,
  validateAll,
  addTechHelper,
  removeTechHelper,
  addImageHelper,
  removeImageHelper,
  markTouchedHelper,
  handleFieldChangeHelper,
  toggleSectionHelper,
} from "@/app/helpers/_dashboard/projectEditHelpers";

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = params.id as string;

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isPublished, setIsPublished] = useState(false);

  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [longDesc, setLongDesc] = useState("");
  const [techStack, setTechStack] = useState<string[]>([]);
  const [liveUrl, setLiveUrl] = useState("");
  const [repoUrl, setRepoUrl] = useState("");
  const [newTech, setNewTech] = useState("");

  // Media states
  const [coverImage, setCoverImage] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [newImage, setNewImage] = useState("");

  const [touched, setTouched] = useState<Set<string>>(new Set());
  const [errors, setErrors] = useState<FieldErrors>({});
  const [openSections, setOpenSections] = useState<Set<string>>(
    new Set(["basic"]),
  );
  const [submitErrors, setSubmitErrors] = useState<string[]>([]);

  useEffect(() => {
    async function fetchProject() {
      try {
        setLoading(true);
        const result = await getAdminProjects({ page: 1, limit: 100 });
        const found = result.data.find((p) => p.id === projectId);
        if (!found) {
          toast.error("Project not found");
          router.push("/en/dashboard/projects");
          return;
        }
        setProject(found);
        setTitle(found.title);
        setShortDesc(found.shortDescription);
        setLongDesc(found.longDescription || "");
        setTechStack(found.techStack || []);
        setLiveUrl(found.liveUrl || "");
        setRepoUrl(found.repoUrl || "");
        setCoverImage(found.coverImageUrl || "");
        setImages(found.images || []);
        setIsPublished(found.isPublished || false);
      } catch {
        toast.error("Failed to load project");
        router.push("/en/dashboard/projects");
      } finally {
        setLoading(false);
      }
    }

    fetchProject();
  }, [projectId, router]);

  const removeTech = (tech: string) => removeTechHelper(tech, techStack, setTechStack);
  const addTech = (e: React.KeyboardEvent<HTMLInputElement>) => addTechHelper(e, newTech, techStack, setTechStack, setNewTech);
  const removeImage = (url: string) => removeImageHelper(url, images, setImages);
  const addImage = (e: React.KeyboardEvent<HTMLInputElement>) => addImageHelper(e, newImage, images, setImages, setNewImage, setErrors, setTouched);
  const markTouched = (field: string) => markTouchedHelper(field, setTouched);
  const handleFieldChange = (name: string, value: string) => handleFieldChangeHelper(name, value, touched, setErrors);
  const toggleSection = (section: string) => toggleSectionHelper(section, setOpenSections);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(
      new Set([
        "title",
        "shortDesc",
        "longDesc",
        "liveUrl",
        "repoUrl",
        "coverImage",
      ]),
    );
    const allErrors = validateAll({ title, shortDesc, longDesc, liveUrl, repoUrl, coverImage });
    setErrors(allErrors);

    const errorMessages = Object.entries(allErrors)
      .filter(([, msg]) => msg !== undefined)
      .map(([field, msg]) => `${field}: ${msg}`);

    if (errorMessages.length > 0) {
      setSubmitErrors(errorMessages);
      if (allErrors.title || allErrors.shortDesc || allErrors.longDesc) {
        setOpenSections((prev) => new Set(prev).add("basic"));
      }
      if (allErrors.liveUrl || allErrors.repoUrl) {
        setOpenSections((prev) => new Set(prev).add("technical"));
      }
      if (allErrors.coverImage) {
        setOpenSections((prev) => new Set(prev).add("media"));
      }
      return;
    }

    setSubmitErrors([]);
    setSubmitting(true);

    try {
      const result = await updateProject(projectId, {
        title: title.trim(),
        shortDescription: shortDesc.trim(),
        longDescription: longDesc.trim() || undefined,
        techStack: techStack.length > 0 ? techStack : undefined,
        liveUrl: liveUrl.trim() || undefined,
        repoUrl: repoUrl.trim() || undefined,
        coverImageUrl: coverImage.trim() || undefined,
        images: images.filter(Boolean),
        isPublished,
      });

      if (result.success) {
        toast.success(result.message);
        router.push("/en/dashboard/projects");
      } else {
        toast.error(result.message);
        setSubmitErrors([result.message]);
      }
    } catch {
      toast.error("Failed to update project");
      setSubmitErrors(["An unexpected error occurred. Please try again."]);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <>
        <main className="flex-1 overflow-y-auto p-6 md:p-8 flex items-center justify-center min-h-[60vh]">
          <FiLoader className="animate-spin text-stone-400" size={32} />
        </main>
      </>
    );
  }

  if (!project) {
    return (
      <>
        <main className="flex-1 overflow-y-auto p-6 md:p-8 flex items-center justify-center min-h-[60vh]">
          <p className="text-lg text-stone-500">Project not found</p>
        </main>
      </>
    );
  }

  return (
    <>
      <main className="flex-1 overflow-y-auto">
        <div className="rtl:ml-0 pt-12 pb-12 px-8">
          {/* Header */}
          <div className="flex justify-between items-end mb-8">
            <div>
              <nav className="flex gap-2 text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                <span>Projects</span>
                <FiChevronRight className="text-sm" />
                <span className="text-orange-500">Edit Project</span>
              </nav>
              <h2 className="text-3xl font-extrabold text-stone-800 tracking-tight">
                Edit: {project.title}
              </h2>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative group">
                <select
                  value={isPublished ? "published" : "draft"}
                  onChange={(e) => setIsPublished(e.target.value === "published")}
                  className="appearance-none bg-white border border-stone-200 text-stone-700 text-sm font-bold rounded-xl pl-4 pr-10 py-3 shadow-sm hover:border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all cursor-pointer"
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-stone-400 group-hover:text-orange-500 transition-colors">
                  <FiChevronDown size={18} />
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="px-8 py-3 rounded-xl font-bold text-sm bg-orange-500 text-white shadow-md shadow-orange-500/25 hover:bg-orange-600 active:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {submitting && <FiLoader className="animate-spin" size={16} />}
                Save Changes
              </button>
            </div>
          </div>

          {/* Error Summary */}
          {submitErrors.length > 0 && (
            <div
              className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8"
              role="alert"
            >
              <div className="flex items-start gap-3">
                <FiAlertCircle
                  className="text-red-500 shrink-0 mt-0.5"
                  size={20}
                />
                <div>
                  <h4 className="text-sm font-bold text-red-800">
                    {submitErrors.length}{" "}
                    {submitErrors.length === 1 ? "issue" : "issues"} need to be
                    fixed
                  </h4>
                  <ul className="mt-2 text-xs text-red-700 space-y-1">
                    {submitErrors.map((err) => (
                      <li key={err}>• {err}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8" noValidate>
            <BasicInfoSection
              title={title}
              setTitle={setTitle}
              shortDesc={shortDesc}
              setShortDesc={setShortDesc}
              longDesc={longDesc}
              setLongDesc={setLongDesc}
              touched={touched}
              errors={errors}
              handleFieldChange={handleFieldChange}
              markTouched={markTouched}
              isOpen={openSections.has("basic")}
              toggleSection={() => toggleSection("basic")}
            />

            <MediaSection
              coverImage={coverImage}
              setCoverImage={setCoverImage}
              images={images}
              setImages={setImages}
              newImage={newImage}
              setNewImage={setNewImage}
              addImage={addImage}
              removeImage={removeImage}
              touched={touched}
              errors={errors}
              handleFieldChange={handleFieldChange}
              markTouched={markTouched}
              isOpen={openSections.has("media")}
              toggleSection={() => toggleSection("media")}
            />

            <TechnicalDetailsSection
              techStack={techStack}
              setTechStack={setTechStack}
              newTech={newTech}
              setNewTech={setNewTech}
              addTech={addTech}
              removeTech={removeTech}
              liveUrl={liveUrl}
              setLiveUrl={setLiveUrl}
              repoUrl={repoUrl}
              setRepoUrl={setRepoUrl}
              touched={touched}
              errors={errors}
              handleFieldChange={handleFieldChange}
              markTouched={markTouched}
              isOpen={openSections.has("technical")}
              toggleSection={() => toggleSection("technical")}
            />
          </form>
        </div>
      </main>
    </>
  );
}
