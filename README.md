# Universal Premium Portfolio Website

A cinematic, editorial, and high-performance personal portfolio built with React 19, Vite, and modern CSS custom properties. Inspired by the editorial design language of [touquirakhtar.com](https://touquirakhtar.com/) and powered by the standalone **Swarm Antigravity Rebuild Engine** inspired by [Joel Califa's Swarm](https://joelcalifa.com) and [imperfec-t/swarm-Antigravity](https://github.com/imperfec-t/swarm-Antigravity).

---

## ⚡ Key Highlights

- **Visual Design & Typography:** Dark luxury palette (`#090909` void, `#f2efeb` text, `#e32b3c` crimson red, `#292323` subtle borders), condensed headline type (`Anton`), geometric clean body (`Manrope`), and handwriting accent (`Caveat`).
- **Authentic Owner Identity:** Configured for **Vaatsalya Mishra** (Computer Science & AI Undergraduate at PSIT Kanpur, Data Analyst & Systems Architect) with authentic resume data, verified projects, and portrait media.
- **Universal Configuration:** All personal facts, contact methods, branding, and section visibility live in a central file: [`src/config/site.js`](file:///c:/Users/asus/Desktop/portfolio/src/config/site.js). No personal data is hardcoded in UI components.
- **Swarm Antigravity Rebuild Engine:** Clicking the header **"Motion"** button deconstructs the live DOM into 2,200 particles, swirls them in an upward zero-g vortex responsive to real-time cursor stirring, and magnetically snaps every particle back to its exact home coordinates using damped harmonic springs over 3,500ms.
- **Zero Fabrication:** Only verified work experiences, genuine education records, actual projects, and real assets are rendered. Optional sections without data gracefully collapse.

---

## 📁 Project Architecture

```
portfolio/
├── index.html                  # Semantic entry point with Anton, Manrope & Caveat fonts
├── package.json                # Project dependencies & scripts
├── vite.config.js              # Vite build configuration
├── swarmAntigravity.js         # Standalone 60 FPS HTML5 canvas physics engine
├── SwarmAntigravity.jsx        # React component & custom useSwarmAntigravity hook
├── test.js                     # 47-assertion automated verification check suite
├── scripts/
│   └── build.mjs               # Static production build runner
├── src/
│   ├── main.jsx                # React 19 application root & shortcut listeners
│   ├── styles.css              # Custom property design tokens & editorial grid
│   ├── config/
│   │   └── site.js             # 🌟 CENTRAL CONFIGURATION (Edit this first)
│   ├── data/
│   │   ├── projects.js         # Authentic project records & category filters
│   │   └── experience.js       # Experience, education, skills & certifications
│   └── components/
│       ├── Header.jsx          # Wordmark, nav, active indicator, Motion pill & sound toggle
│       ├── Hero.jsx            # Massive background display text, portrait, intro & metrics
│       ├── ProjectGrid.jsx     # Category tabs, text search, and editorial card grid
│       ├── ProjectDialog.jsx   # Accessible modal case study dialog (focus trap & Escape close)
│       ├── About.jsx           # Bio, engineering process steps & skills matrix
│       ├── Experience.jsx      # Work experience timeline & education
│       ├── Contact.jsx         # Direct channels, WhatsApp link generator & inquiry form
│       ├── Footer.jsx          # Brand wordmark, copyright & back-to-top
│       └── ReadingProgress.jsx # Top scroll-linked reading indicator
└── public/
    └── assets/
        ├── portrait.jpeg       # High-res authentic owner portrait
        └── resume.pdf          # Verified resume document
```

---

## 🛠️ Required Commands

### 1. Run Verification Check Suite
```bash
npm run check
```
Runs 47 automated assertions validating file structure, configuration schema, data integrity, and Swarm Antigravity physics constants.

### 2. Local Development Server
```bash
npm run dev
```
Starts the Vite dev server at `http://localhost:3000` with instant Hot Module Replacement (HMR).

### 3. Production Build
```bash
npm run build
```
Compiles and bundles static deployable assets into the `dist/` directory.

### 4. Zero-Dependency Static Server
```bash
npm start
```
Runs the zero-dependency built-in Node HTTP server (`serve.js`).

---

## ⚙️ How to Personalize for Another Person / Brand

To customize this portfolio for another person, profession, or agency, open:
[**`src/config/site.js`**](file:///c:/Users/asus/Desktop/portfolio/src/config/site.js)

Edit the configuration object:
```javascript
export const siteConfig = {
  websiteUrl: "https://yourdomain.com/",

  identity: {
    fullName: "Your Name",
    displayName: "YOURNAME",
    profession: "Your Profession / Role",
    location: "City, Country",
    availability: "AVAILABLE FOR WORK",
    intro: "2-3 sentences about your expertise...",
    portrait: "/assets/portrait.jpeg",
    resume: "/assets/resume.pdf"
  },

  contact: {
    email: "your.email@domain.com",
    whatsapp: "+1234567890",
    linkedin: "https://linkedin.com/in/yourhandle",
    github: "https://github.com/yourhandle"
  },

  appearance: {
    background: "#090909",
    accent: "#e32b3c", // Customize accent color
    displayFont: "Anton",
    bodyFont: "Manrope"
  },

  preferences: {
    showAwards: true,
    showExperience: true,
    showEducation: true,
    showContactForm: true,
    showDownloadResume: true
  }
};
```
All components update automatically across the site!
