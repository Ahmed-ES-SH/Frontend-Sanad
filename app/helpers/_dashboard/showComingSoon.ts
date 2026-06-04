import { toast } from "sonner";

/**
 * Display a "Coming Soon" toast notification
 * @param featureName - Optional feature name to display in the toast
 */
export const showComingSoon = (featureName?: string) => {
  const message = featureName
    ? `${featureName} is coming soon! 🚀`
    : "This feature is coming soon! 🚀";

  toast.info(message, {
    duration: 3000,
    description: "We're working on bringing you this amazing feature.",
  });
};
