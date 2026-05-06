import { FiArrowRight } from "react-icons/fi";

interface SubmitButtonProps {
  isLoading: boolean;
  isDisabled: boolean;
  label: string;
  isRTL: boolean;
}

export default function SubmitButton({
  isLoading,
  isDisabled,
  label,
  isRTL,
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isDisabled}
      className="surface-btn-primary w-full py-3 sm:py-3.5 mt-5 sm:mt-6 disabled:opacity-60 disabled:cursor-not-allowed disabled:pointer-events-none"
      style={{
        minHeight: "48px",
        fontSize: "clamp(0.875rem, 2.5vw, 0.9375rem)",
      }}
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
      ) : (
        <span className="flex items-center justify-center gap-2">
          {label}
          <FiArrowRight size={16} className={isRTL ? "rotate-180" : ""} />
        </span>
      )}
    </button>
  );
}