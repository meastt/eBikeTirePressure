"use client";

import { useState } from "react";
import type { CalculatorOutput, Surface } from "@/lib/types";
import { trackShare } from "@/lib/analytics";
import PSIBand from "./PSIBand";
import Button from "./Button";
import { ExclamationTriangleIcon, ExclamationCircleIcon, ShieldExclamationIcon } from "@heroicons/react/24/outline";

interface ResultsCardContext {
  riderLbs: number;
  cargoLbs: number;
  tireSize: string;
  surface: Surface;
}

interface ResultsCardProps {
  results: CalculatorOutput | null;
  sidewallMax: number;
  modelSlug?: string;
  context?: ResultsCardContext;
}

export default function ResultsCard({ results, sidewallMax, modelSlug, context }: ResultsCardProps) {
  const [copySuccess, setCopySuccess] = useState(false);

  const handleShare = async () => {
    if (!modelSlug) return;

    const url = `${window.location.origin}/calculate?model=${modelSlug}`;

    // Try native share first (mobile)
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'E-Bike PSI Calculator',
          text: 'Check out this tire pressure calculator',
          url,
        });
        trackShare('native');
        return;
      } catch {
        // User cancelled or share not available
      }
    }

    // Fallback to clipboard
    try {
      await navigator.clipboard.writeText(url);
      setCopySuccess(true);
      trackShare('copy');
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL', err);
    }
  };
  if (!results) {
    return (
      <div className="card p-8 text-center">
        <div className="text-4xl mb-3">🔧</div>
        <p className="text-muted">Select a bike model to calculate PSI</p>
      </div>
    );
  }

  const { front, rear, warnings, notes } = results;
  const hasWarnings = Object.values(warnings).some((w) => w);

  // Calculate distance from sidewall max for warnings
  const rearMaxDistance = sidewallMax - rear.max;
  
  return (
    <div className="space-y-4">
      {/* Screen reader summary - visually hidden but announced by screen readers */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Tire pressure calculated for {context?.tireSize || 'selected bike'}.
        Front tire: {front.target} PSI target, safe range {front.min} to {front.max} PSI.
        Rear tire: {rear.target} PSI target, safe range {rear.min} to {rear.max} PSI.
        {warnings.lowPinchRisk && ' Warning: pinch-flat risk - pressure below tire minimum.'}
        {warnings.squirmRisk && ' Warning: squirm risk - tires may feel unstable.'}
        {warnings.exceedsSidewallMax && ' Warning: exceeds sidewall maximum - risk of tire failure.'}
      </div>
      {/* Results header with gradient */}
      <div className="card space-y-8 bg-white/90 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-heading font-bold text-text bg-gradient-to-r from-brand-600 via-brand-700 to-brand bg-clip-text text-transparent">Your PSI</h2>
        </div>

        {/* Context line */}
        {context && (
          <div className="text-sm text-muted leading-relaxed pb-2">
            Based on: {context.riderLbs} lb rider • {context.cargoLbs} lb cargo • {context.tireSize} • {context.surface.replace('_', '/')}
          </div>
        )}

        {/* Front tire */}
        <PSIBand result={front} sidewallMax={sidewallMax} label="Front" />

        {/* Rear tire */}
        <PSIBand result={rear} sidewallMax={sidewallMax} label="Rear" />
      </div>

      {/* Sticky Share button - Mobile only */}
      {modelSlug && (
        <div className="lg:hidden sticky bottom-4 mt-4 safe-area-inset-bottom">
          <Button
            onClick={handleShare}
            variant="primary"
            size="md"
            className="w-full shadow-lg"
            title="Share calculator settings"
          >
            {copySuccess ? '✓ Copied' : 'Share Results'}
          </Button>
        </div>
      )}

      {/* Warnings - Color chip style */}
      {hasWarnings && (
        <div className="space-y-2">
          {warnings.lowPinchRisk && (
            <div className="flex items-start gap-3 p-4 bg-danger-light border-l-4 border-danger rounded-xl shadow-sm">
              <ExclamationTriangleIcon className="w-6 h-6 text-danger flex-shrink-0" />
              <div className="flex-1">
                <div className="text-sm font-bold text-danger">Pinch-flat risk</div>
                <div className="text-xs text-muted mt-1">Pressure below tire minimum. Add air to avoid rim damage.</div>
              </div>
            </div>
          )}
          {warnings.squirmRisk && (
            <div className="flex items-start gap-3 p-4 bg-warn-light border-l-4 border-warn rounded-xl shadow-sm">
              <ExclamationCircleIcon className="w-6 h-6 text-warn flex-shrink-0" />
              <div className="flex-1">
                <div className="text-sm font-bold text-warn">Possible squirm on pavement</div>
                <div className="text-xs text-muted mt-1">&lt;15 PSI may feel unstable. OK for sand/snow only.</div>
              </div>
            </div>
          )}
          {warnings.exceedsSidewallMax && (
            <div className="flex items-start gap-3 p-4 bg-danger-light border-l-4 border-danger rounded-xl shadow-sm">
              <ShieldExclamationIcon className="w-6 h-6 text-danger flex-shrink-0" />
              <div className="flex-1">
                <div className="text-sm font-bold text-danger">
                  {rearMaxDistance <= 2 && rearMaxDistance >= 0
                    ? `Approaching sidewall max (${rearMaxDistance} PSI away)`
                    : 'Exceeds sidewall maximum'}
                </div>
                <div className="text-xs text-muted mt-1">Never exceed rating printed on tire sidewall.</div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Notes */}
      {notes.length > 0 && (
        <div className="p-3 bg-surface-light rounded-lg border border-slate-200">
          <ul className="text-sm text-muted space-y-1">
            {notes.map((note, i) => (
              <li key={i}>• {note}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Safety reminder - Concise */}
      <div className="p-4 bg-accent-50 border border-accent-100 rounded-xl shadow-sm">
        <div className="text-sm text-text leading-relaxed">
          <strong className="text-brand font-bold">Check when cold.</strong> Never exceed sidewall max. Adjust ±2 PSI for comfort within safe range.
        </div>
      </div>
    </div>
  );
}
