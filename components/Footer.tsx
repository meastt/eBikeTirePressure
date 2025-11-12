import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-slate-200/60 bg-gradient-to-b from-white to-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-6">
          <div>
            <h3 className="font-heading font-bold text-text mb-4">
              Tools
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/calculate"
                  className="text-muted hover:text-brand font-medium transition-all duration-200 hover:translate-x-1 inline-block"
                >
                  Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/ebike-tire-pressure"
                  className="text-muted hover:text-brand font-medium transition-all duration-200 hover:translate-x-1 inline-block"
                >
                  Models
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-bold text-text mb-4">
              Resources
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/blog"
                  className="text-muted hover:text-brand font-medium transition-all duration-200 hover:translate-x-1 inline-block"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-muted hover:text-brand font-medium transition-all duration-200 hover:translate-x-1 inline-block"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-bold text-text mb-4">
              Legal
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/privacy"
                  className="text-muted hover:text-brand font-medium transition-all duration-200 hover:translate-x-1 inline-block"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-muted hover:text-brand font-medium transition-all duration-200 hover:translate-x-1 inline-block"
                >
                  Terms
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-bold text-text mb-4">
              Contact
            </h3>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="mailto:support@ebikepsi.com"
                  className="text-muted hover:text-brand font-medium transition-all duration-200 hover:translate-x-1 inline-block"
                >
                  Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-200/60 mb-8"></div>

        {/* Bottom Row */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted">
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

