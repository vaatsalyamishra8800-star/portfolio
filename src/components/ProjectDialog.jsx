import React, { useEffect } from 'react';

export default function ProjectDialog({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      className="dialog-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-project-title"
    >
      <div
        className="dialog-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="dialog-close"
          onClick={onClose}
          aria-label="Close Project Details"
        >
          ✕
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <span className="project-category-tag">{project.category}</span>
          {project.year && <span className="project-year">{project.year}</span>}
        </div>

        <h2 id="dialog-project-title" style={{ fontSize: '32px', fontWeight: 800, marginBottom: '12px', color: 'var(--ink)' }}>
          {project.title}
        </h2>

        <div style={{ fontSize: '13px', color: 'var(--red)', fontWeight: 700, marginBottom: '20px' }}>
          Role: {project.role}
        </div>

        <p style={{ fontSize: '15.5px', lineHeight: 1.75, color: '#d8d5d1', marginBottom: '28px' }}>
          {project.description}
        </p>

        {project.highlights && project.highlights.length > 0 && (
          <div style={{ marginBottom: '28px' }}>
            <h4 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--red)', marginBottom: '12px' }}>
              Architectural Highlights
            </h4>
            <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', color: 'var(--muted)' }}>
              {project.highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          </div>
        )}

        {project.tools && project.tools.length > 0 && (
          <div style={{ marginBottom: '32px' }}>
            <h4 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--red)', marginBottom: '12px' }}>
              Technologies & Tools
            </h4>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {project.tools.map((t, i) => (
                <span
                  key={i}
                  style={{
                    padding: '5px 12px',
                    borderRadius: '6px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--line)',
                    fontSize: '12px',
                    color: 'var(--ink)',
                    fontFamily: 'monospace'
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}

        <div style={{ display: 'flex', gap: '14px', borderTop: '1px solid var(--line)', paddingTop: '24px' }}>
          {project.sourceUrl && (
            <a
              href={project.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="primary-link"
              style={{ padding: '10px 20px', fontSize: '12.5px' }}
            >
              <span>View Source / Repository</span> &rarr;
            </a>
          )}
          {project.liveUrl && project.liveUrl !== '#playground' && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="motion-trigger-btn"
              style={{ padding: '10px 20px', fontSize: '12.5px' }}
            >
              <span>Live Deployment</span> &rarr;
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

