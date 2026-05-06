"use client";

interface ProjectPreviewProps {
  t: Record<string, any>;
  title: string;
  category: string;
  shortDesc: string;
}

export default function ProjectPreview({
  t,
  title,
  category,
  shortDesc,
}: ProjectPreviewProps) {
  return (
    <section className="bg-white rounded-xl overflow-hidden border border-stone-200/50 sticky top-24">
      <div className="p-4 bg-stone-100 border-b border-stone-200/50">
        <h4 className="text-xs font-bold uppercase tracking-widest text-stone-500">
          {t?.livePreview?.title || "Live Preview"}
        </h4>
      </div>
      <div className="relative aspect-video">
        <div className="w-full h-full bg-gradient-to-br from-stone-700 to-stone-900" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
          <span className="text-[10px] font-bold bg-orange-500 px-2 py-0.5 rounded text-white uppercase tracking-tighter w-fit mb-2">
            {category || t?.livePreview?.category || "Web Application"}
          </span>
          <h4 className="text-lg font-bold text-white mb-1 leading-tight">
            {title || t?.livePreview?.untitled || "Untitled Project"}
          </h4>
          <p className="text-white/60 text-xs line-clamp-2">
            {shortDesc ||
              t?.livePreview?.description ||
              "Start typing basic info to see your project card take shape in real-time..."}
          </p>
        </div>
      </div>
      <div className="p-6">
        <div className="flex gap-4 mb-6">
          <div className="flex-1 text-center border-r border-stone-200/50">
            <p className="text-[10px] font-bold text-stone-500 uppercase mb-1">
              {t?.livePreview?.status || "Status"}
            </p>
            <span className="bg-orange-100 text-orange-800 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
              {t?.livePreview?.draft || "Draft"}
            </span>
          </div>
          <div className="flex-1 text-center">
            <p className="text-[10px] font-bold text-stone-500 uppercase mb-1">
              {t?.livePreview?.views || "Views"}
            </p>
            <p className="text-sm font-bold">0</p>
          </div>
        </div>
        <button type="button" className="w-full py-3 rounded-lg border border-orange-500 text-orange-500 font-bold text-sm hover:bg-orange-50 transition-colors">
          {t?.livePreview?.fullPreview || "Full Preview"}
        </button>
      </div>
    </section>
  );
}
