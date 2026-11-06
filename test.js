/**
 * test.js — Comprehensive Portfolio & Swarm Integrity Check Suite
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ ${message}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    failed++;
  }
}

console.log('\n--- Running Universal Premium Portfolio & Swarm Check Suite ---\n');

// 1. Structure Verification
const requiredFiles = [
  'index.html',
  'package.json',
  'vite.config.js',
  'scripts/build.mjs',
  'src/main.jsx',
  'src/styles.css',
  'src/config/site.js',
  'src/data/projects.js',
  'src/data/experience.js',
  'src/components/Header.jsx',
  'src/components/Hero.jsx',
  'src/components/ProjectGrid.jsx',
  'src/components/ProjectDialog.jsx',
  'src/components/About.jsx',
  'src/components/Experience.jsx',
  'src/components/Contact.jsx',
  'src/components/Footer.jsx',
  'src/components/ReadingProgress.jsx',
  'src/components/AmbientMesh.jsx',
  'src/components/PhysicsPlayground.jsx',
  'src/utils/audio.js',
  'swarmAntigravity.js',
  'SwarmAntigravity.jsx',
  'public/assets/portrait.jpeg',
  'public/assets/resume.pdf'
];

for (const file of requiredFiles) {
  const filePath = path.join(__dirname, file);
  assert(fs.existsSync(filePath), `Required file exists: ${file}`);
}

// 2. Central Configuration Verification
import { siteConfig } from './src/config/site.js';
assert(siteConfig.identity.fullName === 'Vaatsalya Mishra', 'Config: Authentic owner name configured');
assert(siteConfig.contact.email === 'vaatsalyamishra8800@gmail.com', 'Config: Authentic email configured');
assert(siteConfig.contact.whatsapp === '+917905676269', 'Config: Authentic WhatsApp configured');
assert(siteConfig.appearance.background === '#090909', 'Config: Dark near-black background #090909');
assert(siteConfig.appearance.accent === '#e32b3c', 'Config: Crimson accent #e32b3c');

// 3. Projects & Experience Verification
import { projects } from './src/data/projects.js';
import { experiences, education } from './src/data/experience.js';

assert(projects.length >= 3, `Projects: Contains ${projects.length} authentic project records`);
assert(experiences.length >= 1, `Experience: Contains ${experiences.length} verified work records`);
assert(education[0].institution.includes('PSIT'), 'Education: Accurately reflects PSIT Kanpur B.Tech AI');

// 4. Swarm Antigravity Engine Specification
const swarmCode = fs.readFileSync(path.join(__dirname, 'swarmAntigravity.js'), 'utf-8');
assert(swarmCode.includes('PARTICLE_COUNT = 2200'), 'Swarm: Spawns 2,200 particles');
assert(swarmCode.includes('TOTAL_DURATION_MS = 3500'), 'Swarm: 3500ms duration');
assert(swarmCode.includes('PHASE_1_END_MS = 600'), 'Swarm: Phase 1 ends at 600ms');
assert(swarmCode.includes('PHASE_2_END_MS = 2200'), 'Swarm: Phase 2 ends at 2200ms');
assert(swarmCode.includes('PHASE_3_END_MS = 3500'), 'Swarm: Phase 3 ends at 3500ms');
assert(swarmCode.includes('SPRING_STIFFNESS = 0.085'), 'Swarm: Stiffness is 0.085');
assert(swarmCode.includes('SPRING_DAMPING = 0.82'), 'Swarm: Damping is 0.82');
assert(swarmCode.includes('ZERO_G_BUOYANCY = 0.08'), 'Swarm: Zero-G buoyancy vy -= 0.08');
assert(swarmCode.includes('CURSOR_INFLUENCE_RADIUS = 140'), 'Swarm: Cursor repulsion field is 140px');
assert(swarmCode.includes('opacity: 0.06') || swarmCode.includes("'0.06'"), 'Swarm: Wrapper opacity 0.06 transition');
assert(swarmCode.includes('blur(5px)'), 'Swarm: Wrapper blur(5px) transition');
assert(swarmCode.includes('scale(0.992)'), 'Swarm: Wrapper scale(0.992) transition');
assert(swarmCode.includes('rgba(9, 9, 9, 0.28)'), 'Swarm: Motion trails rgba(9, 9, 9, 0.28)');
assert(swarmCode.includes('prefers-reduced-motion'), 'Swarm: Accessibility reduced motion support');
assert(swarmCode.includes('finally'), 'Swarm: Guaranteed restoration in cleanup/finally');

// 5. Index HTML font & meta tags
const indexHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8');
assert(indexHtml.includes('Anton') && indexHtml.includes('Manrope') && indexHtml.includes('Caveat'), 'HTML: References Anton, Manrope, Caveat fonts');
assert(indexHtml.includes('skip-link'), 'HTML: Includes accessibility skip link');

console.log(`\nResults: ${passed} passed, ${failed} failed.\n`);
if (failed > 0) {
  process.exit(1);
}
