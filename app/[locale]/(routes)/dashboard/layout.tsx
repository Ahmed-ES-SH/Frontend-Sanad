/* eslint-disable @typescript-eslint/no-explicit-any */
import Sidebar from "@/app/components/dashboard/DashboardPage/Sidebar";
import TopNavBar from "@/app/components/dashboard/DashboardPage/TopNavBar";
import { getAuthCookie } from "@/app/helpers/session";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children, params }: any) {
  const { locale } = await params;
  const token = await getAuthCookie();

  if (!token) {
    redirect(`/${locale}/signin`);
  }

  return (
    <div className="flex min-h-screen bg-stone-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <TopNavBar />
        <main id="main-content" className="flex-1 p-2">
          {children}
        </main>
      </div>
    </div>
  );
}
