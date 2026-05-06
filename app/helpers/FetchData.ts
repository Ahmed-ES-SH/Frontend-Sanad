import { cookies } from "next/headers";

interface metaType {
  total?: number;
  per_page?: number;
  current_page?: number;
  last_page?: number;
  from?: number;
  to?: number;
}

export default async function FetchData<T>(
  api: string,
  paginationState: boolean = false,
  tags?: string[],
): Promise<{ data: T; meta?: metaType } | T | boolean> {
  try {
    const cookieStore = cookies();

    const localeValue = await (await cookieStore).get("aram_locale");
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      "Accept-Language": localeValue?.value || "en",
    };

    const response = await fetch(`${process.env.API_BASE_URL}${api}`, {
      method: "GET",
      headers,

      next: {
        revalidate: 60,
        tags,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();

    if (paginationState) {
      return result;
    }

    return result;
  } catch (error) {
    console.error("Error fetching data:", error);
    return false;
  }
}
