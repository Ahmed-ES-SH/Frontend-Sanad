import { FiCheckCircle, FiCircle } from "react-icons/fi";
import { Service } from "@/app/types/service";

interface ServiceConfigurationProps {
  service?: Service | null;
}

interface ConfigItem {
  name: string;
  enabled: boolean;
  version?: string;
  details?: string;
}

const defaultConfigItems: ConfigItem[] = [
  { name: "Icon", enabled: false },
  { name: "Cover Image", enabled: false },
  { name: "Category", enabled: false },
  { name: "Long Description", enabled: false },
];

export default function ServiceConfiguration({ service }: ServiceConfigurationProps) {
  const configItems: ConfigItem[] = [
    { 
      name: "Icon", 
      enabled: !!service?.iconUrl,
      details: service?.iconUrl ? "Uploaded" : "Not set"
    },
    { 
      name: "Cover Image", 
      enabled: !!service?.coverImageUrl,
      details: service?.coverImageUrl ? "Uploaded" : "Not set"
    },
    { 
      name: "Category", 
      enabled: !!service?.categoryId,
      details: service?.category?.name || "Not set"
    },
    { 
      name: "Long Description", 
      enabled: !!service?.longDescription,
      details: service?.longDescription ? "Added" : "Not set"
    },
  ];

  return (
    <div className="surface-card p-6">
      <h3 className="font-bold text-lg mb-6 flex items-center gap-2 font-display">
        <span className="text-primary">⚙</span>
        Configuration
      </h3>
      <div className="space-y-4">
        {configItems.map((item) => (
          <div
            key={item.name}
            className={`flex items-center justify-between p-3 rounded-lg ${
              item.enabled ? "bg-surface-50" : "bg-surface-50 opacity-50"
            }`}
          >
            <div className="flex items-center gap-3">
              {item.enabled ? (
                <FiCheckCircle className="text-emerald-600 text-xl" />
              ) : (
                <FiCircle className="text-surface-400 text-xl" />
              )}
              <span className="text-sm font-medium text-surface-900">{item.name}</span>
            </div>
            <span className="text-[10px] font-bold text-surface-400">
              {item.details}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}