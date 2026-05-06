"use client";

import { useState } from "react";
import { ContactListResponse, ContactQueryParams } from "@/app/types/contact";
import { MessagesTable } from "./MessagesTable";
import { Filters } from "./Filters";
import { StatsCards } from "./StatsCards";
import { getContactStats } from "./contactUtils";
import {
  markAsRead,
  markAsReplied,
  deleteContactMessage,
} from "@/app/actions/contactActions";
import { toast } from "sonner";
import { CONTACT_ENDPOINTS } from "@/app/constants/endpoints";
import { useAppQuery } from "@/app/hooks/useAppQuery";

interface ContactMessagesContentProps {
  initialData: ContactListResponse;
  initialParams: ContactQueryParams;
}

export function ContactMessagesContent({
  initialData,
  initialParams,
}: ContactMessagesContentProps) {
  const [params, setParams] = useState<ContactQueryParams>(initialParams);

  const queryKey = [
    "contact-messages",
    params.page,
    params.limit,
    params.order,
    params.isRead,
  ];

  const buildEndpoint = () => {
    const searchParams = new URLSearchParams();
    if (params.page) searchParams.set("page", params.page.toString());
    if (params.limit) searchParams.set("limit", params.limit.toString());
    if (params.order) searchParams.set("order", params.order);
    if (params.isRead !== undefined)
      searchParams.set("isRead", params.isRead.toString());
    searchParams.set("sortBy", "createdAt");

    return `${CONTACT_ENDPOINTS.ADMIN_LIST}?${searchParams.toString()}`;
  };

  const { data, isLoading, refetch } = useAppQuery<ContactListResponse>({
    queryKey,
    endpoint: buildEndpoint(),
    options: {
      initialData:
        params.page === initialParams.page &&
        params.limit === initialParams.limit &&
        params.order === initialParams.order &&
        params.isRead === initialParams.isRead
          ? initialData
          : undefined,
    },
  });

  const messages = data?.data ?? [];
  const meta = data?.meta ?? {
    page: params.page ?? 1,
    limit: params.limit ?? 10,
    total: 0,
    lastPage: 1,
    perPage: 10,
  };

  const stats = getContactStats(messages, meta.total);

  const handlePageChange = (newPage: number) => {
    setParams((prev) => ({ ...prev, page: newPage }));
  };

  const handleAction = async (
    id: string,
    action: "read" | "reply" | "delete",
  ) => {
    try {
      let result;
      if (action === "read") {
        result = await markAsRead(id);
      } else if (action === "reply") {
        result = await markAsReplied(id);
      } else if (action === "delete") {
        if (!confirm("Are you sure you want to delete this message?")) return;
        result = await deleteContactMessage(id);
      }

      if (result?.success) {
        toast.success(result.message);
        refetch();
      } else {
        toast.error(result?.message || "Action failed");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const handleFilterChange = (newFilters: Partial<ContactQueryParams>) => {
    setParams((prev) => ({ ...prev, ...newFilters, page: 1 }));
  };

  return (
    <>
      <StatsCards
        total={stats.total}
        unread={stats.unread}
        replied={stats.replied}
        currentPageCount={stats.currentPageCount}
      />

      <Filters
        isRead={params.isRead}
        order={params.order}
        onFilterChange={handleFilterChange}
      />

      <MessagesTable
        messages={messages}
        meta={meta}
        page={meta.page}
        onPageChange={handlePageChange}
        onAction={handleAction}
        isLoading={isLoading}
      />
    </>
  );
}
