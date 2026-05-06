"use client";

import Link from "next/link";
import { FiPlus } from "react-icons/fi";

interface NewProjectButtonProps {
  className?: string;
}

export default function NewProjectButton({ className = "" }: NewProjectButtonProps) {
  return (
    <Link
      href="/dashboard/addproject"
      className={`flex items-center justify-center gap-2 px-6 py-2 rounded-lg text-white font-medium text-sm shadow-button transition-transform hover:scale-[1.02] active:scale-[0.98] ${className}`}
      style={{ background: "var(--gradient-primary)" }}
    >
      <FiPlus className="w-4 h-4" />
      <span>New Project</span>
    </Link>
  );
}