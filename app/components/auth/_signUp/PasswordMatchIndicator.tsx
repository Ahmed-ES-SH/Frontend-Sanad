import { FiCheck } from "react-icons/fi";

interface PasswordMatchIndicatorProps {
  show: boolean;
  label: string;
}

export default function PasswordMatchIndicator({
  show,
  label,
}: PasswordMatchIndicatorProps) {
  if (!show) return null;

  return (
    <p className="text-xs -mt-2" style={{ color: "var(--accent-emerald)" }}>
      <FiCheck
        size={12}
        className="inline me-1"
        style={{ color: "var(--accent-emerald)" }}
      />
      {label}
    </p>
  );
}