import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

interface RelatedService {
  name: string;
  description: string;
  href: string;
}

const relatedServices: RelatedService[] = [
  {
    name: "Managed Kubernetes",
    description: "Orchestration for modern containerized apps.",
    href: "/dashboard/services/kubernetes",
  },
  {
    name: "Cybersecurity Audit",
    description: "Deep dive vulnerability scans and reporting.",
    href: "/dashboard/services/security-audit",
  },
];

export default function RelatedServices() {
  return (
    <div className="surface-card-subtle p-6 space-y-4">
      <h3 className="font-bold text-sm uppercase tracking-widest text-surface-600 font-display">
        Related Services
      </h3>
      {relatedServices.map((service) => (
        <Link
          key={service.name}
          href={service.href}
          className="group block"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-bold text-surface-900 group-hover:text-primary transition-colors">
              {service.name}
            </span>
            <FiArrowRight className="text-sm opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
          </div>
          <p className="text-xs text-surface-500">{service.description}</p>
        </Link>
      ))}
    </div>
  );
}