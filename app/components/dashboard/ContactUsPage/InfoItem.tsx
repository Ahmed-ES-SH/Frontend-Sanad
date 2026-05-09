import { IconType } from "react-icons";
import { FiAlertCircle, FiCheckCircle } from "react-icons/fi";

interface InfoItemProps {
  icon: IconType;
  label: string;
  value: string | boolean | null;
}

export default function InfoItem({ icon: Icon, label, value }: InfoItemProps) {
  if (value === null || value === undefined) return null;
  if (typeof value === "boolean") {
    return (
      <div className="flex items-center gap-3 py-3 px-4 bg-stone-50 rounded-xl">
        <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center">
          <Icon className="w-5 h-5 text-stone-500" />
        </div>
        <div className="flex-1">
          <p className="text-xs text-stone-400 font-medium">{label}</p>
          <p className="text-sm font-semibold text-stone-700">
            {value ? (
              <span className="flex items-center gap-2 text-emerald-600">
                <FiCheckCircle className="w-4 h-4" />
                Yes
              </span>
            ) : (
              <span className="flex items-center gap-2 text-orange-500">
                <FiAlertCircle className="w-4 h-4" />
                No
              </span>
            )}
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="py-3 px-4 bg-stone-50 rounded-xl">
      <p className="text-xs text-stone-400 font-medium mb-1">{label}</p>
      <p className="text-sm font-medium text-stone-700 wrap-break-word">
        {value}
      </p>
    </div>
  );
}
