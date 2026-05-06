import ServiceDetailsContent from "./_components/_serviceDetails/ServiceDetailsContent";
import { getAdminServiceById } from "@/app/actions/servicesActions";
import { getCategories } from "@/app/actions/blogActions";
import { Service } from "@/app/types/service";
import { notFound } from "next/navigation";

interface ServiceEditPageProps {
  params: Promise<{ serviceId: string }>;
}

export default async function ServiceDetailsPage({
  params,
}: ServiceEditPageProps) {
  const { serviceId } = await params;
  
  const [service, categories] = await Promise.all([
    getAdminServiceById(serviceId),
    getCategories()
  ]);

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      <ServiceDetailsContent service={service} categories={categories || []} />
    </div>
  );
}
