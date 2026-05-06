import { FiTrendingUp, FiStar } from "react-icons/fi";
import { MdTrendingFlat } from "react-icons/md";

export default function StatsGrid() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Subscriptions */}
      <div className="surface-card p-6 border-l-4 border-l-primary">
        <p className="text-xs font-medium uppercase tracking-widest text-surface-500 mb-1">
          Total Subscriptions
        </p>
        <div className="flex items-end justify-between">
          <h3 className="text-2xl font-bold text-surface-900">1,284</h3>
          <span className="text-emerald-600 text-xs font-bold flex items-center gap-0.5 mb-1">
            <FiTrendingUp className="text-sm" />
            12%
          </span>
        </div>
      </div>

      {/* Monthly Revenue */}
      <div className="surface-card p-6 border-l-4 border-l-amber-500">
        <p className="text-xs font-medium uppercase tracking-widest text-surface-500 mb-1">
          Monthly Revenue
        </p>
        <div className="flex items-end justify-between">
          <h3 className="text-2xl font-bold text-surface-900">$42,920</h3>
          <span className="text-emerald-600 text-xs font-bold flex items-center gap-0.5 mb-1">
            <FiTrendingUp className="text-sm" />
            8.4%
          </span>
        </div>
      </div>

      {/* Avg. Rating */}
      <div className="surface-card p-6 border-l-4 border-l-surface-400">
        <p className="text-xs font-medium uppercase tracking-widest text-surface-500 mb-1">
          Avg. Rating
        </p>
        <div className="flex items-end justify-between">
          <h3 className="text-2xl font-bold text-surface-900">4.82</h3>
          <div className="flex text-amber-500 mb-1">
            <FiStar className="text-sm fill-amber-500" />
            <FiStar className="text-sm fill-amber-500" />
            <FiStar className="text-sm fill-amber-500" />
            <FiStar className="text-sm fill-amber-500" />
            <FiStar className="text-sm" />
          </div>
        </div>
      </div>

      {/* Retention Rate */}
      <div className="surface-card p-6 border-l-4 border-l-surface-600">
        <p className="text-xs font-medium uppercase tracking-widest text-surface-500 mb-1">
          Retention Rate
        </p>
        <div className="flex items-end justify-between">
          <h3 className="text-2xl font-bold text-surface-900">94.2%</h3>
          <span className="text-primary text-xs font-bold flex items-center gap-0.5 mb-1">
            <MdTrendingFlat className="text-sm" />
            0%
          </span>
        </div>
      </div>
    </section>
  );
}