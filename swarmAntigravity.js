/**
 * Swarm Antigravity Rebuild Engine
 * 
 * Standalone, non-destructive particle physics effect for modern web applications.
 * Captures live DOM elements, shatters the page into 2,200 physics-driven particles,
 * simulates zero-gravity vortex forces with real-time cursor interaction, and magnetically
 * reassembles the DOM back into its exact coordinates using damped harmonic springs.
 * 
 * Reference: https://github.com/imperfec-t/swarm-Antigravity & Joel Califa's Swarm
 */

function createSwarmAntigravityEngine() {
  'use strict';

  // Constants & Physics Parameters
  const PARTICLE_COUNT = 2200;
  const TOTAL_DURATION_MS = 3500;
  const PHASE_1_END_MS = 600;
  const PHASE_2_END_MS = 2200;
  const PHASE_3_END_MS = 3500;

  const DEFAULT_COLORS = {
    accent: '#e32b3c',
    text: '#f2efeb',
    muted: '#a09c9a',
    bgTrail: 'rgba(9, 9, 9, 0.28)'
  };

  const SPRING_STIFFNESS = 0.085;
  const SPRING_DAMPING = 0.82;
  const CURSOR_INFLUENCE_RADIUS = 140;
  const CURSOR_REPULSION_STRENGTH = 3.6;
  const ZERO_G_BUOYANCY = 0.08;

  // Global active instance tracker for single-instance guarantee
  let activeInstance = null;

  class SwarmEngine {
    constructor(options = {}) {
      this.options = Object.assign(
        {
          wrapperSelector: '#content-wrapper',
          headerSelector: 'header',
          soundEnabled: true,
          onPhaseChange: null,
          onStart: null,
          onComplete: null,
          onCancel: null
        },
        options
      );

      this.isRunning = false;
      this.currentPhase = 0; // 1, 2, 3, 4
      this.canvas = null;
      this.ctx = null;
      this.hudElement = null;
      this.particles = [];
      this.accentParticles = [];
      this.rafId = null;
      this.startTime = 0;
      this.dpr = window.devicePixelRatio || 1;
      this.width = window.innerWidth;
      this.height = window.innerHeight;

      this.mouseX = -9999;
      this.mouseY = -9999;
      this.prevMouseX = -9999;
      this.prevMouseY = -9999;
      this.mouseVelocity = 0;
      this.isPointerActive = false;
      this.shockwaves = [];

      this.wrapperEl = null;
      this.originalWrapperStyles = {
        opacity: '',
        filter: '',
        transform: '',
        transition: ''
      };

      // Sound synthesizer
      this.audioCtx = null;

      // Bound event handlers
      this._onKeyDown = this._handleKeyDown.bind(this);
      this._onResize = this._handleResize.bind(this);
      this._onMouseMove = this._handleMouseMove.bind(this);
      this._onMouseLeave = this._handleMouseLeave.bind(this);
      this._onTouchMove = this._handleTouchMove.bind(this);
      this._onTouchEnd = this._handleTouchEnd.bind(this);
    }

    /**
     * Check prefers-reduced-motion accessibility setting
     */
    static prefersReducedMotion() {
      return (
        window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      );
    }

    /**
     * Start the Swarm Antigravity sequence
     */
    start() {
      // If already active, treat trigger as cancel/abort
      if (this.isRunning) {
        this.cancel('Trigger toggled off');
        return false;
      }

      // If another instance is active, cancel it first
      if (activeInstance && activeInstance !== this) {
        activeInstance.cancel('Superseded by new instance');
      }

      // Respect prefers-reduced-motion
      if (SwarmEngine.prefersReducedMotion()) {
        this._notifyReducedMotion();
        return false;
      }

      // Locate content wrapper
      this.wrapperEl = document.querySelector(this.options.wrapperSelector) || document.body;
      if (!this.wrapperEl) {
        console.warn('[SwarmAntigravity] Content wrapper not found:', this.options.wrapperSelector);
        return false;
      }

      // Cache original styles for guaranteed restoration
      this.originalWrapperStyles = {
        opacity: this.wrapperEl.style.opacity,
        filter: this.wrapperEl.style.filter,
        transform: this.wrapperEl.style.transform,
        transition: this.wrapperEl.style.transition
      };

      this.isRunning = true;
      activeInstance = this;

      if (typeof this.options.onStart === 'function') {
        this.options.onStart();
      }

      try {
        this._initAudio();
        this._createCanvas();
        this._createHUD();
        this._bindEvents();

        // Sample DOM elements and spawn 2,200 particles
        this._sampleDOMAndSpawnParticles();

        // Start Phase 1 immediately
        this.startTime = performance.now();
        this.currentPhase = 1;
        this._applyPhase1WrapperStyles();
        this._updateHUD('SWARM ANTIGRAVITY: DECONSTRUCTING...', 'Phase 1/3');
        this._playDeconstructSound();

        // Launch 60FPS animation loop
        this._loop(this.startTime);
        return true;
      } catch (err) {
        console.error('[SwarmAntigravity] Initialization error:', err);
        this.cancel('Runtime error during start');
        return false;
      }
    }

    /**
     * Abort the animation safely and immediately restore DOM
     */
    cancel(reason = 'User cancelled') {
      if (!this.isRunning) return;

      try {
        if (typeof this.options.onCancel === 'function') {
          this.options.onCancel(reason);
        }
      } finally {
        this._cleanup();
      }
    }

    /**
     * Graceful completion cleanup
     */
    _complete() {
      try {
        this.currentPhase = 4;
        this._playRebuildCompleteSound();
        if (typeof this.options.onComplete === 'function') {
          this.options.onComplete();
        }
      } finally {
        this._cleanup();
      }
    }

    /**
     * Absolute fail-safe cleanup method
     */
    _cleanup() {
      this.isRunning = false;
      if (activeInstance === this) {
        activeInstance = null;
      }

      if (this.rafId) {
        cancelAnimationFrame(this.rafId);
        this.rafId = null;
      }

      this._unbindEvents();

      // Guaranteed DOM wrapper restoration
      if (this.wrapperEl) {
        this.wrapperEl.style.transition = 'opacity 320ms cubic-bezier(0.16, 1, 0.3, 1), filter 320ms cubic-bezier(0.16, 1, 0.3, 1), transform 320ms cubic-bezier(0.16, 1, 0.3, 1)';
        this.wrapperEl.style.opacity = this.originalWrapperStyles.opacity || '1';
        this.wrapperEl.style.filter = this.originalWrapperStyles.filter || 'none';
        this.wrapperEl.style.transform = this.originalWrapperStyles.transform || 'none';

        // Clear inline transition after animation completes
        setTimeout(() => {
          if (this.wrapperEl && !this.isRunning) {
            this.wrapperEl.style.transition = this.originalWrapperStyles.transition || '';
          }
        }, 350);
      }

      // Remove canvas and HUD
      if (this.canvas && this.canvas.parentNode) {
        this.canvas.parentNode.removeChild(this.canvas);
      }
      this.canvas = null;
      this.ctx = null;

      if (this.hudElement && this.hudElement.parentNode) {
        this.hudElement.parentNode.removeChild(this.hudElement);
      }
      this.hudElement = null;

      this.particles = [];
      this.accentParticles = [];
    }

    /**
     * Create high-DPI full-viewport canvas
     */
    _createCanvas() {
      this.canvas = document.createElement('canvas');
      this.canvas.id = 'swarm-antigravity-canvas';
      this.canvas.style.position = 'fixed';
      this.canvas.style.top = '0';
      this.canvas.style.left = '0';
      this.canvas.style.width = '100vw';
      this.canvas.style.height = '100vh';
      this.canvas.style.zIndex = '99998';
      this.canvas.style.pointerEvents = 'auto'; // Active for interactive stirring & click shockwaves
      this.canvas.style.cursor = 'crosshair';
      this.canvas.style.display = 'block';

      this.canvas.addEventListener('mousedown', (e) => {
        this._triggerShockwave(e.clientX, e.clientY);
      });
      this.canvas.addEventListener('touchstart', (e) => {
        if (e.touches && e.touches.length > 0) {
          this._triggerShockwave(e.touches[0].clientX, e.touches[0].clientY);
        }
      }, { passive: true });

      this._resizeCanvas();
      document.body.appendChild(this.canvas);
      this.ctx = this.canvas.getContext('2d', { alpha: true });
    }

    _triggerShockwave(x, y) {
      this.shockwaves.push({
        x: x,
        y: y,
        radius: 6,
        maxRadius: Math.max(380, this.width * 0.4),
        alpha: 1.0,
        strength: 7.2
      });
      this._playShockwaveSound();
    }

    /**
     * Scale canvas backing store for Retina / high-DPI displays
     */
    _resizeCanvas() {
      this.dpr = window.devicePixelRatio || 1;
      this.width = window.innerWidth;
      this.height = window.innerHeight;

      if (this.canvas) {
        this.canvas.width = Math.round(this.width * this.dpr);
        this.canvas.height = Math.round(this.height * this.dpr);
      }
    }

    /**
     * Create minimal live HUD status pill
     */
    _createHUD() {
      this.hudElement = document.createElement('div');
      this.hudElement.id = 'swarm-antigravity-hud';
      this.hudElement.setAttribute('role', 'status');
      this.hudElement.setAttribute('aria-live', 'polite');

      // Styles matching dark luxury theme
      Object.assign(this.hudElement.style, {
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%) translateY(0)',
        zIndex: '99999',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '8px 16px 8px 14px',
        borderRadius: '9999px',
        background: 'rgba(14, 14, 18, 0.88)',
        backdropFilter: 'blur(16px)',
        webkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(227, 43, 60, 0.35)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6), 0 0 16px rgba(227, 43, 60, 0.25)',
        color: '#f2efeb',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        fontSize: '12px',
        fontWeight: '600',
        letterSpacing: '0.06em',
        pointerEvents: 'auto',
        userSelect: 'none',
        transition: 'all 240ms cubic-bezier(0.16, 1, 0.3, 1)'
      });

      this.hudElement.innerHTML = `
        <span class="swarm-pulse-dot" style="
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #e32b3c;
          box-shadow: 0 0 10px #e32b3c;
          animation: swarmPulse 1.2s infinite ease-in-out;
          display: inline-block;
          flex-shrink: 0;
        "></span>
        <span class="swarm-equalizer" style="display:inline-flex;gap:2px;align-items:flex-end;height:12px;margin-right:2px;">
          <span style="width:2px;height:10px;background:#e32b3c;border-radius:1px;animation:swarmEq 0.5s infinite ease-in-out;"></span>
          <span style="width:2px;height:14px;background:#e32b3c;border-radius:1px;animation:swarmEq 0.35s infinite ease-in-out 0.1s;"></span>
          <span style="width:2px;height:8px;background:#e32b3c;border-radius:1px;animation:swarmEq 0.6s infinite ease-in-out 0.2s;"></span>
        </span>
        <span id="swarm-hud-text" style="color: #f2efeb; font-variant-numeric: tabular-nums; font-family: monospace; font-size: 11px;">
          SWARM ANTIGRAVITY: DECONSTRUCTING...
        </span>
        <span style="background:rgba(227,43,60,0.18);border:1px solid rgba(227,43,60,0.4);color:#f2efeb;padding:2px 7px;border-radius:4px;font-size:10px;font-family:monospace;letter-spacing:0.04em;">
          2,200 NODES
        </span>
        <span style="font-size:10px;color:#a09c9a;letter-spacing:0.02em;border-left:1px solid rgba(255,255,255,0.1);padding-left:8px;">
          CLICK: IMPULSE
        </span>
        <button id="swarm-hud-cancel" title="Click to abort effect (or press Esc)" style="
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.16);
          color: #a09c9a;
          border-radius: 6px;
          padding: 3px 8px;
          font-size: 10px;
          font-weight: 700;
          cursor: pointer;
          transition: all 150ms ease;
          display: flex;
          align-items: center;
          gap: 4px;
        ">
          <kbd style="font-family: inherit; font-weight: 800; color: #f2efeb;">ESC</kbd> ✕
        </button>
      `;

      // Cancel button event
      const cancelBtn = this.hudElement.querySelector('#swarm-hud-cancel');
      if (cancelBtn) {
        cancelBtn.addEventListener('mouseenter', () => {
          cancelBtn.style.background = 'rgba(227, 43, 60, 0.25)';
          cancelBtn.style.borderColor = 'rgba(227, 43, 60, 0.6)';
          cancelBtn.style.color = '#f2efeb';
        });
        cancelBtn.addEventListener('mouseleave', () => {
          cancelBtn.style.background = 'rgba(255, 255, 255, 0.08)';
          cancelBtn.style.borderColor = 'rgba(255, 255, 255, 0.16)';
          cancelBtn.style.color = '#a09c9a';
        });
        cancelBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.cancel('Cancelled via HUD pill button');
        });
      }

      // Add keyframe animation for pulse dot if not already in document
      if (!document.getElementById('swarm-keyframes')) {
        const style = document.createElement('style');
        style.id = 'swarm-keyframes';
        style.textContent = `
          @keyframes swarmPulse {
            0%, 100% { transform: scale(0.9); opacity: 0.7; box-shadow: 0 0 6px #e32b3c; }
            50% { transform: scale(1.3); opacity: 1; box-shadow: 0 0 16px #e32b3c; }
          }
          @keyframes swarmEq {
            0%, 100% { transform: scaleY(0.35); opacity: 0.5; }
            50% { transform: scaleY(1.3); opacity: 1; }
          }
        `;
        document.head.appendChild(style);
      }

      document.body.appendChild(this.hudElement);
    }

    /**
     * Update HUD text label
     */
    _updateHUD(text) {
      if (!this.hudElement) return;
      const textEl = this.hudElement.querySelector('#swarm-hud-text');
      if (textEl) {
        textEl.textContent = text;
      }
    }

    /**
     * Notify user if prefers-reduced-motion is active
     */
    _notifyReducedMotion() {
      const toast = document.createElement('div');
      Object.assign(toast.style, {
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: '99999',
        padding: '10px 18px',
        borderRadius: '9999px',
        background: 'rgba(18, 18, 22, 0.95)',
        border: '1px solid #e32b3c',
        color: '#f2efeb',
        fontSize: '13px',
        fontWeight: '500',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
        transition: 'opacity 300ms ease'
      });
      toast.textContent = 'Swarm Motion skipped (prefers-reduced-motion enabled)';
      document.body.appendChild(toast);
      setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
      }, 2400);
    }

    /**
     * Sample visible DOM elements and spawn 2,200 particles
     */
    _sampleDOMAndSpawnParticles() {
      const selector = 'h1, h2, h3, h4, h5, h6, p, span, button, a, img, article, [data-swarm], .card, .tag, input, textarea, label, code, pre';
      const allElements = Array.from(document.querySelectorAll(selector));

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Extract CSS custom property values from root
      const rootStyles = window.getComputedStyle(document.documentElement);
      const accentVar = rootStyles.getPropertyValue('--accent').trim() || DEFAULT_COLORS.accent;
      const textVar = rootStyles.getPropertyValue('--text').trim() || DEFAULT_COLORS.text;
      const mutedVar = rootStyles.getPropertyValue('--muted').trim() || DEFAULT_COLORS.muted;

      // Filter elements strictly visible in current viewport
      const sampledTargets = [];
      let totalArea = 0;

      for (const el of allElements) {
        // Skip canvas and HUD itself
        if (el === this.canvas || el === this.hudElement || (this.hudElement && this.hudElement.contains(el))) {
          continue;
        }

        const rect = el.getBoundingClientRect();
        if (rect.width <= 0 || rect.height <= 0) continue;

        // Viewport intersection test
        if (
          rect.bottom < 0 ||
          rect.top > viewportHeight ||
          rect.right < 0 ||
          rect.left > viewportWidth
        ) {
          continue;
        }

        const cs = window.getComputedStyle(el);
        if (cs.display === 'none' || cs.visibility === 'hidden' || parseFloat(cs.opacity) === 0) {
          continue;
        }

        // Clamp rect coordinates to viewport boundaries
        const clampedX = Math.max(0, rect.left);
        const clampedY = Math.max(0, rect.top);
        const clampedR = Math.min(viewportWidth, rect.right);
        const clampedB = Math.min(viewportHeight, rect.bottom);
        const clampedW = clampedR - clampedX;
        const clampedH = clampedB - clampedY;

        if (clampedW <= 0 || clampedH <= 0) continue;

        const area = clampedW * clampedH;
        totalArea += area;

        // Sample dominant color
        let color = cs.color || textVar;
        const bg = cs.backgroundColor;
        const isAccentEl =
          el.classList.contains('accent') ||
          el.hasAttribute('data-accent') ||
          cs.color === accentVar ||
          bg === accentVar ||
          el.tagName === 'BUTTON' ||
          el.classList.contains('tag');

        if (bg && bg !== 'transparent' && bg !== 'rgba(0, 0, 0, 0)') {
          color = bg;
        }

        sampledTargets.push({
          rect: {
            left: clampedX,
            top: clampedY,
            width: clampedW,
            height: clampedH
          },
          area: area,
          color: color,
          isAccent: isAccentEl,
          tagName: el.tagName
        });
      }

      // Fallback if no visible DOM elements found
      if (sampledTargets.length === 0 || totalArea === 0) {
        sampledTargets.push({
          rect: {
            left: viewportWidth * 0.1,
            top: viewportHeight * 0.1,
            width: viewportWidth * 0.8,
            height: viewportHeight * 0.8
          },
          area: viewportWidth * viewportHeight * 0.64,
          color: accentVar,
          isAccent: true,
          tagName: 'DIV'
        });
        totalArea = viewportWidth * viewportHeight * 0.64;
      }

      // Distribute particles proportionally across sampled element rects
      this.particles = [];
      this.accentParticles = [];

      let particleBudget = PARTICLE_COUNT;

      for (let i = 0; i < sampledTargets.length; i++) {
        const target = sampledTargets[i];
        // Calculate proportional particle quota
        let count = Math.round((target.area / totalArea) * PARTICLE_COUNT);
        count = Math.max(1, count);
        if (i === sampledTargets.length - 1) {
          // Adjust remainder on final element
          count = Math.max(1, particleBudget);
        } else {
          count = Math.min(count, particleBudget);
        }
        particleBudget -= count;

        for (let j = 0; j < count; j++) {
          const originX = target.rect.left + Math.random() * target.rect.width;
          const originY = target.rect.top + Math.random() * target.rect.height;

          // Color selection: blend target color with theme palette
          let pColor = target.color;
          const isAccent = target.isAccent || Math.random() < 0.16;
          if (isAccent) {
            pColor = accentVar;
          } else if (Math.random() < 0.25) {
            pColor = mutedVar;
          } else if (Math.random() < 0.45) {
            pColor = textVar;
          }

          const particle = {
            originX: originX,
            originY: originY,
            x: originX,
            y: originY,
            vx: (Math.random() - 0.5) * 2.2,
            vy: (Math.random() - 0.5) * 2.2,
            radius: 1.5 + Math.random() * 2.0, // 1.5px - 3.5px
            color: pColor,
            isAccent: isAccent,
            seed: Math.random() * Math.PI * 2,
            locked: false
          };

          this.particles.push(particle);
          if (isAccent) {
            this.accentParticles.push(particle);
          }
        }

        if (particleBudget <= 0) break;
      }

      // If budget still remains, distribute evenly across all sampled elements
      while (this.particles.length < PARTICLE_COUNT) {
        const randTarget = sampledTargets[Math.floor(Math.random() * sampledTargets.length)];
        const originX = randTarget.rect.left + Math.random() * randTarget.rect.width;
        const originY = randTarget.rect.top + Math.random() * randTarget.rect.height;
        const isAccent = randTarget.isAccent || Math.random() < 0.2;

        const particle = {
          originX: originX,
          originY: originY,
          x: originX,
          y: originY,
          vx: (Math.random() - 0.5) * 2.0,
          vy: (Math.random() - 0.5) * 2.0,
          radius: 1.5 + Math.random() * 2.0,
          color: isAccent ? accentVar : (Math.random() < 0.5 ? textVar : mutedVar),
          isAccent: isAccent,
          seed: Math.random() * Math.PI * 2,
          locked: false
        };

        this.particles.push(particle);
        if (isAccent) {
          this.accentParticles.push(particle);
        }
      }
    }

    /**
     * Apply Phase 1 deconstruction visual transform to page wrapper
     */
    _applyPhase1WrapperStyles() {
      if (!this.wrapperEl) return;
      this.wrapperEl.style.transition = 'opacity 550ms cubic-bezier(0.16, 1, 0.3, 1), filter 550ms cubic-bezier(0.16, 1, 0.3, 1), transform 550ms cubic-bezier(0.16, 1, 0.3, 1)';
      this.wrapperEl.style.opacity = '0.06';
      this.wrapperEl.style.filter = 'blur(5px)';
      this.wrapperEl.style.transform = 'scale(0.992)';
    }

    /**
     * Bind pointer, keyboard, and resize events
     */
    _bindEvents() {
      window.addEventListener('keydown', this._onKeyDown, { passive: true });
      window.addEventListener('resize', this._onResize, { passive: true });
      window.addEventListener('mousemove', this._onMouseMove, { passive: true });
      window.addEventListener('mouseleave', this._onMouseLeave, { passive: true });
      window.addEventListener('touchmove', this._onTouchMove, { passive: true });
      window.addEventListener('touchend', this._onTouchEnd, { passive: true });
    }

    /**
     * Unbind all event listeners
     */
    _unbindEvents() {
      window.removeEventListener('keydown', this._onKeyDown);
      window.removeEventListener('resize', this._onResize);
      window.removeEventListener('mousemove', this._onMouseMove);
      window.removeEventListener('mouseleave', this._onMouseLeave);
      window.removeEventListener('touchmove', this._onTouchMove);
      window.removeEventListener('touchend', this._onTouchEnd);
    }

    _handleKeyDown(e) {
      if (e.key === 'Escape' || e.key === 'Esc') {
        this.cancel('Cancelled via Escape key');
      }
    }

    _handleResize() {
      // Abort immediately on resize to prevent coordinate desync
      this.cancel('Window resized');
    }

    _handleMouseMove(e) {
      if (this.prevMouseX !== -9999) {
        const dx = e.clientX - this.prevMouseX;
        const dy = e.clientY - this.prevMouseY;
        this.mouseVelocity = Math.hypot(dx, dy);
      }
      this.prevMouseX = this.mouseX;
      this.prevMouseY = this.mouseY;
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      this.isPointerActive = true;
    }

    _handleMouseLeave() {
      this.isPointerActive = false;
      this.mouseX = -9999;
      this.mouseY = -9999;
      this.prevMouseX = -9999;
      this.prevMouseY = -9999;
      this.mouseVelocity = 0;
    }

    _handleTouchMove(e) {
      if (e.touches && e.touches.length > 0) {
        this.mouseX = e.touches[0].clientX;
        this.mouseY = e.touches[0].clientY;
        this.isPointerActive = true;
      }
    }

    _handleTouchEnd() {
      this.isPointerActive = false;
      this.mouseX = -9999;
      this.mouseY = -9999;
    }

    /**
     * Main 60FPS animation and physics loop
     */
    _loop(currentTime) {
      if (!this.isRunning) return;

      const elapsed = currentTime - this.startTime;

      // Check phase transitions
      if (elapsed < PHASE_1_END_MS) {
        if (this.currentPhase !== 1) {
          this.currentPhase = 1;
          this._updateHUD('SWARM ANTIGRAVITY: DECONSTRUCTING...');
          if (this.options.onPhaseChange) this.options.onPhaseChange(1);
        }
        this._updatePhase1(elapsed);
      } else if (elapsed < PHASE_2_END_MS) {
        if (this.currentPhase !== 2) {
          this.currentPhase = 2;
          this._updateHUD('SWARM ANTIGRAVITY: ZERO-G VORTEX...');
          this._playVortexSound();
          if (this.options.onPhaseChange) this.options.onPhaseChange(2);
        }
        this._updatePhase2(elapsed);
      } else if (elapsed < PHASE_3_END_MS) {
        if (this.currentPhase !== 3) {
          this.currentPhase = 3;
          this._updateHUD('SWARM ANTIGRAVITY: REBUILDING DOM...');
          this._playSpringSnapSound();
          if (this.options.onPhaseChange) this.options.onPhaseChange(3);
        }
        this._updatePhase3(elapsed);
      } else {
        // Phase 4: Clean Restoration
        this._complete();
        return;
      }

      this.rafId = requestAnimationFrame((t) => this._loop(t));
    }

    /**
     * Phase 1 (0ms - 600ms): DOM Capture & Initial Deconstruction
     */
    _updatePhase1(elapsed) {
      const ctx = this.ctx;
      const dpr = this.dpr;
      const progress = elapsed / PHASE_1_END_MS; // 0 -> 1

      // Clear canvas cleanly
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      ctx.save();
      ctx.scale(dpr, dpr);

      // Particles disperse outward slightly with micro-jitter
      for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i];
        const jitter = (1 - progress) * 0.8;
        p.x += p.vx * progress * 1.5 + (Math.random() - 0.5) * jitter;
        p.y += p.vy * progress * 1.5 + (Math.random() - 0.5) * jitter;

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }

    /**
     * Phase 2 (600ms - 2200ms): Antigravity Zero-G Vortex & Cursor Repulsion
     */
    _updatePhase2(elapsed) {
      const ctx = this.ctx;
      const dpr = this.dpr;
      const centerX = this.width / 2;
      const centerY = this.height / 2;

      // Soft clear with faint fade for subtle dynamic blur
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      ctx.save();
      ctx.scale(dpr, dpr);

      const hasCursor = this.isPointerActive && this.mouseX >= 0;
      const mx = this.mouseX;
      const my = this.mouseY;

      for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i];

        // 1. Upward zero-gravity buoyancy
        p.vy -= ZERO_G_BUOYANCY;

        // 2. 2D Tangential Curl / Vortex around viewport center
        const dx = p.x - centerX;
        const dy = p.y - centerY;
        const dist = Math.hypot(dx, dy) + 1.0;
        const angle = Math.atan2(dy, dx);

        // Perpendicular tangential unit vector (-sin, cos)
        const tx = -Math.sin(angle);
        const ty = Math.cos(angle);
        const vortexStrength = 0.52 * Math.min(1.2, 320 / dist);
        p.vx += tx * vortexStrength;
        p.vy += ty * vortexStrength;

        // Radial expansion wave
        const radial = Math.sin(elapsed * 0.0035 + p.seed) * 0.12;
        p.vx += (dx / dist) * radial;
        p.vy += (dy / dist) * radial;

        // Sinusoidal turbulence
        const turbX = Math.sin(p.y * 0.012 + elapsed * 0.003 + p.seed) * 0.22;
        const turbY = Math.cos(p.x * 0.012 + elapsed * 0.003 + p.seed) * 0.22;
        p.vx += turbX;
        p.vy += turbY;

        // 3. Interactive Cursor Field (within 140px)
        if (hasCursor) {
          const cdx = p.x - mx;
          const cdy = p.y - my;
          const cdist = Math.hypot(cdx, cdy);
          if (cdist < CURSOR_INFLUENCE_RADIUS && cdist > 0.1) {
            const factor = 1.0 - cdist / CURSOR_INFLUENCE_RADIUS;
            const impulse = factor * factor * CURSOR_REPULSION_STRENGTH;
            p.vx += (cdx / cdist) * impulse;
            p.vy += (cdy / cdist) * impulse;
          }
        }

        // 4. Kinetic Shockwave Impulse Waves
        for (let s = 0; s < this.shockwaves.length; s++) {
          const sw = this.shockwaves[s];
          const swDx = p.x - sw.x;
          const swDy = p.y - sw.y;
          const swDist = Math.hypot(swDx, swDy);
          if (Math.abs(swDist - sw.radius) < 38 && swDist > 0.1) {
            const impulse = sw.strength * sw.alpha;
            p.vx += (swDx / swDist) * impulse;
            p.vy += (swDy / swDist) * impulse;
          }
        }

        // Apply friction/drag so particles stay coherent
        p.vx *= 0.965;
        p.vy *= 0.965;

        p.x += p.vx;
        p.y += p.vy;

        // Soft viewport boundaries (wrap gently or soft bounce)
        if (p.x < -30) p.x = this.width + 20;
        if (p.x > this.width + 30) p.x = -20;
        if (p.y < -30) p.y = this.height + 20;
        if (p.y > this.height + 30) p.y = -20;

        // Kinetic Motion Streak: draw trailing vector for fast particles
        const speedSq = p.vx * p.vx + p.vy * p.vy;
        if (speedSq > 1.2) {
          ctx.strokeStyle = p.color;
          ctx.lineWidth = Math.min(2.2, p.radius * 0.85);
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - p.vx * 2.6, p.y - p.vy * 2.6);
          ctx.stroke();
        }

        // Render particle with accent glow
        ctx.fillStyle = p.color;
        if (p.isAccent) {
          ctx.shadowColor = '#e32b3c';
          ctx.shadowBlur = 8;
        } else {
          ctx.shadowBlur = 0;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.shadowBlur = 0;

      // Render Expanding Kinetic Shockwaves
      for (let s = this.shockwaves.length - 1; s >= 0; s--) {
        const sw = this.shockwaves[s];
        sw.radius += 12;
        sw.alpha *= 0.94;
        if (sw.alpha < 0.02 || sw.radius > sw.maxRadius) {
          this.shockwaves.splice(s, 1);
          continue;
        }

        // Primary crimson shockwave ring
        ctx.strokeStyle = `rgba(227, 43, 60, ${sw.alpha * 0.85})`;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.stroke();

        // Inner harmonic crest ring
        ctx.strokeStyle = `rgba(255, 255, 255, ${sw.alpha * 0.45})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, Math.max(0, sw.radius - 8), 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw interactive cursor targeting aura with dual radar rings
      if (hasCursor) {
        const pulse = (Math.sin(elapsed * 0.008) + 1) * 0.5;

        // Concentric radar ring
        ctx.strokeStyle = `rgba(227, 43, 60, ${0.15 + pulse * 0.15})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(mx, my, CURSOR_INFLUENCE_RADIUS, 0, Math.PI * 2);
        ctx.stroke();

        // Center reticle dot
        ctx.fillStyle = '#e32b3c';
        ctx.beginPath();
        ctx.arc(mx, my, 3, 0, Math.PI * 2);
        ctx.fill();

        const radGrad = ctx.createRadialGradient(mx, my, 8, mx, my, CURSOR_INFLUENCE_RADIUS);
        radGrad.addColorStop(0, 'rgba(227, 43, 60, 0.22)');
        radGrad.addColorStop(0.55, 'rgba(227, 43, 60, 0.05)');
        radGrad.addColorStop(1, 'rgba(227, 43, 60, 0)');
        ctx.fillStyle = radGrad;
        ctx.beginPath();
        ctx.arc(mx, my, CURSOR_INFLUENCE_RADIUS, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }

    /**
     * Phase 3 (2200ms - 3500ms): Magnetic Spring Reassembly
     */
    _updatePhase3(elapsed) {
      const ctx = this.ctx;
      const dpr = this.dpr;
      const phaseProgress = (elapsed - PHASE_2_END_MS) / (PHASE_3_END_MS - PHASE_2_END_MS); // 0 -> 1

      ctx.save();
      ctx.scale(dpr, dpr);

      // Subtle motion trails: rgba(9, 9, 9, 0.28) canvas fade per frame
      ctx.fillStyle = DEFAULT_COLORS.bgTrail;
      ctx.fillRect(0, 0, this.width, this.height);

      // Spring physics toward exact home coordinate
      for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i];

        const ax = (p.originX - p.x) * SPRING_STIFFNESS;
        const ay = (p.originY - p.y) * SPRING_STIFFNESS;

        p.vx = (p.vx + ax) * SPRING_DAMPING;
        p.vy = (p.vy + ay) * SPRING_DAMPING;

        p.x += p.vx;
        p.y += p.vy;

        // Dock into exact position as time expires
        if (phaseProgress > 0.92) {
          const blend = (phaseProgress - 0.92) / 0.08;
          p.x = p.x * (1 - blend) + p.originX * blend;
          p.y = p.y * (1 - blend) + p.originY * blend;
        }

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Faint connecting lines for accent-colored particles locking into place
      const accentCount = this.accentParticles.length;
      ctx.lineWidth = 0.85;

      // Spatial bucket or stride optimization for connecting lines to ensure solid 60FPS
      const lineDistLimit = 55;
      for (let i = 0; i < accentCount; i += 2) {
        const p1 = this.accentParticles[i];
        for (let j = i + 1; j < Math.min(i + 14, accentCount); j++) {
          const p2 = this.accentParticles[j];
          const distSq = (p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2;
          if (distSq < lineDistLimit * lineDistLimit) {
            const dist = Math.sqrt(distSq);
            const lineAlpha = (1 - dist / lineDistLimit) * 0.35 * (1 - phaseProgress * 0.4);
            ctx.strokeStyle = `rgba(227, 43, 60, ${lineAlpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Smoothly restore DOM wrapper opacity as reassembly concludes
      if (phaseProgress > 0.7 && this.wrapperEl) {
        const restoreProgress = (phaseProgress - 0.7) / 0.3;
        this.wrapperEl.style.opacity = (0.06 + restoreProgress * 0.94).toFixed(3);
        const blurAmount = Math.max(0, (5 * (1 - restoreProgress))).toFixed(1);
        this.wrapperEl.style.filter = `blur(${blurAmount}px)`;
        const scaleVal = (0.992 + restoreProgress * 0.008).toFixed(4);
        this.wrapperEl.style.transform = `scale(${scaleVal})`;
      }

      ctx.restore();
    }

    /**
     * Web Audio API Synthesizer (Zero external dependencies)
     */
    _initAudio() {
      if (!this.options.soundEnabled) return;
      try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) {
          if (!this.audioCtx) {
            this.audioCtx = new AudioContextClass();
          }
          if (this.audioCtx.state === 'suspended') {
            this.audioCtx.resume();
          }
        }
      } catch (e) {
        // Audio policy or unsupported; fail silently
        this.audioCtx = null;
      }
    }

    _playDeconstructSound() {
      if (!this.audioCtx) return;
      try {
        const now = this.audioCtx.currentTime;
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(420, now);
        osc.frequency.exponentialRampToValueAtTime(140, now + 0.55);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.12, now + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.55);
      } catch (e) {}
    }

    _playVortexSound() {
      if (!this.audioCtx) return;
      try {
        const now = this.audioCtx.currentTime;
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(160, now);
        osc.frequency.linearRampToValueAtTime(260, now + 1.2);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.06, now + 0.4);
        gain.gain.linearRampToValueAtTime(0.001, now + 1.4);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(now);
        osc.stop(now + 1.4);
      } catch (e) {}
    }

    _playShockwaveSound() {
      if (!this.audioCtx) return;
      try {
        const now = this.audioCtx.currentTime;
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.exponentialRampToValueAtTime(32, now + 0.35);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.18, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.4);
      } catch (e) {}
    }

    _playSpringSnapSound() {
      if (!this.audioCtx) return;
      try {
        const now = this.audioCtx.currentTime;
        // Dual chime chord (E major pentatonic note)
        [329.63, 493.88].forEach((freq, idx) => {
          const osc = this.audioCtx.createOscillator();
          const gain = this.audioCtx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.08);

          gain.gain.setValueAtTime(0.001, now + idx * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.08, now + idx * 0.08 + 0.04);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.45);

          osc.connect(gain);
          gain.connect(this.audioCtx.destination);
          osc.start(now + idx * 0.08);
          osc.stop(now + idx * 0.08 + 0.5);
        });
      } catch (e) {}
    }

    _playRebuildCompleteSound() {
      if (!this.audioCtx) return;
      try {
        const now = this.audioCtx.currentTime;
        // Crystal glass E major resolve chord [E4, G#4, B4, E5]
        [329.63, 415.30, 493.88, 659.25].forEach((freq, idx) => {
          const osc = this.audioCtx.createOscillator();
          const gain = this.audioCtx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.04);

          gain.gain.setValueAtTime(0.001, now + idx * 0.04);
          gain.gain.exponentialRampToValueAtTime(0.07, now + idx * 0.04 + 0.03);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.04 + 0.65);

          osc.connect(gain);
          gain.connect(this.audioCtx.destination);
          osc.start(now + idx * 0.04);
          osc.stop(now + idx * 0.04 + 0.7);
        });
      } catch (e) {}
    }
  }

  // Standalone API exports
  let defaultEngine = null;

  const SwarmAntigravity = {
    SwarmEngine: SwarmEngine,

    /**
     * Trigger Swarm Antigravity effect with options
     */
    trigger: function (options) {
      if (!defaultEngine) {
        defaultEngine = new SwarmEngine(options);
      } else if (options) {
        Object.assign(defaultEngine.options, options);
      }
      return defaultEngine.start();
    },

    /**
     * Cancel currently active animation
     */
    cancel: function (reason) {
      if (defaultEngine) {
        defaultEngine.cancel(reason);
      } else if (activeInstance) {
        activeInstance.cancel(reason);
      }
    },

    /**
     * Query status
     */
    isActive: function () {
      return activeInstance ? activeInstance.isRunning : false;
    }
  };

  return SwarmAntigravity;
}

const SwarmAntigravityInstance = createSwarmAntigravityEngine();

// Attach to global window/globalThis for script tag usage
if (typeof window !== 'undefined') {
  window.SwarmAntigravity = SwarmAntigravityInstance;
}
if (typeof globalThis !== 'undefined') {
  globalThis.SwarmAntigravity = SwarmAntigravityInstance;
}

export default SwarmAntigravityInstance;
export const SwarmEngine = SwarmAntigravityInstance.SwarmEngine;
export const trigger = SwarmAntigravityInstance.trigger;
export const cancel = SwarmAntigravityInstance.cancel;
export const isActive = SwarmAntigravityInstance.isActive;



