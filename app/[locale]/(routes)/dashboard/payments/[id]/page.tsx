import AuditLogs from "@/app/components/dashboard/PaymentDetailPage/AuditLogs";
import CustomerInfoCard from "@/app/components/dashboard/PaymentDetailPage/CustomerInfoCard";
import HeroAmount from "@/app/components/dashboard/PaymentDetailPage/HeroAmount";
import PaymentDetailsCard from "@/app/components/dashboard/PaymentDetailPage/PaymentDetailsCard";
import PaymentDetailsHeader from "@/app/components/dashboard/PaymentDetailPage/PaymentDetailsHeader";
import SecondaryMetrics from "@/app/components/dashboard/PaymentDetailPage/SecondaryMetrics";
import SecurityCheckCard from "@/app/components/dashboard/PaymentDetailPage/SecurityCheckCard";
import StatusHistory from "@/app/components/dashboard/PaymentDetailPage/StatusHistory";
import { PaymentDetail } from "@/app/components/dashboard/PaymentsPage/payments-types";
import Link from "next/link";

// Mock data — replace with actual API call via TanStack Query
function getPaymentDetail(id: string): PaymentDetail {
  return {
    id: id || "TXN-9421",
    status: "success",
    amount: 2400.0,
    currency: "SAR",
    netVolume: 2328.0,
    processingFeePercent: 3,
    method: {
      type: "credit_card",
      last4: "4242",
      brand: "Visa",
    },
    processedAt: "October 24, 2023 at 02:45 PM AST",
    merchant: {
      name: "Sanad Cloud Services Ltd.",
      location: "Riyadh, Saudi Arabia",
    },
    billingCycle: {
      plan: "Monthly Enterprise Plan",
      period: "Oct 01 - Oct 31, 2023",
    },
    lineItems: [
      {
        description: "Cloud Infrastructure - Tier 3",
        quantity: 1,
        price: 1800.0,
        currency: "SAR",
      },
      {
        description: "Priority Support Add-on",
        quantity: 1,
        price: 600.0,
        currency: "SAR",
      },
    ],
    customer: {
      name: "Ahmed Al-Mansour",
      email: "ahmed.mansour@q-tech.sa",
      location: "Riyadh, Saudi Arabia",
      avatarUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD8lKkwjfad_SlgLjYPZdE-QmnRW24C9sLzAJoAdeqUthwCjkiyZItruYaGI4LLBXPnZ1gtyA1SzlCxK-VIIHrKEmjbiqt8Jd7cSI-wVLYHOx73wuoKxp7oNKfNoo1o0rvVBQEj5MuDe24lqSCNkcIFZJ4QmZ_Bi3KTUbfZOUKS_UhkMYo87zL5dKPfamWDsXYymPhJkrvtCUnNXJh88bd0CShRSg8HCctw0aSlgXYrzvPTY3nI0UxHApgr1KJ41z6nflhESS998ZEh",
      isKycVerified: true,
      clientType: "Enterprise Client",
    },
    statusHistory: [
      {
        status: "completed",
        title: "Payment Completed",
        description:
          "Funds have been successfully settled to the merchant account.",
        time: "02:45 PM",
      },
      {
        status: "authorized",
        title: "Authorization Successful",
        description: "Issuer approved the transaction for 2,400.00 SAR.",
        time: "02:44 PM",
      },
      {
        status: "initiated",
        title: "Payment Initiated",
        description: "Customer entered payment details via checkout portal.",
        time: "02:40 PM",
      },
    ],
    security: {
      riskScore: 0.02,
      riskLevel: "LOW",
      cvvCheck: true,
      postCodeCheck: true,
      ipAddress: "92.144.12.33",
      origin: "KSA (Riyadh)",
    },
    auditLogs: [
      {
        timestamp: "2023-10-24 14:45:02",
        level: "INFO",
        message:
          "Transaction #TXN-9421 marked as SETTLED. Webhook dispatched to merchant.",
      },
      {
        timestamp: "2023-10-24 14:44:58",
        level: "INFO",
        message: "3D Secure verification successful for ARN: 849201.",
      },
      {
        timestamp: "2023-10-24 14:44:12",
        level: "DEBUG",
        message: "API Request: POST /v1/charges | Source: checkout_portal_v2",
      },
    ],
  };
}

interface PaymentDetailPageProps {
  params: Promise<{ id: string; local: string }>;
}

export default async function PaymentDetailPage({
  params,
}: PaymentDetailPageProps) {
  const { id, local: locale } = await params;
  const payment = getPaymentDetail(id);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-stone-50">
        {/* Breadcrumbs */}
        <nav
          className="flex items-center gap-2 text-sm text-stone-500"
          aria-label="Breadcrumb"
        >
          <Link
            href={`/${locale}/dashboard/payments`}
            className="hover:text-orange-600 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:ring-offset-2 rounded"
          >
            Payments
          </Link>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 text-stone-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
          <span className="font-medium text-stone-900">
            Transaction #{payment.id}
          </span>
        </nav>

        {/* Header */}
        <PaymentDetailsHeader
          status={payment.status}
          transactionId={payment.id}
          processedAt={payment.processedAt}
          amount={payment.amount}
          currency={payment.currency}
        />

        {/* Hero Amount */}
        <HeroAmount
          amount={payment.amount}
          currency={payment.currency}
          status={payment.status}
        />

        {/* Secondary Metrics */}
        <SecondaryMetrics
          netVolume={payment.netVolume}
          currency={payment.currency}
          processingFeePercent={payment.processingFeePercent}
          status={payment.status}
          method={payment.method}
        />

        {/* Split Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column (Main) */}
          <div className="lg:col-span-2 space-y-6">
            <PaymentDetailsCard
              merchant={payment.merchant}
              billingCycle={payment.billingCycle}
              lineItems={payment.lineItems}
              subtotal={payment.amount}
              total={payment.amount}
              currency={payment.currency}
            />

            <StatusHistory history={payment.statusHistory} />
          </div>

          {/* Right Column (Sidebar) */}
          <div className="space-y-6">
            <CustomerInfoCard customer={payment.customer} />
            <SecurityCheckCard security={payment.security} />
          </div>
        </div>

        {/* Audit Logs */}
        <AuditLogs logs={payment.auditLogs} />
      </main>
    </div>
  );
}
