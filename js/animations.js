/**
 * UDAYAN BORGE (MR_RAJEE) — PORTFOLIO ANIMATIONS & SCROLL ENGINE
 * Controls GSAP animations, Lenis smooth scroll, and Custom Cursor dynamics.
 */

class AnimationEngine {
  constructor() {
    this.lenis = null;
    this.cursor = document.querySelector('.custom-cursor');
    this.cursorFollower = document.querySelector('.custom-cursor-follower');
    
    this.initLenis();
    this.initCursor();
    this.initHeaderScroll();
    this.playHeroIntro();
    this.initScrollAnimations();
  }

  /* 1. Lenis Smooth Scrolling */
  initLenis() {
    if (typeof Lenis !== 'undefined') {
      this.lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
        infinite: false
      });

      const raf = (time) => {
        if (this.lenis) {
          this.lenis.raf(time);
          requestAnimationFrame(raf);
        }
      };
      requestAnimationFrame(raf);

      // Connect with GSAP ScrollTrigger if present
      if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        this.lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => {
          if (this.lenis) {
            this.lenis.raf(time * 1000);
          }
        });
        gsap.ticker.lagSmoothing(0, 0);
      }
    }
  }

  destroyLenis() {
    if (this.lenis) {
      this.lenis.destroy();
      this.lenis = null;
    }
  }

  enableLenis() {
    if (!this.lenis) {
      this.initLenis();
    }
  }


  /* 2. Custom Cursor Lerp & Hover Detection */
  initCursor() {
    if (!this.cursor || !this.cursorFollower) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let followerX = mouseX;
    let followerY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Direct placement for main dot
      this.cursor.style.left = `${mouseX}px`;
      this.cursor.style.top = `${mouseY}px`;
    });

    // Smooth lerp loop for outer follower ring
    const renderCursor = () => {
      followerX += (mouseX - followerX) * 0.15;
      followerY += (mouseY - followerY) * 0.15;

      this.cursorFollower.style.left = `${followerX}px`;
      this.cursorFollower.style.top = `${followerY}px`;

      requestAnimationFrame(renderCursor);
    };
    requestAnimationFrame(renderCursor);

    // Hover listeners for links and interactive targets
    const interactiveElements = document.querySelectorAll('a, button, .interactive');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', () => document.body.classList.add('hovering-link'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('hovering-link'));
    });

    // Hover listener for project elements
    const projectCards = document.querySelectorAll('.project-card, [data-cursor="project"]');
    projectCards.forEach((card) => {
      card.addEventListener('mouseenter', () => document.body.classList.add('hovering-project'));
      card.addEventListener('mouseleave', () => document.body.classList.remove('hovering-project'));
    });
  }

  /* 3. Header Styling on Scroll */
  initHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  /* 4. Hero Intro Entrance Sequence */
  playHeroIntro() {
    if (typeof gsap === 'undefined') {
      // Fallback if GSAP is unavailable
      document.querySelectorAll('.hero-tagline, .hero-name, .hero-headline, .hero-description, .hero-actions, .hero-footer').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      });
      return;
    }

    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' }
    });

    tl.to('.hero-tagline', {
      opacity: 1,
      y: 0,
      duration: 0.6,
      delay: 0.1
    })
    .to('.hero-name', {
      opacity: 1,
      y: 0,
      duration: 0.7
    }, '-=0.4')
    .to('.hero-headline', {
      opacity: 1,
      y: 0,
      duration: 0.8
    }, '-=0.5')
    .to('.hero-description', {
      opacity: 1,
      y: 0,
      duration: 0.6
    }, '-=0.5')
    .to('.hero-actions', {
      opacity: 1,
      y: 0,
      duration: 0.6
    }, '-=0.4')
    .to('.hero-footer', {
      opacity: 1,
      y: 0,
      duration: 0.6
    }, '-=0.4');
  }

  /* 5. Scroll Reveals for Selected Work */
  initScrollAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    const cards = document.querySelectorAll('.project-card');
    cards.forEach((card) => {
      gsap.fromTo(card, 
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%'
          }
        }
      );
    });

    const dividers = document.querySelectorAll('.work-group-divider');
    dividers.forEach((divider) => {
      gsap.fromTo(divider,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: divider,
            start: 'top 90%'
          }
        }
      );
    });
  }
}

window.AnimationEngine = AnimationEngine;

