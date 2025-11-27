import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'E-Bike PSI - Professional Tire Pressure Calculator';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0f172a',
          backgroundImage: 'linear-gradient(135deg, #0f172a 0%, #0c4a6e 50%, #0f172a 100%)',
        }}
      >
        {/* Grid Background */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.1,
            display: 'flex',
          }}
        >
          <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0EA5E9" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Main Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 32,
            zIndex: 10,
          }}
        >
          {/* Logo/Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 120,
              height: 120,
              borderRadius: 24,
              background: 'linear-gradient(135deg, #0EA5E9 0%, #06B6D4 100%)',
              boxShadow: '0 20px 60px rgba(14, 165, 233, 0.4)',
            }}
          >
            <span
              style={{
                fontSize: 48,
                fontWeight: 900,
                color: 'white',
                letterSpacing: -1,
              }}
            >
              PSI
            </span>
          </div>

          {/* Title */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 16,
            }}
          >
            <h1
              style={{
                fontSize: 72,
                fontWeight: 900,
                color: 'white',
                margin: 0,
                letterSpacing: -2,
                textAlign: 'center',
              }}
            >
              E-BIKE PSI
            </h1>
            <div
              style={{
                fontSize: 32,
                fontWeight: 700,
                background: 'linear-gradient(90deg, #38BDF8 0%, #06B6D4 100%)',
                backgroundClip: 'text',
                color: 'transparent',
                margin: 0,
                letterSpacing: 1,
              }}
            >
              ENGINEERED PRECISION
            </div>
          </div>

          {/* Description */}
          <p
            style={{
              fontSize: 28,
              color: '#94a3b8',
              margin: 0,
              textAlign: 'center',
              maxWidth: 800,
            }}
          >
            Professional tire pressure calculator for all e-bike models
          </p>

          {/* Features Badge */}
          <div
            style={{
              display: 'flex',
              gap: 24,
              marginTop: 16,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 24px',
                backgroundColor: 'rgba(14, 165, 233, 0.15)',
                borderRadius: 12,
                border: '2px solid rgba(14, 165, 233, 0.3)',
              }}
            >
              <span style={{ fontSize: 24, color: '#0EA5E9' }}>✓</span>
              <span style={{ fontSize: 20, color: '#e2e8f0', fontWeight: 600 }}>
                Load-Aware Algorithm
              </span>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 24px',
                backgroundColor: 'rgba(249, 115, 22, 0.15)',
                borderRadius: 12,
                border: '2px solid rgba(249, 115, 22, 0.3)',
              }}
            >
              <span style={{ fontSize: 24, color: '#F97316' }}>⚠</span>
              <span style={{ fontSize: 20, color: '#e2e8f0', fontWeight: 600 }}>
                Real-Time Safety
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            position: 'absolute',
            bottom: 32,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <span
            style={{
              fontSize: 20,
              color: '#64748b',
              fontFamily: 'monospace',
              letterSpacing: 2,
            }}
          >
            ebikepsi.com
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
