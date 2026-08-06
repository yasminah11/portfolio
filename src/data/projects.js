import atlas from "@/assets/project-atlas.jpg";
import lumen from "@/assets/project-lumen.jpg";
import nimbus from "@/assets/project-nimbus.jpg";
import forge from "@/assets/project-forge.jpg";

export const categories = ["All", "React", "JavaScript", "API"];

export const projects = [
  {
    slug: "kabsoula-sharia",
    title: "Kabsoula Sharia",
    tagline:
      "Live educational platform with responsive interfaces and dynamic content integration.",
    year: "2025",
    role: "Frontend Developer",
    cover: atlas,
    gallery: [atlas, lumen, nimbus],
    categories: ["JavaScript", "API"],
    tech: ["HTML5", "CSS3", "Bootstrap 5", "JavaScript (ES6+)", "REST API", "Git", "GitHub"],
    accentStat: { value: 100, suffix: "%", label: "cross-browser compatible" },
    summary:
      "A live educational platform developed for students and instructors. Built responsive, mobile-friendly interfaces and integrated dynamic content from backend REST APIs while maintaining clean, scalable front-end architecture.",
    features: [
      "Responsive layouts optimized for desktop, tablet, and mobile.",
      "Dynamic content rendered through backend REST API integration.",
      "Reusable UI components for consistent user experience.",
      "Cross-browser compatibility across modern browsers.",
    ],
    challenges: [
      {
        problem: "Different API responses sometimes returned optional or missing fields.",
        solution:
          "Implemented defensive rendering and data validation to ensure the interface remained stable regardless of the returned data.",
      },
      {
        problem: "The platform needed to provide a smooth experience on slower mobile networks.",
        solution:
          "Optimized images, reduced unnecessary assets, and deferred non-critical JavaScript to improve loading performance.",
      },
    ],
    architecture:
      "A modular multi-page front-end architecture using shared CSS and JavaScript files. Dynamic data is fetched from backend REST APIs and rendered into reusable UI sections, making the project easier to maintain and extend.",
    responsive:
      "Built with a mobile-first approach using Bootstrap 5, ensuring consistent layouts and usability across different screen sizes and devices.",
    performance: [
      "Optimized images for faster loading.",
      "Deferred non-essential JavaScript.",
      "Reduced redundant CSS using Bootstrap utility classes.",
    ],
    jsLogic:
      "Implemented reusable API request functions with centralized error handling to simplify data fetching and keep the codebase organized.",
    reactConcepts: ["Vanilla JavaScript (No React used in this project)"],
    lessons:
      "Working on a live production platform strengthened my understanding of writing maintainable front-end code, integrating APIs, and building interfaces that remain stable with dynamic data.",
    links: { live: "https://kabsoula-sharia.com/en", repo: "" },
    featured: true,
  },
  {
    slug: "dema-biology",
    title: "Dema Biology",
    tagline:
      "Interactive biology learning platform with engaging animations and dynamic user experiences.",
    year: "2025",
    role: "Frontend Developer",
    cover: lumen,
    gallery: [lumen, atlas, forge],
    categories: ["JavaScript"],
    tech: ["HTML5", "CSS3", "JavaScript (ES6+)", "Bootstrap 5", "CSS Animations", "Git", "GitHub"],
    accentStat: { value: 5, suffix: "+", label: "interactive features built" },
    summary:
      "An educational biology platform designed to make learning more engaging through interactive animations, audio feedback, and responsive user interfaces while delivering a smooth experience across different devices.",
    features: [
      "Interactive animations built with CSS and JavaScript.",
      "Audio feedback triggered by user interactions.",
      "Dynamic educational content sections.",
      "Fully responsive interface for desktop and mobile users.",
    ],
    challenges: [
      {
        problem: "Animations were triggering before users reached their sections.",
        solution:
          "Used Intersection Observer to trigger animations only when elements became visible, improving both performance and user experience.",
      },
      {
        problem: "Audio interactions needed to avoid autoplay restrictions on modern browsers.",
        solution:
          "Triggered sounds only after explicit user interactions and provided an audio toggle for better accessibility.",
      },
    ],
    architecture:
      "Organized into modular pages with shared utility functions responsible for animations, audio interactions, and common UI behaviors, making future content additions easier to maintain.",
    responsive:
      "Developed responsive layouts using Flexbox and CSS Grid with consistent spacing and adaptive components across desktop, tablet, and mobile devices.",
    performance: [
      "Lazy-loaded audio resources.",
      "Optimized animation execution using Intersection Observer.",
      "Preferred CSS animations for smoother rendering.",
    ],
    jsLogic:
      "Implemented modular event handling to control animations, audio playback, and interactive UI behavior while keeping JavaScript organized and maintainable.",
    reactConcepts: ["Vanilla JavaScript (No React used in this project)"],
    lessons:
      "Building interactive educational experiences improved my understanding of browser events, performance optimization, responsive design, and creating engaging user interfaces without sacrificing usability.",
    links: { live: "https://dema-biology.com", repo: "" },
    featured: true,
  },
  {
    slug: "grad-guide-helper",
    title: "Grad Guide Helper",
    tagline:
      "Interactive academic planning tool for FCAI students to visualize course dependencies and plan their journey.",
    year: "2025",
    role: "Frontend Developer",
    cover: nimbus,
    gallery: [nimbus, forge, atlas],
    categories: ["React", "API"],
    tech: [
      "React.js",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "shadcn/ui",
      "Framer Motion",
      "Lucide React",
      "Vitest",
    ],
    accentStat: { value: 3, suffix: " tracks", label: "specialization paths supported" },
    summary:
      "A sophisticated, interactive academic planning tool designed for students at the Faculty of Computing & Artificial Intelligence (FCAI). It empowers students to navigate complex course dependencies, visualize prerequisites, and strategically plan their academic journey in specialized tracks like AI & Data Science and Cyber Security.",
    features: [
      "Intelligent real-time fuzzy search to instantly locate any course within the faculty's curriculum.",
      "Dependency Visualizer showing prerequisites and dependents for every subject.",
      "Program specialization filter for All Programs, AI & Data Science, and Cyber Security tracks.",
      "Detailed course analytics including credit hours, categories, and course types.",
      "Seamless dark mode with system preference detection and manual toggle.",
      "Fluid animations powered by Framer Motion for a premium user experience.",
    ],
    challenges: [
      {
        problem:
          "Representing complex many-to-many course dependencies in a way that's intuitive and fast to query.",
        solution:
          "Structured the curriculum data as a centralized graph in courses.ts, allowing bidirectional lookups (prerequisites and dependents) without redundant data or expensive traversal on each render.",
      },
      {
        problem: "Search needed to feel instant across a large course catalog without a backend.",
        solution:
          "Implemented client-side fuzzy search with debounced input handling, so results update in real time without blocking the UI or triggering unnecessary re-renders.",
      },
    ],
    architecture:
      "Feature-per-folder structure under src/: reusable shadcn/ui components live in components/ui/, feature-specific components (CourseDetails, CourseSearch) in their own directories, shared hooks in hooks/, and all curriculum data centralized in data/courses.ts. This keeps the codebase navigable and each concern clearly separated.",
    responsive:
      "Built mobile-first with Tailwind CSS utility classes and responsive variants. Layouts adapt cleanly from small screens up to wide desktops without one-off overrides.",
    performance: [
      "Client-side fuzzy search with debounced input to avoid unnecessary renders.",
      "Framer Motion animations scoped to interaction events, not layout shifts.",
      "Vitest unit tests to catch regressions early in the curriculum data logic.",
    ],
    jsLogic:
      "A centralized courses.ts file acts as the single source of truth for the curriculum graph. Dependency lookups are computed once and memoized, while custom hooks (use-mobile, use-toast) handle cross-cutting UI concerns cleanly.",
    reactConcepts: [
      "TypeScript for type-safe props and course data structures",
      "Custom hooks for shared UI logic (use-mobile, use-toast)",
      "shadcn/ui (Radix UI) for accessible, composable components",
      "Framer Motion for declarative, performant animations",
      "Vitest for unit testing curriculum data and utilities",
    ],
    lessons:
      "Designing a data model that supports complex relationships (prerequisites, dependents, specialization tracks) taught me to think in graphs before writing a single component. Getting the data structure right made every UI feature easier to build.",
    links: { live: "https://bsnu-guide-helper.vercel.app/", repo: "" },
    featured: true,
  },
];

export const getProject = (slug) => projects.find((p) => p.slug === slug);
