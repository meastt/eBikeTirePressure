"use client";

import type { Construction } from "@/lib/types";
import TooltipIcon from "./TooltipIcon";

interface ConstructionSelectorProps {
  selected: Construction;
  onSelect: (construction: Construction) => void;
}

const CONSTRUCTIONS: { value: Construction; label: string; description: string }[] = [
  { value: "tubed", label: "Tubed", description: "Standard tube" },
  { value: "tubeless", label: "Tubeless", description: "−1 PSI" },
  { value: "reinforced", label: "Reinforced", description: "+2 PSI" },
];

export default function ConstructionSelector({ selected, onSelect }: ConstructionSelectorProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center">
        <h3 className="text-sm font-semibold text-text">Tire Construction</h3>
        <TooltipIcon content="Tubed: Inner tube inside tire (most common). Tubeless: Sealant instead of tube (can run lower PSI). Reinforced: Extra-thick casing for cargo bikes." />
      </div>
      <div className="grid grid-cols-3 gap-3">
        {CONSTRUCTIONS.map((construction) => (
          <button
            key={construction.value}
            onClick={() => onSelect(construction.value)}
            className={`p-4 rounded-xl border-2 transition-all duration-300 ease-out text-center shadow-sm ${
              selected === construction.value
                ? "border-brand bg-gradient-to-br from-brand-50 to-white shadow-md ring-2 ring-brand/20"
                : "border-slate-200 bg-white hover:border-brand/30 hover:shadow-md"
            }`}
          >
            <div
              className={`text-sm font-bold transition-colors duration-200 ${selected === construction.value ? "text-brand" : "text-text"}`}
            >
              {construction.label}
            </div>
            <div className="text-xs text-muted mt-1">{construction.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
