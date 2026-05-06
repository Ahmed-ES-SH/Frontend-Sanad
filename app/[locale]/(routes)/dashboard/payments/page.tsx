import { getInitialPayments } from "@/app/actions/paymentsActions";
import PaymentsClient from "./PaymentsClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payments Dashboard | Sanad",
  description: "Manage and view payments for Sanad services",
};

export default async function PaymentsPage() {
  // First fetch will be done on the server side
  const { data: initialData, success } = await getInitialPayments({
    page: 1,
    limit: 10,
  });

  return (
    <PaymentsClient 
      initialData={success && initialData ? initialData : null} 
    />
  );
}
