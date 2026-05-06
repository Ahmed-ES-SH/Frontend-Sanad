import { Messages } from "@/app/hooks/useTranslation";
import Img from "../../global/Img";

export default function BrandStorySection({ t }: { t: Messages["aboutPage"] }) {
  return (
    <section
      id="about-content"
      className="bg-white py-24 lg:py-32 relative overflow-hidden text-surface-900"
    >
      <div className="c-container relative z-10">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-primary/5 rounded-[2.5rem] blur-3xl group-hover:bg-primary/10 transition-colors duration-500" />
            <div className="relative rounded-[2.5rem] overflow-hidden">
              <Img
                src="/about-3.png"
                className="w-full object-cover transform group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
                alt={"Sanad Team"}
              />
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-primary font-black tracking-[0.3em] uppercase text-xs inline-block">
                {t.ourStory}
              </span>
              <h2 className="text-[2.5rem] lg:text-[4rem] font-black leading-tight tracking-tight text-surface-900">
                {t.about_us_title}
              </h2>
              <div className="w-24 h-2 bg-primary rounded-full shadow-sm" />
            </div>

            <p className="text-lg lg:text-xl text-surface-600 leading-relaxed max-w-2xl font-medium">
              {t.about_us_description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
