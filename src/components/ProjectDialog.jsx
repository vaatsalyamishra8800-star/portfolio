import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function ProjectDialog({ project, onClose }) {
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    // Lock body scroll while dialog is open
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [project, onClose]);

  if (!project) return null;

  const modalContent = (
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

        {/* Graphic Banner */}
        <div
          style={{
            height: '140px',
            borderRadius: '14px',
            background: project.coverGradient || 'linear-gradient(135deg, rgba(227,43,60,0.3) 0%, rgba(14,14,18,0.95) 100%)',
            marginBottom: '24px',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '16px 20px',
            border: '1px solid rgba(255,255,255,0.08)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 1 }}>
            <span className="project-category-tag">{project.category}</span>
            {project.year && <span className="project-year" style={{ color: '#fff', fontWeight: 600 }}>{project.year}</span>}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', zIndex: 1 }}>
            <span style={{ fontSize: '11px', fontFamily: 'monospace', color: 'rgba(242,239,235,0.85)', letterSpacing: '0.08em' }}>
              SYS_ID // {project.id.toUpperCase()}
            </span>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--red)', boxShadow: '0 0 10px var(--red)' }} />
          </div>
        </div>

        <h2 id="dialog-project-title" style={{ fontSize: '30px', fontWeight: 800, marginBottom: '8px', color: 'var(--ink)', lineHeight: 1.2 }}>
          {project.title}
        </h2>

        <div style={{ fontSize: '13px', color: 'var(--red)', fontWeight: 700, marginBottom: '20px', letterSpacing: '0.04em' }}>
          Role: {project.role}
        </div>

        <p style={{ fontSize: '15px', lineHeight: 1.75, color: '#e2dfda', marginBottom: '28px' }}>
          {project.description}
        </p>

        {project.highlights && project.highlights.length > 0 && (
          <div style={{ marginBottom: '28px' }}>
            <h4 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--red)', marginBottom: '12px', fontWeight: 700 }}>
              Architectural Highlights & Capabilities
            </h4>
            <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', color: '#c5c2be' }}>
              {project.highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          </div>
        )}

        {project.tools && project.tools.length > 0 && (
          <div style={{ marginBottom: '32px' }}>
            <h4 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--red)', marginBottom: '12px', fontWeight: 700 }}>
              Technologies & Tools
            </h4>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {project.tools.map((t, i) => (
                <span
                  key={i}
                  style={{
                    padding: '6px 13px',
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

        <div style={{ display: 'flex', gap: '14px', borderTop: '1px solid var(--line)', paddingTop: '24px', flexWrap: 'wrap' }}>
          {project.sourceUrl && (
            <a
              href={project.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="primary-link"
              style={{ padding: '11px 22px', fontSize: '13px' }}
            >
              <span>View Source Code</span> &rarr;
            </a>
          )}
          {project.liveUrl && project.liveUrl !== '#playground' && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="motion-trigger-btn"
              style={{ padding: '11px 22px', fontSize: '13px' }}
            >
              <span>Live Deployment</span> &rarr;
            </a>
          )}
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '11px 20px',
              fontSize: '13px',
              color: 'var(--muted)',
              border: '1px solid var(--line)',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(255,255,255,0.02)',
              marginLeft: 'auto'
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined'
    ? createPortal(modalContent, document.body)
    : modalContent;
}

