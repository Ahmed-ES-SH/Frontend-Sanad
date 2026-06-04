import { IoMdPersonAdd } from "react-icons/io";
import { UserStatsResult } from "@/app/types/user";
import { adminGetUsers, adminGetUsersStats } from "@/app/actions/userActions";

import Link from "next/link";
import UserStats from "@/app/components/dashboard/UsersPage/UserStats";
import ClientUsers from "@/app/components/dashboard/UsersPage/ClientUsers";

// ============================================================================
// USERS PAGE - Server component that fetches all users from backend
// Data is passed down to client components for interactivity
// ============================================================================

export default async function UsersPage() {
  // Fetch users server-side for security and performance

  let error = null;

  const usersResponse = await adminGetUsers();
  const stats = (await adminGetUsersStats()) as UserStatsResult;

  if (!usersResponse) {
    error = "Failed to load users";
  }

  const meta = usersResponse?.meta;

  return (
    <>
      <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-stone-900">
              User Management
            </h2>
            <p className="text-stone-500 mt-1">
              Manage platform access, roles, and user permissions across
              departments.
            </p>
          </div>
          <Link
            href="/dashboard/adduser"
            className="bg-linear-to-br from-orange-500 to-amber-500 text-white px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:shadow-lg hover:shadow-orange-500/20 transition-all active:scale-95"
          >
            <IoMdPersonAdd className="size-6" />
            Add New User
          </Link>
        </div>

        {/* Stats Cards */}
        <UserStats stats={stats} total={stats.totalUsers} />

        {/* Client Side Users */}
        <ClientUsers
          initialData={usersResponse.data}
          total={meta?.total ?? 0}
          page={meta?.page ?? 1}
          perPage={meta?.perPage ?? 10}
          lastPage={meta?.lastPage ?? 1}
        />
      </main>
    </>
  );
}
