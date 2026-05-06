interface CollaboratorsSidebarProps {
  collaborators: string;
  collaboratorsDesc: string;
}

export default function CollaboratorsSidebar({
  collaborators,
  collaboratorsDesc,
}: CollaboratorsSidebarProps) {
  return (
    <div className="surface-card p-6 bg-stone-100/50 border border-stone-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[0.7rem] font-bold text-stone-500 uppercase tracking-widest">
          {collaborators}
        </h3>
      </div>
      <p className="text-xs text-stone-500">{collaboratorsDesc}</p>
    </div>
  );
}