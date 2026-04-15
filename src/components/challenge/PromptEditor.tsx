"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { LevelData } from "@/lib/types";

interface PromptEditorProps {
  context: string;
  levelData: LevelData;
  scenarioTitle: string;
  attempts: number;
  onEvaluate: (prompt: string) => void;
  isEvaluating: boolean;
}

export function PromptEditor({
  context,
  levelData,
  scenarioTitle,
  attempts,
  onEvaluate,
  isEvaluating,
}: PromptEditorProps) {
  const [prompt, setPrompt] = useState("");
  const [contextOpen, setContextOpen] = useState(true);

  const charCount = prompt.length;
  const wordCount = prompt.trim().split(/\s+/).filter(Boolean).length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) onEvaluate(prompt);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      if (prompt.trim() && !isEvaluating) onEvaluate(prompt);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 h-full">
      {/* Context (collapsible) */}
      <div
        className="rounded-lg overflow-hidden"
        style={{ border: "1px solid rgba(141,166,157,0.2)" }}
      >
        <button
          type="button"
          onClick={() => setContextOpen((o) => !o)}
          className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors hover:bg-white/5"
          style={{ color: "#8DA69D" }}
          aria-expanded={contextOpen}
        >
          <span>Szenario-Kontext: {scenarioTitle}</span>
          {contextOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
        {contextOpen && (
          <div
            className="px-4 pb-4 text-sm text-white/60 leading-relaxed"
            style={{ background: "rgba(141,166,157,0.05)" }}
          >
            {context}
          </div>
        )}
      </div>

      {/* Task */}
      <div
        className="rounded-lg p-4"
        style={{
          background: "rgba(255,184,0,0.08)",
          border: "1px solid rgba(255,184,0,0.2)",
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <div
            className="text-xs font-bold px-2 py-0.5 rounded"
            style={{ backgroundColor: "#FFB800", color: "#1A1A1A" }}
          >
            Level {levelData.level}: {levelData.name}
          </div>
          <span className="text-xs text-white/40">{levelData.focus}</span>
        </div>
        <p className="text-sm text-white/80 leading-relaxed">{levelData.task}</p>
      </div>

      {/* Prompt input */}
      <div className="flex-1 flex flex-col">
        <label
          htmlFor="prompt-input"
          className="text-sm font-medium text-white/70 mb-2"
        >
          Dein Prompt
        </label>
        <textarea
          id="prompt-input"
          className="prompt-textarea flex-1"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Schreibe hier deinen Prompt für den KI-Assistenten..."
          aria-label="Prompt eingeben"
          disabled={isEvaluating}
        />
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-white/30 font-mono">
            {wordCount} Wörter · {charCount} Zeichen · Versuch {attempts + 1}
          </span>
          <span className="text-xs text-white/30">
            Strg+Enter zum Abschicken
          </span>
        </div>
      </div>

      {/* Submit */}
      <Button
        type="submit"
        variant="gold"
        size="lg"
        loading={isEvaluating}
        disabled={!prompt.trim()}
        className="w-full"
      >
        <Send size={16} />
        {isEvaluating ? "Wird bewertet…" : "Prompt bewerten"}
      </Button>
    </form>
  );
}
