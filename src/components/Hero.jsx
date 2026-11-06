import React, { useState } from 'react';
import { siteConfig } from '../config/site.js';
import { soundFx } from '../utils/audio.js';

export default function Hero({ onTriggerMotion }) {
  const { identity, metrics } = siteConfig;
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 12, y: -y * 12 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section id="hero" className="hero" data-swarm>
      {/* Top Bar: Profession & Availability */}
      <div className="hero-top">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span className="hero-top-role">{identity.profession}</span>
          <span style={{ color: 'var(--line)' }}>/</span>
          <span style={{ fontSize: '10px', color: 'var(--muted)', fontFamily: 'monospace' }}>
            LAT 26.8467° N · LON 80.9462° E
          </span>
        </div>
        <div className="availability">
          <i></i>
          <span>{identity.availability}</span>
        </div>
      </div>

      {/* Massive Background Display Text matching reference */}
      <div className="hero-title-bg display" aria-hidden="true">
        {identity.displayName}
      </div>

      {/* Overlapping Portrait Layer with 3D Tilt & Cybernetic HUD */}
      {identity.portrait && (
        <div
          className="hero-portrait"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            perspective: '1000px',
            pointerEvents: 'auto'
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
              transition: 'transform 200ms cubic-bezier(0.16, 1, 0.3, 1)',
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Holographic Corner Reticles */}
            <div
              style={{
                position: 'absolute',
                top: '12%',
                left: '8%',
                width: '28px',
                height: '28px',
                borderTop: '2px solid var(--red)',
                borderLeft: '2px solid var(--red)',
                pointerEvents: 'none',
                zIndex: 4,
                boxShadow: '-2px -2px 10px var(--red-glow)'
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '12%',
                right: '8%',
                width: '28px',
                height: '28px',
                borderTop: '2px solid var(--red)',
                borderRight: '2px solid var(--red)',
                pointerEvents: 'none',
                zIndex: 4,
                boxShadow: '2px -2px 10px var(--red-glow)'
              }}
            />

            {/* Floating Telemetry Tag */}
            <div
              style={{
                position: 'absolute',
                top: '16%',
                right: '10%',
                background: 'rgba(14, 14, 18, 0.85)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(227, 43, 60, 0.35)',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '10px',
                fontWeight: 700,
                color: 'var(--ink)',
                fontFamily: 'monospace',
                letterSpacing: '0.08em',
                zIndex: 4,
                boxShadow: '0 8px 20px rgba(0,0,0,0.5)'
              }}
            >
              <span style={{ color: 'var(--red)', marginRight: '6px' }}>●</span>
              SYS: AUTONOMOUS // ACTIVE
            </div>

            <img
              src={identity.portrait}
              alt={identity.fullName}
              width="640"
              height="860"
              loading="eager"
              fetchPriority="high"
            />
          </div>
        </div>
      )}

      {/* Foreground Hero Intro */}
      <div className="hero-intro">
        <div className="handwriting">
          {identity.greeting || "Hello, I am"}
        </div>
        <h1 className="display">
          {identity.fullName}
          <span>.</span>
        </h1>
        <div className="hero-role">
          {identity.roleLine2 || identity.profession}
        </div>
        <p className="hero-description">
          {identity.intro}
        </p>

        <div className="hero-actions-row">
          <a
            href="#work"
            className="primary-link"
            onMouseEnter={() => soundFx.playHover()}
            onClick={() => soundFx.playClick()}
          >
            <span>Explore Work</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>

          {/* Inline Swarm Motion Button */}
          <button
            type="button"
            onClick={() => {
              soundFx.playImpulse();
              onTriggerMotion();
            }}
            onMouseEnter={() => soundFx.playHover()}
            className="motion-trigger-btn"
            style={{ padding: '12px 22px', fontSize: '13px' }}
          >
            <span className="dot"></span>
            <span>Simulate Swarm</span>
          </button>
        </div>

        <div className="hero-location">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span>{identity.location}</span>
        </div>
      </div>

      {/* Right Side Metrics Card */}
      {metrics && metrics.length > 0 && (
        <div className="hero-side">
          <div className="hero-stats">
            {metrics.map((item, idx) => (
              <div key={idx} className="hero-stat-item">
                <span className="hero-stat-number display">
                  {item.value}
                </span>
                <span className="hero-stat-label">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
