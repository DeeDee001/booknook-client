"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl";
}

export const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "md",
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const maxWidthClass = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  }[maxWidth];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className={`w-full ${maxWidthClass} max-h-[92vh] flex flex-col rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden transition-all transform animate-in zoom-in-95 duration-200`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-stone-100 dark:border-stone-800 shrink-0">
          <h3 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 tracking-tight truncate pr-2">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content for mobile keyboards */}
        <div className="p-4 sm:p-6 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};
