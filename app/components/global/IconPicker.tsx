/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import * as FaIcons from "react-icons/fa";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  selectedIcon: string;
  onChange: (iconName: string) => void;
  show: boolean;
  onClose: () => void;
}

export default function IconPicker({
  selectedIcon,
  onChange,
  show,
  onClose,
}: Props) {
  const allowedIcons = Object.keys(FaIcons).filter((name) =>
    name.startsWith("Fa")
  );

  const [searchTerm, setSearchTerm] = useState("");

  const filteredIcons = useMemo(
    () =>
      allowedIcons.filter((icon) =>
        icon.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [allowedIcons, searchTerm]
  );

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.2 }}
          className="fixed top-0 left-0 h-screen w-full bg-black/40 backdrop-blur-md flex items-center justify-center z-99999999"
        >
          <div className="space-y-4 max-w-3xl  bg-white p-2 rounded-lg shadow-md">
            <input
              type="text"
              placeholder="ابحث عن أيقونة..."
              className="w-full px-4 py-2 border rounded outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-4 max-h-100 overflow-y-auto p-2 border border-gray-400 rounded ">
              {filteredIcons.map((iconName) => {
                const IconComponent = (FaIcons as any)[iconName];

                return (
                  <div
                    key={iconName}
                    onClick={() => onChange(iconName)}
                    className={`flex items-center justify-center w-12 h-12 rounded cursor-pointer transition border
                ${
                  selectedIcon == iconName
                    ? "bg-mid-primary text-white border-mid-primary"
                    : "hover:bg-gray-100"
                }
              `}
                    title={iconName}
                  >
                    <IconComponent className="text-xl" />
                  </div>
                );
              })}
            </div>
            <button
              onClick={onClose}
              className="my-2 px-4 py-2 flex items-center justify-center bg-red-400 text-white rounded-lg hover:bg-red-500 hover:scale-110 duration-300"
            >
              إغلاق
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}