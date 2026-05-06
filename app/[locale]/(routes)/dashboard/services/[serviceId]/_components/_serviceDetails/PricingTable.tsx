export default function PricingTable() {
  return (
    <div className="surface-card overflow-hidden">
      <div className="p-6 bg-surface-100 flex justify-between items-center border-b border-surface-200">
        <h3 className="font-bold text-lg text-surface-900 font-display">Pricing & Plans</h3>
        <span className="text-xs font-bold text-primary bg-primary-100 px-3 py-1 rounded-full uppercase tracking-wider">
          3 Active Tiers
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-xs font-medium uppercase text-surface-500 bg-surface-50">
              <th className="px-6 py-4 font-bold">Plan Tier</th>
              <th className="px-6 py-4 font-bold">Monthly Cost</th>
              <th className="px-6 py-4 font-bold">Subscribers</th>
              <th className="px-6 py-4 font-bold">Key Features</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-100">
            <tr className="hover:bg-surface-50 transition-colors">
              <td className="px-6 py-5 font-bold text-surface-900">Starter</td>
              <td className="px-6 py-5 font-medium">$499</td>
              <td className="px-6 py-5">428</td>
              <td className="px-6 py-5 text-sm text-surface-600">
                Single Region, 24/7 Monitoring
              </td>
            </tr>
            <tr className="bg-primary-50 hover:bg-primary-50 transition-colors">
              <td className="px-6 py-5 font-bold text-primary flex items-center gap-2">
                Pro
                <span className="text-[10px] bg-primary text-white px-1.5 py-0.5 rounded font-medium">
                  MOST POPULAR
                </span>
              </td>
              <td className="px-6 py-5 font-medium">$1,299</td>
              <td className="px-6 py-5">712</td>
              <td className="px-6 py-5 text-sm text-surface-600">
                Multi-Region, Auto-Scaling, DB Mgmt
              </td>
            </tr>
            <tr className="hover:bg-surface-50 transition-colors">
              <td className="px-6 py-5 font-bold text-surface-900">Enterprise</td>
              <td className="px-6 py-5 font-medium">Custom</td>
              <td className="px-6 py-5">144</td>
              <td className="px-6 py-5 text-sm text-surface-600">
                Dedicated Support, Global CDN, SLA
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}