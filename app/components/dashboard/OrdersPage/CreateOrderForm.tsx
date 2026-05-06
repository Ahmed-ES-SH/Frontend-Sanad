"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Service } from "@/app/types/service";
import Image from "next/image";
import { useCreateOrder } from "@/app/hooks/useCreateOrder";

// Get published services - this would come from a hook or server action
async function getPublishedServices(): Promise<Service[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL || "https://sanad-backend.vercel.app"}/api/services`,
    );
    const data = await response.json();
    return data.data || [];
  } catch {
    return [];
  }
}

// Format currency
function formatCurrency(amount: string | number): string {
  const numAmount = typeof amount === "string" ? parseFloat(amount) : amount;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(numAmount);
}

export function CreateOrderForm() {
  const router = useRouter();
  const createOrderHook = useCreateOrder();

  const [services, setServices] = useState<Service[]>([]);
  const [isLoadingServices, setIsLoadingServices] = useState(true);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadServices() {
      try {
        const data = await getPublishedServices();
        setServices(data);
      } catch (error) {
        console.error("Failed to load services:", error);
      } finally {
        setIsLoadingServices(false);
      }
    }
    loadServices();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedService) return;

    setIsSubmitting(true);

    const result = await createOrderHook.createOrder(
      selectedService.id,
      notes || undefined,
    );

    setIsSubmitting(false);

    if (result.success) {
      router.push(`/dashboard/orders/${result.data?.id}`);
    } else {
      alert(result.message || "Failed to create order");
    }
  };

  if (isLoadingServices) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12 px-6 bg-gray-50 rounded-xl border border-gray-200"
      >
        <svg
          className="w-12 h-12 text-gray-400 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No services available
        </h3>
        <p className="text-gray-500">
          There are no services available at the moment. Please check back
          later.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Service Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Select a Service
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {services.map((service) => (
            <button
              key={service.id}
              type="button"
              onClick={() => setSelectedService(service)}
              className={`p-4 text-left rounded-xl border-2 transition-all ${
                selectedService?.id === service.id
                  ? "border-indigo-600 bg-indigo-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center gap-3">
                {service.iconUrl && (
                  <Image
                    src={service.iconUrl}
                    alt={service.title}
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 truncate">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-500 truncate">
                    {service.shortDescription}
                  </p>
                </div>
              </div>
              <p className="mt-2 text-lg font-semibold text-gray-900">
                {formatCurrency(service.basePrice)}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Notes */}
      <div>
        <label
          htmlFor="notes"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Notes (optional)
        </label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          maxLength={1000}
          placeholder="Add any special requirements or details..."
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors resize-none"
        />
        <p className="mt-1 text-xs text-gray-500">
          {notes.length}/1000 characters
        </p>
      </div>

      {/* Order Summary */}
      {selectedService && (
        <div className="p-4 bg-gray-50 rounded-xl">
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Order Summary
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-gray-900">{selectedService.title}</span>
            <span className="text-lg font-semibold text-gray-900">
              {formatCurrency(selectedService.basePrice)}
            </span>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!selectedService || isSubmitting}
        className="w-full px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isSubmitting ? "Creating Order..." : "Create Order"}
      </button>

      {createOrderHook.error && (
        <p className="text-sm text-red-600 text-center">
          {createOrderHook.error}
        </p>
      )}
    </form>
  );
}
