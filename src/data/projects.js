import atlas from "@/assets/project-atlas.jpg";
import lumen from "@/assets/project-lumen.jpg";
import nimbus from "@/assets/project-nimbus.jpg";
import forge from "@/assets/project-forge.jpg";

export const categories = ["All", "React", "JavaScript", "API"];

export const projects = [
  {
    slug: "kabsoula-sharia",
    title: "Kabsoula Sharia",
    tagline: "Responsive educational platform with dynamic API-driven content",
    year: "2025",
    role: "Frontend Developer",
    cover: atlas,
    gallery: [atlas, lumen, nimbus],
    categories: ["JavaScript", "API"],
    tech: ["HTML5", "CSS3", "JavaScript", "Bootstrap 5"],
    accentStat: { value: 100, suffix: "%", label: "cross-browser compatible" },
    summary:
      "A live Islamic educational platform serving students and instructors. Built responsive, mobile-friendly interfaces with dynamic content fetched from backend APIs and database-driven systems.",
    features: [
      "Fully responsive layout across all screen sizes and devices",
      "Dynamic content loaded from backend REST APIs",
      "Cross-browser compatibility tested on Chrome, Firefox, Safari and Edge",
      "Clean, maintainable code following front-end best practices",
    ],
    challenges: [
      {
        problem: "Content structure varied depending on the API response shape.",
        solution:
          "Wrote flexible JavaScript that handled missing or optional fields gracefully, keeping the UI stable regardless of the data shape returned.",
      },
      {
        problem: "The platform needed to feel fast on slower mobile connections.",
        solution:
          "Optimised images, minimised render-blocking resources, and deferred non-critical scripts to improve perceived performance on 3G/4G.",
      },
    ],
    architecture:
      "A classic multi-page structure with shared CSS and JavaScript modules. Each page fetches its own data from the API and renders it into pre-defined HTML templates — keeping the codebase easy to navigate and extend.",
    responsive:
      "Built mobile-first using Bootstrap 5's grid. Breakpoints tested manually across 320px to 1920px. Navigation collapses to a hamburger on mobile and stacks vertically on tablets.",
    performance: [
      "Compressed and correctly sized images for each breakpoint",
      "Deferred non-critical JavaScript to reduce initial load time",
      "Used Bootstrap utility classes to avoid redundant custom CSS",
    ],
    jsLogic:
      "A reusable fetch wrapper handles all API calls: it sends the request, checks the response status, and returns parsed JSON — or throws a typed error that the calling code can handle cleanly.",
    reactConcepts: ["Vanilla JavaScript — no framework used on this project"],
    lessons:
      "Working on a live platform with real users taught me to prioritise stability over cleverness. A boring, predictable fetch function beats a fancy abstraction that breaks silently.",
    links: { live: "https://kabsoula-sharia.com/en", repo: "" },
    featured: true,
  },
  {
    slug: "dema-biology",
    title: "Dema Biology",
    tagline: "Interactive educational platform with animations and dynamic UI",
    year: "2025",
    role: "Frontend Developer",
    cover: lumen,
    gallery: [lumen, atlas, forge],
    categories: ["JavaScript"],
    tech: ["HTML5", "CSS3", "JavaScript", "Animations"],
    accentStat: { value: 5, suffix: "+", label: "interactive features built" },
    summary:
      "An engaging biology educational platform with animations, sound effects, dynamic content, and interactive UI enhancements designed to keep students engaged.",
    features: [
      "CSS and JavaScript animations to illustrate biological concepts",
      "Sound effects and audio cues triggered on user interaction",
      "Dynamic content sections that update without full page reloads",
      "Fully accessible and mobile-compatible interface",
    ],
    challenges: [
      {
        problem: "Animations were triggering even when the user hadn't scrolled to them yet.",
        solution:
          "Used IntersectionObserver to fire animations only when elements entered the viewport — improving both performance and user experience.",
      },
      {
        problem: "Sound effects needed to respect user preferences and not autoplay on load.",
        solution:
          "Tied all audio to explicit user interactions (clicks and hovers) and added a mute toggle stored in localStorage for repeat visits.",
      },
    ],
    architecture:
      "Page-per-topic structure with a shared utilities file for common functions like animation triggers, audio management, and DOM helpers. Kept each topic page self-contained so adding new content doesn't risk breaking existing pages.",
    responsive:
      "CSS Grid and Flexbox for layouts, with CSS custom properties driving spacing and colour across breakpoints. Tested on iOS Safari and Android Chrome specifically due to their audio policy differences.",
    performance: [
      "IntersectionObserver-driven animations to avoid layout thrashing",
      "Audio files loaded lazily on first interaction, not on page load",
      "CSS animations preferred over JavaScript for smooth 60fps motion",
    ],
    jsLogic:
      "A lightweight event manager maps each interactive element to its handler (animate, play audio, toggle visibility). One initialisation function wires everything up after DOMContentLoaded — keeping the global scope clean.",
    reactConcepts: ["Vanilla JavaScript — no framework used on this project"],
    lessons:
      "Browser audio policies on mobile are strict. Testing on real devices early saved hours of debugging — simulators don't replicate the actual audio restrictions iOS enforces.",
    links: { live: "https://dema-biology.com", repo: "" },
    featured: true,
  },
  {
    slug: "tedx-dokki-youth",
    title: "TEDx Dokki Youth",
    tagline: "Official TEDx event website built and maintained as a volunteer",
    year: "2024",
    role: "Volunteer Frontend Developer",
    cover: nimbus,
    gallery: [nimbus, lumen, forge],
    categories: ["JavaScript"],
    tech: ["HTML5", "CSS3", "JavaScript"],
    accentStat: { value: 1, suffix: " team", label: "collaborative build" },
    summary:
      "Contributed to building and maintaining the official TEDx Dokki Youth website as part of a volunteer team. Focused on web design implementation and front-end functionality.",
    features: [
      "Event schedule and speaker showcase sections",
      "Responsive layout for desktop and mobile attendees",
      "Team-built with version control and collaborative workflow",
      "Clean, fast-loading pages suitable for event promotion",
    ],
    challenges: [
      {
        problem: "Multiple developers working on the same codebase without a build system.",
        solution:
          "Established a clear file structure and naming convention early — each developer owned their section, and we merged changes carefully to avoid conflicts.",
      },
      {
        problem: "Deadline was tight with the event date fixed.",
        solution:
          "Prioritised core pages first (home, speakers, schedule), then added enhancements once the essentials were live and tested.",
      },
    ],
    architecture:
      "Static multi-page site with shared CSS stylesheet and modular JavaScript files per page. Simple and fast — no build tooling needed for a short-lifecycle event site.",
    responsive:
      "Mobile-first CSS with media queries at standard breakpoints. Tested across screen sizes to ensure the event looked professional on whatever device attendees used.",
    performance: [
      "No unused JavaScript or CSS — every line serves a function",
      "Optimised images to keep page weight low for mobile visitors",
      "No third-party dependencies beyond what was strictly needed",
    ],
    jsLogic:
      "A countdown timer to the event date, a simple tab system for the schedule, and a smooth-scroll navigation — all in vanilla JavaScript with no libraries.",
    reactConcepts: ["Vanilla JavaScript — no framework used on this project"],
    lessons:
      "Volunteering on a real, public website is one of the best ways to learn. Knowing real people would visit the site made code quality feel personal — not just academic.",
    links: { live: "", repo: "" },
    featured: false,
  },
  {
    slug: "depi-react-projects",
    title: "DEPI React Training Projects",
    tagline: "React components and mini-apps built during DEPI training",
    year: "2025 — 2026",
    role: "React Developer Trainee",
    cover: forge,
    gallery: [forge, atlas, nimbus],
    categories: ["React", "API"],
    tech: ["React.js", "JavaScript ES6+", "CSS3", "REST APIs"],
    accentStat: { value: 8, suffix: "+", label: "months of React training" },
    summary:
      "A collection of React applications and components built during the Digital Egypt Pioneers Initiative (DEPI) training programme — covering hooks, component patterns, REST API integration, and real-world workflows.",
    features: [
      "Reusable UI components following React best practices",
      "State management with useState, useEffect, and custom hooks",
      "REST API integration with async/await and error handling",
      "Component-based architecture simulating production workflows",
    ],
    challenges: [
      {
        problem: "Understanding when to lift state versus keep it local.",
        solution:
          "Worked through multiple component trees to develop an intuition: if two siblings need the same piece of state, it belongs in their parent — not duplicated in both.",
      },
      {
        problem: "API calls running on every render and causing unnecessary network requests.",
        solution:
          "Added useEffect with a proper dependency array and a cleanup function to cancel stale requests — which also fixed a race condition where fast navigation caused old data to overwrite new.",
      },
    ],
    architecture:
      "Feature-per-folder structure: each mini-app has its own components, hooks and styles directory. Shared utilities and reusable hooks live at the top level — making it easy to extract patterns into future projects.",
    responsive:
      "Each project is built mobile-first. CSS custom properties drive colour and spacing so components adapt cleanly across breakpoints without one-off overrides.",
    performance: [
      "useCallback and useMemo applied where profiling showed render bottlenecks",
      "Lazy loading for heavier sub-pages using React.lazy and Suspense",
      "Images optimised and served at appropriate dimensions",
    ],
    jsLogic:
      "A custom useFetch hook wraps fetch calls with loading, error, and data states — and exposes a refetch function. It handles cancellation via AbortController so unmounting a component mid-request doesn't cause state-update warnings.",
    reactConcepts: [
      "useState and useEffect for local async state",
      "Custom hooks for shared logic (useFetch, useLocalStorage)",
      "Controlled inputs and form validation",
      "Conditional rendering and list rendering with keys",
    ],
    lessons:
      "Training on structured projects with deadlines is very different from tutorials. Having to explain your code choices to a trainer builds understanding you can't get from following along passively.",
    links: { live: "", repo: "https://github.com/yasminah11" },
    featured: true,
  },
];

export const getProject = (slug) => projects.find((p) => p.slug === slug);
