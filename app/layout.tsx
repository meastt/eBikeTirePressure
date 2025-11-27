import type { Metadata, Viewport } from "next";
import Link from "next/link";
import OfflineMessage from "@/components/OfflineMessage";
import { Footer } from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "E-Bike PSI - Tire Pressure Calculator",
  description:
    "Professional e-bike tire pressure calculator. Get precise PSI recommendations based on your bike model, rider weight, cargo, and terrain.",
  metadataBase: new URL('https://ebikepsi.com'),
  authors: [{ name: 'E-Bike PSI' }],
  creator: 'E-Bike PSI',
  publisher: 'E-Bike PSI',
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/favicon.svg" },
      { url: "/icons/icon-180x180.png", sizes: "180x180", type: "image/png" },
      { url: "/icons/icon-152x152.png", sizes: "152x152", type: "image/png" },
      { url: "/icons/icon-120x120.png", sizes: "120x120", type: "image/png" },
    ],
  },
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
  themeColor: "#0EA5E9",
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
      <body className="font-body bg-gradient-mesh flex flex-col min-h-screen">
        <OfflineMessage />
        <header className="sticky top-0 z-50 border-b border-brand/20 bg-slate-900/95 backdrop-blur-2xl shadow-xl safe-area-inset-top">
          <div className="container mx-auto px-4 sm:px-6 py-3 max-w-7xl">
            <nav className="flex items-center justify-between h-16 sm:h-14" aria-label="Main navigation">
              <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity group flex-shrink-0">
                <div className="w-10 h-10 bg-gradient-to-br from-brand to-cyan-600 rounded-lg flex items-center justify-center shadow-glow">
                  <span className="font-display font-black text-white text-lg">PSI</span>
                </div>
                <div className="hidden sm:flex flex-col">
                  <span className="font-display font-black text-white text-lg leading-none tracking-tight">E-BIKE PSI</span>
                  <span className="font-mono text-brand-300 text-xs tracking-wider">PRECISION_CALC</span>
                </div>
              </Link>
              <div className="flex gap-2 sm:gap-3 flex-shrink-0">
                <Link
                  href="/calculate"
                  className="px-4 sm:px-6 py-2.5 bg-gradient-to-r from-brand to-cyan-600 text-white font-heading font-bold rounded-lg hover:shadow-glow hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 ease-out text-sm sm:text-base shadow-lg"
                >
                  CALCULATE
                </Link>
                <Link
                  href="/ebike-tire-pressure"
                  className="px-4 sm:px-5 py-2.5 text-slate-300 font-heading font-semibold hover:bg-brand/10 hover:text-brand rounded-lg transition-all duration-200 text-sm sm:text-base border border-brand/20"
                >
                  MODELS
                </Link>
              </div>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
