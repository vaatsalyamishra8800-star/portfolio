/**
 * site.js — Central Site Configuration
 * 
 * UNIVERSAL PREMIUM PORTFOLIO CONFIGURATION
 * Reference Inspiration: https://touquirakhtar.com/
 * 
 * To customize this portfolio for another person or brand, simply edit the values below.
 * All UI components reference this file; no personal facts are hardcoded in components.
 */

export const siteConfig = {
  referenceWebsite: "https://touquirakhtar.com/",
  websiteUrl: "https://vaatsalyamishra8800-star.github.io/portfolio/",

  identity: {
    fullName: "Vaatsalya Mishra",
    displayName: "VAATSALYA",
    profession: "Computer Science (AI) Engineer · Data Analyst",
    roleLine2: "Multi-Agent Systems & Tabular ML Pipelines",
    location: "Lucknow, Uttar Pradesh, India",
    availability: "AVAILABLE FOR SWE & AI/ML ROLES",
    headline: "CRAFTING AUTONOMOUS AI SWARMS & DATA ENGINES.",
    intro: "Third-year Computer Science & Engineering (Artificial Intelligence) student at PSIT Kanpur with expertise in multi-agent orchestration, Data Structures & Algorithms, and high-throughput fintech data pipelines.",
    about: "I engineer intelligent autonomous systems and algorithmic tools with a focus on high throughput, zero-compromise UX, and clean architecture. Experienced in building interactive BI dashboards, writing optimized SQL for live fintech datasets at Bluestock, and architecting local multi-agent LLM systems with deterministic function-calling loops.",
    portrait: "./assets/portrait.jpeg",
    portraitAlt: "./assets/portrait-alt.jpeg",
    resume: "./assets/resume.pdf",
    favicon: "/favicon.svg",
    greeting: "Hello, I am"
  },

  contact: {
    email: "vaatsalyamishra8800@gmail.com",
    phone: "+91 7905676269",
    whatsapp: "+917905676269", // E.164 digits for wa.me link
    linkedin: "https://linkedin.com/in/vaatsalyamishra",
    github: "https://github.com/vaatsalyamishra8800-star",
    instagram: "",
    youtube: "",
    behance: "",
    dribbble: "",
    otherLinks: []
  },

  appearance: {
    style: "cinematic minimal, premium, editorial, refined typography",
    theme: "dark",
    background: "#090909",
    panel: "#101010",
    text: "#f2efeb",
    accent: "#e32b3c", // Crimson red token
    accentGlow: "rgba(227, 43, 60, 0.35)",
    muted: "#a09c9a",
    line: "#292323",
    displayFont: "Anton",
    bodyFont: "Manrope",
    accentFont: "Caveat",
    animationIntensity: "balanced",
    language: "English"
  },

  metrics: [
    { value: "3+", label: "Years CS & AI", suffix: "" },
    { value: "2,200", label: "Particles Swarm", suffix: "" },
    { value: "60", label: "FPS Kinetic Physics", suffix: " FPS" },
    { value: "100%", label: "Verified Data & Assets", suffix: "" }
  ],

  preferences: {
    showAwards: true,
    showEducation: true,
    showExperience: true,
    showBeforeAfter: false,
    showClientLogos: false,
    showTestimonials: false,
    showContactForm: true,
    showDownloadResume: true,
    showProjectArchive: true
  }
};

