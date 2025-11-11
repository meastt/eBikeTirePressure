"use client";

import type { Construction } from "@/lib/types";

interface ConstructionSelectorProps {
  selected: Construction;
  onSelect: (construction: Construction) => void;
}

const CONSTRUCTIONS: { value: Construction; label: string; description: string }[] = [
  { value: "tubed", label: "Tubed", description: "Standard inner tube" },
  { value: "tubeless", label: "Tubeless", description: "Runs ~5% lower PSI" },
  { value: "reinforced", label: "Reinforced", description: "Heavy-duty casing" },
];

export default function ConstructionSelector({ selected, onSelect }: ConstructionSelectorProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-text">Tire Construction</h3>
      <div className="grid grid-cols-3 gap-3">
        {CONSTRUCTIONS.map((construction) => (
          <button
            key={construction.value}
            onClick={() => onSelect(construction.value)}
            className={`p-3 rounded-xl border-2 transition-all text-center ${
              selected === construction.value
                ? "border-brand bg-brand-50 shadow-sm"
                : "border-line bg-white hover:border-brand-200"
            }`}
          >
            <div
              className={`text-sm font-semibold ${selected === construction.value ? "text-brand" : "text-text"}`}
            >
              {construction.label}
            </div>
            <div className="text-xs text-muted mt-0.5">{construction.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
