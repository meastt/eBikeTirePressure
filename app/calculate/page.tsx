"use client";

import { Suspense, useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import type { ModelPreset, Surface, Construction, CalculatorOutput } from "@/lib/types";
import { calculatePSI } from "@/calc/engine";
import { trackCalculatorRun, trackDeepLink } from "@/lib/analytics";
import { useDebounce } from "@/lib/useDebounce";
import PresetPicker from "@/components/PresetPicker";
import WeightSliders from "@/components/WeightSliders";
import SurfaceSelector from "@/components/SurfaceSelector";
import ConstructionSelector from "@/components/ConstructionSelector";
import TrikeToggle from "@/components/TrikeToggle";
import ResultsCard from "@/components/ResultsCard";
import ResultsCardSkeleton from "@/components/ResultsCardSkeleton";
import modelsData from "@/data/models.json";

const models = modelsData as ModelPreset[];

function CalculatorContent() {
  const searchParams = useSearchParams();
  const resultsRef = useRef<HTMLDivElement>(null);

  // State for calculator inputs
  const [selectedModel, setSelectedModel] = useState<ModelPreset | null>(null);
  const [riderLbs, setRiderLbs] = useState(180);
  const [passengerLbs, setPassengerLbs] = useState(0);
  const [cargoFrontLbs, setCargoFrontLbs] = useState(0);
  const [cargoRearLbs, setCargoRearLbs] = useState(0);
  const [surface, setSurface] = useState<Surface>("pavement");
  const [construction, setConstruction] = useState<Construction>("tubed");
  const [trikeMode, setTrikeMode] = useState(false);

  // State for results
  const [results, setResults] = useState<CalculatorOutput | null>(null);

  // State for loading
  const [isCalculating, setIsCalculating] = useState(false);

  // State for floating results bar
  const [showFloatingBar, setShowFloatingBar] = useState(false);

  // Debounced weight values for performance (300ms delay)
  const debouncedRiderLbs = useDebounce(riderLbs, 300);
  const debouncedPassengerLbs = useDebounce(passengerLbs, 300);
  const debouncedCargoFrontLbs = useDebounce(cargoFrontLbs, 300);
  const debouncedCargoRearLbs = useDebounce(cargoRearLbs, 300);

  // Handle deep-link on mount
  useEffect(() => {
    const modelSlug = searchParams.get('model');
    if (modelSlug) {
      const model = models.find(m => m.slug === modelSlug);
      if (model) {
        setSelectedModel(model);
        trackDeepLink(modelSlug);
      }
    }
  }, [searchParams]);

  // Focus rider weight input when model is first selected
  useEffect(() => {
    if (selectedModel) {
      // Small delay to ensure DOM is updated after model selection
      const timer = setTimeout(() => {
        const riderInput = document.getElementById('rider-weight-input') as HTMLInputElement;
        if (riderInput) {
          riderInput.focus();
          // Position cursor at the end of the input
          riderInput.setSelectionRange(riderInput.value.length, riderInput.value.length);
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [selectedModel]);

  // Scroll detection for floating bar
  useEffect(() => {
    const handleScroll = () => {
      if (!results || !resultsRef.current) return;

      const resultsRect = resultsRef.current.getBoundingClientRect();

      // Show floating bar if results are scrolled below viewport (with some buffer)
      const resultsTop = resultsRect.top;
      const shouldShow = resultsTop < -50; // Results are scrolled up by 50px+
      setShowFloatingBar(shouldShow);
    };

    // Only add scroll listener on mobile
    if (window.innerWidth < 1024) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll(); // Check initial state
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, [results]);

  // Function to scroll to results
  const scrollToResults = () => {
    if (resultsRef.current) {
      const yOffset = -20; // Offset from top
      const y = resultsRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setShowFloatingBar(false); // Hide after scrolling
    }
  };

  // Function to reset to defaults
  const resetToDefaults = () => {
    setSelectedModel(null);
    setRiderLbs(180);
    setPassengerLbs(0);
    setCargoFrontLbs(0);
    setCargoRearLbs(0);
    setSurface("pavement");
    setConstruction("tubed");
    setTrikeMode(false);
    setResults(null);
    setIsCalculating(false);
    setShowFloatingBar(false);
  };

  // Recalculate whenever inputs change
  useEffect(() => {
    if (!selectedModel) {
      setResults(null);
      setIsCalculating(false);
      return;
    }

    setIsCalculating(true);

    const calculatorInputs = {
      bike: selectedModel,
      riderLbs: debouncedRiderLbs,
      passengerLbs: debouncedPassengerLbs,
      cargoFrontLbs: debouncedCargoFrontLbs,
      cargoRearLbs: debouncedCargoRearLbs,
      surface,
      construction,
      trikeMode,
    };

    // Simulate calculation time for better UX feedback
    const calculationTimeout = setTimeout(() => {
      const output = calculatePSI(calculatorInputs);
      setResults(output);
      setIsCalculating(false);

      // Track calculation (debounced via analytics module)
      trackCalculatorRun({
        model: selectedModel.slug,
        surface,
        construction,
        trike: trikeMode,
      });
    }, 600); // 600ms delay for smooth loading experience

    return () => clearTimeout(calculationTimeout);
  }, [selectedModel, debouncedRiderLbs, debouncedPassengerLbs, debouncedCargoFrontLbs, debouncedCargoRearLbs, surface, construction, trikeMode]);

  return (
    <div className="container mx-auto px-4 py-6 md:py-8 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-3xl font-heading font-bold text-text mb-2 tracking-tight">
          Calculate PSI
        </h1>
        <p className="text-muted text-sm">
          Set your bike, load, and terrain for precise pressure ranges.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left column: Inputs */}
        <div className="space-y-4 md:space-y-6">
          {/* Model selector */}
        <div className="card">
          <PresetPicker models={models} selected={selectedModel} onSelect={setSelectedModel} />
        </div>

        {/* Weight sliders */}
        {selectedModel && (
          <div className="card">
            <WeightSliders
              riderLbs={riderLbs}
              passengerLbs={passengerLbs}
              cargoFrontLbs={cargoFrontLbs}
              cargoRearLbs={cargoRearLbs}
              onRiderChange={setRiderLbs}
              onPassengerChange={setPassengerLbs}
              onCargoFrontChange={setCargoFrontLbs}
              onCargoRearChange={setCargoRearLbs}
            />
          </div>
        )}

        {/* Surface selector */}
        {selectedModel && (
          <div className="card">
            <SurfaceSelector selected={surface} onSelect={setSurface} />
          </div>
        )}

        {/* Construction selector */}
        {selectedModel && (
          <div className="card">
            <ConstructionSelector selected={construction} onSelect={setConstruction} />
          </div>
        )}

          {/* Trike toggle */}
          {selectedModel && <TrikeToggle enabled={trikeMode} onToggle={setTrikeMode} />}

          {/* Reset to defaults */}
          <button
            onClick={resetToDefaults}
            className="w-full py-2.5 text-sm text-muted hover:text-text hover:bg-surface-light rounded-lg border border-line transition-colors"
            title="Reset all inputs to default values"
          >
            Reset to Defaults
          </button>
        </div>

        {/* Right column: Results */}
        <div
          ref={resultsRef}
          className="lg:sticky lg:top-20 lg:self-start"
          role="region"
          aria-live="polite"
          aria-atomic="true"
        >
          {isCalculating ? (
            <ResultsCardSkeleton />
          ) : (
            <ResultsCard
              results={results}
              sidewallMax={selectedModel?.stockTire.maxPSI || 50}
              modelSlug={selectedModel?.slug}
              context={{
                riderLbs,
                cargoLbs: cargoFrontLbs + cargoRearLbs,
                tireSize: selectedModel?.stockTire.size || "",
                surface,
              }}
            />
          )}
        </div>

        {/* Floating Results Bar - Mobile Only */}
        {results && showFloatingBar && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-lg lg:hidden p-4 z-40 safe-area-inset-bottom">
            <div className="flex justify-between items-center max-w-4xl mx-auto">
              <div>
                <div className="text-xs text-muted">Your PSI</div>
                <div className="text-lg font-bold text-brand">
                  Front: {results.front.target} | Rear: {results.rear.target}
                </div>
              </div>
              <button
                onClick={scrollToResults}
                className="px-4 py-2 bg-brand text-white font-semibold rounded-lg hover:bg-brand-hover transition-colors duration-150"
              >
                Details →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CalculatePage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-6 md:py-8 max-w-6xl">
        <div className="mb-6">
          <h1 className="text-3xl font-heading font-bold text-text mb-2 tracking-tight">
            Calculate PSI
          </h1>
          <p className="text-muted text-sm">
            Loading calculator...
          </p>
        </div>
        <div className="card p-8 text-center">
          <p className="text-muted">Preparing tools...</p>
        </div>
      </div>
    }>
      <CalculatorContent />
    </Suspense>
  );
}
