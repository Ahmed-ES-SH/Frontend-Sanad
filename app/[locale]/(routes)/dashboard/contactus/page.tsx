import { fetchContactMessages } from "@/app/actions/contactActions";
import { ContactMessagesContent } from "@/app/components/dashboard/ContactUsPage/ContactMessagesContent";
import { ContactListResponse, ContactQueryParams } from "@/app/types/contact";

interface ContactUsPageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    order?: string;
    isRead?: string;
  }>;
}

export default async function ContactUsPage({
  searchParams,
}: ContactUsPageProps) {
  const resolvedSearchParams = await searchParams;

  const page = Math.max(1, Number(resolvedSearchParams.page || "1") || 1);
  const limit = Math.min(
    100,
    Math.max(1, Number(resolvedSearchParams.limit || "10") || 10),
  );
  const order = resolvedSearchParams.order === "ASC" ? "ASC" : "DESC";
  const isRead =
    resolvedSearchParams.isRead === "true"
      ? true
      : resolvedSearchParams.isRead === "false"
        ? false
        : undefined;

  const initialParams = {
    page,
    limit,
    order,
    isRead,
    sortBy: "createdAt",
  } as ContactQueryParams;

  const response = await fetchContactMessages(initialParams);

  const initialData =
    response.success && response.data
      ? {
          data: response.data,
          meta: response.meta || {
            page,
            limit,
            total: response.data.length,
            totalPages: 1,
          },
        }
      : {
          data: [],
          meta: {
            page,
            limit,
            total: 0,
            totalPages: 0,
          },
        };

  return (
    <main className="pt-12 pb-12 px-8 min-h-screen bg-stone-50 text-stone-900">
      <ContactMessagesContent
        initialData={initialData as ContactListResponse}
        initialParams={initialParams}
      />
    </main>
  );
}
