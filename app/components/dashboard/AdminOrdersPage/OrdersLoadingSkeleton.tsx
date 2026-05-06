"use client";

import React from "react";

export function OrdersLoadingSkeleton() {
  return (
    <div className="p-6">
      <div className="animate-pulse space-y-4">
        {/* Table header */}
        <div className="grid grid-cols-7 gap-4 pb-4 border-b border-surface-100">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="h-4 bg-surface-100 rounded" />
          ))}
        </div>
        {/* Table rows */}
        {[...Array(5)].map((_, i) => (
          <div key={i} className="grid grid-cols-7 gap-4 py-4">
            {[...Array(7)].map((_, j) => (
              <div key={j} className="h-8 bg-surface-50 rounded" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}