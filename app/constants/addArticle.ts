import type { IconType } from "react-icons";

import {
  FiBold,
  FiItalic,
  FiUnderline,
  FiAlignLeft,
  FiAlignCenter,
  FiAlignRight,
  FiLink,
  FiImage as FiImageIcon,
  FiCode,
} from "react-icons/fi";

export const EDITOR_TOOLBAR_GROUPS = [
  {
    icons: [FiBold, FiItalic, FiUnderline],
    separator: true,
  },
  {
    icons: [FiAlignLeft, FiAlignCenter, FiAlignRight],
    separator: true,
  },
  {
    icons: [FiLink, FiImageIcon, FiCode],
    separator: false,
  },
] as const;

export const DEFAULT_FORM_VALUES = {
  title: "",
  content: "",
  excerpt: "",
  coverImageUrl: "",
  categoryId: "",
  tags: [] as string[],
};

export const EDITOR_PLACEHOLDER_KEY = "contentPlaceholder";

export const FORM_INPUT_NAMES = {
  TITLE: "title",
  CONTENT: "content",
  EXCERPT: "excerpt",
  COVER_IMAGE_URL: "coverImageUrl",
  CATEGORY_ID: "categoryId",
} as const;