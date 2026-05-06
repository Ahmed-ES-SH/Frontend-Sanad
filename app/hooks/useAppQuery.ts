import { useQuery, UseQueryOptions, QueryKey } from "@tanstack/react-query";

type UseAppQueryOptions<TData, TError> = Omit<
  UseQueryOptions<TData, TError>,
  "queryKey" | "queryFn"
> & {
  enabled?: boolean;
};

async function fetcher<TData>({
  endpoint,
  config,
}: {
  endpoint: string;
  config?: RequestInit;
}): Promise<TData> {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const response = await fetch(`${baseURL}${endpoint}`, {
    ...config,
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));

    throw new Error(
      errorData.message || `Request failed with status ${response.status}`,
    );
  }

  return response.json();
}

export function useAppQuery<TData = unknown, TError = unknown>({
  queryKey,
  endpoint,
  config,
  enabled = true,
  options,
}: {
  queryKey: QueryKey;
  endpoint: string;
  config?: RequestInit;
  enabled?: boolean;
  options?: UseAppQueryOptions<TData, TError>;
}) {
  return useQuery<TData, TError>({
    queryKey,

    queryFn: () => fetcher<TData>({ endpoint, config }),

    enabled,

    retry: false,

    refetchOnMount: false,

    refetchOnWindowFocus: false,

    refetchOnReconnect: false,

    staleTime: 1000 * 60 * 2,

    gcTime: 1000 * 60 * 10,

    ...options,
  });
}
