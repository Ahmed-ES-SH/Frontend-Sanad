import { getMyOrders } from "@/app/actions/orderActions";
import { UserOrdersPage } from "@/app/components/userdashboard/_userOrders";
import { PaginationMeta } from "@/app/types/global";

export default async function UserDashboardOrders({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const page = Number(resolvedSearchParams?.page) || 1;

  const response = await getMyOrders({ page, limit: 10 });
  const meta: PaginationMeta = response.data?.meta ?? {
    page: 1,
    limit: 10,
    total: 0,
    perPage: 10,
    lastPage: 1,
  };
  return <UserOrdersPage data={response.data?.data || []} meta={meta} />;
}
