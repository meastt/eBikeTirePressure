"use client";

import type { CalculatorOutput } from "@/lib/types";
import SafetyBand from "./SafetyBand";

interface ResultsCardProps {
  results: CalculatorOutput | null;
  sidewallMax: number;
}

export default function ResultsCard({ results, sidewallMax }: ResultsCardProps) {
  if (!results) {
    return (
      <div className="p-8 bg-surface rounded-2xl shadow-card text-center">
        <p className="text-muted">Select a bike model to see PSI recommendations</p>
      </div>
    );
  }

  const { front, rear, warnings, notes } = results;
  const hasWarnings = Object.values(warnings).some((w) => w);

  return (
    <div className="space-y-6">
      {/* Results header */}
      <div className="p-6 bg-white rounded-2xl shadow-card space-y-6">
        <h2 className="text-xl font-bold text-text">Recommended Tire Pressure</h2>

        {/* Front tire */}
        <SafetyBand result={front} sidewallMax={sidewallMax} label="Front Tire" />

        {/* Rear tire */}
        <SafetyBand result={rear} sidewallMax={sidewallMax} label="Rear Tire" />
      </div>

      {/* Warnings */}
      {hasWarnings && (
        <div className="p-4 bg-warn-50 border-l-4 border-warn rounded-lg">
          <div className="flex items-start gap-3">
            <div className="text-warn text-xl">⚠️</div>
            <div className="space-y-1">
              <div className="text-sm font-semibold text-warn-dark">Warnings</div>
              <ul className="text-sm text-warn-dark space-y-1">
                {warnings.lowPinchRisk && (
                  <li>• Pressure below tire minimum - pinch-flat risk</li>
                )}
                {warnings.squirmRisk && (
                  <li>• Very low pressure may cause tire squirm on turns</li>
                )}
                {warnings.exceedsSidewallMax && (
                  <li>• Recommended max exceeds tire sidewall limit - use sidewall max instead</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Notes */}
      {notes.length > 0 && (
        <div className="p-4 bg-surface rounded-lg">
          <div className="text-sm font-semibold text-text mb-2">Calculation Notes</div>
          <ul className="text-sm text-muted space-y-1">
            {notes.map((note, i) => (
              <li key={i}>• {note}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Safety reminder */}
      <div className="p-4 bg-brand-50 border border-brand-200 rounded-lg">
        <div className="text-sm text-brand-dark">
          <strong>Safety reminder:</strong> Always check tire sidewall for max PSI. Use a calibrated
          gauge. Check pressure when tires are cold.
        </div>
      </div>
    </div>
  );
}
