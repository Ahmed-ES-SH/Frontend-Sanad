import { getCategories } from "@/app/actions/blogActions";
import AddNewProject from "@/app/components/dashboard/ProjectsPage/AddNewProject";

export default async function AddNewProjectPage() {
  const categories = await getCategories();

  return (
    <>
      <main className="flex-1 overflow-y-auto">
        <AddNewProject categories={categories} />
      </main>
    </>
  );
}
