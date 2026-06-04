import { FiAlertCircle } from "react-icons/fi";
import { motion } from "framer-motion";

interface ErrorMessageProps {
  message: string | null;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null;

  return (
    <motion.div
      role="alert"
      aria-live="polite"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
    >
      <FiAlertCircle
        size={16}
        className="mt-0.5 shrink-0 text-red-500"
        aria-hidden="true"
      />
      <span className="leading-snug">{message}</span>
    </motion.div>
  );
}
