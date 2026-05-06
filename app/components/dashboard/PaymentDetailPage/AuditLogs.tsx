"use client";

import { useState } from "react";
import { FiChevronDown, FiChevronUp, FiDatabase } from "react-icons/fi";
import { AuditLogEntry } from "../PaymentsPage/payments-types";

interface AuditLogsProps {
  logs: AuditLogEntry[];
}

const levelStyles: Record<AuditLogEntry["level"], string> = {
  INFO: "bg-stone-200 text-stone-700",
  DEBUG: "bg-blue-100 text-blue-700",
  WARN: "bg-amber-100 text-amber-700",
  ERROR: "bg-red-100 text-red-700",
};

export default function AuditLogs({ logs }: AuditLogsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (logs.length === 0) return null;

  return (
    <footer className="bg-white rounded-xl border border-stone-200 overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-stone-50 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:ring-inset"
        aria-expanded={isExpanded}
        aria-controls="audit-logs-content"
      >
        <h3 className="text-xs font-bold text-stone-500 uppercase tracking-widest flex items-center gap-2">
          <FiDatabase className="w-4 h-4" />
          System Audit Logs
          <span className="text-stone-400 font-normal normal-case tracking-normal">
            ({logs.length} {logs.length === 1 ? "entry" : "entries"})
          </span>
        </h3>
        {isExpanded ? (
          <FiChevronUp size={16} className="text-stone-400" />
        ) : (
          <FiChevronDown size={16} className="text-stone-400" />
        )}
      </button>

      {isExpanded && (
        <div id="audit-logs-content" className="px-6 pb-4 space-y-2">
          {logs.map((log, index) => (
            <div
              key={index}
              className="flex items-center gap-3 text-xs font-mono text-stone-500 bg-stone-50 p-2.5 rounded-lg"
            >
              <span className="font-bold text-orange-600 shrink-0">
                {log.timestamp}
              </span>
              <span
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold shrink-0 ${levelStyles[log.level]}`}
              >
                {log.level}
              </span>
              <span className="truncate">{log.message}</span>
            </div>
          ))}
        </div>
      )}
    </footer>
  );
}
