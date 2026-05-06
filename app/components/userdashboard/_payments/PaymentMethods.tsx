"use client";
import { FiCreditCard, FiPlusCircle, FiShield } from "react-icons/fi";
import { Messages } from "@/app/hooks/useTranslation";
import { comingSoon } from "../_userDashboard/lib";

interface PaymentMethodsProps {
  t: Messages["payments"];
}

export default function PaymentMethods({ t }: PaymentMethodsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">
          {t.methods.title}
        </h2>
        <span className="text-xs text-orange-600 font-semibold cursor-pointer hover:underline">
          {t.methods.manageAll}
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Visa Card - Default */}
        <div className="bg-stone-100 p-6 rounded-xl border border-stone-200/50 flex flex-col justify-between h-44 relative group transition-all hover:border-orange-500/50">
          <div className="flex justify-between items-start">
            <FiCreditCard
              className="text-2xl text-muted-foreground"
              aria-hidden="true"
            />
            <span className="text-[10px] bg-orange-600 text-white px-2 py-0.5 rounded-full font-semibold">
              {t.methods.defaultBadge}
            </span>
          </div>
          <div className="mt-auto">
            <p className="text-lg font-semibold tracking-widest text-foreground">
              •••• •••• •••• 4242
            </p>
            <div className="flex justify-between items-end mt-2">
              <div>
                <p className="text-[10px] uppercase text-muted-foreground font-medium">
                  {t.methods.expiryLabel}
                </p>
                <p className="text-sm font-semibold">04/26</p>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1 bg-blue-600 rounded text-white">
                <FiShield className="text-xs" aria-hidden="true" />
                <span className="text-xs font-bold tracking-wider">
                  {t.methods.visa}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Mastercard */}
        <div className="bg-white p-6 rounded-xl border border-stone-200/50 flex flex-col justify-between h-44 group transition-all hover:bg-stone-50">
          <div className="flex justify-between items-start">
            <FiCreditCard
              className="text-2xl text-muted-foreground"
              aria-hidden="true"
            />
            <button
              className="text-xs text-muted-foreground font-semibold hover:text-orange-600 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded px-1"
              aria-label={t.methods.setAsDefaultAria}
            >
              {t.methods.setAsDefault}
            </button>
          </div>
          <div className="mt-auto">
            <p className="text-lg font-semibold tracking-widest text-foreground">
              •••• •••• •••• 8812
            </p>
            <div className="flex justify-between items-end mt-2">
              <div>
                <p className="text-[10px] uppercase text-muted-foreground font-medium">
                  {t.methods.expiryLabel}
                </p>
                <p className="text-sm font-semibold">09/25</p>
              </div>
              <div className="flex items-center gap-1 px-2 py-1 bg-stone-800 rounded text-white">
                <span className="text-[10px] font-bold tracking-wider">
                  {t.methods.mc}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Add New Card */}
        <button
          onClick={() => comingSoon(t.methods.addNewMethod)}
          className="border-2 border-dashed border-stone-300/50 rounded-xl h-44 flex flex-col items-center justify-center text-muted-foreground hover:border-orange-500/50 hover:text-orange-600 transition-all bg-white/50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          aria-label={t.methods.addNewMethodAria}
        >
          <FiPlusCircle className="text-3xl mb-2" aria-hidden="true" />
          <span className="text-sm font-semibold">
            {t.methods.addNewMethod}
          </span>
        </button>
      </div>
    </div>
  );
}
