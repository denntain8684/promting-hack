import React from "react";

interface ProgressBarProps {
  value: number; // 0-100
  max?: number;
  color?: string;
  height?: "thin" | "normal" | "thick";
  showLabel?: boolean;
  label?: string;
  className?: string;
  animated?: boolean;
}

export function ProgressBar({
  value,
  max = 100,
  color = "#FFB800",
  height = "normal",
  showLabel = false,
  label,
  className = "",
  animated = true,
}: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const heights = { thin: "h-1", normal: "h-2", thick: "h-3" };

  return (
    <div className={className}>
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-1">
          {label && <span className="text-xs text-white/60">{label}</span>}
          {showLabel && (
            <span className="text-xs font-mono text-white/80">
              {Math.round(pct)}%
            </span>
          )}
        </div>
      )}
      <div
        className={`progress-bar-track w-full ${heights[height]}`}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div
          className={`h-full rounded-full ${animated ? "transition-all duration-700 ease-out" : ""}`}
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}
