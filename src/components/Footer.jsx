import React from 'react';
import { siteConfig } from '../config/site.js';

export default function Footer({ onTriggerMotion }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div>
        <a href="#hero" className="wordmark" style={{ fontSize: '20px' }}>
          {siteConfig.identity.displayName}
          <span>.</span>
        </a>
        <div style={{ marginTop: '6px', fontSize: '12px', color: 'var(--muted)' }}>
          &copy; {currentYear} {siteConfig.identity.fullName}. All authentic rights reserved.
        </div>
      </div>

      <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
        <button
          type="button"
          onClick={onTriggerMotion}
          style={{ fontSize: '12.5px', color: 'var(--red)', fontWeight: 600 }}
        >
          ⚡ Swarm Antigravity
        </button>
        <a href="#hero" style={{ fontSize: '12.5px', color: 'var(--muted)' }}>
          Back to Top &uarr;
        </a>
      </div>
    </footer>
  );
}

