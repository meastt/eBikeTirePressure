import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-line bg-surface-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-6">
          <div>
            <h3 className="font-heading font-semibold text-text mb-3">
              Tools
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/calculate"
                  className="text-muted hover:text-brand transition-colors"
                >
                  Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/ebike-tire-pressure"
                  className="text-muted hover:text-brand transition-colors"
                >
                  Models
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-text mb-3">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/blog"
                  className="text-muted hover:text-brand transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-muted hover:text-brand transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-text mb-3">
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-muted hover:text-brand transition-colors"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-muted hover:text-brand transition-colors"
                >
                  Terms
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-text mb-3">
              Contact
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:support@ebikepsi.com"
                  className="text-muted hover:text-brand transition-colors"
                >
                  Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-line mb-6"></div>

        {/* Bottom Row */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted">
          <p>&copy; {currentYear} E-Bike PSI. All rights reserved.</p>

          <p className="text-center sm:text-right max-w-md">
            Safety Disclaimer: Never exceed tire sidewall maximum PSI. Always
            verify with a calibrated gauge when cold.
          </p>
        </div>
      </div>
    </footer>
  );
}

