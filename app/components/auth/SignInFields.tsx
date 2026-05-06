import { FiMail, FiLock } from "react-icons/fi";
import InputField from "./InputField";
import LocaleLink from "../global/LocaleLink";
import { useTranslation } from "@/app/hooks/useTranslation";

interface Props {
  locale: "en" | "ar";
  formData: {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  errors: {
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
}

const translations = {
  en: {
    email: "Email Address",
    password: "Password",
    enterEmail: "Enter your email",
  },
  ar: {
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    enterEmail: "أدخل بريدك الإلكتروني",
  },
};

export default function SignInFields({
  locale,
  formData,
  errors,
  handleInputChange,
  showPassword,
  setShowPassword,
}: Props) {
  const t = translations[locale];
  const isRTL = locale === "ar";
  const authT = useTranslation("auth");

  return (
    <div className={`space-y-2 ${isRTL ? "text-right" : ""}`}>
      <InputField
        label={t.email}
        type="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        error={errors.email}
        icon={<FiMail size={18} />}
        placeholder={t.enterEmail}
      />

      <InputField
        label={t.password}
        type="password"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
        error={errors.password}
        icon={<FiLock size={18} />}
        placeholder={t.password}
        showPasswordToggle
        onTogglePassword={() => setShowPassword(!showPassword)}
        showPassword={showPassword}
      />
      <div className={`flex ${isRTL ? "justify-start" : "justify-end"}`}>
        <LocaleLink
          href="/forgot-password"
          className="text-xs font-semibold text-primary hover:underline transition-all"
        >
          {authT.forgotPassword}
        </LocaleLink>
      </div>
    </div>
  );
}
