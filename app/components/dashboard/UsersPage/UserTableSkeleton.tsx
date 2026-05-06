// ============================================================================
// USER TABLE SKELETON - Loading skeleton for user table rows
// Displays placeholder rows while data is loading
// ============================================================================

interface UserTableSkeletonProps {
  rows?: number;
}

export default function UserTableSkeleton({ rows = 10 }: UserTableSkeletonProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-stone-50 text-stone-500">
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">
                Verified
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">
                Created
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {Array.from({ length: rows }).map((_, index) => (
              <tr key={index} className="animate-pulse">
                {/* User Info Skeleton */}
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    {/* Avatar Skeleton */}
                    <div className="w-10 h-10 rounded-full bg-stone-200" />
                    <div>
                      {/* Name Skeleton */}
                      <div className="h-4 w-24 bg-stone-200 rounded mb-2" />
                      {/* Email Skeleton */}
                      <div className="h-3 w-32 bg-stone-100 rounded" />
                    </div>
                  </div>
                </td>

                {/* Role Badge Skeleton */}
                <td className="px-6 py-5">
                  <div className="h-6 w-14 bg-stone-200 rounded-full" />
                </td>

                {/* Verification Status Skeleton */}
                <td className="px-6 py-5">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-stone-200" />
                    <div className="h-3 w-14 bg-stone-200 rounded" />
                  </div>
                </td>

                {/* Created Date Skeleton */}
                <td className="px-6 py-5">
                  <div className="h-4 w-20 bg-stone-200 rounded" />
                </td>

                {/* Actions Skeleton */}
                <td className="px-6 py-5 text-right">
                  <div className="flex justify-end gap-2">
                    <div className="w-8 h-8 bg-stone-100 rounded-lg" />
                    <div className="w-8 h-8 bg-stone-100 rounded-lg" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Skeleton */}
      <div className="px-6 py-4 bg-stone-50 flex items-center justify-between">
        <div className="h-4 w-32 bg-stone-200 rounded" />
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-stone-100 rounded-lg" />
          <div className="w-8 h-8 bg-stone-100 rounded-lg" />
          <div className="w-8 h-8 bg-stone-100 rounded-lg" />
          <div className="w-8 h-8 bg-stone-100 rounded-lg" />
          <div className="w-8 h-8 bg-stone-100 rounded-lg" />
          <div className="w-8 h-8 bg-stone-100 rounded-lg" />
        </div>
      </div>
    </div>
  );
}