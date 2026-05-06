"use client";

interface ProjectSkeletonRowProps {
  index: number;
}

export default function ProjectSkeletonRow({ index }: ProjectSkeletonRowProps) {
  return (
    <tr key={`skeleton-${index}`} className="bg-white">
      <td className="py-4 px-6">
        <div className="flex items-center gap-4 animate-pulse">
          <div className="w-12 h-12 rounded-lg bg-stone-200 flex-shrink-0"></div>
          <div className="space-y-2 flex-1">
            <div className="h-4 bg-stone-200 rounded w-32"></div>
            <div className="h-3 bg-stone-100 rounded w-48"></div>
          </div>
        </div>
      </td>
      <td className="py-4 px-6">
        <div className="w-24 h-6 bg-stone-200 rounded-full animate-pulse"></div>
      </td>
      <td className="py-4 px-6">
        <div className="w-20 h-6 bg-stone-200 rounded-full animate-pulse"></div>
      </td>
      <td className="py-4 px-6">
        <div className="w-8 h-8 bg-stone-200 rounded-md animate-pulse"></div>
      </td>
      <td className="py-4 px-6 text-end">
        <div className="flex items-center justify-end gap-2 animate-pulse">
          <div className="w-8 h-8 bg-stone-200 rounded-lg"></div>
          <div className="w-8 h-8 bg-stone-200 rounded-lg"></div>
        </div>
      </td>
    </tr>
  );
}