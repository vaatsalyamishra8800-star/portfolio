import React, { useState } from 'react';
import { soundFx } from '../utils/audio.js';

export default function PhysicsPlayground({ onTriggerMotion }) {
  const [activeTab, setActiveTab] = useState('physics');

  return (
    <section id="playground" className="section-wrap" style={{ background: 'linear-gradient(180deg, rgba(16,16,20,0.6) 0%, rgba(9,9,9,0.9) 100%)' }} data-swarm>
      <div className="section-heading">
        <span className="eyebrow">Kinetic Physics Architecture</span>
        <h2 className="display">Swarm Antigravity Deck</h2>
        <p>
          Real-time DOM sampling, zero-g vortex curl forces, and damped harmonic spring reassembly.
        </p>
      </div>

      <div
        style={{
          background: 'var(--panel)',
          border: '1px solid rgba(227, 43, 60, 0.35)',
          borderRadius: 'var(--radius-lg)',
          padding: '36px',
          boxShadow: '0 16px 40px rgba(0, 0, 0, 0.6), 0 0 24px rgba(227, 43, 60, 0.15)',
          position: 'relative',
          overflow: 'hidden'
        }}
        data-swarm
      >
        {/* Holographic Top Banner */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--red)', boxShadow: '0 0 10px var(--red)' }} />
            <span style={{ fontSize: '12px', fontWeight: 700, fontFamily: 'monospace', color: 'var(--ink)', letterSpacing: '0.08em' }}>
              TELEMETRY :: 60 FPS HTML5 CANVAS ENGINE
            </span>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              onClick={() => {
                soundFx.playImpulse();
                onTriggerMotion();
              }}
              className="primary-link"
              style={{ padding: '8px 18px', fontSize: '12px' }}
            >
              <span>Trigger Full Cycle (3,500ms)</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </button>
          </div>
        </div>

        {/* 4-Stage State Machine Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '32px' }}>
          {/* Phase 1 */}
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--line)', borderRadius: '10px', padding: '16px' }} data-swarm>
            <div style={{ fontSize: '10.5px', color: 'var(--red)', fontWeight: 700, fontFamily: 'monospace', marginBottom: '4px' }}>
              01 // 0ms - 600ms
            </div>
            <h4 style={{ fontSize: '15px', color: 'var(--ink)', marginBottom: '8px' }}>DOM Capture</h4>
            <p style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: 1.5 }}>
              Samples visible elements, computes CSS colors, and spawns 2,200 particles with exact home coordinates.
            </p>
          </div>

          {/* Phase 2 */}
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--line)', borderRadius: '10px', padding: '16px' }} data-swarm>
            <div style={{ fontSize: '10.5px', color: 'var(--red)', fontWeight: 700, fontFamily: 'monospace', marginBottom: '4px' }}>
              02 // 600ms - 2200ms
            </div>
            <h4 style={{ fontSize: '15px', color: 'var(--ink)', marginBottom: '8px' }}>Zero-G Vortex</h4>
            <p style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: 1.5 }}>
              Applies upward buoyancy (vy -= 0.08) and 2D tangential curl forces with real-time 140px cursor repulsion.
            </p>
          </div>

          {/* Phase 3 */}
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--line)', borderRadius: '10px', padding: '16px' }} data-swarm>
            <div style={{ fontSize: '10.5px', color: 'var(--red)', fontWeight: 700, fontFamily: 'monospace', marginBottom: '4px' }}>
              03 // 2200ms - 3500ms
            </div>
            <h4 style={{ fontSize: '15px', color: 'var(--ink)', marginBottom: '8px' }}>Harmonic Springs</h4>
            <p style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: 1.5 }}>
              Damped harmonic springs pull nodes back to (originX, originY) with motion trails and constellation lines.
            </p>
          </div>

          {/* Phase 4 */}
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--line)', borderRadius: '10px', padding: '16px' }} data-swarm>
            <div style={{ fontSize: '10.5px', color: 'var(--red)', fontWeight: 700, fontFamily: 'monospace', marginBottom: '4px' }}>
              04 // 3500ms
            </div>
            <h4 style={{ fontSize: '15px', color: 'var(--ink)', marginBottom: '8px' }}>DOM Restoration</h4>
            <p style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: 1.5 }}>
              Restores DOM wrapper to opacity: 1, filter: none, transform: none. Teardown runs in a fail-safe finally block.
            </p>
          </div>
        </div>

        {/* Live Formula & Code Deck */}
        <div style={{ background: '#08080a', border: '1px solid var(--line)', borderRadius: '10px', padding: '20px', fontFamily: 'monospace', fontSize: '12px', color: '#c4c0bd', lineHeight: 1.7 }} data-swarm>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--red)', fontWeight: 700, marginBottom: '8px', fontSize: '11px' }}>
            <span>// PHYSICS ENGINE FORMULATION</span>
            <span>STATUS: READY</span>
          </div>
          <div><span style={{ color: '#ff7b72' }}>const</span> ax = (originX - x) * <span style={{ color: '#79c0ff' }}>0.085</span>; <span style={{ color: '#8b949e' }}>// Spring Stiffness</span></div>
          <div><span style={{ color: '#ff7b72' }}>const</span> ay = (originY - y) * <span style={{ color: '#79c0ff' }}>0.085</span>;</div>
          <div>vx = (vx + ax) * <span style={{ color: '#79c0ff' }}>0.82</span>; <span style={{ color: '#8b949e' }}>// Damping Factor</span></div>
          <div>vy = (vy + ay) * <span style={{ color: '#79c0ff' }}>0.82</span>;</div>
          <div><span style={{ color: '#8b949e' }}>// Interactive Cursor Field: 140px Inverse-Distance Impulse</span></div>
          <div><span style={{ color: '#ff7b72' }}>if</span> (cursorDist &lt; <span style={{ color: '#79c0ff' }}>140</span>) impulse = (1 - cursorDist / 140)² * <span style={{ color: '#79c0ff' }}>3.6</span>;</div>
        </div>
      </div>
    </section>
  );
}

