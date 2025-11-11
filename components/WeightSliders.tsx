"use client";

interface WeightSlidersProps {
  riderLbs: number;
  passengerLbs: number;
  cargoFrontLbs: number;
  cargoRearLbs: number;
  onRiderChange: (lbs: number) => void;
  onPassengerChange: (lbs: number) => void;
  onCargoFrontChange: (lbs: number) => void;
  onCargoRearChange: (lbs: number) => void;
}

function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  unit = "lbs",
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  unit?: string;
}) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-baseline">
        <label className="text-sm font-medium text-text">{label}</label>
        <span className="text-sm font-semibold text-brand">
          {value} {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
        className="w-full h-2 bg-surface rounded-lg appearance-none cursor-pointer accent-brand"
        style={{
          background: `linear-gradient(to right, #1E88E5 0%, #1E88E5 ${((value - min) / (max - min)) * 100}%, #F7F8FA ${((value - min) / (max - min)) * 100}%, #F7F8FA 100%)`,
        }}
      />
      <div className="flex justify-between text-xs text-muted">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
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
}: WeightSlidersProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-sm font-semibold text-text">Weight Distribution</h3>

      <Slider label="Rider Weight" value={riderLbs} min={80} max={300} onChange={onRiderChange} />

      <Slider
        label="Passenger Weight (optional)"
        value={passengerLbs}
        min={0}
        max={250}
        onChange={onPassengerChange}
      />

      <div className="grid grid-cols-2 gap-4">
        <Slider
          label="Front Cargo"
          value={cargoFrontLbs}
          min={0}
          max={80}
          onChange={onCargoFrontChange}
        />
        <Slider
          label="Rear Cargo"
          value={cargoRearLbs}
          min={0}
          max={120}
          onChange={onCargoRearChange}
        />
      </div>

      <div className="p-3 bg-surface rounded-lg">
        <div className="text-sm">
          <span className="font-medium text-text">Total Load:</span>{" "}
          <span className="text-brand font-semibold">
            {riderLbs + passengerLbs + cargoFrontLbs + cargoRearLbs} lbs
          </span>
        </div>
      </div>
    </div>
  );
}
