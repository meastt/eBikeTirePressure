"use client";

import type { Surface } from "@/lib/types";

interface SurfaceSelectorProps {
  selected: Surface;
  onSelect: (surface: Surface) => void;
}

const SURFACES: { value: Surface; label: string; description: string }[] = [
  { value: "pavement", label: "Pavement", description: "Roads, bike paths" },
  { value: "mixed", label: "Mixed", description: "Gravel, hardpack" },
  { value: "dirt", label: "Dirt", description: "Trails, loose soil" },
  { value: "sand_snow", label: "Sand/Snow", description: "Soft surfaces" },
];

export default function SurfaceSelector({ selected, onSelect }: SurfaceSelectorProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-text">Riding Surface</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {SURFACES.map((surface) => (
          <button
            key={surface.value}
            onClick={() => onSelect(surface.value)}
            className={`p-3 rounded-xl border-2 transition-all text-left ${
              selected === surface.value
                ? "border-brand bg-brand-50 shadow-sm"
                : "border-line bg-white hover:border-brand-200"
            }`}
          >
            <div
              className={`text-sm font-semibold ${selected === surface.value ? "text-brand" : "text-text"}`}
            >
              {surface.label}
            </div>
            <div className="text-xs text-muted mt-0.5">{surface.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
