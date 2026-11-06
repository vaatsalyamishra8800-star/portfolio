/**
 * projects.js — Authentic Portfolio Projects
 * Follows the project schema from specification section 4.C.
 */

export const projects = [
  {
    id: "swarm-antigravity",
    title: "Swarm Antigravity Rebuild Engine",
    category: "Kinetic Web Engine",
    year: "2026",
    summary: "60FPS HTML5 canvas particle physics state machine with zero-gravity vortex and magnetic harmonic spring DOM reassembly.",
    description: "An interactive, standalone visual physics component inspired by Joel Califa's Swarm and imperfec-t/swarm-Antigravity. Samples visible DOM elements, deconstructs the page into 2,200 physics-driven particles, creates an upward zero-g vortex responsive to cursor repulsion, and magnetically snaps every particle back to its exact home coordinate using damped harmonic springs over 3,500ms.",
    role: "Lead Systems & Graphics Engineer",
    tools: ["HTML5 Canvas 2D", "JavaScript ESNext", "React", "Web Audio API", "Physics Simulation"],
    coverGradient: "linear-gradient(135deg, #e32b3c 0%, #16161b 80%)",
    videoUrl: "",
    liveUrl: "#playground",
    sourceUrl: "https://github.com/imperfec-t/swarm-Antigravity",
    featured: true,
    highlights: [
      "Exact 2,200 particle sampling from live DOM rects and computed CSS variables",
      "Interactive 140px cursor repulsion field for real-time swarm stirring",
      "Damped harmonic spring reassembly (stiffness: 0.085, damping: 0.82)",
      "Zero DOM mutation loss with fail-safe cleanup in finally block"
    ]
  },
  {
    id: "self-learning-ai-agent",
    title: "Self-Learning Autonomous AI Agent",
    category: "AI & Autonomous Systems",
    year: "2026",
    summary: "Multi-agent local orchestration system with persistent structured memory and deterministic function calling.",
    description: "Architected an autonomous multi-agent orchestration harness running locally with zero cloud or API cost using Ollama. Implemented intelligent task routing delegating research queries to dedicated sub-agents and code generation to specialized workers. Engineered a persistent JSON memory layer extracting conversational facts and a custom function-calling execution loop.",
    role: "AI Architecture & SWE",
    tools: ["Python", "Ollama", "JSON Schema", "Multi-Agent Systems", "Local LLMs"],
    coverGradient: "linear-gradient(135deg, #3b82f6 0%, #0d1117 80%)",
    videoUrl: "",
    liveUrl: "",
    sourceUrl: "https://github.com/vaatsalyamishra8800-star",
    featured: true,
    highlights: [
      "Zero-cloud local multi-agent task routing and sub-agent delegation",
      "Vectorless persistent JSON memory layer preserving structured facts across sessions",
      "Deterministic tool-use loop for autonomous web search, file IO, and code execution"
    ]
  },
  {
    id: "smart-task-scheduler",
    title: "Smart Task Scheduler & Priority Engine",
    category: "Algorithms & Systems",
    year: "2026",
    summary: "High-performance CLI scheduling engine using binary min-heaps, hash map indexing, and stack-based undo.",
    description: "Engineered a terminal-based priority task scheduling engine designed for optimal algorithmic efficiency. Utilizes a binary min-heap for O(log n) task retrieval and scheduling, coupled with O(1) hash map indexing for instantaneous lookups. Integrated a robust stack-based undo/redo mechanism and automated atomic JSON state persistence.",
    role: "Systems Programmer",
    tools: ["Python", "Binary Heap (heapq)", "Hash Map", "Data Structures", "CLI"],
    coverGradient: "linear-gradient(135deg, #10b981 0%, #0d1117 80%)",
    videoUrl: "",
    liveUrl: "",
    sourceUrl: "https://github.com/vaatsalyamishra8800-star",
    featured: true,
    highlights: [
      "O(log n) deadline and priority retrieval via custom binary min-heap",
      "Instantaneous O(1) task index lookups and updates",
      "Stack-based state reversal allowing multi-step undo operations"
    ]
  },
  {
    id: "fintech-data-analytics",
    title: "Bluestock Fintech BI & Analytics Platform",
    category: "Data Analytics & BI",
    year: "2026",
    summary: "Fintech dataset cleaning, validation pipelines, and interactive executive reporting dashboards.",
    description: "Developed comprehensive data pipelines and analytics dashboards at Bluestock Fintech. Cleaned, validated, and structured live financial datasets using Python (pandas, NumPy) and authored complex, optimized SQL queries for recurring KPI metrics. Created interactive Power BI, Tableau, and Excel dashboards surfacing anomaly trends and portfolio performance indicators.",
    role: "Data Analyst Intern",
    tools: ["Python", "SQL", "Power BI", "Tableau", "Excel", "Data Validation"],
    coverGradient: "linear-gradient(135deg, #f59e0b 0%, #16161b 80%)",
    videoUrl: "",
    liveUrl: "",
    sourceUrl: "",
    featured: false,
    highlights: [
      "Optimized SQL query performance across extensive recurring fintech datasets",
      "Production BI dashboards in Power BI and Tableau for executive decision-makers",
      "Automated exploratory data analysis and anomaly detection routines"
    ]
  },
  {
    id: "er-nexus-pipeline",
    title: "ER-Nexus Predictive Event Classifier",
    category: "Machine Learning",
    year: "2026",
    summary: "High-throughput tabular ML classification pipeline built with CatBoost for sub-10ms event inference.",
    description: "Built a tabular classification engine for structured event analysis using CatBoost and feature engineering pipelines. Evaluated feature importance matrices, engineered categorical encoding pipelines, and deployed low-latency inference scripts.",
    role: "ML Engineer",
    tools: ["Python", "CatBoost", "pandas", "Scikit-Learn", "Feature Engineering"],
    coverGradient: "linear-gradient(135deg, #8b5cf6 0%, #0d1117 80%)",
    videoUrl: "",
    liveUrl: "",
    sourceUrl: "",
    featured: false,
    highlights: [
      "Sub-10ms inference latency for complex multi-class tabular classification",
      "Automated feature validation, missing value imputation, and target encoding"
    ]
  }
];

export const projectCategories = [
  "All",
  "Kinetic Web Engine",
  "AI & Autonomous Systems",
  "Algorithms & Systems",
  "Data Analytics & BI",
  "Machine Learning"
];

