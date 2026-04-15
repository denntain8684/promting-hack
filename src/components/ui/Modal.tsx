"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
}: ModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizes = { sm: "max-w-sm", md: "max-w-md", lg: "max-w-lg" };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Content */}
      <div
        className={`glass-card relative w-full ${sizes[size]} p-6 animate-slide-up z-10`}
        style={{ borderColor: "rgba(255,184,0,0.3)" }}
      >
        <div className="flex items-start justify-between mb-4">
          {title && (
            <h2
              id="modal-title"
              className="text-xl font-bold"
              style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)", color: "#FFB800" }}
            >
              {title}
            </h2>
          )}
          <button
            onClick={onClose}
            className="ml-auto text-white/50 hover:text-white transition-colors"
            aria-label="Schließen"
          >
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
