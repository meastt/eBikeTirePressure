"use client";

import { useState } from "react";

interface TooltipIconProps {
  content: string;
  className?: string;
}

export default function TooltipIcon({ content, className = "" }: TooltipIconProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
        className={`inline-flex items-center justify-center w-4 h-4 ml-1 text-xs text-slate-400 hover:text-slate-600 transition-colors duration-150 rounded-full border border-slate-300 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-1 ${className}`}
        aria-label="Help information"
        aria-describedby={isVisible ? "tooltip-content" : undefined}
      >
        ?
      </button>

      {isVisible && (
        <div
          id="tooltip-content"
          role="tooltip"
          className="absolute z-50 px-3 py-2 text-sm text-white bg-slate-800 rounded-lg shadow-lg max-w-xs left-0 top-full mt-1 transform -translate-x-1/2"
          style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}
        >
          {content}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45 w-2 h-2 bg-slate-800"></div>
        </div>
      )}
    </div>
  );
}
