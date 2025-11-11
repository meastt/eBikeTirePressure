"use client";

import { useEffect, useState } from "react";
import { trackPWAInstall, trackPWAInstallDismissed } from "@/lib/analytics";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Show the install prompt after a short delay
      setTimeout(() => setShowPrompt(true), 3000);
    };

    window.addEventListener("beforeinstallprompt", handler);

    // Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setShowPrompt(false);
    }

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    await deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const choiceResult = await deferredPrompt.userChoice;

    if (choiceResult.outcome === "accepted") {
      // Track installation event
      trackPWAInstall();
    }

    // Clear the deferredPrompt so it can only be used once
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // Track dismissal
    trackPWAInstallDismissed();
  };

  if (!showPrompt || !deferredPrompt) return null;

  return (
    <div className="fixed bottom-3 inset-x-3 z-50 mx-auto max-w-md">
      <div className="rounded-2xl bg-surface shadow-card border border-line p-4 flex items-center justify-between gap-3">
        <div className="flex-1">
          <p className="text-sm font-semibold text-text">Install E-Bike PSI</p>
          <p className="text-xs text-muted mt-0.5">Get one-tap access from your home screen</p>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <button
            className="text-sm text-muted hover:text-text transition-colors px-2 py-1"
            onClick={handleDismiss}
          >
            Not now
          </button>
          <button
            className="px-4 py-2 rounded-lg bg-brand text-white text-sm font-medium hover:bg-brand-600 transition-colors"
            onClick={handleInstall}
          >
            Install
          </button>
        </div>
      </div>
    </div>
  );
}
