"use client";

import { create } from "zustand";

type LocaleType = "en" | "ar";

interface VariablesStore {
  width: number;
  locale: LocaleType;
  showLangDrop: boolean;
  isSidebarOpen: boolean;

  setWidth: (width: number) => void;
  setLocal: (local: LocaleType) => void;
  setShowLangDrop: (value: boolean) => void;
  setIsSidebarOpen: (value: boolean) => void;
  toggleLangDrop: () => void;
  toggleSidebar: () => void;
}

export const useVariablesStore = create<VariablesStore>((set) => ({
  width: 0,
  locale: "en",
  showLangDrop: false,
  isSidebarOpen: false,

  setWidth: (width) => set({ width }),
  setLocal: (locale) => set({ locale }),

  setShowLangDrop: (value) =>
    set({
      showLangDrop: value,
    }),

  setIsSidebarOpen: (value) =>
    set({
      isSidebarOpen: value,
    }),

  toggleLangDrop: () =>
    set((state) => ({
      showLangDrop: !state.showLangDrop,
    })),

  toggleSidebar: () =>
    set((state) => ({
      isSidebarOpen: !state.isSidebarOpen,
    })),
}));

export default useVariablesStore;
