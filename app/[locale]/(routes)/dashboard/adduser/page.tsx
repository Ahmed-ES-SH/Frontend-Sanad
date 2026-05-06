import AddUserClient from "@/app/components/dashboard/UsersPage/AddUserForm/AddUserClient";
import Link from "next/link";
import { BiLeftArrow } from "react-icons/bi";

export default function AddUserPage() {
  return (
    <>
      <main className="flex-1 overflow-y-auto p-6 md:p-8">
        <div className="w-full">
          {/* Back link */}
          <div className="mb-6">
            <Link
              href="/dashboard/users"
              className="text-sm font-medium text-stone-500 hover:text-orange-600 transition-colors flex items-center gap-1"
            >
              <BiLeftArrow />
              Back to Users
            </Link>
          </div>

          <AddUserClient />
        </div>
      </main>
    </>
  );
}
