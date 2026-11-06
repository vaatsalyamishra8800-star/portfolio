/**
 * SwarmAntigravity.jsx
 * 
 * React component and custom hook wrapper for Swarm Antigravity Rebuild Engine.
 * Supports React 16.8+ (Hooks), Next.js (SSR safe with client guard), and Vite.
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import SwarmAntigravityCore from './swarmAntigravity.js';

/**
 * Custom hook to control Swarm Antigravity
 */
export function useSwarmAntigravity(options = {}) {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState(0);
  const engineRef = useRef(null);

  useEffect(() => {
    // SSR safety check
    if (typeof window === 'undefined') return;

    engineRef.current = new SwarmAntigravityCore.SwarmEngine({
      ...options,
      onStart: () => {
        setIsActive(true);
        setPhase(1);
        if (options.onStart) options.onStart();
      },
      onPhaseChange: (p) => {
        setPhase(p);
        if (options.onPhaseChange) options.onPhaseChange(p);
      },
      onComplete: () => {
        setIsActive(false);
        setPhase(0);
        if (options.onComplete) options.onComplete();
      },
      onCancel: (reason) => {
        setIsActive(false);
        setPhase(0);
        if (options.onCancel) options.onCancel(reason);
      }
    });

    return () => {
      if (engineRef.current && engineRef.current.isRunning) {
        engineRef.current.cancel('Component unmounted');
      }
    };
  }, [options.wrapperSelector, options.soundEnabled]);

  const trigger = useCallback(() => {
    if (engineRef.current) {
      return engineRef.current.start();
    }
    return false;
  }, []);

  const cancel = useCallback((reason) => {
    if (engineRef.current) {
      engineRef.current.cancel(reason);
    }
  }, []);

  return { trigger, cancel, isActive, phase };
}

/**
 * Header "Motion" pill button component
 */
export function MotionButton({ 
  onClick, 
  isActive = false, 
  className = '', 
  label = 'Motion',
  style = {} 
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`swarm-motion-btn ${isActive ? 'active' : ''} ${className}`}
      aria-label="Trigger Swarm Antigravity Animation"
      aria-pressed={isActive}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '7px 16px',
        borderRadius: '9999px',
        fontSize: '13px',
        fontWeight: '600',
        letterSpacing: '0.02em',
        color: '#f2efeb',
        background: isActive ? 'rgba(227, 43, 60, 0.18)' : 'rgba(255, 255, 255, 0.05)',
        border: isActive ? '1px solid #e32b3c' : '1px solid rgba(255, 255, 255, 0.12)',
        cursor: 'pointer',
        transition: 'all 200ms cubic-bezier(0.16, 1, 0.3, 1)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        boxShadow: isActive ? '0 0 16px rgba(227, 43, 60, 0.35)' : 'none',
        ...style
      }}
    >
      {/* Glowing status dot */}
      <span
        style={{
          width: '7px',
          height: '7px',
          borderRadius: '50%',
          backgroundColor: '#e32b3c',
          boxShadow: isActive 
            ? '0 0 8px #e32b3c, 0 0 14px #e32b3c' 
            : '0 0 4px #e32b3c',
          animation: 'swarmDotPulse 1.8s infinite ease-in-out'
        }}
      />

      {/* Orbit / Sparkle icon */}
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          color: isActive ? '#e32b3c' : '#f2efeb',
          transition: 'transform 300ms ease',
          transform: isActive ? 'rotate(90deg)' : 'none'
        }}
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3" />
        <path d="M12 19v3" />
        <path d="M2 12h3" />
        <path d="M19 12h3" />
        <path d="m4.93 4.93 2.12 2.12" />
        <path d="m16.95 16.95 2.12 2.12" />
        <path d="m4.93 19.07 2.12-2.12" />
        <path d="m16.95 7.05 2.12-2.12" />
      </svg>

      <span>{label}</span>
    </button>
  );
}

/**
 * Self-contained Standalone Swarm Component
 */
export default function SwarmAntigravity({
  wrapperSelector = '#content-wrapper',
  soundEnabled = true,
  renderTrigger = true,
  buttonLabel = 'Motion',
  onStart,
  onComplete,
  onCancel,
  buttonStyle = {}
}) {
  const { trigger, isActive } = useSwarmAntigravity({
    wrapperSelector,
    soundEnabled,
    onStart,
    onComplete,
    onCancel
  });

  if (!renderTrigger) return null;

  return (
    <MotionButton
      onClick={trigger}
      isActive={isActive}
      label={buttonLabel}
      style={buttonStyle}
    />
  );
}

