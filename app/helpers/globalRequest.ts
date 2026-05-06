/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { ApiError } from "next/dist/server/api-utils";
import { PaginationMeta } from "../types/global";
import { getServerAuthCookieHeader } from "./session";

/* =========================================================
   GLOBAL REQUEST
   ✔ credentials: "include"
   ✔ GET POST PATCH PUT DELETE
   ✔ auto json parse
   ✔ auto success/error handling
   ✔ transform response
========================================================= */

type HttpMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

interface GlobalRequestOptions<TBody = any, TResult = any> {
  endpoint: string;
  method?: HttpMethod;
  body?: TBody;
  headers?: HeadersInit;
  defaultErrorMessage?: string;
  transform?: (response: any) => TResult;
  returnRaw?: boolean;
  next?: RequestInit["next"];
  cache?: RequestCache;
}

interface GlobalResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  statusCode?: number;
  meta?: PaginationMeta;
}

/* =========================================================
   MAIN REQUEST
========================================================= */

export async function globalRequest<TBody = any, TResult = any>({
  endpoint,
  method = "GET",
  body,
  headers = {},
  defaultErrorMessage = "An unexpected error occurred",
  transform,
  returnRaw = false,
  next,
  cache = "no-store",
}: GlobalRequestOptions<TBody, TResult>): Promise<GlobalResponse<TResult>> {
  try {
    const url = process.env.API_BASE_URL + endpoint;
    const requestHeaders = new Headers(headers);

    requestHeaders.set("Content-Type", "application/json");

    // This file runs exclusively on the server ("use server").
    // Node.js fetch does NOT send cookies automatically — they must be forwarded manually.
    // `credentials: "include"` has no effect in Node.js and is NOT used here.
    const authCookieHeader = await getServerAuthCookieHeader();

    if (authCookieHeader) {
      const existingCookieHeader = requestHeaders.get("Cookie");
      requestHeaders.set(
        "Cookie",
        existingCookieHeader
          ? `${existingCookieHeader}; ${authCookieHeader}`
          : authCookieHeader,
      );
    }

    const response = await fetch(url, {
      method,
      cache,
      next,
      headers: requestHeaders,

      body:
        method === "GET" || method === "DELETE"
          ? undefined
          : JSON.stringify(body),
    });

    /* =============================
       Parse Response
    ============================== */

    let result: any = null;

    const contentType = response.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      result = await response.json();
    } else {
      result = await response.text();
    }

    /* =============================
       Handle Error
    ============================== */

    if (!response.ok) {
      return {
        success: false,
        message: result?.message || result?.error || defaultErrorMessage,
        statusCode: response.status,
      };
    }

    /* =============================
       Handle Success
    ============================== */

    const finalData = transform
      ? transform(result)
      : returnRaw
        ? result
        : result;

    return {
      success: true,
      message: result?.message || "Request successful",
      data: finalData,
      statusCode: response.status,
    };
  } catch (error: any) {
    if (error instanceof ApiError) {
      return {
        success: false,
        message: error.message,
        statusCode: error.statusCode,
      };
    }

    return {
      success: false,
      message: defaultErrorMessage,
    };
  }
}
