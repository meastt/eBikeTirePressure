import type { Metadata } from 'next';
import Link from 'next/link';
import modelsData from '@/data/models.json';
import type { ModelPreset } from '@/lib/types';
import { psiToBar, formatPressure } from '@/lib/programmatic/geo';
import { getBaseUrl } from '@/lib/programmatic/url-utils';
import {
  generateBreadcrumbSchema,
  generateFAQPageSchema,
  type FAQItem,
} from '@/lib/programmatic/schema-generators';
import { ModelGrid, FAQSection, CalculatorCTA, QuickStats, RelatedLinks } from '@/components/programmatic';
import { Breadcrumbs } from '@/components/Breadcrumbs';

const models = modelsData as ModelPreset[];

// Filter for German/EU focused brands
const deBrands = ['Cube', 'Canyon', 'Riese & Müller', 'Gazelle', 'Kalkhoff', 'KTM', 'Bulls', 'Haibike', 'Focus'];
const deModels = models.filter((m) => deBrands.some((b) => m.brand.includes(b)));
const allBrands = [...new Set(models.map((m) => m.brand))];

export const metadata: Metadata = {
  title: 'E-Bike Reifendruck Tabelle (2026) | Bar & PSI für alle Modelle',
  description:
    'E-Bike Reifendruck-Tabelle in Bar und PSI: Gewichtsempfehlungen, Reifengrößen und Marken für Cube, Canyon, Haibike und mehr. Einfach nachschlagen & losfahren.',
  alternates: {
    canonical: `${getBaseUrl()}/e-bike-reifendruck`,
    languages: {
      'de-DE': `${getBaseUrl()}/e-bike-reifendruck`,
      'en-GB': `${getBaseUrl()}/ebike-tyre-pressure`,
      'en-US': `${getBaseUrl()}/ebike-tire-pressure`,
      'x-default': `${getBaseUrl()}/ebike-tire-pressure`,
    },
  },
  openGraph: {
    title: 'E-Bike Reifendruck Tabelle (2026) | Bar & PSI',
    description:
      'E-Bike Reifendruck-Tabelle in Bar und PSI: Gewichtsempfehlungen, Reifengrößen und Marken für Cube, Canyon, Haibike und mehr.',
    type: 'article',
    locale: 'de_DE',
  },
};

export default function ReifendruckPage() {
  const baseUrl = getBaseUrl();

  const faqs: FAQItem[] = [
    {
      question: 'Welchen Reifendruck braucht mein E-Bike in Bar?',
      answer:
        'Die meisten E-Bike-Reifen liegen zwischen 2,0 und 4,5 Bar (30–65 PSI). Fatbike-Reifen fahren mit 1,0–1,7 Bar (15–25 PSI), Pendlerreifen benötigen typisch 2,5–3,5 Bar (35–50 PSI) und sportliche E-Bikes fahren mit 3,5–5,5 Bar (50–80 PSI). Den zulässigen Bereich findest du auf der Reifenflanke.',
    },
    {
      question: 'Wie rechne ich PSI in Bar um?',
      answer:
        'Teile den PSI-Wert durch 14,5. Beispiele: 30 PSI ÷ 14,5 = 2,07 Bar. Häufige Umrechnungen: 20 PSI = 1,4 Bar, 30 PSI = 2,1 Bar, 40 PSI = 2,8 Bar, 50 PSI = 3,4 Bar, 60 PSI = 4,1 Bar.',
    },
    {
      question: 'Warum wird bei E-Bikes in Deutschland meistens Bar statt PSI angegeben?',
      answer:
        'Bar ist die übliche Druckeinheit in Deutschland und der EU. Fahrradpumpen, Reifen und Ventile europäischer Hersteller tragen Bar als Hauptangabe. Marken wie Cube, Riese & Müller oder Kalkhoff geben den empfohlenen Druck in Bar an. Gute Standpumpen zeigen beide Einheiten an.',
    },
    {
      question: 'Welchen Reifendruck brauche ich für Cube E-Bikes?',
      answer:
        'Cube E-Bikes verwenden je nach Modell 2,1–3,8 Bar (30–55 PSI). City-Modelle wie der Cube Touring liegen bei 2,5–3,0 Bar, Mountainbike-E-Bikes wie der Cube Stereo Hybrid bei 2,1–2,5 Bar. Prüfe die Reifenflanke deines Mantels für den exakten Wert.',
    },
    {
      question: 'Soll ich den Reifendruck im Winter anpassen?',
      answer:
        'Ja. Der Reifendruck sinkt etwa 0,07 Bar (1 PSI) pro 5 °C Temperaturabfall. Im Winter solltest du den Druck häufiger prüfen und bei Bedarf 0,1–0,2 Bar nachfüllen. Ein in der warmen Garage auf 2,5 Bar gefüllter Reifen kann bei Frost auf 2,3 Bar fallen.',
    },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Startseite', url: baseUrl },
    { name: 'E-Bike Reifendruck', url: `${baseUrl}/e-bike-reifendruck` },
  ]);

  const faqSchema = generateFAQPageSchema(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="min-h-screen bg-gradient-mesh">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Breadcrumbs
            items={[
              { label: 'Startseite', href: '/' },
              { label: 'E-Bike Reifendruck' },
            ]}
          />

          <header className="mb-10">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-text mb-4 tracking-tight">
              E-Bike Reifendruck Tabelle
            </h1>
            <p className="text-xl text-muted leading-relaxed max-w-3xl">
              Alle Reifendruck-Empfehlungen in Bar und PSI für deutsche und europäische E-Bike-Fahrer.
              Gewichtstabelle für {models.length}+ Modelle von {allBrands.length} Marken.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 text-sm text-brand bg-brand-50 px-3 py-1.5 rounded-lg">
              <span>🇩🇪</span>
              <span>Deutschland/EU Ausgabe • Bar & PSI</span>
            </div>
          </header>

          <QuickStats
            items={[
              { label: 'Alle Modelle', value: models.length },
              { label: 'DE/EU Marken', value: deModels.length },
              { label: 'Alle Marken', value: allBrands.length },
              { label: 'Einheiten', value: 'Bar + PSI' },
            ]}
          />

          {/* PSI to Bar Conversion */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-text mb-4">
              PSI in Bar umrechnen – Schnellübersicht
            </h2>
            <div className="card p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-surface-light border-b-2 border-slate-200">
                      <th className="px-4 py-3 text-left text-sm font-bold text-text">Reifentyp</th>
                      <th className="px-4 py-3 text-center text-sm font-bold text-text">PSI Bereich</th>
                      <th className="px-4 py-3 text-center text-sm font-bold text-text">Bar Bereich</th>
                      <th className="px-4 py-3 text-left text-sm font-bold text-text">Gängige Modelle</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="px-4 py-3 font-medium text-text">Fatbike-Reifen (4&quot;+)</td>
                      <td className="px-4 py-3 text-center text-brand font-semibold">15–25 PSI</td>
                      <td className="px-4 py-3 text-center text-brand font-semibold">1,0–1,7 Bar</td>
                      <td className="px-4 py-3 text-muted text-sm">Cube Nutrail, Bulls E-Stream</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-text">Standard (2–3&quot;)</td>
                      <td className="px-4 py-3 text-center text-brand font-semibold">30–50 PSI</td>
                      <td className="px-4 py-3 text-center text-brand font-semibold">2,1–3,4 Bar</td>
                      <td className="px-4 py-3 text-muted text-sm">Cube, Canyon, Haibike</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-text">Lastenräder / Cargo</td>
                      <td className="px-4 py-3 text-center text-brand font-semibold">35–55 PSI</td>
                      <td className="px-4 py-3 text-center text-brand font-semibold">2,4–3,8 Bar</td>
                      <td className="px-4 py-3 text-muted text-sm">Riese &amp; Müller, R&amp;M Load</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-text">Falträder (16–20&quot;)</td>
                      <td className="px-4 py-3 text-center text-brand font-semibold">40–80 PSI</td>
                      <td className="px-4 py-3 text-center text-brand font-semibold">2,8–5,5 Bar</td>
                      <td className="px-4 py-3 text-muted text-sm">Tern Vektron, Dahon</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-text">Trekking / City</td>
                      <td className="px-4 py-3 text-center text-brand font-semibold">50–85 PSI</td>
                      <td className="px-4 py-3 text-center text-brand font-semibold">3,4–5,9 Bar</td>
                      <td className="px-4 py-3 text-muted text-sm">Gazelle, Kalkhoff, Focus</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Weight-Based Recommendations */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-text mb-4">
              Reifendruck nach Fahrergewicht (Standard-Reifen)
            </h2>
            <p className="text-muted mb-6">
              Für Standard-E-Bike-Reifen mit 27,5&quot; und 2,0–2,4&quot; Breite. Passe den Wert bei breiteren oder schmaleren Reifen an.
            </p>
            <div className="card p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-surface-light border-b-2 border-slate-200">
                      <th className="px-4 py-3 text-left text-sm font-bold text-text">Fahrergewicht</th>
                      <th className="px-4 py-3 text-center text-sm font-bold text-text">Vorderreifen</th>
                      <th className="px-4 py-3 text-center text-sm font-bold text-text">Hinterreifen</th>
                      <th className="px-4 py-3 text-center text-sm font-bold text-text">Fahrgefühl</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {[
                      { weight: '60 kg', front: 32, rear: 35, feel: 'Weich' },
                      { weight: '70 kg', front: 35, rear: 38, feel: 'Ausgewogen' },
                      { weight: '80 kg', front: 38, rear: 42, feel: 'Ausgewogen' },
                      { weight: '90 kg', front: 42, rear: 46, feel: 'Ausgewogen' },
                      { weight: '100 kg', front: 45, rear: 50, feel: 'Straff' },
                      { weight: '110+ kg', front: 48, rear: 55, feel: 'Straff' },
                    ].map((row) => (
                      <tr key={row.weight}>
                        <td className="px-4 py-3 font-medium text-text">{row.weight}</td>
                        <td className="px-4 py-3 text-center">
                          <span className="font-semibold text-brand">{row.front} PSI</span>
                          <span className="text-muted text-sm ml-1">({psiToBar(row.front).toFixed(1)} Bar)</span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className="font-semibold text-brand">{row.rear} PSI</span>
                          <span className="text-muted text-sm ml-1">({psiToBar(row.rear).toFixed(1)} Bar)</span>
                        </td>
                        <td className="px-4 py-3 text-center text-muted">{row.feel}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* German/EU Brands */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-text mb-4">
              Beliebte deutsche &amp; europäische E-Bike-Marken ({deModels.length} Modelle)
            </h2>
            <p className="text-muted mb-6">
              Diese Marken sind auf dem deutschen Markt besonders verbreitet. Klicke auf ein Modell für die detaillierte Reifendruck-Angabe.
            </p>
            <ModelGrid models={deModels.slice(0, 12)} showBrand={true} showPSIRange={true} columns={3} />
            {deModels.length > 12 && (
              <div className="text-center mt-6">
                <Link
                  href="/ebike-tire-pressure"
                  className="text-brand font-medium hover:underline"
                >
                  Alle {models.length} Modelle ansehen →
                </Link>
              </div>
            )}
          </section>

          {/* German Weather / Seasonal Tips */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-text mb-4">
              Reifendruck-Tipps für deutsches Wetter &amp; Jahreszeiten
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="card p-5">
                <h3 className="font-bold text-text mb-2 flex items-center gap-2">
                  <span>🌧️</span> Nässe &amp; Regen
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  Bei nassen Straßen empfiehlt es sich, 0,1–0,2 Bar (2–3 PSI) weniger als üblich zu fahren.
                  Die größere Auflagefläche sorgt für besseren Grip auf glatten Oberflächen. Untere
                  Mindestangabe des Mantels nicht unterschreiten.
                </p>
              </div>
              <div className="card p-5">
                <h3 className="font-bold text-text mb-2 flex items-center gap-2">
                  <span>❄️</span> Winter &amp; Frost
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  Kalte Temperaturen lassen den Reifendruck sinken. Prüfe wöchentlich und ergänze 0,1–0,2 Bar,
                  um den Temperaturverlust auszugleichen. Ein in der beheizten Garage auf 2,5 Bar gefüllter
                  Mantel kann bei −5 °C auf 2,3 Bar fallen.
                </p>
              </div>
              <div className="card p-5">
                <h3 className="font-bold text-text mb-2 flex items-center gap-2">
                  <span>🚴</span> Pendeln &amp; Stadtverkehr
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  Für den täglichen Arbeitsweg über Kopfsteinpflaster und Bordsteinkanten: 0,1–0,2 Bar unter
                  der empfohlenen Obergrenze fahren. Die weichere Federung schluckt Stöße und schützt den
                  Schlauch vor Durchschlägen.
                </p>
              </div>
              <div className="card p-5">
                <h3 className="font-bold text-text mb-2 flex items-center gap-2">
                  <span>📏</span> Druck prüfen
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  Verwende eine gute Standpumpe mit Bar-/PSI-Anzeige. Den Druck wöchentlich oder vor jeder
                  Fahrt über 30 Minuten kontrollieren. Digitale Manometer sind genauer als analoge.
                </p>
              </div>
            </div>
          </section>

          <FAQSection items={faqs} />

          <CalculatorCTA
            title="Reifendruck für dein E-Bike berechnen"
            subtitle="Erhalte persönliche PSI- und Bar-Empfehlungen basierend auf deinem Gewicht, deiner Reifengröße und den Fahrbedingungen."
          />

          <RelatedLinks
            heading="Weitere hilfreiche Seiten"
            links={[
              {
                title: 'Alle E-Bike Modelle',
                href: '/ebike-tire-pressure',
                description: 'Alle Marken und Modelle im Überblick',
                icon: '📚',
              },
              {
                title: 'Lastenrad-Reifendruck',
                href: '/cargo-ebike-tire-pressure',
                description: 'Reifendruck nach Beladung',
                icon: '📦',
              },
              {
                title: 'PSI-Rechner',
                href: '/calculate',
                description: 'Individuelle Empfehlungen',
                icon: '🧮',
              },
            ]}
          />

          {/* Language links */}
          <div className="mt-8 text-center text-sm text-muted">
            Du bevorzugst englisch?{' '}
            <Link href="/ebike-tyre-pressure" className="text-brand hover:underline">
              UK-Version ansehen →
            </Link>
            {' '}|{' '}
            <Link href="/ebike-tire-pressure" className="text-brand hover:underline">
              US-Version ansehen →
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
