"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import type { ModelPreset, Surface, Construction, CalculatorOutput } from "@/lib/types";
import { calculatePSI } from "@/calc/engine";
import { trackCalculatorRun, trackDeepLink } from "@/lib/analytics";
import PresetPicker from "@/components/PresetPicker";
import WeightSliders from "@/components/WeightSliders";
import SurfaceSelector from "@/components/SurfaceSelector";
import ConstructionSelector from "@/components/ConstructionSelector";
import TrikeToggle from "@/components/TrikeToggle";
import ResultsCard from "@/components/ResultsCard";
import modelsData from "@/data/models.json";

const models = modelsData as ModelPreset[];

function CalculatorContent() {
  const searchParams = useSearchParams();
  
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

  // Recalculate whenever inputs change
  useEffect(() => {
    if (!selectedModel) {
      setResults(null);
      return;
    }

    const calculatorInputs = {
      bike: selectedModel,
      riderLbs,
      passengerLbs,
      cargoFrontLbs,
      cargoRearLbs,
      surface,
      construction,
      trikeMode,
    };

    const output = calculatePSI(calculatorInputs);
    setResults(output);
    
    // Track calculation (debounced via analytics module)
    trackCalculatorRun({
      model: selectedModel.slug,
      surface,
      construction,
      trike: trikeMode,
    });
  }, [selectedModel, riderLbs, passengerLbs, cargoFrontLbs, cargoRearLbs, surface, construction, trikeMode]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold text-text mb-6 tracking-tight">
        E-Bike Tire Pressure Calculator
      </h1>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left column: Inputs */}
        <div className="space-y-6">
          {/* Model selector */}
          <div className="p-6 bg-white rounded-2xl shadow-card">
            <PresetPicker models={models} selected={selectedModel} onSelect={setSelectedModel} />
          </div>

          {/* Weight sliders */}
          {selectedModel && (
            <div className="p-6 bg-white rounded-2xl shadow-card">
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
            <div className="p-6 bg-white rounded-2xl shadow-card">
              <SurfaceSelector selected={surface} onSelect={setSurface} />
            </div>
          )}

          {/* Construction selector */}
          {selectedModel && (
            <div className="p-6 bg-white rounded-2xl shadow-card">
              <ConstructionSelector selected={construction} onSelect={setConstruction} />
            </div>
          )}

          {/* Trike toggle */}
          {selectedModel && <TrikeToggle enabled={trikeMode} onToggle={setTrikeMode} />}
        </div>

        {/* Right column: Results */}
        <div className="lg:sticky lg:top-6 lg:self-start" role="region" aria-live="polite" aria-atomic="true">
          <ResultsCard
            results={results}
            sidewallMax={selectedModel?.stockTire.maxPSI || 50}
            modelSlug={selectedModel?.slug}
          />
        </div>
      </div>
    </div>
  );
}

export default function CalculatePage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-3xl font-bold text-text mb-6 tracking-tight">
          E-Bike Tire Pressure Calculator
        </h1>
        <div className="p-8 bg-surface rounded-2xl shadow-card text-center">
          <p className="text-muted">Loading calculator...</p>
        </div>
      </div>
    }>
      <CalculatorContent />
    </Suspense>
  );
}
