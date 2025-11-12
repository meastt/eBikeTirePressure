import type { Metadata, Viewport } from "next";
import Link from "next/link";
import Image from "next/image";
import { Inter, Poppins } from "next/font/google";
import OfflineMessage from "@/components/OfflineMessage";
import { Footer } from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  weight: ["600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

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
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
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
      <body className="font-body bg-surface-light flex flex-col min-h-screen">
        <OfflineMessage />
        <header className="border-b border-line bg-white shadow-sm">
          <div className="container mx-auto px-4 py-3 max-w-7xl">
            <nav className="flex items-center justify-between" aria-label="Main navigation">
              <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
                <Image src="/logo.svg" alt="E-Bike PSI Logo" width={180} height={40} priority />
              </Link>
              <div className="flex items-center gap-2 sm:gap-3">
                <Link
                  href="/calculate"
                  className="px-3 sm:px-5 py-2.5 bg-brand text-white font-semibold rounded-lg hover:bg-brand-600 hover:shadow-hover hover:-translate-y-0.5 transition-all duration-200 text-sm sm:text-base"
                >
                  Calculate
                </Link>
                <Link
                  href="/ebike-tire-pressure"
                  className="px-3 sm:px-4 py-2.5 text-text font-medium hover:bg-surface-light rounded-lg transition-colors duration-200 text-sm sm:text-base"
                >
                  Models
                </Link>
                <Link
                  href="/blog"
                  className="px-3 sm:px-4 py-2.5 text-text font-medium hover:bg-surface-light rounded-lg transition-colors duration-200 text-sm sm:text-base"
                >
                  Blog
                </Link>
                <Link
                  href="/faq"
                  className="px-3 sm:px-4 py-2.5 text-text font-medium hover:bg-surface-light rounded-lg transition-colors duration-200 text-sm sm:text-base"
                >
                  FAQ
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
