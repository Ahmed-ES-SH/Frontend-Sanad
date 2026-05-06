import { FaQuoteLeft } from "react-icons/fa";
import StarRating from "./StarRating";
import { Testimonial } from "@/app/types/testimonial";

interface TestimonialSlideProps {
  testimonial: Testimonial;
}

export default function TestimonialSlide({
  testimonial,
}: TestimonialSlideProps) {
  return (
    <div className="group relative surface-card h-full flex flex-col p-8 lg:p-10 z-10 hover:-translate-y-2 hover:shadow-surface-xl transition-all duration-300 overflow-hidden">
      {/* Big background quote */}
      <FaQuoteLeft className="absolute -top-6 -right-6 lg:-top-8 lg:-right-8 text-primary/5 text-8xl lg:text-[160px] transform rotate-[-10deg] pointer-events-none z-0 transition-transform duration-500 group-hover:scale-110" />

      <div className="relative z-10 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-8 gap-4">
          <div className="flex gap-4 items-center">
            <div className="w-14 h-14 shrink-0 rounded-full flex items-center justify-center font-bold text-xl text-white shadow-lg shadow-primary/20 border-2 border-white bg-linear-to-br from-primary to-amber-500">
              {testimonial.avatar}
            </div>
            <div>
              <h4 className="font-bold text-lg leading-tight text-surface-900 group-hover:text-primary transition-colors">
                {testimonial.name}
              </h4>
              <p className="text-sm text-surface-500 line-clamp-1">
                {testimonial.position}
              </p>
            </div>
          </div>
          <div className="hidden sm:block shrink-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1.5 rounded-full inline-block">
              {testimonial.company}
            </span>
          </div>
        </div>

        <div className="mb-8 flex-1 relative">
          <p className="text-lg lg:text-xl font-display font-medium text-surface-800 leading-snug italic line-clamp-5 relative z-10">
            {`"${testimonial.content}"`}
          </p>
        </div>

        <div className="mt-auto pt-6 border-t border-surface-100 flex items-center justify-between">
          <div className="sm:hidden block">
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1.5 rounded-full inline-block">
              {testimonial.company}
            </span>
          </div>
          <div className="ml-auto">
            <StarRating rating={testimonial.rating} />
          </div>
        </div>
      </div>
    </div>
  );
}
