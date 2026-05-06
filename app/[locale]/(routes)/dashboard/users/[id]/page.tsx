import { notFound } from "next/navigation";
import { BsArrowLeft } from "react-icons/bs";
import { adminGetUser } from "@/app/actions/userActions";
import { Locale } from "@/app/types/global";
import LocaleLink from "@/app/components/global/LocaleLink";
import EditUserClient from "@/app/components/dashboard/UsersPage/EditUser/EditUserClient";

// ============================================================================
// USER PROFILE PAGE - Server component that fetches single user data
// Passes data to EditUserClient for admin editing
// ============================================================================

interface PageProps {
  params: Promise<{ id: string; locale: Locale }>;
}

export default async function UserProfilePage({ params }: PageProps) {
  const { id, locale } = await params;

  // ============================================================================
  // Fetch user data server-side
  // ============================================================================
  const user = await adminGetUser(id);

  if (!user) {
    notFound();
  }

  return (
    <>
      <main className="flex-1 overflow-y-auto p-2 lg:p-6 md:p-8">
        <div className="w-full relative">
          {/* Back link */}
          <div className="mb-6">
            <LocaleLink
              href={`/dashboard/users`}
              className="text-sm font-medium text-stone-500 hover:text-orange-600 transition-colors flex items-center gap-1"
            >
              <BsArrowLeft className="w-4 h-4" />
              Back to Users
            </LocaleLink>
          </div>

          <EditUserClient user={user} locale={locale} />
        </div>
      </main>
    </>
  );
}
