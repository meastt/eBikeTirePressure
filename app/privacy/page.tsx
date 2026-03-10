import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | E-Bike PSI',
  description: 'Privacy policy for E-Bike PSI tire pressure calculator.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-heading text-4xl font-bold text-text mb-8">
          Privacy Policy
        </h1>

        <div className="prose prose-slate max-w-none space-y-6 text-muted leading-relaxed">
          <p className="text-sm text-muted">
            Last Updated: November 12, 2025
          </p>

          <section>
            <h2 className="font-heading text-2xl font-semibold text-text mb-4 mt-8">
              1. Information We Collect
            </h2>
            <p>
              E-Bike PSI (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) collects minimal information to
              provide our tire pressure calculator service:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Calculator Inputs:</strong> Rider weight, cargo weight,
                tire specifications, and terrain preferences. This data is
                processed locally in your browser and is not stored on our
                servers.
              </li>
              <li>
                <strong>Analytics:</strong> We use Plausible Analytics (privacy-focused)
                and Google Analytics to track page views, calculator usage, and
                general site interactions. No personally identifiable
                information (PII) is collected.
              </li>
              <li>
                <strong>Technical Data:</strong> Browser type, device type,
                referring site, and pages visited for analytics purposes only.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold text-text mb-4 mt-8">
              2. How We Use Your Information
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                To provide personalized tire pressure recommendations based on
                your inputs
              </li>
              <li>
                To improve our calculator algorithms and user experience
              </li>
              <li>To analyze site usage patterns and popular bike models</li>
              <li>To optimize site performance and fix bugs</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold text-text mb-4 mt-8">
              3. Data Storage and Security
            </h2>
            <p>
              All calculator inputs are processed client-side in your browser.
              We do not store your personal weight, cargo, or riding data on
              our servers. Analytics data is anonymized and stored by our
              third-party analytics providers (Plausible and Google Analytics).
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold text-text mb-4 mt-8">
              4. Cookies and Tracking
            </h2>
            <p>We use cookies for:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Analytics:</strong> Plausible (no personal data) and
                Google Analytics (anonymized)
              </li>
              <li>
                <strong>Preferences:</strong> Remembering your last calculator
                settings (stored locally)
              </li>
            </ul>
            <p className="mt-4">
              You can disable cookies in your browser settings. This may affect
              some site functionality.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold text-text mb-4 mt-8">
              5. Third-Party Services
            </h2>
            <p>We use the following third-party services:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Plausible Analytics:</strong> Privacy-focused analytics
                (GDPR compliant, no cookies)
              </li>
              <li>
                <strong>Google Analytics:</strong> Anonymized site analytics
              </li>
              <li>
                <strong>Vercel:</strong> Hosting and CDN services
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold text-text mb-4 mt-8">
              6. Your Rights
            </h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access any data we have collected about you</li>
              <li>Request deletion of your data</li>
              <li>Opt out of analytics tracking (use browser extensions)</li>
              <li>Disable cookies in your browser</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold text-text mb-4 mt-8">
              7. Children&apos;s Privacy
            </h2>
            <p>
              Our service is not directed at children under 13. We do not
              knowingly collect information from children under 13.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold text-text mb-4 mt-8">
              8. Changes to This Policy
            </h2>
            <p>
              We may update this privacy policy from time to time. Changes will
              be posted on this page with an updated &quot;Last Updated&quot; date.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold text-text mb-4 mt-8">
              9. Contact Us
            </h2>
            <p>
              If you have questions about this privacy policy, contact us at:
            </p>
            <p className="mt-2">
              Email:{' '}
              <a
                href="mailto:support@ebikepsi.com"
                className="text-brand hover:underline"
              >
                support@ebikepsi.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

