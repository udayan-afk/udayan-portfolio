/**
 * UDAYAN BORGE (MR_RAJEE) — MAIN ENTRY POINT
 * Initializes 3D hero scene, animation engine, and mobile menu controls.
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log(
    '%c UDAYAN BORGE %c MR_RAJEE %c Interactive Creative Developer Portfolio 2026 ',
    'background: #111111; color: #ffffff; font-weight: bold; padding: 4px 8px; border-radius: 4px 0 0 4px;',
    'background: #FF4D00; color: #ffffff; font-weight: bold; padding: 4px 8px; border-radius: 0 4px 4px 0;',
    'color: #555555; font-style: italic; padding: 4px;'
  );

  // 1. Initialize 3D Hero Scene
  let heroScene = null;
  if (typeof HeroScene !== 'undefined') {
    heroScene = new HeroScene();
  }

  // 2. Initialize Animation & Scroll Engine
  let animationEngine = null;
  if (typeof AnimationEngine !== 'undefined') {
    animationEngine = new AnimationEngine();
    window.animationEngine = animationEngine;
  }

  // 3. Initialize Case Study Modal & Lightbox Engine
  let caseStudyEngine = null;
  if (typeof CaseStudyEngine !== 'undefined') {
    caseStudyEngine = new CaseStudyEngine();
    window.caseStudyEngine = caseStudyEngine;
  }

  // 4. Initialize Lab & Experiments Engine
  let labEngine = null;
  if (typeof LabEngine !== 'undefined') {
    labEngine = new LabEngine();
    window.labEngine = labEngine;
  }

  // 5. Initialize About / Builder Engine
  let aboutEngine = null;
  if (typeof AboutEngine !== 'undefined') {
    aboutEngine = new AboutEngine();
    window.aboutEngine = aboutEngine;
  }

  // 6. Initialize Toolbox Engine
  let toolboxEngine = null;
  if (typeof ToolboxEngine !== 'undefined') {
    toolboxEngine = new ToolboxEngine();
    window.toolboxEngine = toolboxEngine;
  }

  // 7. Initialize Achievements Engine
  let achievementsEngine = null;
  if (typeof AchievementsEngine !== 'undefined') {
    achievementsEngine = new AchievementsEngine();
    window.achievementsEngine = achievementsEngine;
  }

  // 8. Initialize Contact & Footer Engine
  let contactEngine = null;
  if (typeof ContactEngine !== 'undefined') {
    contactEngine = new ContactEngine();
    window.contactEngine = contactEngine;
  }


  // 3. Mobile Navigation Controls
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const mobileNav = document.querySelector('.mobile-nav-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', () => {
      const isActive = mobileNav.classList.toggle('active');
      menuBtn.setAttribute('aria-expanded', isActive ? 'true' : 'false');
      
      // Animate hamburger icon bars
      const bars = menuBtn.querySelectorAll('span');
      if (isActive) {
        bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
      }
    });

    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        const bars = menuBtn.querySelectorAll('span');
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
      });
    });
  }

  // 4. Smooth Anchor Scroll Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        if (animationEngine && animationEngine.lenis) {
          animationEngine.lenis.scrollTo(targetElement);
        } else {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
});
