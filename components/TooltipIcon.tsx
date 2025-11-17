"use client";

import { useState } from "react";

interface TooltipIconProps {
  content: string;
  className?: string;
}

export default function TooltipIcon({ content, className = "" }: TooltipIconProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block group">
      <button
        type="button"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
        className={`inline-flex items-center justify-center ml-1 text-brand-600 hover:text-brand-700 transition-colors focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-1 ${className}`}
        aria-label="Help information"
        aria-describedby={isVisible ? "tooltip-content" : undefined}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none"/>
          <path d="M12 16v-4m0-4h.01" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {isVisible && (
        <div
          id="tooltip-content"
          role="tooltip"
          className="absolute z-50 px-3 py-2 text-xs text-white bg-gray-900 rounded-lg shadow-lg w-64 left-0 top-full mt-2 leading-relaxed"
        >
          {content}
        </div>
      )}
    </div>
  );
}
