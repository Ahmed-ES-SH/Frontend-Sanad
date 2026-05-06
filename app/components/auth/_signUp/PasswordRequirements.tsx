import { FiCheck, FiX } from "react-icons/fi";

interface Check {
  label: string;
  met: boolean;
}

interface PasswordRequirementsProps {
  checks: Check[];
}

export default function PasswordRequirements({ checks }: PasswordRequirementsProps) {
  return (
    <div className="flex flex-wrap gap-x-3 gap-y-1.5">
      {checks.map((check, i) => (
        <span
          key={i}
          className="flex items-center gap-1 text-xs"
          style={{
            color: check.met ? "var(--surface-600)" : "var(--surface-400)",
          }}
        >
          {check.met ? (
            <FiCheck
              size={12}
              style={{ color: "var(--accent-emerald)" }}
            />
          ) : (
            <FiX />
          )}
          {check.label}
        </span>
      ))}
    </div>
  );
}