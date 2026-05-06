"use client";

import { useTranslation } from "@/app/hooks/useTranslation";
import { motion } from "framer-motion";

//////////////////////////////////////////////////////
///////  Activity item interface for the recent activity timeline
//////////////////////////////////////////////////////
interface ActivityItem {
  titleKey: string;
  descriptionKey: string;
  time: string;
  dotColor: string;
  ringColor: string;
}

const activities: ActivityItem[] = [
  {
    titleKey: "newProjectSigned",
    descriptionKey: "skylineTower",
    time: "14 mins ago",
    dotColor: "bg-orange-500",
    ringColor: "bg-orange-100",
  },
  {
    titleKey: "paymentReceived",
    descriptionKey: "invoice9012",
    time: "2 hours ago",
    dotColor: "bg-stone-400",
    ringColor: "bg-stone-100",
  },
  {
    titleKey: "projectStatusUpdated",
    descriptionKey: "villaK92Moved",
    time: "5 hours ago",
    dotColor: "bg-amber-600",
    ringColor: "bg-amber-100",
  },
];

export default function RecentActivity() {
  const t = useTranslation("DashboardPage.RecentActivity");
  const isEmpty = activities.length === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" as const }}
      className="bg-white p-5 rounded-2xl border border-stone-200"
    >
      {isEmpty ? (
        <div className="py-8 text-center">
          <p className="text-stone-500 text-sm">{t.emptyMessage}</p>
        </div>
      ) : (
        <>
          <h3 className="text-lg font-semibold text-stone-900 mb-5">
            {t.title}
          </h3>
          <div className="relative space-y-5 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-stone-100">
            {activities.map((activity, index) => (
              <div key={index} className="relative pl-8">
                <div
                  className={`absolute left-0 top-1 w-5 h-5 rounded-full ${activity.ringColor} border-2 border-white z-10`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${activity.dotColor} m-auto mt-1`}
                  />
                </div>
                <p className="text-xs font-medium text-stone-900">
                  {activity.titleKey}
                </p>
                <p className="text-[11px] text-stone-500 mt-0.5">
                  {activity.descriptionKey}
                </p>
                <p className="text-[10px] text-stone-400 mt-1">
                  {activity.time}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </motion.div>
  );
}
