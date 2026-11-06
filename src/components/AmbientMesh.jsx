import React, { useEffect, useRef } from 'react';

/**
 * AmbientMesh.jsx — Subtle Persistent Kinetic Background Canvas
 * Provides ambient depth, floating kinetic nodes, and interactive cursor waves.
 */
export default function AmbientMesh({ isSwarmActive = false }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    let animationId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates
    let mouse = { x: -9999, y: -9999, targetX: -9999, targetY: -9999 };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -9999;
      mouse.targetY = -9999;
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    // Node count scaled by viewport width
    const nodeCount = Math.min(65, Math.floor((width * height) / 22000));
    const nodes = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.5 + 0.8,
        isAccent: Math.random() < 0.15,
        pulseOffset: Math.random() * Math.PI * 2
      });
    }

    let time = 0;

    const render = () => {
      time += 0.02;

      // Smooth cursor lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      ctx.clearRect(0, 0, width, height);

      // If Swarm Antigravity is active, render very dimly or pause
      if (isSwarmActive) {
        animationId = requestAnimationFrame(render);
        return;
      }

      // Draw faint cybernetic grid dots
      const gridSpacing = 80;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.015)';
      for (let x = gridSpacing; x < width; x += gridSpacing) {
        for (let y = gridSpacing; y < height; y += gridSpacing) {
          ctx.fillRect(x, y, 1, 1);
        }
      }

      // Connect nodes
      const maxDistance = 120;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];

        // Cursor repulsion
        const dxMouse = a.x - mouse.x;
        const dyMouse = a.y - mouse.y;
        const distMouse = Math.hypot(dxMouse, dyMouse);
        if (distMouse < 130 && distMouse > 0.1) {
          const force = (1 - distMouse / 130) * 1.8;
          a.x += (dxMouse / distMouse) * force;
          a.y += (dyMouse / distMouse) * force;
        }

        // Move nodes
        a.x += a.vx;
        a.y += a.vy;

        // Wrap boundaries
        if (a.x < 0) a.x = width;
        if (a.x > width) a.x = 0;
        if (a.y < 0) a.y = height;
        if (a.y > height) a.y = 0;

        // Draw connections
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.12;
            ctx.strokeStyle = a.isAccent || b.isAccent
              ? `rgba(227, 43, 60, ${alpha * 1.8})`
              : `rgba(242, 239, 235, ${alpha})`;
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }

        // Draw node
        const pulse = Math.sin(time + a.pulseOffset) * 0.4 + 1.0;
        ctx.fillStyle = a.isAccent ? '#e32b3c' : 'rgba(242, 239, 235, 0.55)';
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.radius * pulse, 0, Math.PI * 2);
        ctx.fill();
      }

      // Faint radial glow around cursor
      if (mouse.x > 0) {
        const glow = ctx.createRadialGradient(mouse.x, mouse.y, 10, mouse.x, mouse.y, 160);
        glow.addColorStop(0, 'rgba(227, 43, 60, 0.08)');
        glow.addColorStop(0.5, 'rgba(227, 43, 60, 0.02)');
        glow.addColorStop(1, 'rgba(227, 43, 60, 0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 160, 0, Math.PI * 2);
        ctx.fill();
      }

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isSwarmActive]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        opacity: isSwarmActive ? 0.05 : 0.85,
        transition: 'opacity 500ms ease'
      }}
    />
  );
}

