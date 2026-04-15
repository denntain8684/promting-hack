"use client";

import React, { useEffect, useRef } from "react";

interface ConfettiProps {
  active: boolean;
  count?: number;
}

const COLORS = ["#FFB800", "#FFD54F", "#4CAF50", "#5B9BD5", "#FF8C00", "#E53935", "#8DA69D", "#FAFAFA"];

export function Confetti({ active, count = 80 }: ConfettiProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active || !containerRef.current) return;
    const container = containerRef.current;
    container.innerHTML = "";

    for (let i = 0; i < count; i++) {
      const piece = document.createElement("div");
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const size = 6 + Math.random() * 8;
      const left = Math.random() * 100;
      const delay = Math.random() * 1.5;
      const duration = 2.5 + Math.random() * 1.5;
      const isCircle = Math.random() > 0.5;

      piece.style.cssText = `
        position: absolute;
        left: ${left}%;
        top: -10px;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: ${isCircle ? "50%" : "2px"};
        animation: confetti-fall ${duration}s ${delay}s ease-in forwards;
        opacity: 1;
        transform: rotate(${Math.random() * 360}deg);
      `;
      container.appendChild(piece);
    }

    const timeout = setTimeout(() => {
      if (container) container.innerHTML = "";
    }, 5000);
    return () => clearTimeout(timeout);
  }, [active, count]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-50"
      aria-hidden="true"
    />
  );
}
