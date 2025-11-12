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
        {/* Preconnect to analytics domains for performance */}
        <link rel="preconnect" href="https://plausible.io" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        
        {/* Plausible Analytics */}
        <script
          defer
          data-domain="ebikepsi.com"
          src="https://plausible.io/js/script.js"
        />
        
        {/* Google Analytics 4 */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-KDL4X3S24L"
        />
        <script
          id="google-analytics"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-KDL4X3S24L');
            `,
          }}
        />
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
            <p className="text-sm text-muted text-center max-w-3xl mx-auto">
              <strong>Safety Disclaimer:</strong> All pressure recommendations are guidelines only. Never exceed your tire&apos;s maximum PSI rating printed on the sidewall. Always verify pressure with a calibrated gauge when tires are cold. Adjust based on your riding conditions and comfort while staying within manufacturer specifications.
            </p>
            <p className="text-xs text-muted text-center mt-4">
              © {new Date().getFullYear()} E-Bike PSI Calculator. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
