"use client";

interface TrikeToggleProps {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
}

export default function TrikeToggle({ enabled, onToggle }: TrikeToggleProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-surface rounded-xl">
      <div className="flex-1">
        <div className="text-sm font-semibold text-text">Trike Mode</div>
        <div className="text-xs text-muted mt-0.5">
          Enable for 3-wheel configurations (rear load splits between 2 wheels)
        </div>
      </div>
      <button
        onClick={() => onToggle(!enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 ${
          enabled ? "bg-brand" : "bg-line"
        }`}
        role="switch"
        aria-checked={enabled}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            enabled ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}
