"use client";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center page-bg">
      <div className="w-full sm:max-w-md">
        <div
          className="surface-card"
          style={{
            padding: "clamp(16px, 4vw, 32px)",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
