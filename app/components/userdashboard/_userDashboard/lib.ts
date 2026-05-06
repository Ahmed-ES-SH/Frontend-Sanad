import { toast } from "sonner";

/** Show a "Coming Soon" toaster notification for placeholder actions. */
export function comingSoon(actionName: string) {
  toast.info(`\u{1F6E0} ${actionName} \u2014 Coming Soon`);
}

/** Helper for buttons that are placeholders: prevents navigation jump. */
export function preventNav(e: React.MouseEvent) {
  e.preventDefault();
}
