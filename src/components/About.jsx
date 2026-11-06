import React from 'react';
import { siteConfig } from '../config/site.js';
import { skillsCategories, processSteps, certifications, hackathons } from '../data/experience.js';

export default function About() {
  const { identity, preferences } = siteConfig;

  return (
    <section id="about" className="section-wrap" data-swarm>
      <div className="section-heading">
        <span className="eyebrow">Philosophy & Competencies</span>
        <h2 className="display">About & Methodology</h2>
        <p>
          Principled engineering driven by algorithmic rigor, high throughput, and reproducible intelligence.
        </p>
      </div>

      <div className="about-grid">
        {/* Left Column: Biography & Process */}
        <div>
          <p className="about-bio">
            {identity.about}
          </p>

          <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '20px', color: 'var(--ink)' }}>
            Engineering Process
          </h3>
          <div className="process-list">
            {processSteps.map((step) => (
              <div key={step.step} className="process-card" data-swarm>
                <div className="process-num display">{step.step}</div>
                <div>
                  <h4>{step.title}</h4>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Skills Matrix & Certifications */}
        <div>
          <div className="skills-container">
            {skillsCategories.map((cat, idx) => (
              <div key={idx} className="skill-category-block" data-swarm>
                <h4>{cat.name}</h4>
                <div className="skill-tags">
                  {cat.skills.map((skill, sIdx) => (
                    <span key={sIdx} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            {preferences.showAwards && certifications.length > 0 && (
              <div className="skill-category-block" style={{ marginTop: '16px' }} data-swarm>
                <h4>Verified Certifications</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {certifications.map((cert, cIdx) => (
                    <div
                      key={cIdx}
                      style={{
                        padding: '12px 16px',
                        borderRadius: '8px',
                        background: 'var(--panel)',
                        border: '1px solid var(--line)',
                        fontSize: '13px',
                        color: 'var(--ink)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <span style={{ fontWeight: 600 }}>{cert.title}</span>
                      <span style={{ color: 'var(--red)', fontSize: '11px', fontFamily: 'monospace' }}>
                        {cert.year}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {hackathons.length > 0 && (
              <div className="skill-category-block" style={{ marginTop: '16px' }} data-swarm>
                <h4>Hackathons & Challenges</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {hackathons.map((hack, hIdx) => (
                    <div
                      key={hIdx}
                      style={{
                        padding: '10px 14px',
                        borderRadius: '6px',
                        background: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid var(--line)',
                        fontSize: '12.5px',
                        color: 'var(--muted)'
                      }}
                    >
                      ⚡ {hack}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

