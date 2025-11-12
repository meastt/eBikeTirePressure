import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | E-Bike PSI',
  description: 'Terms of service for E-Bike PSI tire pressure calculator.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-heading text-4xl font-bold text-text mb-8">
          Terms of Service
        </h1>

        <div className="prose prose-slate max-w-none space-y-6 text-muted leading-relaxed">
          <p className="text-sm text-muted">
            Last Updated: November 12, 2025
          </p>

          <section>
            <h2 className="font-heading text-2xl font-semibold text-text mb-4 mt-8">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using E-Bike PSI (&quot;the Service&quot;), you accept and
              agree to be bound by these Terms of Service. If you do not agree
              to these terms, do not use the Service.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold text-text mb-4 mt-8">
              2. Description of Service
            </h2>
            <p>
              E-Bike PSI provides a tire pressure calculator for electric
              bicycles. The Service offers PSI recommendations based on user
              inputs including bike model, rider weight, cargo weight, and
              terrain type.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold text-text mb-4 mt-8">
              3. Disclaimer of Liability
            </h2>
            <p className="font-semibold text-text">
              IMPORTANT SAFETY DISCLAIMER:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>
                All PSI recommendations are <strong>guidelines only</strong> and
                not professional advice.
              </li>
              <li>
                <strong>Never exceed</strong> your tire&apos;s maximum PSI rating
                printed on the sidewall.
              </li>
              <li>
                Always verify pressure with a <strong>calibrated gauge</strong>{' '}
                when tires are cold (before riding).
              </li>
              <li>
                Adjust recommendations based on your comfort, riding style, and
                tire condition.
              </li>
              <li>
                We are <strong>not responsible</strong> for any damage, injury,
                or accidents resulting from using our recommendations.
              </li>
              <li>
                Consult your bike manufacturer or local bike shop for
                professional advice.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold text-text mb-4 mt-8">
              4. User Responsibilities
            </h2>
            <p>You agree to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Provide accurate information (weight, cargo, tire specs) when
                using the calculator
              </li>
              <li>
                Check tire sidewall ratings before applying any PSI
                recommendation
              </li>
              <li>
                Use a reliable, calibrated pressure gauge to verify PSI
              </li>
              <li>
                Inspect your tires regularly for wear, damage, and proper
                inflation
              </li>
              <li>
                Follow all manufacturer safety guidelines for your e-bike and
                tires
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold text-text mb-4 mt-8">
              5. Limitation of Liability
            </h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, E-BIKE PSI SHALL NOT BE
              LIABLE FOR ANY:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Tire blowouts, pinch flats, or rim damage</li>
              <li>Personal injury or property damage</li>
              <li>Loss of data or service interruptions</li>
              <li>Inaccurate recommendations due to user input errors</li>
              <li>
                Any direct, indirect, incidental, or consequential damages
                arising from use of the Service
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold text-text mb-4 mt-8">
              6. No Warranty
            </h2>
            <p>
              The Service is provided &quot;AS IS&quot; without warranties of any kind,
              either express or implied. We do not warrant that:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The Service will be error-free or uninterrupted</li>
              <li>Recommendations will be accurate for all use cases</li>
              <li>The Service meets your specific requirements</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold text-text mb-4 mt-8">
              7. Intellectual Property
            </h2>
            <p>
              All content on E-Bike PSI (text, graphics, logos, calculator
              algorithms) is the property of E-Bike PSI and is protected by
              copyright and trademark laws. You may not reproduce, distribute,
              or create derivative works without written permission.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold text-text mb-4 mt-8">
              8. User Conduct
            </h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Use the Service for any unlawful or prohibited purpose
              </li>
              <li>
                Attempt to reverse engineer, scrape, or copy the calculator
                algorithms
              </li>
              <li>
                Overload or interfere with the proper functioning of the
                Service
              </li>
              <li>
                Use automated tools to access the Service without permission
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold text-text mb-4 mt-8">
              9. Third-Party Links
            </h2>
            <p>
              The Service may contain links to third-party websites (bike
              manufacturers, retailers, etc.). We are not responsible for the
              content, accuracy, or practices of third-party sites.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold text-text mb-4 mt-8">
              10. Changes to Terms
            </h2>
            <p>
              We reserve the right to modify these Terms of Service at any time.
              Changes will be posted on this page with an updated &quot;Last Updated&quot;
              date. Your continued use of the Service after changes constitutes
              acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold text-text mb-4 mt-8">
              11. Termination
            </h2>
            <p>
              We reserve the right to terminate or suspend access to the Service
              at any time, without notice, for any reason, including violation
              of these terms.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold text-text mb-4 mt-8">
              12. Governing Law
            </h2>
            <p>
              These Terms of Service are governed by the laws of the United
              States. Any disputes shall be resolved in the appropriate courts.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold text-text mb-4 mt-8">
              13. Contact Information
            </h2>
            <p>
              If you have questions about these Terms of Service, contact us at:
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

          <section className="mt-8 p-6 bg-warn/10 border border-warn/30 rounded-lg">
            <p className="font-semibold text-text mb-2">⚠️ FINAL REMINDER:</p>
            <p>
              E-Bike PSI provides informational guidelines only. You are solely
              responsible for the safety and maintenance of your e-bike. Always
              follow tire manufacturer specifications and consult professionals
              when in doubt.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

