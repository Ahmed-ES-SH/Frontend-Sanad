import { FiEye, FiEyeOff } from "react-icons/fi";
import { Messages } from "@/app/hooks/useTranslation";

interface FormInputProps {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  showToggle?: boolean;
  toggleState?: boolean;
  onToggle?: () => void;
  autoComplete?: string;
  autoFocus?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  error?: string;
  signUpPage: Messages["signUpPage"];
}

export default function FormInput({
  name,
  label,
  placeholder,
  type = "text",
  showToggle = false,
  toggleState = false,
  onToggle,
  autoComplete,
  autoFocus = false,
  value,
  onChange,
  onFocus,
  onBlur,
  error,
  signUpPage,
}: FormInputProps) {
  const hasError = !!error;

  return (
    <div className="space-y-1.5">
      <label className="block body-sm font-medium text-surface-700">
        {label}
      </label>
      <div className="relative">
        <input
          name={name}
          type={showToggle && toggleState ? "text" : type}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          className="surface-input w-full"
          style={hasError ? { borderColor: "var(--accent-rose)" } : undefined}
        />
        {showToggle && onToggle && (
          <button
            type="button"
            onClick={onToggle}
            className="absolute inset-y-0 end-0 flex items-center justify-center text-surface-400 hover:text-surface-600 transition-colors rounded"
            style={{
              padding: "8px",
              minWidth: "44px",
              minHeight: "44px",
              outlineOffset: "2px",
            }}
            aria-label={
              toggleState ? signUpPage.hidePassword : signUpPage.showPassword
            }
          >
            {toggleState ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </button>
        )}
      </div>
      {hasError && (
        <p className="text-xs mt-1" style={{ color: "var(--accent-rose)" }}>
          {error}
        </p>
      )}
    </div>
  );
}
