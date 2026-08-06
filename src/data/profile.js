/**
 * Single source of truth for personal content.
 * Swap these values and the whole site updates.
 */
export const profile = {
  name: "Yasmin Ahmed Mohamed",
  initials: "YA",
  location: "Beni Suef, Egypt",
  email: "yasminhemeda78@gmail.com",
  resumeUrl: "/resume.pdf",
  roles: ["Front-End Developer", "React Developer", "Freelance Developer", "UI Developer"],
  summary:
    "I build responsive, interactive web interfaces that users actually enjoy. Skilled in React.js and modern front-end tooling — with a sharp eye for clean code and cross-browser compatibility.",
  bio: "I don't just build websites — I build experiences. I'm a Front-End Developer who enjoys turning complex ideas into simple, elegant interfaces. I love crafting responsive layouts, smooth interactions, and maintainable code with React and modern web technologies. Every project is an opportunity to create something useful, fast, and enjoyable to use.",
  socials: [
    { label: "GitHub", href: "https://github.com/yasminah11", handle: "@yasminah11" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/yasmin-ahmed77",
      handle: "in/yasmin-ahmed77",
    },
    { label: "Email", href: "mailto:yasminhemeda78@gmail.com", handle: "yasminhemeda78@gmail.com" },
  ],
  stats: [
    { value: 2, suffix: "+", label: "Years building" },
    { value: 5, suffix: "+", label: "Projects delivered" },
    { value: 60, suffix: "+", label: "ITI training hours" },
  ],
  timeline: [
    {
      year: "2025 — now",
      title: "Freelance Front-End Developer",
      org: "EYPA Startup",
      copy: "Building and shipping front-end features for EYPA, a startup focused on youth engagement. Collaborating remotely on React-based interfaces, translating design requirements into clean, maintainable components.",
      tags: ["React.js", "Freelance", "Startup"],
    },
    {
      year: "Nov 2025 — Jul 2026",
      title: "Front-End Developer (React) Trainee",
      org: "Digital Egypt Pioneers Initiative (DEPI)",
      copy: "Developed responsive web interfaces using HTML5, CSS3, JavaScript and React. Built reusable UI components and applied component-based architecture across real-world training projects.",
      tags: ["React.js", "JavaScript", "CSS3", "HTML5"],
    },
    {
      year: "Jan 2025 — Mar 2025",
      title: "Web Development Trainee",
      org: "Information Technology Institute (ITI)",
      copy: "Completed a 60+ hour intensive program on web development fundamentals. Delivered a final end-to-end project and implemented 5+ interactive JavaScript features from scratch.",
      tags: ["HTML", "CSS", "JavaScript"],
    },
    {
      year: "2024 — now",
      title: "Volunteer: Web & Programming Education",
      org: "School Initiative",
      copy: "Teaching youth in schools the fundamentals of web development and programming. Helping students understand HTML, CSS, and basic coding concepts through hands-on sessions.",
      tags: ["Volunteering", "Education", "Web Dev"],
    },
  ],
  education: [
    {
      year: "2024 — 2028 (Expected)",
      title: "BSc Computer Science & Artificial Intelligence",
      org: "Beni Suef National University (BSNU)",
      copy: "Specialisation in Artificial Intelligence. Currently maintaining a CGPA of 3.2 / 4.0 (Very Good).",
    },
    {
      year: "Jan–Mar 2025",
      title: "Web Development Training",
      org: "Information Technology Institute (ITI)",
      copy: "60+ hours focused on front-end fundamentals: HTML5, CSS3, and JavaScript. Graduated with a complete end-to-end web project.",
    },
    {
      year: "Nov 2025 – Jul 2026",
      title: "React Front-End Track",
      org: "Digital Egypt Pioneers Initiative (DEPI)",
      copy: "Hands-on training in modern front-end workflows: React.js, component architecture, REST API integration, and clean code practices.",
    },
  ],
  principles: [
    {
      title: "Responsive by default",
      copy: "Every layout I build starts mobile-first and scales up — cross-browser compatibility is never an afterthought.",
    },
    {
      title: "Clean, maintainable code",
      copy: "I write code the next developer can read. No clever hacks, no magic numbers — just clear structure and honest naming.",
    },
    {
      title: "Components that compose",
      copy: "Small, reusable React components beat large monoliths. Keeping things modular means faster iteration and fewer surprises.",
    },
    {
      title: "Ship, then improve",
      copy: "A working page delivered beats a perfect one stuck in review. I prioritise shipping, then iterate based on real feedback.",
    },
  ],
};

export const skills = [
  {
    name: "HTML5",
    level: "Expert",
    note: "Semantic markup, accessibility, structured content.",
    years: 2,
  },
  {
    name: "CSS3",
    level: "Expert",
    note: "Flexbox, Grid, animations, custom properties, responsive design.",
    years: 2,
  },
  {
    name: "JavaScript",
    level: "Advanced",
    note: "ES6+, DOM manipulation, async/await, REST API consumption.",
    years: 2,
  },
  {
    name: "React.js",
    level: "Advanced",
    note: "Hooks, component architecture, state management, reusable UI.",
    years: 1,
  },
  {
    name: "Bootstrap",
    level: "Advanced",
    note: "Responsive grid, utility classes, component customisation.",
    years: 2,
  },
  {
    name: "Tailwind CSS",
    level: "Proficient",
    note: "Utility-first styling, rapid prototyping, consistent design tokens.",
    years: 1,
  },
  {
    name: "Git & GitHub",
    level: "Advanced",
    note: "Branching workflows, pull requests, collaboration on team projects.",
    years: 2,
  },
  {
    name: "REST APIs",
    level: "Proficient",
    note: "Fetching, error handling, dynamic content from backend systems.",
    years: 1,
  },
];

export const faqs = [
  {
    q: "How do you approach a new project?",
    a: "I start by understanding the requirements and breaking the UI into components. Then I build mobile-first, add interactivity, and test across browsers before shipping.",
  },
  {
    q: "What's your experience with React?",
    a: "I've used React in training at DEPI and in freelance work at EYPA — building reusable components, managing state with hooks, and consuming REST APIs for dynamic content.",
  },
  {
    q: "Are you available for freelance work?",
    a: "Yes! I'm currently freelancing at EYPA startup and open to additional projects. Reach me at yasminhemeda78@gmail.com.",
  },
  {
    q: "Do you work on live production sites?",
    a: "Yes — I've worked on Kabsoula Sharia and Dema Biology, both live educational platforms requiring cross-browser compatibility and performance optimisation.",
  },
];
