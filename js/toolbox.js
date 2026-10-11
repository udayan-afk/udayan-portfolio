/**
 * UDAYAN BORGE (MR_RAJEE) — TOOLBOX / TECHNICAL IDENTITY DATA & ENGINE
 * Open editorial layout with bold typography, spacious hierarchy, and no cards.
 */

const TOOLBOX_DATA = {
  categories: [
    {
      id: "code",
      number: "01",
      title: "CODE",
      tagline: "LANGUAGES & SYNTAX",
      items: [
        { name: "Java", desc: "Android development" },
        { name: "Kotlin", desc: "Modern Android development" },
        { name: "C++", desc: "Object-oriented & system logic" },
        { name: "Python", desc: "AI experimentation & data scripts" },
        { name: "JavaScript", desc: "Interactive web logic & dynamic UIs" },
        { name: "PHP", desc: "Server-side scripting" },
        { name: "HTML", desc: "Semantic document structure" },
        { name: "CSS", desc: "Responsive layout & modern styling" }
      ]
    },
    {
      id: "build",
      number: "02",
      title: "BUILD",
      tagline: "TOOLS & ECOSYSTEMS",
      items: [
        { name: "Android Studio", desc: "Native Android IDE" },
        { name: "Flutter", desc: "Cross-platform framework" },
        { name: "Firebase", desc: "Backend & realtime data" },
        { name: "MySQL", desc: "Relational database management" },
        { name: "Git", desc: "Version control & source management" },
        { name: "GitHub", desc: "Code hosting & collaboration" },
        { name: "Jetpack Compose", desc: "Declarative Android UI toolkit" },
        { name: "Gradle", desc: "Build automation & dependencies" }
      ]
    },
    {
      id: "design",
      number: "03",
      title: "DESIGN",
      tagline: "PRODUCT & INTERFACE",
      items: [
        { name: "Figma", desc: "UI/UX & product design" },
        { name: "UI / UX", desc: "User-centric interface design" },
        { name: "Product Design", desc: "End-to-end digital product design" },
        { name: "Wireframing", desc: "Low-fidelity structural layouts" },
        { name: "Prototyping", desc: "Interactive flows & user testing" },
        { name: "Design Systems", desc: "Reusable UI components & tokens" },
        { name: "User Flows", desc: "Interaction mapping & navigation" },
        { name: "Visual Design", desc: "Editorial layout, typography & aesthetics" }
      ]
    },
    {
      id: "exploration",
      number: "04",
      title: "EXPLORATION",
      tagline: "EMERGING & EXPERIMENTAL",
      items: [
        { name: "Artificial Intelligence", desc: "Generative AI & LLM concepts" },
        { name: "Computer Vision", desc: "Gesture recognition & image processing" },
        { name: "Creative Coding", desc: "Canvas & interactive visuals" },
        { name: "3D", desc: "Web 3D & canvas scenes" },
        { name: "Experiments", desc: "Fast validation & hackathon builds" }
      ]
    }
  ]
};

class ToolboxEngine {
  constructor() {
    this.container = document.getElementById('toolbox-wall-container');
    this.section = document.getElementById('skills');
    this.init();
  }

  init() {
    if (!this.container || !this.section) return;

    this.renderToolbox();
    this.attachInteractions();
    this.initScrollReveals();
  }

  renderToolbox() {
    this.container.innerHTML = TOOLBOX_DATA.categories.map((cat) => `
      <article class="toolbox-category-block" data-category="${cat.id}">
        <div class="toolbox-cat-header">
          <div class="cat-title-group">
            <span class="cat-num">${cat.number} /</span>
            <h3 class="cat-title">${cat.title}</h3>
          </div>
          <span class="cat-tagline">${cat.tagline}</span>
        </div>

        <div class="toolbox-editorial-grid" role="list">
          ${cat.items.map((item) => `
            <div class="editorial-skill-item" role="listitem">
              <div class="skill-name-row">
                <span class="skill-name">${item.name}</span>
                <span class="skill-arrow">→</span>
              </div>
              <span class="skill-desc">${item.desc}</span>
            </div>
          `).join('')}
        </div>
      </article>
    `).join('');
  }

  attachInteractions() {
    const skillItems = this.container.querySelectorAll('.editorial-skill-item');

    skillItems.forEach((item) => {
      item.addEventListener('mouseenter', () => {
        document.body.classList.add('hovering-link');
      });

      item.addEventListener('mouseleave', () => {
        document.body.classList.remove('hovering-link');
      });
    });
  }

  initScrollReveals() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    // Header reveal
    gsap.fromTo(this.section.querySelectorAll('.toolbox-section-tag, .toolbox-supporting-copy'),
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: this.section,
          start: 'top 85%'
        }
      }
    );

    // Category Blocks reveal
    const categoryBlocks = this.section.querySelectorAll('.toolbox-category-block');
    categoryBlocks.forEach((block) => {
      gsap.fromTo(block,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: block,
            start: 'top 88%'
          }
        }
      );

      // Stagger items inside each category
      const skillItems = block.querySelectorAll('.editorial-skill-item');
      gsap.fromTo(skillItems,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.04,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: block,
            start: 'top 85%'
          }
        }
      );
    });
  }
}

window.ToolboxEngine = ToolboxEngine;
