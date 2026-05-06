"use client";
import { ACCOUNT_MENU_LINKS } from "@/app/constants/navbar";
import LocaleLink from "../LocaleLink";
import { User } from "@/app/types/user";

interface AccountMenuLinksProps {
  user: User | null;
  setIsOpen: (value: boolean) => void;
  t: Record<string, string>;
}

export default function AccountMenuLinks({
  user,
  setIsOpen,
  t,
}: AccountMenuLinksProps) {
  return (
    <div className="space-y-0.5">
      {ACCOUNT_MENU_LINKS.filter((item) => {
        if (!item.roles) return true;

        return user?.role && item.roles.includes(user.role);
      }).map((item) => {
        const Icon = item.icon;

        return (
          <LocaleLink
            key={item.key}
            href={item.href}
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-surface-600 hover:text-primary hover:bg-primary/5 rounded-xl transition-all duration-200"
          >
            <div className="w-8 h-8 rounded-lg bg-surface-100 flex items-center justify-center text-surface-500 transition-colors group-hover:bg-primary/10 group-hover:text-primary">
              <Icon size={18} />
            </div>

            <span>{t[item.label as keyof typeof t] ?? item.label}</span>
          </LocaleLink>
        );
      })}
    </div>
  );
}
