import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-line/40 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-4">
          <div>
            <h3 className="font-heading font-bold text-text mb-3">
              Tools
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/calculate"
                  className="text-muted hover:text-brand font-medium transition-colors duration-200 inline-block"
                >
                  Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/ebike-tire-pressure"
                  className="text-muted hover:text-brand font-medium transition-colors duration-200 inline-block"
                >
                  Models
                </Link>
              </li>
              <li>
                <Link
                  href="/ebike-tyre-pressure"
                  className="text-muted hover:text-brand font-medium transition-colors duration-200 inline-block"
                >
                  UK/EU (Bar)
                </Link>
              </li>
              <li>
                <Link
                  href="/brands"
                  className="text-muted hover:text-brand font-medium transition-colors duration-200 inline-block"
                >
                  Brands
                </Link>
              </li>
              <li>
                <Link
                  href="/tire-size"
                  className="text-muted hover:text-brand font-medium transition-colors duration-200 inline-block"
                >
                  Tire Sizes
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-bold text-text mb-3">
              By Category
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/fat-tire-ebike-tire-pressure"
                  className="text-muted hover:text-brand font-medium transition-colors duration-200 inline-block"
                >
                  Fat Tire
                </Link>
              </li>
              <li>
                <Link
                  href="/cargo-ebike-tire-pressure"
                  className="text-muted hover:text-brand font-medium transition-colors duration-200 inline-block"
                >
                  Cargo
                </Link>
              </li>
              <li>
                <Link
                  href="/commuter-ebike-tire-pressure"
                  className="text-muted hover:text-brand font-medium transition-colors duration-200 inline-block"
                >
                  Commuter
                </Link>
              </li>
              <li>
                <Link
                  href="/folding-ebike-tire-pressure"
                  className="text-muted hover:text-brand font-medium transition-colors duration-200 inline-block"
                >
                  Folding
                </Link>
              </li>
              <li>
                <Link
                  href="/moto-style-ebike-tire-pressure"
                  className="text-muted hover:text-brand font-medium transition-colors duration-200 inline-block"
                >
                  Moto-Style
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-bold text-text mb-3">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/blog"
                  className="text-muted hover:text-brand font-medium transition-colors duration-200 inline-block"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-muted hover:text-brand font-medium transition-colors duration-200 inline-block"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-muted hover:text-brand font-medium transition-colors duration-200 inline-block"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/heavy-rider-ebike-tire-pressure"
                  className="text-muted hover:text-brand font-medium transition-colors duration-200 inline-block"
                >
                  Heavy Rider Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/lightweight-rider-tire-pressure"
                  className="text-muted hover:text-brand font-medium transition-colors duration-200 inline-block"
                >
                  Lightweight Rider
                </Link>
              </li>
              <li>
                <Link
                  href="/hot-weather-ebike-tire-pressure"
                  className="text-muted hover:text-brand font-medium transition-colors duration-200 inline-block"
                >
                  Hot Weather PSI
                </Link>
              </li>
              <li>
                <Link
                  href="/cold-weather-ebike-tire-pressure"
                  className="text-muted hover:text-brand font-medium transition-colors duration-200 inline-block"
                >
                  Cold Weather PSI
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-bold text-text mb-3">
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-muted hover:text-brand font-medium transition-colors duration-200 inline-block"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-muted hover:text-brand font-medium transition-colors duration-200 inline-block"
                >
                  Terms
                </Link>
              </li>
              <li>
                <a
                  href="mailto:support@ebikepsi.com"
                  className="text-muted hover:text-brand font-medium transition-colors duration-200 inline-block"
                >
                  Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-line/40 mb-4"></div>

        {/* Bottom Row */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-muted">
          <p className="font-medium">&copy; {currentYear} E-Bike PSI. All rights reserved.</p>

          <p className="text-center sm:text-right max-w-md font-medium">
            Safety Disclaimer: Never exceed tire sidewall maximum PSI. Always
            verify with a calibrated gauge when cold.
          </p>
        </div>
      </div>
    </footer>
  );
}

