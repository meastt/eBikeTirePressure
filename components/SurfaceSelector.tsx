"use client";

import type { Surface } from "@/lib/types";
import TooltipIcon from "./TooltipIcon";

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
      <div className="flex items-center">
        <h3 className="text-sm font-semibold text-text">Riding Surface</h3>
        <TooltipIcon content="Select your typical riding surface. Mixed = gravel + pavement. Reduce PSI by 10-30% for dirt, sand, or snow vs pavement." />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {SURFACES.map((surface) => (
          <button
            key={surface.value}
            onClick={() => onSelect(surface.value)}
            className={`p-4 rounded-xl border-2 transition-all duration-300 ease-out text-left shadow-sm ${
              selected === surface.value
                ? "border-brand bg-gradient-to-br from-brand-50 to-white shadow-md ring-2 ring-brand/20"
                : "border-slate-200 bg-white hover:border-brand/30 hover:shadow-md"
            }`}
          >
            <div
              className={`text-sm font-bold transition-colors duration-200 ${selected === surface.value ? "text-brand" : "text-text"}`}
            >
              {surface.label}
            </div>
            <div className="text-xs text-muted mt-1">{surface.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
