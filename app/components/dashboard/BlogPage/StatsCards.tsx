"use client";

import { StatsCard } from "./StatsCard";
import {
  HiOutlineDocumentText,
  HiOutlineEye,
  HiOutlineClock,
  HiOutlineChatAlt,
} from "react-icons/hi";
import { useTranslation } from "@/app/hooks/useTranslation";

export function StatsCards() {
  const t = useTranslation("BlogPage.StatsCards");

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <StatsCard
        icon={HiOutlineDocumentText}
        iconBg="bg-orange-50"
        iconColor="text-orange-600"
        changeValue="+12%"
        changeBg="bg-green-100"
        changeText="text-green-600"
        label={t.totalPosts}
        value="1,284"
        borderColor="border-b-2 border-orange-200"
        delay={0}
      />
      <StatsCard
        icon={HiOutlineEye}
        iconBg="bg-orange-50"
        iconColor="text-orange-600"
        changeValue="+24%"
        changeBg="bg-green-100"
        changeText="text-green-600"
        label={t.totalViews}
        value="42.5k"
        borderColor="border-b-2 border-orange-200"
        delay={0.1}
      />
      <StatsCard
        icon={HiOutlineClock}
        iconBg="bg-amber-50"
        iconColor="text-amber-600"
        changeValue="-2%"
        changeBg="bg-red-100"
        changeText="text-red-600"
        label={t.avgReadingTime}
        value="4:12m"
        borderColor="border-b-2 border-amber-200"
        delay={0.2}
      />
      <StatsCard
        icon={HiOutlineChatAlt}
        iconBg="bg-amber-50"
        iconColor="text-amber-600"
        changeValue="New"
        changeBg="bg-green-100"
        changeText="text-green-600"
        label={t.newComments}
        value="86"
        borderColor="border-b-2 border-amber-200"
        delay={0.3}
      />
    </div>
  );
}
