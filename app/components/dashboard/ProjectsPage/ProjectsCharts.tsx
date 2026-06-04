"use client";

import { motion, easeOut } from "framer-motion";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { TooltipContentProps } from "recharts/types/component/Tooltip";
import type {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import { useTranslation } from "@/app/hooks/useTranslation";

interface MonthlyDatum {
  monthKey: keyof ReturnType<typeof useMonthlyLabels>;
  total: number;
  published: number;
}

interface StatusDatum {
  key: "published" | "draft" | "featured";
  value: number;
  color: string;
}

interface CategoryDatum {
  key: "web" | "mobile" | "branding" | "ecommerce" | "saas" | "ai";
  value: number;
}

const monthlyData: MonthlyDatum[] = [
  { monthKey: "jan", total: 8, published: 5 },
  { monthKey: "feb", total: 12, published: 9 },
  { monthKey: "mar", total: 15, published: 11 },
  { monthKey: "apr", total: 10, published: 7 },
  { monthKey: "may", total: 18, published: 14 },
  { monthKey: "jun", total: 22, published: 17 },
  { monthKey: "jul", total: 26, published: 20 },
  { monthKey: "aug", total: 31, published: 25 },
];

const statusData: StatusDatum[] = [
  { key: "published", value: 98, color: "#10b981" },
  { key: "draft", value: 28, color: "#f59e0b" },
  { key: "featured", value: 16, color: "#f97316" },
];

const categoryData: CategoryDatum[] = [
  { key: "web", value: 42 },
  { key: "mobile", value: 28 },
  { key: "ecommerce", value: 24 },
  { key: "saas", value: 18 },
  { key: "branding", value: 16 },
  { key: "ai", value: 14 },
];

const categoryColors = [
  "#f97316",
  "#fb923c",
  "#fdba74",
  "#f59e0b",
  "#fcd34d",
  "#d97706",
];

function useMonthlyLabels() {
  return useTranslation("ProjectsPage.Charts.monthly");
}

function useCategoryLabels() {
  return useTranslation("ProjectsPage.Charts.categoryLabels");
}

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.1, ease: easeOut },
  }),
};

type ChartTooltipProps = TooltipContentProps<ValueType, NameType>;

function ChartTooltip(props: ChartTooltipProps) {
  const { active, payload, label } = props;
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="bg-white border border-stone-200 rounded-lg shadow-md px-3 py-2 text-xs">
      {label !== undefined && label !== "" && (
        <p className="font-semibold text-stone-900 mb-1">{String(label)}</p>
      )}
      {payload.map((entry, idx) => (
        <div key={idx} className="flex items-center gap-2 text-stone-700">
          <span
            className="inline-block w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="font-medium">{String(entry.name)}:</span>
          <span className="font-bold text-stone-900">
            {String(entry.value)}
          </span>
        </div>
      ))}
    </div>
  );
}

const renderTooltip = (props: ChartTooltipProps) => <ChartTooltip {...props} />;

export default function ProjectsCharts() {
  const t = useTranslation("ProjectsPage.Charts");
  const months = useMonthlyLabels();
  const categories = useCategoryLabels();

  const monthly = monthlyData.map((d) => ({
    name: months[d.monthKey],
    total: d.total,
    published: d.published,
  }));

  const status = statusData.map((d) => {
    const labelKey =
      d.key === "published"
        ? "legendPublished"
        : d.key === "draft"
          ? "legendDraft"
          : "legendFeatured";
    return {
      name: t[labelKey],
      value: d.value,
      color: d.color,
    };
  });

  const byCategory = categoryData.map((d) => ({
    name: categories[d.key],
    value: d.value,
  }));

  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      {/* Monthly trend — spans 2 cols on large screens */}
      <motion.div
        custom={0}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        className="lg:col-span-2 bg-white p-5 md:p-6 rounded-xl border border-stone-200"
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-base md:text-lg font-bold text-stone-900">
              {t.monthlyTitle}
            </h3>
            <p className="text-xs text-stone-500 mt-1">{t.monthlySubtitle}</p>
          </div>
        </div>
        <div className="h-64 -mx-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={monthly}
              margin={{ top: 8, right: 16, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="totalGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                </linearGradient>
                <linearGradient
                  id="publishedGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f4" />
              <XAxis
                dataKey="name"
                tick={{ fill: "#78716c", fontSize: 12 }}
                axisLine={{ stroke: "#e7e5e4" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#78716c", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                width={32}
              />
              <Tooltip content={renderTooltip} />
              <Area
                type="monotone"
                dataKey="total"
                name={t.tooltipProjects}
                stroke="#f97316"
                strokeWidth={2.5}
                fill="url(#totalGradient)"
              />
              <Area
                type="monotone"
                dataKey="published"
                name={t.legendPublished}
                stroke="#10b981"
                strokeWidth={2.5}
                fill="url(#publishedGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Status distribution donut */}
      <motion.div
        custom={1}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        className="bg-white p-5 md:p-6 rounded-xl border border-stone-200"
      >
        <h3 className="text-base md:text-lg font-bold text-stone-900">
          {t.statusTitle}
        </h3>
        <p className="text-xs text-stone-500 mt-1 mb-2">{t.statusSubtitle}</p>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip content={renderTooltip} />
              <Pie
                data={status}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={3}
                stroke="none"
              >
                {status.map((entry, idx) => (
                  <Cell key={idx} fill={entry.color} />
                ))}
              </Pie>
              <Legend
                verticalAlign="bottom"
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: 12, color: "#57534e" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* By category bar chart — full width row */}
      <motion.div
        custom={2}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        className="lg:col-span-3 bg-white p-5 md:p-6 rounded-xl border border-stone-200"
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-base md:text-lg font-bold text-stone-900">
              {t.categoryTitle}
            </h3>
            <p className="text-xs text-stone-500 mt-1">{t.categorySubtitle}</p>
          </div>
        </div>
        <div className="h-64 -mx-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={byCategory}
              margin={{ top: 8, right: 16, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f4" />
              <XAxis
                dataKey="name"
                tick={{ fill: "#78716c", fontSize: 12 }}
                axisLine={{ stroke: "#e7e5e4" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#78716c", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                width={32}
              />
              <Tooltip
                cursor={{ fill: "rgba(249,115,22,0.06)" }}
                content={renderTooltip}
              />
              <Bar
                dataKey="value"
                name={t.tooltipProjects}
                radius={[8, 8, 0, 0]}
                maxBarSize={56}
              >
                {byCategory.map((_, idx) => (
                  <Cell
                    key={idx}
                    fill={categoryColors[idx % categoryColors.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </section>
  );
}
