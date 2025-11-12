"use client";

import TooltipIcon from "./TooltipIcon";

interface TrikeToggleProps {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
}

export default function TrikeToggle({ enabled, onToggle }: TrikeToggleProps) {
  return (
    <div className="card p-5 bg-white/80 backdrop-blur-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <div className="text-sm font-bold text-text">Trike Mode</div>
            <TooltipIcon content="Riding a three-wheeled bike? Enable this to split the rear axle load across two wheels instead of one." />
          </div>
          <div className="text-xs text-muted mb-3">
            3-wheel load split • Rear divides between 2 wheels
          </div>
          {enabled && (
            <div className="flex items-center gap-3 p-3 bg-gradient-to-br from-brand-50/50 to-white rounded-xl border border-brand/20 shadow-sm">
              <svg width="60" height="32" viewBox="0 0 60 32" className="flex-shrink-0">
                {/* Front wheel */}
                <circle cx="12" cy="24" r="6" fill="none" stroke="#3B82F6" strokeWidth="2"/>
                <text x="12" y="10" fontSize="9" fill="#64748B" textAnchor="middle" fontWeight="600">35%</text>

                {/* Rear wheels */}
                <circle cx="42" cy="24" r="6" fill="none" stroke="#3B82F6" strokeWidth="2"/>
                <circle cx="54" cy="24" r="6" fill="none" stroke="#3B82F6" strokeWidth="2"/>
                <text x="48" y="10" fontSize="9" fill="#64748B" textAnchor="middle" fontWeight="600">65%</text>

                {/* Frame line */}
                <line x1="12" y1="24" x2="48" y2="24" stroke="#E2E8F0" strokeWidth="3"/>
              </svg>
              <div className="text-xs text-muted leading-tight font-medium">
                Front: 35% • Rear: 32.5% each
              </div>
            </div>
          )}
        </div>
        <button
          onClick={() => onToggle(!enabled)}
          className={`relative inline-flex h-7 w-12 flex-shrink-0 items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 shadow-sm ${
            enabled ? "bg-gradient-brand shadow-md" : "bg-slate-200"
          }`}
          role="switch"
          aria-checked={enabled}
          aria-label="Toggle trike mode"
        >
          <span
            className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
              enabled ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>
    </div>
  );
}
