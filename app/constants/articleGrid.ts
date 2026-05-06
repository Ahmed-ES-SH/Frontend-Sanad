// Article Grid Constants
// Status configurations, animation variants, date formats, and utility defaults

export interface StatusConfig {
  status: string;
  statusColor: string;
  translationKey: string;
}

export const ARTICLE_STATUS: Record<string, StatusConfig> = {
  published: {
    status: "Published",
    statusColor: "bg-green-500",
    translationKey: "published",
  },
  draft: {
    status: "Draft",
    statusColor: "bg-stone-400",
    translationKey: "draft",
  },
} as const;

export const ANIMATION_CONFIG = {
  cardHover: {
    y: -4,
  },
  imageHover: {
    scale: 1.05,
  },
  transitionDuration: 0.5,
} as const;

export const ARTICLE_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.7 + i * 0.1,
      duration: 0.5,
      ease: [0.25, 1, 0.5, 1] as const,
    },
  }),
} as const;

export const DATE_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  day: "2-digit",
  month: "short",
  year: "numeric",
} as const;

export const FALLBACK_IMAGE_URL =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23f5f5f4' width='400' height='300'/%3E%3Ctext fill='%23a8a29e' font-family='sans-serif' font-size='16' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3EImage%20unavailable%3C/text%3E%3C/svg%3E";

export const LOADING_CONFIG = {
  timeout: 400,
} as const;

export const CARD_DIMENSIONS = {
  imageHeight: 48,
  excerptMaxLines: 2,
  avatarSize: 6,
  authorNameMaxWidth: 100,
} as const;

export const DEFAULT_VALUES = {
  categoryName: "Uncategorized",
  excerpt: "No summary provided for this article...",
  authorName: "Admin",
  viewsCount: 0,
  readTimeMinutes: 0,
} as const;