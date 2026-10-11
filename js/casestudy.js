/**
 * UDAYAN BORGE (MR_RAJEE) — INTERACTIVE PROJECT CASE STUDY & LIGHTBOX MODULE
 * Full-screen editorial detail view, image gallery lightbox, keyboard navigation & scroll locking.
 */

class CaseStudyEngine {
  constructor() {
    this.projects = typeof PROJECTS_DATA !== 'undefined' ? PROJECTS_DATA : [];
    this.currentProjectIndex = 0;
    this.currentGalleryIndex = 0;
    this.savedScrollY = 0;

    this.overlay = document.getElementById('project-detail-overlay');
    this.lightbox = document.getElementById('image-lightbox');

    this.init();
  }

  init() {
    if (!this.overlay || !this.lightbox) return;

    // Attach click handlers to project cards and CTA buttons
    this.attachProjectCardListeners();

    // Attach global keyboard listeners (ESC, Arrow keys)
    window.addEventListener('keydown', (e) => this.handleKeyDown(e));
  }

  attachProjectCardListeners() {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
      // Allow clicking title, link button, or visual container to open case study
      const clickableTargets = card.querySelectorAll('.project-title, .project-link-btn, .project-visual-wrapper');
      clickableTargets.forEach((target) => {
        target.style.cursor = 'pointer';
        target.addEventListener('click', (e) => {
          e.preventDefault();
          this.openProject(index);
        });
      });
    });
  }

  /* Open Project Case Study View */
  openProject(index) {
    if (index < 0 || index >= this.projects.length) return;

    this.currentProjectIndex = index;
    const project = this.projects[index];

    // Save current window scroll position
    this.savedScrollY = window.scrollY || window.pageYOffset || 0;

    // Build Case Study Editorial HTML
    this.renderCaseStudyHTML(project);

    // Show Overlay with Body Scroll Lock
    this.overlay.style.display = 'block';
    document.body.classList.add('project-open');

    // Destroy Lenis during overlay presentation to prevent global wheel event cancellation
    if (window.animationEngine) {
      window.animationEngine.destroyLenis();
    }

    if (typeof gsap !== 'undefined') {
      gsap.fromTo(this.overlay,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power3.out',
          onComplete: () => {
            gsap.set(this.overlay, { clearProps: 'transform' });
          }
        }
      );
    } else {
      this.overlay.style.opacity = '1';
    }

    // Scroll detail overlay to top natively
    this.overlay.scrollTop = 0;

    // Attach internal modal handlers (Back button, Gallery images, Prev/Next project)
    this.attachModalHandlers();
  }

  /* Close Case Study View & Restore Scroll Position */
  closeProject() {
    document.body.classList.remove('project-open');

    if (typeof gsap !== 'undefined') {
      gsap.to(this.overlay, {
        opacity: 0,
        y: 20,
        duration: 0.35,
        ease: 'power2.in',
        onComplete: () => {
          this.overlay.style.display = 'none';
          gsap.set(this.overlay, { clearProps: 'transform' });

          // Re-enable Lenis for main portfolio smooth scroll
          if (window.animationEngine) {
            window.animationEngine.enableLenis();
            if (window.animationEngine.lenis) {
              window.animationEngine.lenis.scrollTo(this.savedScrollY, { immediate: true });
            } else {
              window.scrollTo(0, this.savedScrollY);
            }
          } else {
            window.scrollTo(0, this.savedScrollY);
          }
        }
      });
    } else {
      this.overlay.style.display = 'none';
      if (window.animationEngine) {
        window.animationEngine.enableLenis();
      }
      window.scrollTo(0, this.savedScrollY);
    }
  }



  /* Render Detailed Editorial Case Study HTML */
  renderCaseStudyHTML(project) {
    const prevIndex = (this.currentProjectIndex - 1 + this.projects.length) % this.projects.length;
    const nextIndex = (this.currentProjectIndex + 1) % this.projects.length;
    const prevProject = this.projects[prevIndex];
    const nextProject = this.projects[nextIndex];

    const hasGallery = project.gallery && project.gallery.length > 0;

    let galleryHTML = '';
    if (hasGallery) {
      galleryHTML = `
        <div class="cs-gallery-grid">
          ${project.gallery.map((imgUrl, idx) => `
            <div class="cs-gallery-item ${idx === 0 ? 'full-bleed' : ''}" data-gallery-idx="${idx}">
              <img src="${imgUrl}" alt="${project.title} Screenshot ${idx + 1}" loading="lazy" class="cs-gallery-img">
              <span class="cs-zoom-indicator">ZOOM 🔍</span>
            </div>
          `).join('')}
        </div>
      `;
    } else {
      galleryHTML = `
        <div class="cs-empty-gallery">
          <div class="ui-card-preview" style="border-left: 3px solid ${project.accent}; max-width: 100%;">
            <div class="ui-card-header">
              <span class="ui-card-title">${project.title} • Editorial Concept</span>
              <span class="ui-status-badge">FIGMA CONCEPT</span>
            </div>
            <p style="font-size: 0.9rem; color: var(--text-secondary); margin: 1rem 0;">
              High-resolution screens for ${project.title} are currently being finalized in Figma. Detailed visual artboards will be updated shortly.
            </p>
          </div>
        </div>
      `;
    }

    const techPills = project.technologies.map(t => `<span class="tech-pill">${t}</span>`).join(' ');

    const highlightsHTML = project.details && project.details.highlights ? `
      <div class="cs-highlights-box">
        <h4 class="cs-subheading">KEY HIGHLIGHTS</h4>
        <ul class="cs-highlights-list">
          ${project.details.highlights.map(h => `<li>${h}</li>`).join('')}
        </ul>
      </div>
    ` : '';

    this.overlay.innerHTML = `
      <div class="cs-container">
        <!-- Top Sticky Header Bar -->
        <div class="cs-header-bar">
          <button class="cs-back-btn" id="cs-close-btn" aria-label="Close Case Study and Return to Selected Work">
            ← BACK TO SELECTED WORK
          </button>
          <span class="cs-meta-tag">${project.number} // ${project.type}</span>
        </div>

        <!-- Editorial Hero Title Stack -->
        <header class="cs-hero">
          <div class="cs-category-badge">${project.category} • ${project.year}</div>
          <h1 class="cs-title">${project.title}</h1>
          <p class="cs-tagline">${project.tagline}</p>
          <div class="cs-tech-stack">${techPills}</div>
        </header>

        <!-- Main Editorial Content Grid -->
        <div class="cs-body-grid">
          <!-- Left Main Column: Visual Gallery -->
          <div class="cs-visual-column">
            <h3 class="cs-section-label">PROJECT VISUALS & ARTBOARDS (${project.gallery ? project.gallery.length : 0})</h3>
            ${galleryHTML}
          </div>

          <!-- Right Column: Case Study Specifications -->
          <aside class="cs-info-column">
            <div class="cs-info-card">
              <h4 class="cs-subheading">OVERVIEW</h4>
              <p class="cs-overview-text">${project.details ? project.details.overview : project.description}</p>
              
              <div class="cs-meta-group">
                <span class="cs-meta-label">ROLE</span>
                <span class="cs-meta-value">${project.details ? project.details.role : 'Developer / Designer'}</span>
              </div>

              <div class="cs-meta-group">
                <span class="cs-meta-label">PLATFORM</span>
                <span class="cs-meta-value">${project.details ? project.details.platform : project.type}</span>
              </div>

              <div class="cs-meta-group">
                <span class="cs-meta-label">YEAR</span>
                <span class="cs-meta-value">${project.year}</span>
              </div>

              ${highlightsHTML}
            </div>
          </aside>
        </div>

        <!-- Footer Navigation Controls -->
        <footer class="cs-footer">
          <div class="cs-nav-buttons">
            <button class="cs-nav-btn prev" id="cs-prev-project">
              <span class="nav-label">← PREVIOUS</span>
              <span class="nav-project-name">${prevProject.title}</span>
            </button>
            <button class="cs-nav-btn next" id="cs-next-project">
              <span class="nav-label">NEXT →</span>
              <span class="nav-project-name">${nextProject.title}</span>
            </button>
          </div>
          <button class="cs-bottom-back-btn" id="cs-bottom-close-btn">
            RETURN TO SELECTED WORK
          </button>
        </footer>
      </div>
    `;
  }

  /* Attach Handlers Inside Open Case Study */
  attachModalHandlers() {
    const closeBtn = document.getElementById('cs-close-btn');
    const bottomCloseBtn = document.getElementById('cs-bottom-close-btn');
    const prevBtn = document.getElementById('cs-prev-project');
    const nextBtn = document.getElementById('cs-next-project');

    if (closeBtn) closeBtn.addEventListener('click', () => this.closeProject());
    if (bottomCloseBtn) bottomCloseBtn.addEventListener('click', () => this.closeProject());

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        const prevIndex = (this.currentProjectIndex - 1 + this.projects.length) % this.projects.length;
        this.openProject(prevIndex);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const nextIndex = (this.currentProjectIndex + 1) % this.projects.length;
        this.openProject(nextIndex);
      });
    }

    // Attach click listeners to gallery images for Lightbox
    const galleryItems = this.overlay.querySelectorAll('.cs-gallery-item');
    galleryItems.forEach((item) => {
      item.addEventListener('click', () => {
        const idx = parseInt(item.getAttribute('data-gallery-idx'), 10);
        this.openLightbox(idx);
      });
    });
  }

  /* Lightbox Methods */
  openLightbox(galleryIdx) {
    const project = this.projects[this.currentProjectIndex];
    if (!project.gallery || project.gallery.length === 0) return;

    // Save modal overlay scroll position so closing lightbox retains exact scroll point
    this.savedModalScrollTop = this.overlay.scrollTop;

    this.currentGalleryIndex = galleryIdx;
    this.renderLightboxHTML();
    this.lightbox.style.display = 'flex';

    if (typeof gsap !== 'undefined') {
      gsap.fromTo(this.lightbox, { opacity: 0 }, { opacity: 1, duration: 0.25 });
    } else {
      this.lightbox.style.opacity = '1';
    }

    this.attachLightboxHandlers();
  }

  renderLightboxHTML() {
    const project = this.projects[this.currentProjectIndex];
    const total = project.gallery.length;
    const currentImg = project.gallery[this.currentGalleryIndex];

    this.lightbox.innerHTML = `
      <div class="lb-backdrop"></div>
      <div class="lb-container">
        <div class="lb-header">
          <span class="lb-title">${project.title} • Screen ${this.currentGalleryIndex + 1}</span>
          <span class="lb-counter">${String(this.currentGalleryIndex + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}</span>
          <button class="lb-close-btn" id="lb-close" aria-label="Close Lightbox">✕</button>
        </div>

        <div class="lb-stage">
          <button class="lb-arrow prev" id="lb-prev" aria-label="Previous Image">‹</button>
          <img src="${currentImg}" alt="${project.title} Preview" class="lb-image">
          <button class="lb-arrow next" id="lb-next" aria-label="Next Image">›</button>
        </div>
      </div>
    `;
  }

  attachLightboxHandlers() {
    const closeBtn = document.getElementById('lb-close');
    const prevBtn = document.getElementById('lb-prev');
    const nextBtn = document.getElementById('lb-next');
    const backdrop = this.lightbox.querySelector('.lb-backdrop');

    if (closeBtn) closeBtn.addEventListener('click', () => this.closeLightbox());
    if (backdrop) backdrop.addEventListener('click', () => this.closeLightbox());

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.stepLightbox(-1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.stepLightbox(1);
      });
    }
  }

  stepLightbox(direction) {
    const project = this.projects[this.currentProjectIndex];
    if (!project.gallery || project.gallery.length === 0) return;

    this.currentGalleryIndex = (this.currentGalleryIndex + direction + project.gallery.length) % project.gallery.length;
    this.renderLightboxHTML();
    this.attachLightboxHandlers();
  }

  closeLightbox() {
    if (typeof gsap !== 'undefined') {
      gsap.to(this.lightbox, {
        opacity: 0,
        duration: 0.2,
        onComplete: () => {
          this.lightbox.style.display = 'none';
          if (this.savedModalScrollTop !== undefined) {
            this.overlay.scrollTop = this.savedModalScrollTop;
          }
        }
      });
    } else {
      this.lightbox.style.display = 'none';
      if (this.savedModalScrollTop !== undefined) {
        this.overlay.scrollTop = this.savedModalScrollTop;
      }
    }
  }


  /* Keyboard Listener (ESC & Arrow keys) */
  handleKeyDown(e) {
    if (this.lightbox.style.display === 'flex') {
      if (e.key === 'Escape') this.closeLightbox();
      if (e.key === 'ArrowLeft') this.stepLightbox(-1);
      if (e.key === 'ArrowRight') this.stepLightbox(1);
      return;
    }

    if (this.overlay.style.display === 'block') {
      if (e.key === 'Escape') this.closeProject();
    }
  }
}

window.CaseStudyEngine = CaseStudyEngine;
