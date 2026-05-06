export default function CustomerAdoptionChart() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const data = [40, 60, 55, 85, 75, 95];

  return (
    <div className="surface-card p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="font-bold text-lg text-surface-900 font-display">Customer Adoption</h3>
          <p className="text-sm text-surface-500 font-body">Growth in new subscriptions (Last 6 Months)</p>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1 text-xs font-bold rounded bg-surface-200 text-surface-900">
            6M
          </button>
          <button className="px-3 py-1 text-xs font-medium rounded text-surface-500 hover:bg-surface-100">
            1Y
          </button>
        </div>
      </div>

      {/* Chart bars */}
      <div className="relative h-64 w-full flex items-end gap-4 px-2">
        {data.map((height, index) => (
          <div
            key={index}
            className="flex-1 bg-gradient-to-t from-primary-100 to-primary rounded-t-lg"
            style={{ height: `${height}%` }}
          />
        ))}
      </div>

      {/* X-axis labels */}
      <div className="flex justify-between mt-4 px-2 text-xs font-bold text-surface-500">
        {months.map((month) => (
          <span key={month}>{month}</span>
        ))}
      </div>
    </div>
  );
}