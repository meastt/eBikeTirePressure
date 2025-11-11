import type { Metadata, Viewport } from "next";
import Link from "next/link";
import OfflineMessage from "@/components/OfflineMessage";
import "./globals.css";

export const metadata: Metadata = {
  title: "E-Bike PSI - Tire Pressure Calculator",
  description:
    "Professional e-bike tire pressure calculator. Get precise PSI recommendations based on your bike model, rider weight, cargo, and terrain.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "E-Bike PSI",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#1E88E5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Plausible Analytics - Placeholder */}
        {process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN && (
          <script
            defer
            data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
            src="https://plausible.io/js/script.js"
          />
        )}
      </head>
      <body className="font-sans">
        <OfflineMessage />
        <header className="border-b border-line bg-white">
          <div className="container mx-auto px-4 py-4 max-w-7xl">
            <nav className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Link href="/" className="text-xl font-bold text-text">
                  E-Bike PSI
                </Link>
                <span className="text-xs px-2 py-0.5 bg-brand-100 text-brand rounded">
                  beta
                </span>
              </div>
              <div className="flex gap-4">
                <Link
                  href="/calculate"
                  className="px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand-600 transition-colors"
                >
                  Calculate
                </Link>
                <Link
                  href="/ebike-tire-pressure"
                  className="px-4 py-2 text-text hover:bg-surface rounded-lg transition-colors"
                >
                  Models
                </Link>
              </div>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="border-t border-line bg-surface mt-12">
          <div className="container mx-auto px-4 py-8 max-w-7xl">
            <p className="text-sm text-muted text-center">
              Never exceed tire sidewall max. Check with a calibrated gauge.
            </p>
            <p className="text-xs text-muted text-center mt-2">
              © {new Date().getFullYear()} E-Bike PSI. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
