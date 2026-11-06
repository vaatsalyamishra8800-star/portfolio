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

        {/* Download Resume Link */}
        {preferences.showDownloadResume && identity.resume && (
          <div style={{ marginTop: '16px' }}>
            <a
              href={identity.resume}
              download
              className="primary-link"
              style={{ display: 'inline-flex', padding: '12px 24px' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Download Verified Resume (PDF)</span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

