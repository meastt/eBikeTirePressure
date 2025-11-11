"use client";

import { useEffect, useState } from "react";

export default function OfflineMessage() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // Check initial state
    setIsOnline(navigator.onLine);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div className="fixed top-0 inset-x-0 z-50 bg-warn text-white">
      <div className="container mx-auto px-4 py-2 text-center">
        <p className="text-sm font-medium">
          You&apos;re offline. Reconnect to compute PSI calculations.
        </p>
      </div>
    </div>
  );
}
