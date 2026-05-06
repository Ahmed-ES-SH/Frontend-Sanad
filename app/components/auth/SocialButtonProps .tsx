"use client";
import { FaFacebookF } from "react-icons/fa";
import Img from "../global/Img";
import { useTranslation } from "@/app/hooks/useTranslation";

interface SocialButtonProps {
  provider: "google" | "facebook";
  onClick: () => void;
  isLoading?: boolean;
}

const SocialButton: React.FC<SocialButtonProps> = ({
  provider,
  onClick,
  isLoading,
}) => {
  const authT = useTranslation("auth");
  const labelKey = provider === "google" ? "social.google" : "social.facebook";
  const label = authT[labelKey as keyof typeof authT] as string || (provider === "google" ? "Continue with Google" : "Continue with Facebook");

  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-lg font-medium text-sm transition-all duration-200"
      style={{
        backgroundColor:
          provider === "google" ? "var(--surface-card-bg)" : "#1877F2",
        border: `1px solid ${provider === "google" ? "var(--surface-card-border)" : "transparent"}`,
        color: provider === "google" ? "var(--surface-700)" : "white",
        cursor: isLoading ? "not-allowed" : "pointer",
        opacity: isLoading ? 0.6 : 1,
      }}
      onMouseEnter={(e) => {
        if (!isLoading) {
          if (provider === "google") {
            e.currentTarget.style.backgroundColor = "var(--surface-50)";
            e.currentTarget.style.borderColor =
              "var(--surface-card-border-hover)";
          } else {
            e.currentTarget.style.backgroundColor = "#145dc2";
          }
        }
      }}
      onMouseLeave={(e) => {
        if (provider === "google") {
          e.currentTarget.style.backgroundColor = "var(--surface-card-bg)";
          e.currentTarget.style.borderColor = "var(--surface-card-border)";
        } else {
          e.currentTarget.style.backgroundColor = "#1877F2";
        }
      }}
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : (
        <>
          {provider === "facebook" ? (
            <FaFacebookF className="text-white" />
          ) : (
            <Img src="/google.png" className="w-5 h-5" />
          )}
          <span className="whitespace-nowrap">{label}</span>
        </>
      )}
    </button>
  );
};

export default SocialButton;
