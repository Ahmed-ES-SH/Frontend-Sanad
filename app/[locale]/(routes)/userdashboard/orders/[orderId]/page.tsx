import { fetchOrderById } from "@/app/actions/orderActions";
import {
  createFallbackOrder,
  formatOrder,
  getStatusSteps,
} from "@/app/helpers/_dashboard/formatOrder";
import {
  buildStatusLabelMap,
  getBackLink,
  getLatestUpdateDescription,
} from "@/app/helpers/_dashboard/orderTrackingHelpers";
import { getSharedMetadata } from "@/app/helpers/getSharedMetadata";
import { getTranslations } from "@/app/helpers/getTranslations";
import { Locale } from "@/app/types/global";
import type { Metadata } from "next";

import { OrderPageHeader } from "@/app/components/dashboard/OrderDetails/OrderPageHeader";
import { OrderProgressTracker } from "@/app/components/dashboard/OrderDetails/OrderProgressTracker";
import { OrderDetailsCard } from "@/app/components/dashboard/OrderDetails/OrderDetailsCard";
import { ActivityLogCard } from "@/app/components/dashboard/OrderDetails/ActivityLogCard";
import { NeedAssistanceCard } from "@/app/components/dashboard/OrderDetails/NeedAssistanceCard";
import { QuickActionsCard } from "@/app/components/dashboard/OrderDetails/QuickActionsCard";
import { WhatsNextCard } from "@/app/components/dashboard/OrderDetails/WhatsNextCard";

import type { DisplayOrder } from "@/app/types/OrderTrackingTable.types";
import type { OrderStatus } from "@/app/types/OrderTrackingTable.types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; orderId: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const translations = getTranslations(locale ?? "en");

  const title = translations.orderTrackingMeta.title;
  const description = translations.orderTrackingMeta.description;

  const sharedMetadata = getSharedMetadata(locale ?? "en", title, description);

  return {
    title,
    description,
    ...sharedMetadata,
  };
}

interface OrderTrackingPageProps {
  params: Promise<{ local: string; orderId: string }>;
}

const OrderTrackingPage = async ({ params }: OrderTrackingPageProps) => {
  const { local, orderId } = await params;
  const translated = getTranslations(local ?? "en");
  const t = translated.orderTracking;
  const statusTranslations = t.status;
  const isRtl = local === "ar";

  let orderData: DisplayOrder;
  let statusSteps: ReturnType<typeof getStatusSteps>;
  let progressWidth: string;

  try {
    const rawOrder = await fetchOrderById(orderId);
    const formatted = formatOrder(rawOrder, local ?? "en");
    const statusResult = getStatusSteps(formatted.status as OrderStatus);

    orderData = formatted;
    statusSteps = statusResult;
    progressWidth = statusResult.progressWidth;
  } catch (error) {
    // Use fallback data when API fails
    orderData = createFallbackOrder(orderId);
    const statusResult = getStatusSteps(orderData.status);
    statusSteps = statusResult;
    progressWidth = statusResult.progressWidth;
  }

  // Build status label map from translations
  const statusLabelMap = buildStatusLabelMap(statusTranslations);

  // Apply translated status labels
  const displayOrder: DisplayOrder = {
    ...orderData,
    statusLabel: statusLabelMap[orderData.status] || orderData.statusLabel,
  };

  // Build status steps with translated labels
  const translatedStatusSteps = statusSteps.steps.map((step) => ({
    ...step,
    label: statusLabelMap[step.key] || step.label,
  }));

  // Get back link
  const backLink = getBackLink(isRtl, local ?? "en");

  // Get what's next description
  const whatsNextDescription = getLatestUpdateDescription(
    displayOrder.updates,
    isRtl,
  );

  return (
    <main className="min-h-screen mt-16 pb-12 page-bg">
      <div className="c-container pt-8">
        {/* Header Section */}
        <OrderPageHeader
          backLink={backLink}
          backLabel={t.backToOrders}
          pageTitle={t.pageTitle}
          pageSubtitle={t.pageSubtitle}
          isRtl={isRtl}
        />

        {/* Horizontal Progress Tracker */}
        <OrderProgressTracker
          statusSteps={translatedStatusSteps}
          progressWidth={progressWidth}
          statusLabelMap={statusLabelMap}
          isRtl={isRtl}
        />

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area (2/3) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Order Details Card */}
            <OrderDetailsCard order={displayOrder} title={t.orderDetails} />

            {/* Status Updates Timeline */}
            <ActivityLogCard
              entries={displayOrder.updates}
              title={t.activityLog}
            />
          </div>

          {/* Sidebar (1/3) */}
          <div className="space-y-6">
            {/* Need Help Card */}
            <NeedAssistanceCard
              title={t.needAssistance}
              description={t.supportDescription}
              buttonLabel={t.contactSupport}
            />

            {/* Actions Card */}
            <QuickActionsCard
              title={t.quickActions}
              downloadLabel={t.downloadInvoice}
              agreementLabel={t.serviceAgreement}
              isRtl={isRtl}
            />

            {/* Status Context Card */}
            <WhatsNextCard
              title={t.whatsNext}
              description={whatsNextDescription}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default OrderTrackingPage;
