"use client";

import { useState } from "react";
import type { CalculatorOutput } from "@/lib/types";
import { trackShare } from "@/lib/analytics";
import SafetyBand from "./SafetyBand";

interface ResultsCardProps {
  results: CalculatorOutput | null;
  sidewallMax: number;
  modelSlug?: string;
}

export default function ResultsCard({ results, sidewallMax, modelSlug }: ResultsCardProps) {
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
      <div className="p-8 bg-gradient-to-br from-white to-surface-light border border-slate-200 rounded-2xl shadow-card text-center">
        <p className="text-text-muted">Select a bike model to see PSI recommendations</p>
      </div>
    );
  }

  const { front, rear, warnings, notes } = results;
  const hasWarnings = Object.values(warnings).some((w) => w);

  // Calculate distance from sidewall max for warnings
  const rearMaxDistance = sidewallMax - rear.max;
  
  return (
    <div className="space-y-6">
      {/* Results header with gradient */}
      <div className="p-6 bg-gradient-to-br from-white to-surface-light border border-slate-200 rounded-2xl shadow-card space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-heading font-bold text-text">Recommended PSI</h2>
          {modelSlug && (
            <button
              onClick={handleShare}
              className="px-3 py-1.5 text-sm font-medium text-brand hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
              title="Share calculator settings"
            >
              {copySuccess ? '✓ Copied!' : '🔗 Share'}
            </button>
          )}
        </div>

        {/* Front tire */}
        <SafetyBand result={front} sidewallMax={sidewallMax} label="Front Tire" />

        {/* Rear tire */}
        <SafetyBand result={rear} sidewallMax={sidewallMax} label="Rear Tire" />
      </div>

      {/* Warnings - Color chip style */}
      {hasWarnings && (
        <div className="space-y-3">
          {warnings.lowPinchRisk && (
            <div className="flex items-center gap-3 p-3 bg-danger/10 border-l-4 border-danger rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-danger text-white rounded-full text-sm font-bold">
                !
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-danger">Below tire minimum</div>
                <div className="text-xs text-text-muted">Risk of pinch flats and rim damage</div>
              </div>
            </div>
          )}
          {warnings.squirmRisk && (
            <div className="flex items-center gap-3 p-3 bg-warn/10 border-l-4 border-warn rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-warn text-white rounded-full text-sm font-bold">
                ⚠
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-warn">Low pressure</div>
                <div className="text-xs text-text-muted">May cause instability during cornering</div>
              </div>
            </div>
          )}
          {warnings.exceedsSidewallMax && (
            <div className="flex items-center gap-3 p-3 bg-danger/10 border-l-4 border-danger rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-danger text-white rounded-full text-sm font-bold">
                ✕
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-danger">
                  {rearMaxDistance <= 1 && rearMaxDistance >= 0 
                    ? `${rearMaxDistance} PSI from sidewall max`
                    : 'Exceeds sidewall max'}
                </div>
                <div className="text-xs text-text-muted">Never exceed tire rating</div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Notes */}
      {notes.length > 0 && (
        <div className="p-4 bg-surface-light/50 rounded-lg border border-slate-200">
          <div className="text-sm font-semibold text-text mb-2">Notes</div>
          <ul className="text-sm text-text-muted space-y-1">
            {notes.map((note, i) => (
              <li key={i}>• {note}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Safety reminder - Concise */}
      <div className="p-4 bg-gradient-to-r from-brand/10 to-brand/5 border border-brand/20 rounded-lg">
        <div className="text-sm text-text">
          <strong className="text-brand">Safety:</strong> Never exceed sidewall max. Use calibrated gauge. Check when cold. Adjust for comfort within limits.
        </div>
      </div>
    </div>
  );
}
