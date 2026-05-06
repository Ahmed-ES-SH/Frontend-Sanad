export interface ParsedPaymentDate {
  date: string;
  time: string;
  timestamp: Date;
}

/**
 * Parses an ISO date string into display format (date and time).
 */
export const parsePaymentDate = (isoDate: string): ParsedPaymentDate => {
  const dateObj = new Date(isoDate);

  const date = dateObj.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const time = dateObj.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return { date, time, timestamp: dateObj };
};