"use client";

import TooltipIcon from "./TooltipIcon";

interface WeightSlidersProps {
  riderLbs: number;
  passengerLbs: number;
  cargoFrontLbs: number;
  cargoRearLbs: number;
  onRiderChange: (lbs: number) => void;
  onPassengerChange: (lbs: number) => void;
  onCargoFrontChange: (lbs: number) => void;
  onCargoRearChange: (lbs: number) => void;
  riderError?: string;
  passengerError?: string;
  cargoFrontError?: string;
  cargoRearError?: string;
}

export default function WeightSliders({
  riderLbs,
  passengerLbs,
  cargoFrontLbs,
  cargoRearLbs,
  onRiderChange,
  onPassengerChange,
  onCargoFrontChange,
  onCargoRearChange,
  riderError,
  passengerError,
  cargoFrontError,
  cargoRearError,
}: WeightSlidersProps) {

function Slider({
  label,
  value,
  min,
  max,
  step = 5,
  onChange,
  unit = "lbs",
  inputId,
  error,
  errorId,
}: {
  label: string | React.ReactNode;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  unit?: string;
  inputId?: string;
  error?: string;
  errorId?: string;
}) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-baseline">
        <label className="text-sm font-medium text-text">{label}</label>
        <span className="text-sm font-semibold text-brand">
          {value} {unit}
        </span>
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value, 10))}
          className="flex-1 min-w-0 h-2.5 bg-surface rounded-lg appearance-none cursor-pointer accent-brand"
          style={{
            background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${((value - min) / (max - min)) * 100}%, #E2E8F0 ${((value - min) / (max - min)) * 100}%, #E2E8F0 100%)`,
          }}
        />
        <input
          id={inputId}
          type="number"
          min={min}
          max={max}
          step={1}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value, 10) || min)}
          className={`w-14 sm:w-16 md:w-20 px-2 sm:px-3 py-1.5 border-2 rounded-xl text-xs sm:text-sm text-center font-semibold transition-all duration-200 flex-shrink-0 ${
            error ? 'border-danger focus:ring-danger' : 'border-slate-200 focus:border-brand focus:ring-2 focus:ring-brand/20'
          }`}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
        />
      </div>
      <div className="flex justify-between text-xs text-muted">
        <span>{min}</span>
        <span>{max}</span>
      </div>
      {error && (
        <p id={errorId} className="text-xs text-danger mt-1" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

  // Calculate approximate axle loads (typical distribution: 40% front, 60% rear for rider)
  const riderFront = Math.round(riderLbs * 0.4);
  const riderRear = Math.round(riderLbs * 0.6);
  const passengerRear = passengerLbs; // All passenger weight goes to rear
  const frontAxleLoad = riderFront + cargoFrontLbs;
  const rearAxleLoad = riderRear + passengerRear + cargoRearLbs;
  const totalLoad = riderLbs + passengerLbs + cargoFrontLbs + cargoRearLbs;

  return (
    <div className="space-y-5">
      <h3 className="text-sm font-semibold text-text">Load Inputs</h3>

      <Slider
        label="Rider Weight"
        value={riderLbs}
        min={80}
        max={300}
        onChange={onRiderChange}
        inputId="rider-weight-input"
        error={riderError}
        errorId="rider-weight-error"
      />

      <Slider
        label={
          <div className="flex items-center">
            <span>Passenger Weight</span>
            <TooltipIcon content="Includes child seats, adult passengers, or pets. All passenger weight goes to the rear axle." />
          </div>
        }
        value={passengerLbs}
        min={0}
        max={250}
        onChange={onPassengerChange}
        error={passengerError}
        errorId="passenger-weight-error"
      />

      <div className="grid grid-cols-2 gap-4">
        <Slider
          label={
            <div className="flex items-center">
              <span>Front Cargo</span>
              <TooltipIcon content="Panniers, baskets, or handlebar bags on the front of your bike." />
            </div>
          }
          value={cargoFrontLbs}
          min={0}
          max={80}
          onChange={onCargoFrontChange}
          error={cargoFrontError}
          errorId="front-cargo-error"
        />
        <Slider
          label={
            <div className="flex items-center">
              <span>Rear Cargo</span>
              <TooltipIcon content="Rear rack cargo, trailers, or child seats. Can significantly increase your recommended PSI." />
            </div>
          }
          value={cargoRearLbs}
          min={0}
          max={200}
          onChange={onCargoRearChange}
          error={cargoRearError}
          errorId="rear-cargo-error"
        />
      </div>

      <div className="p-5 bg-gradient-to-br from-brand-50/70 to-white rounded-xl border border-brand/30 shadow-md">
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <div className="text-xs text-muted uppercase tracking-wide mb-0.5">Front Axle</div>
            <div className="font-semibold text-text">{frontAxleLoad} lbs</div>
          </div>
          <div>
            <div className="text-xs text-muted uppercase tracking-wide mb-0.5">Rear Axle</div>
            <div className="font-semibold text-text">{rearAxleLoad} lbs</div>
          </div>
          <div>
            <div className="text-xs text-muted uppercase tracking-wide mb-0.5">Total</div>
            <div className="font-semibold text-brand">{totalLoad} lbs</div>
          </div>
        </div>
      </div>
    </div>
  );
}
