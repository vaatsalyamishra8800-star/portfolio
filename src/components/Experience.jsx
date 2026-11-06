import React from 'react';
import { siteConfig } from '../config/site.js';
import { experiences, education } from '../data/experience.js';

export default function Experience() {
  const { preferences, identity } = siteConfig;

  if (!preferences.showExperience && !preferences.showEducation) return null;

  return (
    <section id="experience" className="section-wrap" data-swarm>
      <div className="section-heading">
        <span className="eyebrow">Career & Credentials</span>
        <h2 className="display">Experience & Education</h2>
        <p>
          Verified industry experience, fintech analytics internships, and academic foundation.
        </p>
      </div>

      <div className="timeline-list">
        {/* Work Experience */}
        {preferences.showExperience && experiences.map((exp, idx) => (
          <div key={idx} className="timeline-row" data-swarm>
            <div className="timeline-header">
              <div>
                <h3 className="timeline-role">{exp.role}</h3>
                <span className="timeline-org">{exp.organization}</span>
              </div>
              <span className="timeline-date">{exp.period}</span>
            </div>

            <p className="timeline-desc">{exp.description}</p>

            {exp.highlights && exp.highlights.length > 0 && (
              <ul className="timeline-bullets">
                {exp.highlights.map((h, hIdx) => (
                  <li key={hIdx}>{h}</li>
                ))}
              </ul>
            )}
          </div>
        ))}

        {/* Education */}
        {preferences.showEducation && education.map((edu, idx) => (
          <div key={`edu-${idx}`} className="timeline-row" style={{ borderLeft: '3px solid var(--red)' }} data-swarm>
            <div className="timeline-header">
              <div>
                <h3 className="timeline-role">{edu.degree}</h3>
                <span className="timeline-org">{edu.institution}</span>
              </div>
              <span className="timeline-date">{edu.period}</span>
            </div>

            <p className="timeline-desc">{edu.details}</p>
          </div>
        ))}

        {/* Resume Card with View & Download */}
        {preferences.showDownloadResume && identity.resume && (
          <div
            style={{
              marginTop: '20px',
              background: 'linear-gradient(135deg, rgba(227, 43, 60, 0.08) 0%, rgba(16, 16, 20, 0.95) 100%)',
              border: '1px solid rgba(227, 43, 60, 0.35)',
              borderRadius: 'var(--radius-lg)',
              padding: '28px 32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '20px'
            }}
            data-swarm
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--red)', boxShadow: '0 0 8px var(--red)' }} />
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--red)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Official Document
                </span>
              </div>
              <h3 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--ink)', marginBottom: '4px' }}>
                Vaatsalya Mishra — Verified Resume
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--muted)' }}>
                2 Pages PDF · B.Tech (AI) at PSIT Kanpur · Data Analytics & Multi-Agent SWE
              </p>
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a
                href={identity.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="primary-link"
                style={{ padding: '10px 20px', fontSize: '12.5px' }}
              >
                <span>View in Browser</span>
                <span style={{ fontSize: '11px' }}>↗</span>
              </a>
              <a
                href={identity.resume}
                download="Vaatsalya_Mishra_Resume.pdf"
                className="motion-trigger-btn"
                style={{ padding: '10px 20px', fontSize: '12.5px' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span>Download PDF</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

