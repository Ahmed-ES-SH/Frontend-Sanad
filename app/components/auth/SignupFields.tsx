import { FiUser, FiMail, FiLock } from "react-icons/fi";
import InputField from "./InputField";
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";

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
  showConfirmPassword: boolean;
  setShowConfirmPassword: (show: boolean) => void;
}

const translations = {
  en: {
    fullName: "Full Name",
    email: "Email Address",
    password: "Password",
    confirmPassword: "Confirm Password",
    enterFullName: "Enter your full name",
    enterEmail: "Enter your email",
    createPassword: "Create a password",
    confirmPasswordPlaceholder: "Confirm your password",
  },
  ar: {
    fullName: "الاسم الكامل",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    confirmPassword: "تأكيد كلمة المرور",
    enterFullName: "أدخل اسمك الكامل",
    enterEmail: "أدخل بريدك الإلكتروني",
    createPassword: "أنشئ كلمة المرور",
    confirmPasswordPlaceholder: "أعد إدخال كلمة المرور",
  },
};

export default function SignupFields({
  locale,
  formData,
  errors,
  handleInputChange,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
}: Props) {
  const t = translations[locale];
  const isRTL = locale === "ar";

  return (
    <div className={`space-y-2 ${isRTL ? "text-right" : ""}`}>
      <InputField
        label={t.fullName}
        type="text"
        name="fullName"
        value={formData.fullName}
        onChange={handleInputChange}
        error={errors.fullName}
        icon={<FiUser size={18} />}
        placeholder={t.enterFullName}
        autoComplete="name"
      />

      <InputField
        label={t.email}
        type="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        error={errors.email}
        icon={<FiMail size={18} />}
        placeholder={t.enterEmail}
        autoComplete="email"
      />

      <InputField
        label={t.password}
        type="password"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
        error={errors.password}
        icon={<FiLock size={18} />}
        placeholder={t.createPassword}
        showPasswordToggle
        onTogglePassword={() => setShowPassword(!showPassword)}
        showPassword={showPassword}
        autoComplete="new-password"
      />
      {formData.password && (
        <div className="ps-1">
          <PasswordStrengthIndicator
            password={formData.password}
            locale={locale}
          />
        </div>
      )}

      <InputField
        label={t.confirmPassword}
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleInputChange}
        error={errors.confirmPassword}
        icon={<FiLock size={18} />}
        placeholder={t.confirmPasswordPlaceholder}
        showPasswordToggle
        onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
        showPassword={showConfirmPassword}
        autoComplete="new-password"
      />
    </div>
  );
}
