/**
 * UDAYAN BORGE (MR_RAJEE) — SKILLS & TOOLBOX ENGINE
 * Controls hover dynamics and GSAP scroll trigger reveals for the Toolbox section.
 */

class SkillsEngine {
  constructor() {
    this.section = document.getElementById('skills');
    this.init();
  }

  init() {
    if (!this.section) return;

    this.attachHoverInteractions();
    this.initScrollReveals();
  }

  attachHoverInteractions() {
    const cards = this.section.querySelectorAll('.toolbox-category-card');
    cards.forEach((card) => {
      card.addEventListener('mouseenter', () => {
        document.body.classList.add('hovering-link');
      });
      card.addEventListener('mouseleave', () => {
        document.body.classList.remove('hovering-link');
      });
    });

    const toolTags = this.section.querySelectorAll('.tool-tag');
    toolTags.forEach((tag) => {
      tag.addEventListener('mouseenter', () => {
        if (typeof gsap !== 'undefined') {
          gsap.to(tag, {
            scale: 1.05,
            x: 4,
            duration: 0.2,
            ease: 'power2.out'
          });
        }
      });
      tag.addEventListener('mouseleave', () => {
        if (typeof gsap !== 'undefined') {
          gsap.to(tag, {
            scale: 1,
            x: 0,
            duration: 0.3,
            ease: 'power2.out'
          });
        }
      });
    });
  }

  initScrollReveals() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    // Header reveal
    gsap.fromTo(this.section.querySelectorAll('.toolbox-section-tag, .toolbox-main-statement, .toolbox-supporting-copy'),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: this.section,
          start: 'top 80%'
        }
      }
    );

    // Cards reveal
    gsap.fromTo(this.section.querySelectorAll('.toolbox-category-card'),
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.toolbox-grid',
          start: 'top 80%'
        }
      }
    );
  }
}

window.SkillsEngine = SkillsEngine;
