import {
  getInitialPayments,
  getPaymentStats,
} from "@/app/actions/paymentsActions";
import PaymentsClient from "../../../../components/dashboard/PaymentsPage/PaymentsClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payments Dashboard | Sanad",
  description: "Manage and view payments for Sanad services",
};

export default async function PaymentsPage() {
  const [paymentsResponse, paymentStats] = await Promise.all([
    getInitialPayments({
      page: 1,
      limit: 10,
    }),
    getPaymentStats(),
  ]);

  const { data: initialData, success } = paymentsResponse;

  return (
    <PaymentsClient
      initialData={success && initialData ? initialData : null}
      paymentStats={paymentStats?.data ?? null}
    />
  );
}
