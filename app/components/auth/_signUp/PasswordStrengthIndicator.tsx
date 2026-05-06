interface PasswordStrengthIndicatorProps {
  strengthLevel: number;
  strengthLabel: string;
  hasPassword: boolean;
  strengthColors: string[];
}

export default function PasswordStrengthIndicator({
  strengthLevel,
  strengthLabel,
  hasPassword,
  strengthColors,
}: PasswordStrengthIndicatorProps) {
  if (!hasPassword) return null;

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 flex gap-1">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-1 flex-1 rounded-full transition-all duration-300"
            style={{
              backgroundColor:
                i <= strengthLevel
                  ? strengthColors[strengthLevel]
                  : "var(--surface-200)",
            }}
          />
        ))}
      </div>
      <span
        className="text-xs font-medium whitespace-nowrap"
        style={{ color: strengthColors[strengthLevel] }}
      >
        {strengthLabel}
      </span>
    </div>
  );
}