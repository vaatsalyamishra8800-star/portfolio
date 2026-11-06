/**
 * main.js - Application entry & interaction wiring
 * Connects the header "Motion" button, keyboard shortcuts, and UI controls to SwarmAntigravity.
 */

document.addEventListener('DOMContentLoaded', () => {
  const motionTriggerBtn = document.getElementById('motion-trigger');
  const heroMotionBtn = document.getElementById('hero-motion-btn');
  const inlineMotionBtn = document.getElementById('inline-motion-trigger');
  const footerTriggerLink = document.getElementById('footer-trigger-link');
  const audioToggleBtn = document.getElementById('audio-toggle');
  const audioIcon = document.getElementById('audio-icon');
  const audioLabel = document.getElementById('audio-label');

  let soundEnabled = true;

  // Initialize Swarm Antigravity Engine
  const swarm = new SwarmAntigravity.SwarmEngine({
    wrapperSelector: '#content-wrapper',
    soundEnabled: soundEnabled,
    onStart: () => {
      setTriggerActive(true);
    },
    onPhaseChange: (phase) => {
      // Phase 1: Deconstructing, Phase 2: Zero-G Vortex, Phase 3: Rebuilding
    },
    onComplete: () => {
      setTriggerActive(false);
    },
    onCancel: (reason) => {
      setTriggerActive(false);
      console.log('[SwarmAntigravity] Effect aborted:', reason);
    }
  });

  function setTriggerActive(active) {
    if (motionTriggerBtn) {
      if (active) {
        motionTriggerBtn.classList.add('active');
        motionTriggerBtn.setAttribute('aria-pressed', 'true');
      } else {
        motionTriggerBtn.classList.remove('active');
        motionTriggerBtn.setAttribute('aria-pressed', 'false');
      }
    }
  }

  function toggleSwarm() {
    if (swarm.isRunning) {
      swarm.cancel('User toggled trigger button');
    } else {
      swarm.options.soundEnabled = soundEnabled;
      swarm.start();
    }
  }

  // Header "Motion" Button click
  if (motionTriggerBtn) {
    motionTriggerBtn.addEventListener('click', (e) => {
      e.preventDefault();
      toggleSwarm();
    });
  }

  // Hero section button
  if (heroMotionBtn) {
    heroMotionBtn.addEventListener('click', (e) => {
      e.preventDefault();
      toggleSwarm();
    });
  }

  // Playground section button
  if (inlineMotionBtn) {
    inlineMotionBtn.addEventListener('click', (e) => {
      e.preventDefault();
      toggleSwarm();
    });
  }

  // Footer link
  if (footerTriggerLink) {
    footerTriggerLink.addEventListener('click', (e) => {
      e.preventDefault();
      toggleSwarm();
    });
  }

  // Audio Toggle
  if (audioToggleBtn) {
    audioToggleBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      swarm.options.soundEnabled = soundEnabled;
      if (soundEnabled) {
        audioIcon.textContent = '🔊';
        audioLabel.textContent = 'Sound On';
        audioToggleBtn.style.borderColor = 'rgba(255, 255, 255, 0.25)';
      } else {
        audioIcon.textContent = '🔇';
        audioLabel.textContent = 'Muted';
        audioToggleBtn.style.borderColor = 'var(--border)';
      }
    });
  }

  // Keyboard shortcut: 'm' or 'M' to trigger Swarm Antigravity
  window.addEventListener('keydown', (e) => {
    // Ignore when typing inside input / textarea
    const activeEl = document.activeElement;
    if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.isContentEditable)) {
      return;
    }

    if ((e.key === 'm' || e.key === 'M') && !e.ctrlKey && !e.metaKey && !e.altKey) {
      e.preventDefault();
      toggleSwarm();
    }
  });

  console.log('⚡ Swarm Antigravity Engine initialized. Press "M" or click "Motion" to trigger.');
});

