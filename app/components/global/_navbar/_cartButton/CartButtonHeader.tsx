import React from "react";
import { MdClose } from "react-icons/md";

interface CartButtonHeaderProps {
  onClose: () => void;
  totalItems: number;
  t: Record<string, string>;
}

export default function CartButtonHeader({
  onClose,
  totalItems,
  t,
}: CartButtonHeaderProps) {
  return (
    <div
      className={`p-4 border-b border-gray-100 flex justify-between items-center bg-white rtl:flex-row-reverse ltr:flex-row`}
    >
      <h3 className="font-semibold text-(--on-surface) text-base">
        {t.title} ({totalItems})
      </h3>
      <button
        onClick={onClose}
        className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
      >
        <MdClose size={20} />
      </button>
    </div>
  );
}
