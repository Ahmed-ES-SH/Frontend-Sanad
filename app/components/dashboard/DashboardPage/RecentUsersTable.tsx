import { adminGetUsers } from "@/app/actions/userActions";
import { getTranslations } from "@/app/helpers/getTranslations";
import type { User } from "@/app/types/user";
import type { Locale } from "@/app/types/global";
import RecentUsersTableClient from "./RecentUsersTableClient";

interface RecentUsersTableProps {
  locale: Locale;
}

export default async function RecentUsersTable({ locale }: RecentUsersTableProps) {
  const t = getTranslations(locale, "DashboardPage")?.RecentUsersTable ?? {};

  let users: User[] = [];

  try {
    const response = await adminGetUsers({ page: 1, limit: 5 });
    users = response.data ?? [];
  } catch (err) {
    console.error("Failed to load recent users:", err);
  }

  return (
    <RecentUsersTableClient
      data={users}
      title={t.title ?? "Recent Users"}
      viewAllHref="/dashboard/users"
      viewAllLabel={t.viewAll ?? "View All Users"}
      emptyMessage={t.empty ?? "No users yet."}
      translations={{
        name: t.name,
        role: t.role,
        verified: t.verified,
        joined: t.joined,
      }}
    />
  );
}
