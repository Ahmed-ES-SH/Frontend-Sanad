import { TransactionTable } from "@/app/components/userdashboard/_payments";
import BillingSettings from "@/app/components/userdashboard/_payments/BillingSettings";
import KPICards from "@/app/components/userdashboard/_payments/KPICards";
import PaymentMethods from "@/app/components/userdashboard/_payments/PaymentMethods";
import PaymentsHeader from "@/app/components/userdashboard/_payments/PaymentsHeader";
import { getTranslations } from "@/app/helpers/getTranslations";
import { globalRequest } from "@/app/helpers/globalRequest";
import { PaginatedPaymentsResponse } from "@/app/types/payments";
import { PAYMENTS_ENDPOINTS } from "@/app/constants/endpoints";

interface UserPaymentsPageProps {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<{
    page?: string;
    limit?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
  }>;
}

export default async function UserPaymentsPage({
  params,
  searchParams,
}: UserPaymentsPageProps) {
  const { locale } = await params;
  const { page, limit, status, startDate, endDate } = await searchParams;
  const t = getTranslations(locale ?? "en", "payments");

  // Construct query string for server-side fetch
  const queryParams = new URLSearchParams();
  if (page) queryParams.set("page", page);
  if (limit) queryParams.set("limit", limit);
  if (status && status !== "all") queryParams.set("status", status);
  if (startDate) queryParams.set("startDate", startDate);
  if (endDate) queryParams.set("endDate", endDate);

  const queryString = queryParams.toString();
  const endpoint = `${PAYMENTS_ENDPOINTS.USER_LIST}${queryString ? `?${queryString}` : ""}`;

  const response = await globalRequest<PaginatedPaymentsResponse>({
    endpoint,
    method: "GET",
  });

  const initialData = response.data;

  return (
    <main className="mt-24 mb-12 c-container px-6 md:px-8 min-h-screen">
      <PaymentsHeader t={t} />
      <KPICards t={t} />

      {/* Two Column Layout: Payment Methods & Billing Sidebar */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-10">
        {/* Payment Methods Column */}
        <div className="xl:col-span-2">
          <PaymentMethods t={t} />
        </div>
        {/* Billing Settings Sidebar */}
        <div className="lg:col-span-1">
          <BillingSettings t={t} />
        </div>
      </div>

      {/* Transaction History Section */}
      <TransactionTable t={t} initialData={initialData} />
    </main>
  );
}
