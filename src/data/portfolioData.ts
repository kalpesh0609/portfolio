export interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  badge?: string;
  description: string;
  coreConcept?: string;
  problemStatement?: string;
  status: "Active Development" | "Exploration" | "Prototype";
  technologies: string[];
  implementedFeatures: string[];
  simulatedFeatures?: string[];
  plannedFeatures?: string[];
  image: string;
  githubUrl?: string;
  liveDemoUrl?: string;
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface JourneyMilestone {
  title: string;
  period: string;
  subtitle: string;
  description: string;
  highlights?: string[];
}

export interface InterestItem {
  title: string;
  description: string;
  category: string;
}

export interface EducationData {
  degree: string;
  branch: string;
  year: string;
  status: string;
  highlights: string[];
}

export interface SocialLinks {
  email: string;
  githubUsername: string;
  github: string;
  linkedin: string;
  twitter?: string;
  instagram?: string;
  resumeUrl?: string;
}

export interface PortfolioData {
  personal: {
    brandTitle: string;
    brandSub: string;
    headline: string;
    heroHeading: string;
    heroIntro: string;
    about: {
      paragraphs: string[];
      focusAreas: string[];
    };
    education: EducationData;
  };
  social: SocialLinks;
  skillCategories: SkillCategory[];
  interests: InterestItem[];
  projects: Project[];
  journey: JourneyMilestone[];
}

export const portfolioData: PortfolioData = {
  personal: {
    brandTitle: "DEVELOPER",
    brandSub: "PORTFOLIO",
    headline: "Full-Stack Developer",
    heroHeading: "Building ideas into digital experiences.",
    heroIntro:
      "Engineering student passionate about technology, software development, and turning ideas into practical digital experiences.",
    about: {
      paragraphs: [
        "I'm a second-year Computer Engineering student with a strong interest in technology and software development. I enjoy exploring how things work, learning new technologies, and building applications that turn ideas into practical solutions.",
        "My interests span full-stack and web development, Android and Flutter applications, backend systems, and interactive 3D web experiences. I am continuously learning, experimenting with new tools, and improving my problem-solving skills through hands-on projects.",
      ],
      focusAreas: [
        "Full-Stack Web Development",
        "Mobile App Development (Flutter & Android)",
        "Interactive 3D Web & UI Design",
        "Problem Solving & Open-Source Projects",
      ],
    },
    education: {
      degree: "Bachelor of Technology (B.Tech)",
      branch: "Computer Engineering",
      year: "Second Year",
      status: "Currently Pursuing",
      highlights: [
        "Focusing on computer science fundamentals and data structures",
        "Exploring application development through practical project building",
        "Active learning in modern software engineering stacks",
      ],
    },
  },
  social: {
    email: "kalpeshroundhal@gmail.com",
    githubUsername: "kalpesh0609",
    github: "https://github.com/kalpesh0609",
    linkedin: "https://www.linkedin.com/in/kalpesh-roundhal",
    resumeUrl: "", // Intentionally empty; no fake resume button
  },
  skillCategories: [
    {
      name: "Frontend Development",
      skills: ["React", "HTML", "CSS", "JavaScript", "TypeScript", "Three.js"],
    },
    {
      name: "Backend Development",
      skills: ["Supabase", "MongoDB", "REST API Concepts"],
    },
    {
      name: "Mobile App Development",
      skills: ["Flutter", "Android", "Jetpack Compose", "Dart", "Kotlin"],
    },
    {
      name: "Programming Languages",
      skills: ["Java", "Kotlin", "JavaScript", "TypeScript", "Dart"],
    },
    {
      name: "UI/UX and 3D Web",
      skills: ["Three.js", "Interactive 3D Web", "Responsive Layouts", "UI/UX Design"],
    },
    {
      name: "Developer Tools",
      skills: ["Git", "GitHub", "OpenStreetMap", "OSRM", "Visual Studio Code"],
    },
  ],
  interests: [
    {
      title: "Web Development",
      description: "Crafting structured, accessible, and high-performance websites with modern web standards.",
      category: "Web",
    },
    {
      title: "Full-Stack Development",
      description: "Connecting user interfaces with databases and APIs to deliver complete, functional applications.",
      category: "Architecture",
    },
    {
      title: "Flutter Development",
      description: "Building cross-platform mobile apps with Dart, smooth animations, and clean UI components.",
      category: "Mobile",
    },
    {
      title: "Android Development",
      description: "Developing native Android applications utilizing Kotlin, Jetpack Compose, and system services.",
      category: "Mobile",
    },
    {
      title: "Backend Development",
      description: "Exploring databases, data persistence, and RESTful architectures with MongoDB and Supabase.",
      category: "Systems",
    },
    {
      title: "3D Web Design",
      description: "Creating engaging WebGL and Three.js 3D web experiences with interactive real-time graphics.",
      category: "Interactive",
    },
    {
      title: "UI/UX Design",
      description: "Designing user-centric layouts prioritizing readability, clear typography, and seamless flows.",
      category: "Design",
    },
    {
      title: "Problem Solving",
      description: "Tackling algorithmic challenges, debugging edge cases, and engineering practical software solutions.",
      category: "Engineering",
    },
    {
      title: "Open-Source Projects",
      description: "Studying open-source codebases, collaborating, and building tools that benefit developers.",
      category: "Community",
    },
  ],
  projects: [
    {
      id: "resqroute",
      number: "01",
      title: "ResQRoute",
      category: "SIH Disaster-Management & Evacuation Project",
      badge: "SIH Problem Statement: SIH26191",
      coreConcept: "Shortest route does not always mean safest route.",
      problemStatement:
        "Developed for Smart India Hackathon problem statement SIH26191, addressing hazard-based red zones, carrying-capacity assessment, and immediate relocation needs for vulnerable habitations during emergencies.",
      description:
        "An intelligent disaster-response and evacuation platform designed to help people identify safer relocation routes and suitable shelters during emergencies.",
      status: "Active Development",
      technologies: [
        "Kotlin",
        "Android",
        "Jetpack Compose",
        "OpenStreetMap",
        "OSMDroid",
        "OSRM",
        "Room SQLite",
        "GPS Navigation",
      ],
      implementedFeatures: [
        "Risk-aware evacuation routing logic",
        "OpenStreetMap & OSMDroid interactive map rendering",
        "OSRM public routing service integration",
        "Live GPS-based location tracking & turn-by-turn guidance",
        "Hazard overlays & route safety visual corridors",
        "Shelter information & capacity assessment displays",
        "SMS-based emergency commands for offline coordination",
        "Local Room SQLite database for offline data persistence",
        "QR-based offline emergency tokens",
        "Voice navigation guidance & haptic compass feedback",
      ],
      simulatedFeatures: [
        "BLE mesh communication simulation (modeled for testing non-line-of-sight emergency relays)",
      ],
      plannedFeatures: [
        "Expanded multi-hazard automated red-zone threat calculation",
      ],
      image: "/images/resqroute.jpg",
      githubUrl: "",
      liveDemoUrl: "",
    },
    {
      id: "zoom-clone",
      number: "02",
      title: "Zoom Clone Meeting Platform",
      category: "Interactive Meeting Platform",
      badge: "Web Video Interface",
      description:
        "A meeting-platform project inspired by video-conferencing applications, focused on creating a convenient digital meeting experience.",
      status: "Prototype",
      technologies: [
        "React",
        "JavaScript",
        "HTML5",
        "CSS3",
        "UI Architecture",
        "Responsive Design",
      ],
      implementedFeatures: [
        "Meeting interface layout with active speaker and participant tiles",
        "Screen-sharing UI preview canvas exploration",
        "Responsive grid layout adapting across desktop and mobile screens",
        "Interactive meeting controls toolbar (mute, video toggle, reactions)",
        "Side panel design exploration for meeting assistance and summary notes",
      ],
      image: "/images/zoom_ai.jpg",
      githubUrl: "",
      liveDemoUrl: "",
    },
  ],
  journey: [
    {
      title: "Pursuing B.Tech in Computer Engineering",
      period: "Current Milestone",
      subtitle: "Second Year Undergraduate",
      description:
        "Deepening computer science fundamentals, data structures, and core software engineering principles while exploring modern programming paradigms.",
      highlights: [
        "Core computing & algorithms",
        "OOP principles in Java & Kotlin",
      ],
    },
    {
      title: "Exploring Full-Stack & Web Development",
      period: "Milestone 2",
      subtitle: "Frontend & Web Architecture",
      description:
        "Learning modern frontend engineering with React, JavaScript, TypeScript, and CSS, while exploring backend databases like Supabase and MongoDB.",
      highlights: [
        "Component-driven React architectures",
        "Backend integrations & REST concepts",
      ],
    },
    {
      title: "Learning Mobile Application Development",
      period: "Milestone 3",
      subtitle: "Android & Flutter Ecosystems",
      description:
        "Building native Android applications with Kotlin & Jetpack Compose and cross-platform apps using Flutter & Dart.",
      highlights: [
        "Jetpack Compose UI & Android SDK",
        "Cross-platform mobility with Flutter",
      ],
    },
    {
      title: "Building & Improving Projects",
      period: "Milestone 4",
      subtitle: "ResQRoute & Zoom Clone",
      description:
        "Applying technical knowledge directly to project-based challenges, from disaster-evacuation routing to interactive video meeting interfaces.",
      highlights: [
        "SIH ResQRoute disaster routing",
        "Interactive meeting platform exploration",
      ],
    },
  ],
};
