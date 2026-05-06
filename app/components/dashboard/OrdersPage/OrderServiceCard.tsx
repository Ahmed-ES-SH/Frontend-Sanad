"use client";

import Image from "next/image";
import { OrderService } from "@/app/types/order";
import { useTranslation } from "@/app/hooks/useTranslation";

interface OrderServiceCardProps {
  service: OrderService;
}

export function OrderServiceCard({ service }: OrderServiceCardProps) {
  const t = useTranslation("orderDetail");

  return (
    <div className="p-4 bg-white rounded-xl border border-gray-200">
      <h3 className="text-sm font-medium text-gray-500 mb-2">{t.service}</h3>
      <div className="flex items-center gap-3">
        {service.iconUrl && (
          <Image
            src={service.iconUrl}
            alt={service.title}
            className="w-12 h-12 rounded-lg object-cover"
            width={48}
            height={48}
          />
        )}
        <div>
          <h4 className="font-medium text-gray-900">{service.title}</h4>
          <p className="text-sm text-gray-500">{service.shortDescription}</p>
        </div>
      </div>
    </div>
  );
}
