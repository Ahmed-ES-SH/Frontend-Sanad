import { FiInfo } from "react-icons/fi";
import { Service } from "@/app/types/service";

interface ServiceOverviewProps {
  service?: Service | null;
}

export default function ServiceOverview({ service }: ServiceOverviewProps) {
  const shortDescription = service?.shortDescription || "No short description available.";
  const longDescription = service?.longDescription 
    ? (typeof service.longDescription === 'string' ? service.longDescription : "") 
    : null;

  return (
    <div className="surface-card p-8 space-y-4">
      <div className="flex items-center gap-2 text-primary">
        <FiInfo className="text-xl" />
        <h3 className="font-bold text-lg text-surface-900 font-display">Service Overview</h3>
      </div>
      {longDescription ? (
        <div 
          className="text-surface-600 leading-relaxed font-body prose prose-stone max-w-none"
          dangerouslySetInnerHTML={{ __html: longDescription }}
        />
      ) : (
        <p className="text-surface-600 leading-relaxed font-body">
          {shortDescription}
        </p>
      )}
    </div>
  );
}