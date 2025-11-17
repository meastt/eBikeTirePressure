import type { Metadata, Viewport } from "next";
import Link from "next/link";
import Image from "next/image";
import OfflineMessage from "@/components/OfflineMessage";
import { Footer } from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "E-Bike PSI - Tire Pressure Calculator",
  description:
    "Professional e-bike tire pressure calculator. Get precise PSI recommendations based on your bike model, rider weight, cargo, and terrain.",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/favicon.svg",
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
  themeColor: "#6366F1",
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
        <header className="sticky top-0 z-50 border-b border-line/30 bg-white/80 backdrop-blur-2xl shadow-sm safe-area-inset-top">
          <div className="container mx-auto px-4 sm:px-6 py-4 max-w-7xl">
            <nav className="flex items-center justify-between h-20 sm:h-14" aria-label="Main navigation">
              <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity group flex-shrink-0">
                <Image src="/logo.svg" alt="E-Bike PSI Logo" width={300} height={67} priority className="transition-transform duration-300 group-hover:scale-105 w-[200px] sm:w-56 md:w-52 h-auto" />
              </Link>
              <div className="flex gap-1.5 sm:gap-3 flex-shrink-0">
                <Link
                  href="/calculate"
                  className="px-3 sm:px-6 py-2.5 bg-gradient-brand text-white font-semibold rounded-xl hover:shadow-glow hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 ease-out text-sm sm:text-base shadow-md"
                >
                  Calculate
                </Link>
                <Link
                  href="/ebike-tire-pressure"
                  className="px-3 sm:px-5 py-2.5 text-text font-medium hover:bg-brand-50 hover:text-brand-700 rounded-xl transition-all duration-200 text-sm sm:text-base"
                >
                  Models
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
