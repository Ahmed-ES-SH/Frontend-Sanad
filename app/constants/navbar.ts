import {
  FaBlog,
  FaEnvelope,
  FaHome,
  FaInfoCircle,
  FaProjectDiagram,
  FaServicestack,
} from "react-icons/fa";
import { FiBell, FiCreditCard, FiList, FiUser } from "react-icons/fi";
import { IconType } from "react-icons/lib";
import { LuLayoutDashboard } from "react-icons/lu";

export const navLinks = [
  {
    text: { en: "Home", ar: "الرئيسية" },
    link: "/",
    icon: FaHome,
  },
  {
    text: { en: "About", ar: "من نحن" },
    link: "/about",
    icon: FaInfoCircle,
  },
  {
    text: { en: "Services", ar: "خدماتنا" },
    link: "/services",
    icon: FaServicestack,
  },
  {
    text: { en: "Portfolio", ar: "أعمالنا" },
    link: "/portfolio",
    icon: FaProjectDiagram,
  },
  {
    text: { en: "Blog", ar: "المدونة" },
    link: "/blog",
    icon: FaBlog,
  },
  {
    text: { en: "Contact Us", ar: "تواصل معنا" },
    link: "/contact",
    icon: FaEnvelope,
  },
];

type AccountMenuItem = {
  key: string;
  href: string;
  label: string;
  icon: IconType;
  roles?: string[];
};

export const ACCOUNT_MENU_LINKS: AccountMenuItem[] = [
  {
    key: "dashboard",
    href: "/dashboard",
    label: "dashboard",
    icon: LuLayoutDashboard,
    roles: ["admin"],
  },
  {
    key: "profile",
    href: "/userdashboard",
    label: "profile",
    icon: FiUser,
  },
  {
    key: "payments",
    href: "/userdashboard/payments",
    label: "payments",
    icon: FiCreditCard,
  },
  {
    key: "orders",
    href: "/userdashboard/orders",
    label: "orders",
    icon: FiList,
  },
  {
    key: "notifications",
    href: "/notifications",
    label: "notifications",
    icon: FiBell,
  },
] as const;
