"use server";

import { globalRequest } from "@/app/helpers/globalRequest";
import { CART_ENDPOINTS } from "@/app/constants/endpoints";
import { CartItemType } from "@/app/types/cart";

// ---------------------------------------------------------------------------
// Response shapes (mirror CartSlice's internal types)
// ---------------------------------------------------------------------------

export interface CartApiResponse {
  id: string;
  userId: number;
  items: CartItemType[];
  totalItems: number;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
}

export interface FailedMergeItem {
  serviceId: string;
  reason: string;
}

export interface MergeApiResponse {
  success: boolean;
  message: string;
  cart: CartApiResponse;
  failedItems: FailedMergeItem[];
}

// ---------------------------------------------------------------------------
// Cart Server Actions
// Each action returns a GlobalResponse<T> where success/data/message are set.
// ---------------------------------------------------------------------------

/** GET /api/cart — fetch the authenticated user's cart. */
export async function fetchCartAction() {
  return globalRequest<never, CartApiResponse>({
    endpoint: CART_ENDPOINTS.GET_CART,
    method: "GET",
    defaultErrorMessage: "Failed to load cart",
  });
}

/** POST /api/cart/items — add a service item to the cart. */
export async function addItemAction(serviceId: string, quantity: number) {
  return globalRequest<{ serviceId: string; quantity: number }, CartApiResponse>(
    {
      endpoint: CART_ENDPOINTS.ADD_ITEM,
      method: "POST",
      body: { serviceId, quantity },
      defaultErrorMessage: "Failed to add item to cart",
    },
  );
}

/** PUT /api/cart/items/:id — set an item's quantity absolutely. */
export async function updateItemAction(itemId: string, quantity: number) {
  return globalRequest<{ quantity: number }, CartApiResponse>({
    endpoint: CART_ENDPOINTS.UPDATE_ITEM(itemId),
    method: "PUT",
    body: { quantity },
    defaultErrorMessage: "Failed to update quantity",
  });
}

/** DELETE /api/cart/items/:id — remove a single item from the cart. */
export async function removeItemAction(itemId: string) {
  return globalRequest<never, CartApiResponse>({
    endpoint: CART_ENDPOINTS.REMOVE_ITEM(itemId),
    method: "DELETE",
    defaultErrorMessage: "Failed to remove item",
  });
}

/** DELETE /api/cart — clear the entire cart. */
export async function clearCartAction() {
  return globalRequest<never, void>({
    endpoint: CART_ENDPOINTS.CLEAR_CART,
    method: "DELETE",
    defaultErrorMessage: "Failed to clear cart",
  });
}

/** POST /api/cart/merge — merge guest-localStorage items into the server cart. */
export async function mergeCartAction(
  items: { serviceId: string; quantity: number }[],
) {
  return globalRequest<
    { items: { serviceId: string; quantity: number }[] },
    MergeApiResponse
  >({
    endpoint: CART_ENDPOINTS.MERGE_CART,
    method: "POST",
    body: { items },
    defaultErrorMessage: "Failed to merge guest cart",
  });
}
