import NotificationBell from "../../website/notifications/NotificationBell";
import { getCurrentUserAction } from "@/app/actions/authActions";
import LocaleLink from "../LocaleLink";
import CartButton from "./CartButton";
import ClientDiv from "./ClientDiv";
import Joinbtn from "./Joinbtn";
import MobileSidebar from "./MobileSidebar";
import NavLinks from "./NavLinks";
import SelectLanguage from "./SelectLanguage";
import Image from "next/image";

export default async function Navbar() {
  const currentUser = await getCurrentUserAction();
  const initialUser = currentUser.success ? (currentUser.user ?? null) : null;

  return (
    <ClientDiv initialUser={initialUser}>
      <div className="c-container h-full xl:grid flex justify-between xl:grid-cols-2 2xl:grid-cols-3 items-center">
        {/* Left: Logo */}
        <div className="flex items-center justify-between">
          <LocaleLink href={"/"} className="relative block">
            <Image
              src="/sanad-logo.png"
              className={`object-contain transition-all duration-500 xl:w-14 w-11 scale-100 hover:scale-110 active:scale-90`}
              alt="Sanad Logo"
              priority
              width={200}
              height={200}
            />
          </LocaleLink>

          {/* Middle: Navigation Links (Perfectly Centered) */}
          <nav className="2xl:hidden xl:flex hidden items-center justify-center h-full">
            <NavLinks />
          </nav>
        </div>

        {/* Middle: Navigation Links (Perfectly Centered) */}
        <nav className="hidden 2xl:flex  items-center justify-center h-full">
          <NavLinks />
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center justify-end md:gap-2 gap-1">
          {/* notification bell */}
          <NotificationBell />

          {/* cart button */}
          <CartButton />

          {/* join button and user button */}
          <Joinbtn />

          {/* separator */}
          <div className="w-px h-6 bg-surface-200 hidden md:block" />

          {/* language selector and mobile sidebar */}
          <div className="flex items-center gap-2">
            <SelectLanguage />
            <MobileSidebar />
          </div>
        </div>
      </div>
    </ClientDiv>
  );
}
