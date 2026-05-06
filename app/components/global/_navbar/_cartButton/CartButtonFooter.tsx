import LocaleLink from "../../LocaleLink";

interface CartButtonFooterProps {
  isEmpty: boolean;
  totalAmount: number;
  t: Record<string, string>;
  handleClear: () => void;
  setIsOpen: (open: boolean) => void;
}

export default function CartButtonFooter({
  isEmpty,
  totalAmount,
  t,
  handleClear,
  setIsOpen,
}: CartButtonFooterProps) {
  return (
    <>
      {!isEmpty && (
        <div className="p-4 bg-gray-50/50 border-t border-gray-100">
          <div
            className={`flex justify-between items-center mb-4 rtl:flex-row-reverse ltr:flex-row`}
          >
            <span className="font-semibold text-gray-600 text-sm">
              {t.total}
            </span>
            <span className="font-bold text-lg text-primary">
              ${totalAmount.toLocaleString()}
            </span>
          </div>
          <div className={`flex gap-3 rtl:flex-row-reverse ltr:flex-row`}>
            <button
              onClick={handleClear}
              className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:text-red-600 transition-colors focus:ring-2 focus:ring-gray-200 outline-none cursor-pointer"
            >
              {t.clear}
            </button>
            <LocaleLink
              href="/cart"
              onClick={() => setIsOpen(false)}
              className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-primary rounded-xl hover:bg-primary/90 transition-colors focus:ring-2 focus:ring-primary/30 outline-none text-center shadow-md shadow-primary/20 block"
            >
              {t.checkout}
            </LocaleLink>
          </div>
        </div>
      )}
    </>
  );
}
