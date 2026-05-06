"use client";

import { useState, useCallback, useEffect } from "react";
import { CartItemType } from "../types/cart";

/**
 * Represents an undo toast for cart actions (remove/save for later).
 */
export interface UndoToast {
  item: CartItemType;
  action: "remove" | "save";
}

const UNDO_TOAST_DURATION = 5000;

interface UseCartToastReturn {
  undoToast: UndoToast | null;
  setUndoToast: React.Dispatch<React.SetStateAction<UndoToast | null>>;
  isRemoving: string | null;
  handleRemove: (item: CartItemType) => Promise<void>;
  handleUndo: () => Promise<void>;
  handleDismissToast: () => void;
  handleSaveForLater: (item: CartItemType) => Promise<void>;
}

/**
 * Custom hook to manage cart item removal with undo functionality.
 */
export const useCartToast = (
  removeItem: (itemId: string, serviceId: string) => Promise<void> | void,
  addItem: (item: CartItemType) => Promise<void> | void,
): UseCartToastReturn => {
  const [undoToast, setUndoToast] = useState<UndoToast | null>(null);
  const [isRemoving, setIsRemoving] = useState<string | null>(null);

  // Auto-dismiss undo toast after timeout
  useEffect(() => {
    if (!undoToast) return;

    const timer = setTimeout(() => {
      setUndoToast(null);
    }, UNDO_TOAST_DURATION);

    return () => clearTimeout(timer);
  }, [undoToast]);

  // Handle item removal with visual feedback
  const handleRemove = useCallback(
    async (item: CartItemType) => {
      setIsRemoving(item.id);

      try {
        setUndoToast({
          item,
          action: "remove",
        });

        await removeItem(item.id, item.serviceId);
      } finally {
        setIsRemoving(null);
      }
    },
    [removeItem],
  );

  // Handle undo action (re-add item)
  const handleUndo = useCallback(async () => {
    if (!undoToast) return;

    const { item } = undoToast;
    await addItem(item);
    setUndoToast(null);
  }, [undoToast, addItem]);

  const handleDismissToast = useCallback(() => {
    setUndoToast(null);
  }, []);

  // Handle save for later
  const handleSaveForLater = useCallback(
    async (item: CartItemType) => {
      await handleRemove(item);
      setUndoToast((prev: UndoToast | null) =>
        prev ? { ...prev, action: "save" } : null,
      );
    },
    [handleRemove],
  );

  return {
    undoToast,
    setUndoToast,
    isRemoving,
    handleRemove,
    handleUndo,
    handleDismissToast,
    handleSaveForLater,
  };
};
