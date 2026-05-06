/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAuthCookie } from "@/app/helpers/session";
import { redirect } from "next/navigation";

export default async function UserDashboardLayout({ children, params }: any) {
  const { locale } = await params;
  const token = await getAuthCookie();

  if (!token) {
    redirect(`/${locale}/signin`);
  }

  return (
    <div className="flex min-h-screen relative">
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {children}
      </div>
    </div>
  );
}
