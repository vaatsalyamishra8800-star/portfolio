import React, { useState } from 'react';
import { siteConfig } from '../config/site.js';

export default function Contact() {
  const { contact, identity } = siteConfig;
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // Static site safe contact handling: open formatted mailto link
    const subject = encodeURIComponent(`Inquiry from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  // WhatsApp helper
  const getWhatsAppUrl = () => {
    if (!contact.whatsapp) return '';
    const digits = contact.whatsapp.replace(/\D/g, '');
    const msg = encodeURIComponent(`Hi ${identity.displayName}, I came across your portfolio and would like to discuss a project.`);
    return `https://wa.me/${digits}?text=${msg}`;
  };

  return (
    <section id="contact" className="section-wrap" data-swarm>
      <div className="section-heading">
        <span className="eyebrow">Initiate Contact</span>
        <h2 className="display">Let's Connect</h2>
        <p>
          Available for software engineering roles, data analytics pipelines, and AI architecture consulting.
        </p>
      </div>

      <div className="contact-container">
        {/* Left: Direct Channels */}
        <div>
          <div style={{ fontSize: '18px', color: '#ccc', lineHeight: 1.7, marginBottom: '24px' }}>
            Have an engineering role, distributed systems project, or fintech data problem to discuss? Send an inquiry or reach out directly.
          </div>

          <div className="contact-options">
            <a href={`mailto:${contact.email}`} className="contact-pill-link">
              <div>
                <span style={{ fontSize: '11px', color: 'var(--red)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Direct Email
                </span>
                <span>{contact.email}</span>
              </div>
              <span>&rarr;</span>
            </a>

            {contact.whatsapp && (
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-pill-link"
              >
                <div>
                  <span style={{ fontSize: '11px', color: '#10b981', display: 'block', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    WhatsApp Direct
                  </span>
                  <span>{contact.phone || contact.whatsapp}</span>
                </div>
                <span>&rarr;</span>
              </a>
            )}

            {contact.linkedin && (
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-pill-link"
              >
                <div>
                  <span style={{ fontSize: '11px', color: '#0a66c2', display: 'block', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    LinkedIn
                  </span>
                  <span>linkedin.com/in/vaatsalyamishra</span>
                </div>
                <span>&rarr;</span>
              </a>
            )}

            {contact.github && (
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-pill-link"
              >
                <div>
                  <span style={{ fontSize: '11px', color: 'var(--muted)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    GitHub
                  </span>
                  <span>github.com/vaatsalyamishra8800-star</span>
                </div>
                <span>&rarr;</span>
              </a>
            )}
          </div>
        </div>

        {/* Right: Message Form */}
        <form className="contact-form" onSubmit={handleSubmit} data-swarm>
          <div className="form-field">
            <label htmlFor="form-name">Your Name</label>
            <input
              id="form-name"
              type="text"
              required
              placeholder="Ada Lovelace"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="form-field">
            <label htmlFor="form-email">Email Address</label>
            <input
              id="form-email"
              type="email"
              required
              placeholder="ada@domain.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="form-field">
            <label htmlFor="form-msg">Inquiry Details</label>
            <textarea
              id="form-msg"
              rows={4}
              required
              placeholder="Tell me about your project, timeline, or engineering role..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="primary-link"
            style={{ justifyContent: 'center', marginTop: '8px' }}
          >
            <span>Send Message</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>

          {submitted && (
            <p style={{ fontSize: '12px', color: '#10b981', textAlign: 'center' }}>
              ✓ Mail draft opened in your email client!
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

