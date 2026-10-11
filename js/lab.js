/**
 * UDAYAN BORGE (MR_RAJEE) — EXPERIMENTS & LAB INTERACTION ENGINE
 * Controls category filtering, interactive typography list, floating previews, and experiment detail modal.
 */

class LabEngine {
  constructor() {
    this.experiments = typeof EXPERIMENTS_DATA !== 'undefined' ? EXPERIMENTS_DATA : [];
    this.activeFilter = 'ALL';
    this.savedScrollY = 0;

    this.container = document.getElementById('experiments-list-container');
    this.filterTabs = document.querySelectorAll('.lab-filter-tab');
    this.modal = document.getElementById('experiment-detail-overlay');

    this.init();
  }

  init() {
    if (!this.container) return;

    // Render initial list
    this.renderExperiments(this.experiments);

    // Attach filter tab listeners
    this.attachFilterListeners();

    // Attach keyboard listener
    window.addEventListener('keydown', (e) => {
      if (this.modal && this.modal.style.display === 'block' && e.key === 'Escape') {
        this.closeModal();
      }
    });
  }

  /* Filter Tab Handlers */
  attachFilterListeners() {
    if (!this.filterTabs) return;

    this.filterTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const filter = tab.getAttribute('data-filter');
        this.activeFilter = filter;

        // Update active class
        this.filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Filter items
        let filtered = this.experiments;
        if (filter !== 'ALL') {
          filtered = this.experiments.filter(exp => 
            exp.filterTags && exp.filterTags.includes(filter)
          );
        }

        // Animate transition with GSAP
        if (typeof gsap !== 'undefined') {
          gsap.to(this.container, {
            opacity: 0,
            y: 15,
            duration: 0.25,
            ease: 'power2.in',
            onComplete: () => {
              this.renderExperiments(filtered);
              gsap.fromTo(this.container,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
              );
            }
          });
        } else {
          this.renderExperiments(filtered);
        }
      });
    });
  }

  /* Render Experiment Editorial List */
  renderExperiments(items) {
    if (!this.container) return;

    if (items.length === 0) {
      this.container.innerHTML = `
        <div class="lab-empty-state">
          <p>No experiments found in category "${this.activeFilter}". More lab prototypes loading soon.</p>
        </div>
      `;
      return;
    }

    this.container.innerHTML = items.map((exp, idx) => `
      <article class="lab-item ${exp.isHackathon ? 'hackathon-featured' : ''}" data-exp-id="${exp.id}" data-idx="${idx}">
        <div class="lab-item-header">
          <span class="lab-num">${exp.number}</span>
          <span class="lab-tag ${exp.isHackathon ? 'hackathon-pill' : ''}">${exp.category}</span>
        </div>

        <div class="lab-item-main">
          <h3 class="lab-title">${exp.title}</h3>
          <p class="lab-desc">"${exp.description}"</p>
        </div>

        <div class="lab-item-meta">
          <span class="lab-year">${exp.year}</span>
          <div class="lab-tech-pills">
            ${exp.technologies.map(t => `<span class="tech-pill">${t}</span>`).join(' ')}
          </div>
          <button class="lab-action-btn" aria-label="Explore ${exp.title}">
            <span>EXPLORE</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
      </article>
    `).join('');

    // Attach item click handlers
    this.attachItemListeners(items);
  }

  attachItemListeners(renderedItems) {
    const itemElements = this.container.querySelectorAll('.lab-item');
    itemElements.forEach((el, idx) => {
      const expData = renderedItems[idx];

      el.addEventListener('click', () => {
        // If linked to a Selected Work project case study, open it!
        if (expData.linkedProjectId && window.caseStudyEngine) {
          const projectIdx = window.caseStudyEngine.projects.findIndex(p => p.id === expData.linkedProjectId);
          if (projectIdx !== -1) {
            window.caseStudyEngine.openProject(projectIdx);
            return;
          }
        }
        // Otherwise open standalone lightweight Lab Modal
        this.openModal(expData);
      });
    });
  }

  /* Lightweight Lab Experiment Modal Overlay */
  openModal(exp) {
    if (!this.modal) return;

    this.savedScrollY = window.scrollY || window.pageYOffset || 0;

    const techHTML = exp.technologies.map(t => `<span class="tech-pill">${t}</span>`).join(' ');
    const highlightsHTML = exp.details && exp.details.highlights ? `
      <div class="lab-modal-highlights">
        <h4 class="cs-subheading">EXPERIMENT HIGHLIGHTS</h4>
        <ul class="cs-highlights-list">
          ${exp.details.highlights.map(h => `<li>${h}</li>`).join('')}
        </ul>
      </div>
    ` : '';

    const imageHTML = exp.image ? `
      <div class="lab-modal-image-box">
        <img src="${exp.image}" alt="${exp.title} Visual" loading="lazy" class="lab-modal-img">
      </div>
    ` : `
      <div class="lab-modal-artwork-box">
        <div class="artwork-watermark">${exp.title}</div>
        <span class="ui-floating-tag">LAB PROTOTYPE • ${exp.year}</span>
      </div>
    `;

    this.modal.innerHTML = `
      <div class="cs-container">
        <div class="cs-header-bar">
          <button class="cs-back-btn" id="lab-modal-close">
            ← BACK TO EXPERIMENTS
          </button>
          <span class="cs-meta-tag">${exp.number} // LAB EXPERIMENT</span>
        </div>

        <header class="cs-hero">
          <div class="cs-category-badge">${exp.category} • ${exp.year}</div>
          <h1 class="cs-title">${exp.title}</h1>
          <p class="cs-tagline">"${exp.description}"</p>
          <div class="cs-tech-stack">${techHTML}</div>
        </header>

        <div class="cs-body-grid">
          <div class="cs-visual-column">
            ${imageHTML}
          </div>

          <aside class="cs-info-column">
            <div class="cs-info-card">
              <h4 class="cs-subheading">LAB OVERVIEW</h4>
              <p class="cs-overview-text">${exp.details ? exp.details.overview : exp.description}</p>
              
              <div class="cs-meta-group">
                <span class="cs-meta-label">FOCUS</span>
                <span class="cs-meta-value">${exp.category}</span>
              </div>

              <div class="cs-meta-group">
                <span class="cs-meta-label">ROLE</span>
                <span class="cs-meta-value">${exp.details ? exp.details.role : 'Creator'}</span>
              </div>

              <div class="cs-meta-group">
                <span class="cs-meta-label">YEAR</span>
                <span class="cs-meta-value">${exp.year}</span>
              </div>

              ${highlightsHTML}
            </div>
          </aside>
        </div>

        <footer class="cs-footer">
          <button class="cs-bottom-back-btn" id="lab-modal-bottom-close">
            RETURN TO EXPERIMENTS
          </button>
        </footer>
      </div>
    `;

    this.modal.style.display = 'block';
    document.body.classList.add('project-open');

    if (window.animationEngine) {
      window.animationEngine.destroyLenis();
    }

    if (typeof gsap !== 'undefined') {
      gsap.fromTo(this.modal,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power3.out',
          onComplete: () => {
            gsap.set(this.modal, { clearProps: 'transform' });
          }
        }
      );
    } else {
      this.modal.style.opacity = '1';
    }

    this.modal.scrollTop = 0;

    const closeBtn = document.getElementById('lab-modal-close');
    const bottomCloseBtn = document.getElementById('lab-modal-bottom-close');
    if (closeBtn) closeBtn.addEventListener('click', () => this.closeModal());
    if (bottomCloseBtn) bottomCloseBtn.addEventListener('click', () => this.closeModal());
  }

  closeModal() {
    if (!this.modal) return;

    document.body.classList.remove('project-open');

    if (typeof gsap !== 'undefined') {
      gsap.to(this.modal, {
        opacity: 0,
        y: 20,
        duration: 0.35,
        ease: 'power2.in',
        onComplete: () => {
          this.modal.style.display = 'none';
          gsap.set(this.modal, { clearProps: 'transform' });
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
      this.modal.style.display = 'none';
      if (window.animationEngine) {
        window.animationEngine.enableLenis();
      }
      window.scrollTo(0, this.savedScrollY);
    }
  }
}

window.LabEngine = LabEngine;
