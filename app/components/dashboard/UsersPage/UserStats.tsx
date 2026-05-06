"use client";

import { FiUsers, FiShield, FiCheck, FiClock } from "react-icons/fi";
import { UserStatsResult } from "@/app/types/user";

// ============================================================================
// USER STATS - Displays real-time statistics from backend user data
// Accepts stats object from server-side calculations
// ============================================================================

interface UserStatsProps {
  stats: UserStatsResult;
  total: number;
}

export default function UserStats({ stats, total }: UserStatsProps) {
  // Use pre-calculated stats from server
  const totalUsers = stats.totalUsers;
  const adminCount = stats.adminsCount;
  const verifiedCount = stats.verifiedUsersNumber;
  const pendingCount = stats.unverifiedUsersNumber;

  const statsCards = [
    {
      label: "Total Users",
      value: totalUsers.toString(),
      change: `${adminCount} admin${adminCount !== 1 ? "s" : ""}`,
      isPositive: null as boolean | null,
      icon: FiUsers,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      label: "Administrators",
      value: adminCount.toString(),
      change: `${((adminCount / Math.max(totalUsers, 1)) * 100).toFixed(0)}% of total`,
      isPositive: null as boolean | null,
      icon: FiShield,
      iconBg: "bg-sky-100",
      iconColor: "text-sky-600",
    },
    {
      label: "Verified",
      value: verifiedCount.toString(),
      change: pendingCount > 0 ? `${pendingCount} pending verification` : "All verified",
      isPositive: pendingCount === 0,
      icon: FiCheck,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {statsCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-sm flex items-center justify-between group transition-all hover:bg-stone-50 hover:shadow-md"
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-1">
                {stat.label}
              </p>
              <h3 className="text-3xl font-extrabold text-stone-900">
                {stat.value}
              </h3>
              <p
                className={`text-xs font-medium flex items-center gap-1 mt-2 ${
                  stat.isPositive === true
                    ? "text-green-600"
                    : stat.isPositive === false
                      ? "text-amber-600"
                      : "text-stone-500"
                }`}
              >
                {stat.isPositive === false && <FiClock className="text-sm" />}
                {stat.change}
              </p>
            </div>
            <div
              className={`w-12 h-12 rounded-full ${stat.iconBg} flex items-center justify-center ${stat.iconColor} group-hover:bg-orange-500 group-hover:text-white transition-colors`}
            >
              <Icon size={24} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
