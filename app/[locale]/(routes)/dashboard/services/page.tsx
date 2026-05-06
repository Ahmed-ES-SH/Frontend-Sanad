import { getAdminServices } from "@/app/actions/servicesActions";
import { getCategories } from "@/app/actions/blogActions";
import { ServiceQueryParams } from "@/app/types/service";
import ServicesContent from "@/app/components/dashboard/ServicesPage/ServicesContent";

interface ServicesPageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    sortBy?: "createdAt" | "updatedAt" | "title" | "order";
    order?: "ASC" | "DESC";
  }>;
}

export default async function ServicesPage({
  searchParams,
}: ServicesPageProps) {
  const params = await searchParams;

  // Parse pagination and sorting params from URL
  const queryParams: ServiceQueryParams = {
    page: params.page ? parseInt(params.page, 10) : 1,
    limit: params.limit ? parseInt(params.limit, 10) : 10,
    sortBy: params.sortBy || "createdAt",
    order: params.order || "DESC",
  };

  // Fetch initial data server-side
  const [servicesResponse, categories] = await Promise.all([
    getAdminServices(queryParams),
    getCategories(),
  ]);

  const { data: initialServices = [], meta } = servicesResponse;

  return (
    <div className="min-h-screen">
      <ServicesContent
        initialServices={initialServices}
        initialMeta={meta}
        categories={categories}
        initialQueryParams={queryParams}
      />
    </div>
  );
}
