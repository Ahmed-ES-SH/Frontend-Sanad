import AddServiceContent from "@/app/components/dashboard/AddService/AddServiceContent";

export default function NewServicePage() {
  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      <main className="flex-1 overflow-y-auto">
        <AddServiceContent />
      </main>
    </div>
  );
}
