"use client";
import { useCartStore } from "@/app/store/CartSlice";
import Image from "next/image";
import { GrCart } from "react-icons/gr";
import { MdDeleteOutline } from "react-icons/md";

interface ItemsListProps {
  t: Record<string, string>;
}

export default function ItemsList({ t }: ItemsListProps) {
  const { items, remove } = useCartStore();

  // Use backend cart items directly
  const displayItems = items;
  const isEmpty = items.length === 0;

  const handleRemove = (itemId?: string, serviceId?: string) => {
    void remove({ itemId: itemId ?? "", serviceId });
  };

  return (
    <div className="max-h-[50vh] overflow-y-auto bg-white custom-scrollbar">
      {isEmpty ? (
        <div className="p-8 pb-10 text-center flex flex-col items-center justify-center text-gray-400">
          <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-3">
            <GrCart className="size-8 opacity-20" />
          </div>
          <p className="text-sm font-medium">{t.empty}</p>
        </div>
      ) : (
        <div className="divide-y divide-gray-50">
          {displayItems.map((item) => (
            <div
              key={item.id}
              className={`p-4 hover:bg-gray-50 transition-colors flex gap-4 group rtl:flex-row-reverse ltr:flex-row`}
            >
              {/* Image / Icon */}
              {item.serviceImageUrl ? (
                <div className="w-16 h-16 rounded-xl bg-gray-100 shrink-0 overflow-hidden border border-gray-200/50">
                  <Image
                    src={item.serviceImageUrl}
                    alt={item.serviceTitle || "Cart item"}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-16 h-16 rounded-xl bg-primary/5 shrink-0 flex items-center justify-center text-primary/40 font-bold border border-primary/10">
                  {(item.serviceTitle?.charAt(0) || "?").toUpperCase()}
                </div>
              )}

              {/* Content */}
              <div
                className={`flex-1 min-w-0 flex flex-col justify-center rtl:text-right ltr:text-left`}
              >
                <h4 className="text-sm font-semibold text-(--on-surface) truncate">
                  {item.serviceTitle}
                </h4>

                <div
                  className={`flex justify-between items-center mt-2.5 rtl:flex-row-reverse ltr:flex-row`}
                >
                  <span className="text-sm font-bold text-primary">
                    ${item?.unitPrice?.toLocaleString()} × {item.quantity}
                  </span>

                  <button
                    onClick={() => handleRemove(item.id, item.serviceId)}
                    className={`text-xs text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1 opacity-0 group-hover:opacity-100 focus:opacity-100 cursor-pointer rtl:flex-row-reverse ltr:flex-row`}
                    aria-label="Remove item"
                  >
                    <MdDeleteOutline size={16} />
                    <span className="hidden sm:inline">{t.remove}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
