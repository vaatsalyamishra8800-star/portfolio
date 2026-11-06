import React, { useState, useMemo } from 'react';
import { projects, projectCategories } from '../data/projects.js';
import ProjectDialog from './ProjectDialog.jsx';
import { soundFx } from '../utils/audio.js';

function ProjectCard({ project, onSelect }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 8, y: -y * 8 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <article
      className="project-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => soundFx.playHover()}
      onClick={() => {
        soundFx.playClick();
        onSelect(project);
      }}
      style={{
        transform: `perspective(800px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
        transition: 'transform 200ms ease, background 200ms ease, border-color 200ms ease, box-shadow 200ms ease'
      }}
      data-swarm
    >
      {/* Graphic Banner Header */}
      <div
        style={{
          height: '110px',
          borderRadius: '12px',
          background: project.coverGradient || 'linear-gradient(135deg, rgba(227,43,60,0.2) 0%, rgba(14,14,18,0.9) 100%)',
          marginBottom: '20px',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '12px 14px',
          border: '1px solid rgba(255,255,255,0.06)'
        }}
      >
        {/* Subtle grid pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '16px 16px',
            opacity: 0.4
          }}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 1 }}>
          <span className="project-category-tag">{project.category}</span>
          {project.year && <span className="project-year">{project.year}</span>}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', zIndex: 1 }}>
          <span style={{ fontSize: '10px', fontFamily: 'monospace', color: 'rgba(242,239,235,0.7)', letterSpacing: '0.06em' }}>
            ID // {project.id.toUpperCase()}
          </span>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--red)', boxShadow: '0 0 8px var(--red)' }} />
        </div>
      </div>

      <div>
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
      </div>

      <div className="project-card-footer">
        <div className="project-tools">
          {project.tools && project.tools.slice(0, 3).map((tool, idx) => (
            <span key={idx} className="project-tool-chip">
              {tool}
            </span>
          ))}
          {project.tools && project.tools.length > 3 && (
            <span className="project-tool-chip">+{project.tools.length - 3}</span>
          )}
        </div>

        <div className="project-cta-arrow" aria-hidden="true">
          &rarr;
        </div>
      </div>
    </article>
  );
}

export default function ProjectGrid() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProject, setActiveProject] = useState(null);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        selectedCategory === 'All' || project.category === selectedCategory;
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (project.tools && project.tools.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="work" className="section-wrap" data-swarm>
      <div className="section-heading">
        <span className="eyebrow">Portfolio & Systems</span>
        <h2 className="display">Selected Work</h2>
        <p>
          High-performance architectures, local multi-agent LLM systems, and kinetic web graphics.
        </p>
      </div>

      {/* Controls: Category Filter Tabs & Text Search */}
      <div className="work-controls">
        <div className="category-tabs" role="tablist">
          {projectCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={selectedCategory === cat}
              className={`category-tab ${selectedCategory === cat ? 'active' : ''}`}
              onMouseEnter={() => soundFx.playHover()}
              onClick={() => {
                soundFx.playClick();
                setSelectedCategory(cat);
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="search-box">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search projects or stack..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search projects"
          />
        </div>
      </div>

      {/* Project Cards Grid */}
      {filteredProjects.length === 0 ? (
        <div style={{ padding: '60px 0', textAlign: 'center', color: 'var(--muted)' }}>
          <p>No projects match your filter criteria.</p>
        </div>
      ) : (
        <div className="project-grid">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={setActiveProject}
            />
          ))}
        </div>
      )}

      {/* Detail Dialog */}
      <ProjectDialog
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
}
