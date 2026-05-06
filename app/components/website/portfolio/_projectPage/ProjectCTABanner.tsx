import { HiOutlineSparkles } from "react-icons/hi2";
import { RevealSection } from "./SectionBasics";
import { HiOutlineLightningBolt } from "react-icons/hi";
import { Messages } from "@/app/hooks/useTranslation";
import LocaleLink from "@/app/components/global/LocaleLink";

interface ProjectCTABannerProps {
  t: Messages["ProjectPage"];
}

export default function ProjectCTABanner({ t }: ProjectCTABannerProps) {
  return (
    <RevealSection className="c-container px-4 py-16 md:py-24">
      <div
        className="relative overflow-hidden rounded-3xl px-8 py-14 md:px-16 text-center shadow-[0_20px_60px_rgba(249,115,22,0.3)]"
        style={{ background: "var(--gradient-primary)" }}
      >
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -top-16 -start-16 w-64 h-64 rounded-full opacity-20 bg-white blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -end-16 w-72 h-72 rounded-full opacity-10 bg-white blur-3xl" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full text-sm font-semibold bg-white/20 text-white">
            <HiOutlineSparkles size={15} />
            {t.ctaTitle}
          </div>
          <h2 className="display-sm font-display text-white mb-4 leading-[1.2]">
            {t.ctaHeading}
          </h2>
          <p className="body text-white/75 max-w-lg mx-auto mb-8">
            {t.ctaDescription}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <LocaleLink
              href={`/contact`}
              className="inline-flex bg-white text-primary border border-gray-200 items-center gap-2.5 px-8 py-3.5 rounded-2xl text-sm font-bold transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
            >
              <HiOutlineLightningBolt size={16} />
              {t.startProject}
            </LocaleLink>
            <LocaleLink
              href={`/portfolio`}
              className="inline-flex items-center text-white border-gray-100 gap-2.5 px-8 py-3.5 rounded-2xl text-sm font-semibold border transition-all duration-200 hover:bg-white/10 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
            >
              {t.viewMore}
            </LocaleLink>
          </div>
        </div>
      </div>
    </RevealSection>
  );
}
