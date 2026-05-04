/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { formatPrice } from "@/app/helpers/formatPrice";
import { CartItem } from "./CartItem";
import { TrustIndicators } from "./TrustIndicators";
import { CheckoutSection } from "./CheckoutSection";
import { EmptyCartState } from "./EmptyCartState";
import { MdClose } from "react-icons/md";
import { FiLoader } from "react-icons/fi";
import { toast } from "sonner";
import { calculateCartTotals } from "@/app/helpers/_cart/calculateCartTotals.helper";
import { createPaymentIntent } from "@/app/helpers/_cart/createPaymentIntent.helper";
import { useAuthStore } from "@/app/store/AuthSlice";
import { useTranslation } from "@/app/hooks/useTranslation";
import { useCartToast } from "@/app/hooks/useCartToast";
import { useCartStore } from "@/app/store/CartSlice";
import { useLocale } from "@/app/hooks/useLocale";
import { PaymentModal } from "../payment/PaymentModal";
import { useRouter } from "next/navigation";
import { useNotificationStore } from "@/app/store/NotificationSlice";

export function CartPage() {
  const locale = useLocale();
  const { user } = useAuthStore();
  const t = useTranslation("cart");
  const router = useRouter();

  const {
    items,
    isLoading,
    error,
    remove,
    add,
    clear,
    totalAmount: serverTotal,
  } = useCartStore();
  const { popupNotifications, dismissPopup } = useNotificationStore();

  // Checkout states
  const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentId, setPaymentId] = useState("");

  // Undo toast state management
  // removeItem signature: (itemId: string, serviceId: string) => void | Promise<void>
  // addItem signature:    (item: CartItemType) => void | Promise<void>
  const {
    undoToast,
    isRemoving,
    handleRemove,
    handleUndo,
    handleDismissToast,
  } = useCartToast(
    (itemId, serviceId) => remove({ itemId, serviceId }),
    (item) => add({ serviceId: item.serviceId, quantity: item.quantity }),
  );

  // Calculate display totals (subtotal + VAT breakdown for the summary panel)
  const totals = useMemo(() => {
    const calculated = calculateCartTotals(items);
    // Use the server-authoritative total for checkout — avoids divergence
    // if the backend applies discounts or corrects prices.
    return {
      ...calculated,
      total: serverTotal > 0 ? serverTotal : calculated.total,
    };
  }, [items, serverTotal]);

  const handleCheckout = useCallback(async () => {
    if (items.length === 0) return;

    if (!user) {
      toast.error(t.loginRequired);
      return;
    }

    setIsProcessingCheckout(true);
    try {
      const { clientSecret, paymentId } = await createPaymentIntent(
        totals.total,
        items,
        user.id,
        items[0].serviceId,
      );
      setClientSecret(clientSecret);
      setPaymentId(paymentId);
      setIsPaymentModalOpen(true);
    } catch (error) {
      if (error instanceof Error && error.message) {
        toast.error(error.message);
      } else {
        toast.error(t.checkoutError);
      }
    } finally {
      setIsProcessingCheckout(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, user, totals.total]);

  // Handle real-time ORDER_CREATED event
  useEffect(() => {
    const orderCreatedNotif = popupNotifications.find(
      (n) => n.type === ("ORDER_CREATED" as any),
    );

    if (orderCreatedNotif && orderCreatedNotif.data?.orderId) {
      const { orderId, isRedirect } = orderCreatedNotif.data;

      setIsProcessingCheckout(false);
      setIsPaymentModalOpen(false);

      if (isRedirect) {
        toast.info(
          t.alreadyActiveOrder ||
            "You already have an active order for this payment.",
        );
        router.push(`/${locale}/orders/${orderId}`);
      } else {
        toast.success(
          t.paymentSuccess ||
            "Payment successful! Your order has been created.",
        );
        router.push(`/${locale}/orders/${orderId}?success=true`);
      }

      dismissPopup(orderCreatedNotif.id);
      void clear();
    }
  }, [popupNotifications, dismissPopup, clear, router, locale, t]);

  const onSuccess = useCallback(() => {
    toast.success(t.paymentSuccess);
    setIsPaymentModalOpen(false);
    void clear();
  }, [clear, t.paymentSuccess]);

  const onError = useCallback(
    (error: string) => {
      toast.error(error || t.paymentFailed);
      setIsPaymentModalOpen(false);
      router.push(`/${locale}/userdashboard/payments/failed`);
    },
    [locale, router, t.paymentFailed],
  );

  // Check if cart is empty
  const isEmpty = items.length === 0;

  if (isLoading && items.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-[400px] gap-4"
        role="status"
        aria-label={t.loadingBrief}
      >
        <FiLoader className="text-4xl text-primary animate-spin" />
        <p className="text-surface-500">{t.loadingBrief}</p>
      </div>
    );
  }

  return (
    <>
      {/* Error Banner */}
      {error && (
        <div
          role="alert"
          className="mb-4 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          <span className="flex-1">{error}</span>
          <button
            onClick={() => useCartStore.setState({ error: null })}
            aria-label={t.dismiss}
            className="shrink-0 text-red-400 hover:text-red-600 transition-colors"
          >
            <MdClose className="text-base" />
          </button>
        </div>
      )}
      {isEmpty ? (
        <EmptyCartState />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start pb-20 lg:pb-0">
          {/* Left Column: Your Brief */}
          <div className="lg:col-span-8 lg:max-h-[80dvh] lg:overflow-y-auto space-y-8 scrollbar-hide">
            <div className="space-y-4 md:space-y-6">
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onRemove={() => handleRemove(item)}
                  isRemoving={isRemoving === item.id}
                />
              ))}
            </div>

            <div className="hidden lg:block">
              <TrustIndicators />
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <CheckoutSection
              subtotal={totals.subtotal}
              technicalFee={totals.technicalFee}
              vat={totals.vat}
              total={totals.total}
              onCheckout={handleCheckout}
              isProcessing={isProcessingCheckout}
            />
          </div>
        </div>
      )}

      {/* Mobile Sticky CTA */}
      {!isEmpty && (
        <div className="lg:hidden bg-white/60 backdrop-blur-sm fixed bottom-0 inset-x-0 z-40 border-t border-gray-300 p-4 pb-safe shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
          <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-(--on-surface-variant) font-medium">
                {t.total}
              </p>
              <p className="text-lg font-bold text-primary">
                {formatPrice(totals.total, locale)}
              </p>
            </div>
            <button
              onClick={handleCheckout}
              disabled={isProcessingCheckout}
              className="flex-1 max-w-[200px] py-3 bg-primary text-white font-semibold rounded-xl shadow-lg shadow-primary/20 active:scale-95 transition-all disabled:opacity-70 flex items-center justify-center"
            >
              {isProcessingCheckout ? (
                <FiLoader className="animate-spin text-xl" />
              ) : (
                t.secureCheckout
              )}
            </button>
          </div>
        </div>
      )}

      {/* Undo Toast */}
      {undoToast && (
        <div
          className={`fixed bottom-24 lg:bottom-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-xl bg-stone-900 text-white animate-in slide-in-from-bottom-4 duration-300 ltr:left-6 rtl:right-6`}
          role="status"
          aria-live="polite"
        >
          <span className="text-sm flex-1">
            {undoToast.action === "remove"
              ? t.undoRemoveMessage
              : t.undoSaveMessage}
          </span>
          <button
            onClick={handleUndo}
            className="text-sm font-bold text-primary hover:underline shrink-0"
          >
            {t.undo}
          </button>
          <button
            onClick={handleDismissToast}
            className="text-stone-400 hover:text-white transition-colors shrink-0"
            aria-label={t.dismiss}
          >
            <MdClose className="text-base" />
          </button>
        </div>
      )}

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        clientSecret={clientSecret}
        amount={totals.total}
        paymentId={paymentId}
        onSuccess={onSuccess}
        onError={onError}
      />
    </>
  );
}
