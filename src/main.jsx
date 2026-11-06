import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import ProjectGrid from './components/ProjectGrid.jsx';
import PhysicsPlayground from './components/PhysicsPlayground.jsx';
import About from './components/About.jsx';
import Experience from './components/Experience.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import ReadingProgress from './components/ReadingProgress.jsx';
import AmbientMesh from './components/AmbientMesh.jsx';
import SwarmAntigravityCore from '../swarmAntigravity.js';
import './styles.css';

function App() {
  const [isMotionActive, setIsMotionActive] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const swarmRef = useRef(null);

  useEffect(() => {
    swarmRef.current = new SwarmAntigravityCore.SwarmEngine({
      wrapperSelector: '#content-wrapper',
      soundEnabled: soundEnabled,
      onStart: () => setIsMotionActive(true),
      onComplete: () => setIsMotionActive(false),
      onCancel: () => setIsMotionActive(false)
    });

    return () => {
      if (swarmRef.current && swarmRef.current.isRunning) {
        swarmRef.current.cancel('Component unmounted');
      }
    };
  }, []);

  // Update sound preference in engine
  useEffect(() => {
    if (swarmRef.current) {
      swarmRef.current.options.soundEnabled = soundEnabled;
    }
  }, [soundEnabled]);

  const handleTriggerMotion = useCallback(() => {
    if (swarmRef.current) {
      if (swarmRef.current.isRunning) {
        swarmRef.current.cancel('User toggled motion');
      } else {
        swarmRef.current.start();
      }
    }
  }, []);

  const handleToggleSound = useCallback(() => {
    setSoundEnabled((prev) => !prev);
  }, []);

  // Global keyboard shortcut: 'm' / 'M' triggers Swarm Antigravity
  useEffect(() => {
    const handleKeyDown = (e) => {
      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.isContentEditable)) {
        return;
      }
      if ((e.key === 'm' || e.key === 'M') && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        handleTriggerMotion();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleTriggerMotion]);

  return (
    <>
      <ReadingProgress />
      <AmbientMesh isSwarmActive={isMotionActive} />

      <Header
        onTriggerMotion={handleTriggerMotion}
        isMotionActive={isMotionActive}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
      />

      {/* Main Content Wrapper - Subject to Swarm Antigravity Transition */}
      <main id="content-wrapper">
        <Hero onTriggerMotion={handleTriggerMotion} />
        <ProjectGrid />
        <PhysicsPlayground onTriggerMotion={handleTriggerMotion} />
        <About />
        <Experience />
        <Contact />
        <Footer onTriggerMotion={handleTriggerMotion} />
      </main>
    </>
  );
}

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(<App />);
}

