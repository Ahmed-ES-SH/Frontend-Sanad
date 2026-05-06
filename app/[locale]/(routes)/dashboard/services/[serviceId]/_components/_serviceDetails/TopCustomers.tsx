import Image from "next/image";

interface Customer {
  name: string;
  plan: string;
  duration: string;
  revenue: string;
  avatar: string;
}

const customers: Customer[] = [
  {
    name: "NexGen Solutions",
    plan: "Enterprise Plan",
    duration: "2y",
    revenue: "$12.4k/mo",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBCAsorwBNxNE6ExbBkhUtDJUBgkxsxNraPGOz2A5DBGHQWg-qmt6ofI98x7Ia-G5qwECZihsCiCMJH_qVamPT_mIwX_Gx2iaE78FDbGEUBVaCdwPRdVita0BU88GzKYQ4xQNWOY08v5IsM5fUZHlT44F1w35vj1nRH3tHR0W8gIsXepAh9-5f89EpSJcJPZAbKx5pxr04kzEcSn4MGB-KAinbWvCHInpFYNd6CinK8lEG9qjnr5vhhN6j1JttyCWlF06WY0hcMZpai",
  },
  {
    name: "Aura FinTech",
    plan: "Pro Plan",
    duration: "14m",
    revenue: "$1.3k/mo",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBtk9YeZoaW04l5DJurFHwBi3nO09Efq4jOPRIyUxxwXFClN5K9AuQEkfh4rDSuCsPjVX62aA8pMgMIgkVQuvqcK7KERlBmj5QS1Ivd-VyRuujuFBhx-pYYSCPTTCP0VGJsavnH8p3EuauCJa8ekEsGJI-qA8W0mOAgsAvS82frztAQn-pKORvXQ1WylQJJuBoJIxC4od1ymjc82C3FCY5F8LAyPaVNv687I_TCM7av9XAXJcL92dz0VlmG0dPncDYm-iTXz3WstYFH",
  },
  {
    name: "Studio Blue",
    plan: "Pro Plan",
    duration: "8m",
    revenue: "$1.3k/mo",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBpJxvOkAT8mgexkErEaDpFUtr5W55Xnb7LQLIMazVM7Cux9zgkZEwPFBZ7jqaV1QfUboV5S-WHY-nEG7fdzG-QKaJDPEWVBbj9PBKRqJljYc4ojtC0T39K1AsUtosjwkw_KPc7PONv9Ky3816SQUEFpKRAOWEJPuQMaRT7X-K9jtUVK-xbD2n4Y-T7VlQIK3j1bkd4QsYOYjKQLZHP05ldVZ9IZCrLpXWy9XSXw9KL9YvcJ5XrX9ItP0jB3QcefnYvKvW5Hw-Ujh0Y",
  },
];

export default function TopCustomers() {
  return (
    <div className="surface-card-subtle p-6">
      <h3 className="font-bold text-lg mb-6 font-display">Top Customers</h3>
      <div className="space-y-6">
        {customers.map((customer) => (
          <div key={customer.name} className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-surface-200 border-2 border-white shadow-sm overflow-hidden flex-shrink-0">
              <Image
                src={customer.avatar}
                alt={customer.name}
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-surface-900">{customer.name}</p>
              <p className="text-xs text-surface-500">
                {customer.plan} • {customer.duration}
              </p>
            </div>
            <span className="text-sm font-bold text-primary">{customer.revenue}</span>
          </div>
        ))}
      </div>
      <button className="w-full mt-6 py-2 text-sm font-bold text-primary hover:bg-primary-50 rounded-lg transition-colors border border-transparent hover:border-primary-200">
        View All Customers
      </button>
    </div>
  );
}