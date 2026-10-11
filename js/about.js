/**
 * UDAYAN BORGE (MR_RAJEE) — ABOUT / THE BUILDER ENGINE
 * Manages interactive manifesto hover responses, abstract visual SVG dynamics, and scroll triggers.
 */

class AboutEngine {
  constructor() {
    this.section = document.getElementById('about');
    this.init();
  }

  init() {
    if (!this.section) return;

    this.attachManifestoInteractions();
    this.attachCapabilityHover();
    this.attachVisualRotation();
    this.initScrollReveals();
  }

  /* 1. Manifesto Words Hover Interactions */
  attachManifestoInteractions() {
    const manifestoItems = this.section.querySelectorAll('.manifesto-item');
    manifestoItems.forEach((item) => {
      item.addEventListener('mouseenter', () => {
        manifestoItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
      });
    });
  }

  /* 2. Capability Cards Subtle Hover Dynamics */
  attachCapabilityHover() {
    const capCards = this.section.querySelectorAll('.capability-card');
    capCards.forEach((card) => {
      card.addEventListener('mouseenter', () => {
        document.body.classList.add('hovering-link');
      });
      card.addEventListener('mouseleave', () => {
        document.body.classList.remove('hovering-link');
      });
    });
  }

  /* 3. Abstract SVG Orbit Rotation on Mouse Movement */
  attachVisualRotation() {
    const visualFrame = this.section.querySelector('.about-visual-frame');
    const svgOrbit = this.section.querySelector('.svg-orbit-outer');
    
    if (!visualFrame || !svgOrbit) return;

    visualFrame.addEventListener('mousemove', (e) => {
      const rect = visualFrame.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const angle = Math.atan2(y, x) * (180 / Math.PI);

      if (typeof gsap !== 'undefined') {
        gsap.to(svgOrbit, {
          rotation: angle,
          transformOrigin: '50% 50%',
          duration: 0.6,
          ease: 'power2.out'
        });
      }
    });

    visualFrame.addEventListener('mouseleave', () => {
      if (typeof gsap !== 'undefined') {
        gsap.to(svgOrbit, {
          rotation: 0,
          transformOrigin: '50% 50%',
          duration: 1,
          ease: 'power2.out'
        });
      }
    });
  }

  /* 4. GSAP Scroll Trigger Animations */
  initScrollReveals() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    // Header reveal
    gsap.fromTo(this.section.querySelectorAll('.about-section-tag, .about-hero-headline, .about-hero-subheadline'),
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

    // Bio grid reveal
    gsap.fromTo(this.section.querySelectorAll('.about-bio-text, .about-visual-frame'),
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-intro-grid',
          start: 'top 80%'
        }
      }
    );

    // Manifesto items reveal
    gsap.fromTo(this.section.querySelectorAll('.manifesto-item'),
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.about-manifesto-block',
          start: 'top 80%'
        }
      }
    );

    // Capability cards reveal
    gsap.fromTo(this.section.querySelectorAll('.capability-card'),
      { opacity: 0, y: 35 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-capabilities-block',
          start: 'top 80%'
        }
      }
    );
  }
}

window.AboutEngine = AboutEngine;
