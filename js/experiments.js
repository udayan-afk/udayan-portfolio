/**
 * UDAYAN BORGE (MR_RAJEE) — EXPERIMENTS & LAB DATA
 * Personal digital laboratory: Prototypes, hackathons, AI explorations, and UI/UX ideas.
 */

const EXPERIMENTS_DATA = [
  {
    id: "exp-gesture-vocalizer",
    number: "01",
    title: "Gesture Vocalizer",
    category: "AI / COMPUTER VISION",
    filterTags: ["ALL", "AI", "PROTOTYPES"],
    description: "An exploration of gesture recognition and voice interaction for more accessible communication.",
    year: "2026",
    technologies: ["AI", "Python", "Computer Vision"],
    image: null,
    isHackathon: false,
    linkedProjectId: null,
    details: {
      overview: "Gesture Vocalizer explores real-time computer vision sign/gesture recognition mapped into voice synthesis. Designed as an accessibility concept to bridge non-verbal communication channels.",
      role: "AI & Computer Vision Explorer",
      tools: ["Python", "OpenCV", "MediaPipe", "PyTorch"],
      highlights: [
        "Real-time hand landmark tracking & spatial gesture mapping",
        "Low-latency voice synthesis pipeline",
        "Accessible, camera-driven interaction model"
      ]
    }
  },
  {
    id: "exp-krishisetu-hackathon",
    number: "02",
    title: "KrishiSetu Hackathon",
    category: "HACKATHON / AGRITECH",
    filterTags: ["ALL", "HACKATHONS", "ANDROID"],
    description: "Exploring technology-driven solutions for farmer market access and price discovery.",
    year: "2026",
    technologies: ["Android", "Kotlin", "Firebase"],
    image: "assets/images/projects/krishisetu/1.jpeg",
    isHackathon: true,
    linkedProjectId: "krishisetu",
    details: {
      overview: "Developed during a competitive innovation event to tackle agricultural market disconnection. Focused on building a rapid Android prototype connecting rural farmers with direct market prices.",
      role: "Android Developer & Team Builder",
      tools: ["Kotlin", "Firebase", "Android SDK"],
      highlights: [
        "Hackathon prototype built under 24-hour timeline",
        "Integrated real-time crop price discovery algorithm",
        "Direct farmer-to-buyer transaction concept"
      ]
    }
  },
  {
    id: "exp-flowlens",
    number: "03",
    title: "FlowLens Interface",
    category: "UI/UX EXPERIMENT",
    filterTags: ["ALL", "UI/UX", "PROTOTYPES"],
    description: "A productivity interface exploring focus, organization and workflow.",
    year: "2026",
    technologies: ["Figma", "Product Design"],
    image: null,
    isHackathon: false,
    linkedProjectId: "flowlens",
    details: {
      overview: "An experimental UI exploration testing distraction-free task management. Uses minimal visual noise and context-aware focus zones for creative engineers.",
      role: "UI/UX Experimenter",
      tools: ["Figma", "Design Systems"],
      highlights: [
        "Distraction-free focus mode UI layout",
        "Modular context-driven task cards",
        "Dark-mode editorial typography experimentation"
      ]
    }
  },
  {
    id: "exp-attendx",
    number: "04",
    title: "AttendX Matrix",
    category: "UI/UX EXPERIMENT",
    filterTags: ["ALL", "UI/UX", "PROTOTYPES"],
    description: "Exploring a digital attendance experience for students and faculty.",
    year: "2026",
    technologies: ["Figma", "Product Design"],
    image: "assets/images/projects/attendx/Screenshot 2026-10-04 233344.png",
    isHackathon: false,
    linkedProjectId: "attendx",
    details: {
      overview: "An interface study rethinking traditional university attendance lists. Focused on high-density data visualization and instant status verification.",
      role: "Product Designer",
      tools: ["Figma", "Interaction Design"],
      highlights: [
        "High-density attendance grid matrix",
        "Role-based view switching for professors and students",
        "Color-coded telemetry indicators"
      ]
    }
  },
  {
    id: "exp-krishishare",
    number: "05",
    title: "KrishiShare Concept",
    category: "PRODUCT CONCEPT",
    filterTags: ["ALL", "UI/UX", "PROTOTYPES"],
    description: "Exploring how farmers could share agricultural equipment.",
    year: "2026",
    technologies: ["Figma", "Product Design"],
    image: "assets/images/projects/krishishare/Screenshot 2026-10-04 234102.png",
    isHackathon: false,
    linkedProjectId: "krishishare",
    details: {
      overview: "A product-design exploration into shared economy models for rural farming machinery. Investigates peer-to-peer tractor rentals and communal asset sharing.",
      role: "Product Designer & Researcher",
      tools: ["Figma", "User Journey Mapping"],
      highlights: [
        "Communal machinery rental booking flow",
        "Geographic machinery availability mapping",
        "Simplified multi-lingual user interface concept"
      ]
    }
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { EXPERIMENTS_DATA };
}
