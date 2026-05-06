import { FaStar } from "react-icons/fa";

export default function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <FaStar
          key={i}
          className="text-base drop-shadow-sm"
          style={{
            color: i < rating ? "var(--accent-amber)" : "var(--surface-200)",
          }}
        />
      ))}
    </div>
  );
}
