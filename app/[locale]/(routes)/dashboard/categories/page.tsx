/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAdminCategories } from '@/app/actions/categoriesActions'
import { CategoriesClient } from '@/app/components/dashboard/Categories/CategoriesClient'

export const metadata = {
  title: 'Categories | Sanad Dashboard',
  description: 'Manage service and project categories',
}

export default async function CategoriesDashboardPage() {
  // Fetch initial data on the server
  let initialData = { data: [], meta: { page: 1, limit: 10, total: 0, lastPage: 1, perPage: 10 } };
  
  try {
    const response = await getAdminCategories({ page: 1 });
    initialData = response as any;
  } catch (error) {
    console.error("Failed to fetch initial categories data:", error);
    // Continue with empty default initialData if fetch fails
  }

  return (
    <div className="w-full  p-2 lg:p-6">
      <CategoriesClient initialData={initialData as any} />
    </div>
  )
}
