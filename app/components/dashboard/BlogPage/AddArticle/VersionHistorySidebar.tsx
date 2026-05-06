import { FiClock } from "react-icons/fi";

interface VersionHistorySidebarProps {
  versionHistory: string;
  versionHistoryDesc: string;
}

export default function VersionHistorySidebar({
  versionHistory,
  versionHistoryDesc,
}: VersionHistorySidebarProps) {
  return (
    <div className="surface-card p-6 bg-white border border-stone-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[0.7rem] font-bold text-stone-500 uppercase tracking-widest">
          {versionHistory}
        </h3>
        <FiClock className="text-stone-400" size={14} />
      </div>
      <p className="text-xs text-stone-500">{versionHistoryDesc}</p>
    </div>
  );
}