import React, { useState, useEffect } from 'react';
import { siteConfig } from '../config/site.js';

export default function Header({ onTriggerMotion, isMotionActive, soundEnabled, onToggleSound }) {
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['work', 'about', 'experience', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            return;
          }
        }
      }
      if (window.scrollY < 300) {
        setActiveSection('hero');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Escape key closes mobile menu
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="site-header">
      <a href="#hero" className="wordmark" aria-label={`${siteConfig.identity.fullName} Home`}>
        {siteConfig.identity.displayName}
        <span>.</span>
      </a>

      {/* Desktop Navigation */}
      <nav aria-label="Main Navigation">
        <ul className="desktop-nav">
          <li>
            <a href="#work" className={activeSection === 'work' ? 'active' : ''}>
              Work
            </a>
          </li>
          <li>
            <a href="#about" className={activeSection === 'about' ? 'active' : ''}>
              About & Process
            </a>
          </li>
          {siteConfig.preferences.showExperience && (
            <li>
              <a href="#experience" className={activeSection === 'experience' ? 'active' : ''}>
                Experience
              </a>
            </li>
          )}
          <li>
            <a href="#contact" className={activeSection === 'contact' ? 'active' : ''}>
              Contact
            </a>
          </li>
        </ul>
      </nav>

      {/* Header Actions */}
      <div className="header-actions">
        {/* Audio Synthesizer Toggle */}
        <button
          type="button"
          onClick={onToggleSound}
          className="audio-btn"
          aria-label={soundEnabled ? "Mute audio synthesis" : "Enable audio synthesis"}
          title={soundEnabled ? "Audio On" : "Audio Muted"}
        >
          <span>{soundEnabled ? '🔊' : '🔇'}</span>
          <span>{soundEnabled ? 'Sound' : 'Muted'}</span>
        </button>

        {/* SPECIFICATION: Header Motion Pill Button */}
        <button
          type="button"
          onClick={onTriggerMotion}
          className={`motion-trigger-btn ${isMotionActive ? 'active' : ''}`}
          aria-label="Trigger Swarm Antigravity Animation"
          aria-pressed={isMotionActive}
        >
          <span className="dot"></span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"/>
            <path d="M12 2v3"/>
            <path d="M12 19v3"/>
            <path d="M2 12h3"/>
            <path d="M19 12h3"/>
            <path d="m4.93 4.93 2.12 2.12"/>
            <path d="m16.95 16.95 2.12 2.12"/>
            <path d="m4.93 19.07 2.12-2.12"/>
            <path d="m16.95 7.05 2.12-2.12"/>
          </svg>
          <span>Motion</span>
        </button>

        {/* Contact CTA */}
        <a href="#contact" className="header-contact-btn">
          <span>Get in Touch</span>
        </a>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          className="menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: '66px',
            left: 0,
            right: 0,
            background: 'rgba(9, 9, 9, 0.98)',
            borderBottom: '1px solid var(--line)',
            padding: '24px var(--gutter)',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            zIndex: 99
          }}
        >
          <a
            href="#work"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontSize: '18px', fontWeight: 700, color: 'var(--ink)' }}
          >
            Work
          </a>
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontSize: '18px', fontWeight: 700, color: 'var(--ink)' }}
          >
            About & Process
          </a>
          {siteConfig.preferences.showExperience && (
            <a
              href="#experience"
              onClick={() => setMobileMenuOpen(false)}
              style={{ fontSize: '18px', fontWeight: 700, color: 'var(--ink)' }}
            >
              Experience
            </a>
          )}
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontSize: '18px', fontWeight: 700, color: 'var(--ink)' }}
          >
            Contact
          </a>
        </div>
      )}
    </header>
  );
}

