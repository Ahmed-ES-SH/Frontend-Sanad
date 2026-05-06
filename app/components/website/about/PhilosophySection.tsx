import { Messages } from "@/app/hooks/useTranslation";
import Img from "../../global/Img";

export default function PhilosophySection({ t }: { t: Messages["aboutPage"] }) {
  return (
    <section className="py-24 lg:py-32 relative bg-surface-50 border-t border-surface-100">
      <div className="c-container">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 items-center">
          <div className="order-2 lg:order-1 space-y-10">
            <div className="space-y-4">
              <span className="text-accent-violet font-black tracking-[0.3em] uppercase text-xs inline-block">
                {t.ourPhilosophy}
              </span>
              <h2 className="text-[2.25rem] lg:text-[3.5rem] font-black text-surface-900 leading-tight tracking-tight">
                {t.creative_title}
              </h2>
            </div>

            <p className="text-lg lg:text-xl text-surface-500 leading-relaxed max-w-2xl font-medium">
              {t.creative_description}
            </p>

            <div className="grid grid-cols-2 gap-8 pt-6">
              <div className="p-8 rounded-3xl bg-white shadow-surface-sm border border-surface-100 group hover:shadow-surface-lg transition-all">
                <span className="block text-4xl lg:text-5xl font-black text-primary mb-2 group-hover:scale-110 transition-transform origin-left">
                  100%
                </span>
                <span className="text-xs font-bold text-surface-400 uppercase tracking-widest">
                  {t.commitment}
                </span>
              </div>
              <div className="p-8 rounded-3xl bg-white shadow-surface-sm border border-surface-100 group hover:shadow-surface-lg transition-all">
                <span className="block text-4xl lg:text-5xl font-black text-accent-violet mb-2 group-hover:scale-110 transition-transform origin-left">
                  24/7
                </span>
                <span className="text-xs font-bold text-surface-400 uppercase tracking-widest">
                  {t.support}
                </span>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 relative">
            <div className="relative bg-white/30 backdrop-blur-md p-6   group">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary opacity-30 blur-3xl w-full h-full rounded-full"></div>
              <Img
                src="/about-2.png"
                className="w-full object-contain relative z-10 transform group-hover:scale-105 transition-transform duration-700"
                alt={"Sanad Logo"}
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-accent-violet/5 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-12 -left-12 w-56 h-56 bg-primary/5 rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
