/**
 * UDAYAN BORGE (MR_RAJEE) — HACKATHONS & MILESTONES ENGINE (PHASE 6 REFINED)
 * Compact editorial layout displaying real hackathon JPEG photographs,
 * clickable LinkedIn team member links, and lightbox viewer.
 */

const ACHIEVEMENTS_DATA = [
  {
    id: "ach-krishisetu-pvpt-2026",
    number: "01",
    year: "2026",
    badgeDate: "2026",
    title: "1ST RUNNER-UP",
    event: "PVPT NATIONAL LEVEL HACKATHON 2026",
    organizer: "Institution Innovation Council & Student Innovation Committee, PVPI/T, Pune (in association with SAE India)",
    detailLabel1: "PROJECT",
    detailValue1: "KrishiSetu",
    detailLabel2: "TEAM",
    detailValue2: "TEAM HEXACORE",
    description: "Team HexaCore presented KrishiSetu — an agricultural price discovery and market linkage platform — securing 1st Runner-Up honors at the PVPT National Level Hackathon 2026.",
    teamMembers: [
      {
        name: "Udayan Borge",
        linkedin: "https://linkedin.com/in/udayanborge",
        isOwner: true
      },
      {
        name: "Sharvari",
        linkedin: "https://www.linkedin.com/in/sharvari-mandale-38371632/",
        isOwner: false
      },
      {
        name: "Suyog",
        linkedin: "https://www.linkedin.com/in/suyog-kondhalkar-20519a26/",
        isOwner: false
      },
      {
        name: "Ayush",
        linkedin: "https://www.linkedin.com/in/ayush-rakshe-1a781b2b3/",
        isOwner: false
      },
      {
        name: "Suraj",
        linkedin: "https://www.linkedin.com/in/suraj-dhage-207a72330/",
        isOwner: false
      }
    ],
    primaryImage: "assets/images/achievements/krishisetu/award.jpeg",
    gallery: [
      {
        src: "assets/images/achievements/krishisetu/award.jpeg",
        caption: "01 / AWARD MOMENT",
        title: "1st Runner-Up Prize Presentation — Team HexaCore"
      },
      {
        src: "assets/images/achievements/krishisetu/team.jpeg",
        caption: "02 / TEAM HEXACORE",
        title: "Team HexaCore Hackathon Delegation"
      },
      {
        src: "assets/images/achievements/krishisetu/mentors.jpeg",
        caption: "03 / WITH MENTORS",
        title: "Photograph with Mentors & Event Organizers"
      }
    ],
    isFeatured: true
  },
  {
    id: "ach-ieee-synapse-2026",
    number: "02",
    year: "2026",
    badgeDate: "OCT 2026",
    title: "TOP 10",
    event: "AISSMS IOIT IEEE SYNAPSE HACKATHON",
    organizer: "",
    detailLabel1: "EVENT",
    detailValue1: "IEEE SYNAPSE 2026",
    detailLabel2: "TEAMS",
    detailValue2: "HEXACORE & HEXACORE 2.0",
    descriptionText: "Recognized among the Top 10 teams out of 100+ participating teams, with encouraging appreciation from the judges for our ideas and approach.",
    description: "Two teams. One event. A place among the Top 10 — and valuable appreciation from the judges. A milestone that motivates us to build further.",
    teamGroups: [
      {
        name: "TEAM HEXACORE",
        members: [
          { name: "Udayan Borge", linkedin: "https://linkedin.com/in/udayanborge", isOwner: true },
          { name: "Sharvari Mandale", linkedin: "https://www.linkedin.com/in/sharvari-mandale-38371632/", isOwner: false },
          { name: "Suraj Dhage", linkedin: "https://www.linkedin.com/in/suraj-dhage-207a72330/", isOwner: false }
        ]
      },
      {
        name: "TEAM HEXACORE 2.0",
        members: [
          { name: "Suyog Kondhalkar", linkedin: "https://www.linkedin.com/in/suyog-kondhalkar-20519a26/", isOwner: false },
          { name: "Ayush Rakshe", linkedin: "https://www.linkedin.com/in/ayush-rakshe-1a781b2b3/", isOwner: false },
          { name: "Nilay", linkedin: null, isOwner: false }
        ]
      }
    ],
    primaryImage: "assets/images/achievements/synapse/synapse_moment.jpeg",
    gallery: [
      {
        src: "assets/images/achievements/synapse/synapse_moment.jpeg",
        caption: "01 / SYNAPSE MOMENT",
        title: "AISSMS IOIT IEEE Synapse Hackathon Moment"
      },
      {
        src: "assets/images/achievements/synapse/team_hexacore.jpeg",
        caption: "02 / TEAM HEXACORE",
        title: "Team HexaCore Delegation"
      },
      {
        src: "assets/images/achievements/synapse/team_hexacore2.0.jpeg",
        caption: "03 / TEAM HEXACORE 2.0",
        title: "Team HexaCore 2.0 Delegation"
      }
    ],
    isFeatured: false
  }
];

class AchievementsEngine {
  constructor() {
    this.achievements = typeof ACHIEVEMENTS_DATA !== 'undefined' ? ACHIEVEMENTS_DATA : [];
    this.currentImageIndex = 0;
    this.currentGallery = [];
    
    this.section = document.getElementById('achievements');
    this.lightbox = document.getElementById('image-lightbox');
    
    this.init();
  }

  init() {
    if (!this.section) return;

    this.renderAchievements();
    this.attachImageLightboxListeners();
    this.initScrollReveals();

    window.addEventListener('keydown', (e) => this.handleKeyDown(e));
  }

  renderAchievements() {
    const cardsHTML = this.achievements.map((ach) => {
      let rosterHTML = '';
      if (ach.teamGroups) {
        rosterHTML = ach.teamGroups.map(group => {
          const membersHTML = group.members.map(m => {
            if (m.linkedin) {
              return `<a href="${m.linkedin}" target="_blank" rel="noopener noreferrer" class="team-member-link ${m.isOwner ? 'owner-highlight' : ''}" aria-label="Open ${m.name}'s LinkedIn profile"><span class="member-name">${m.name}</span><span class="member-arrow">↗</span></a>`;
            } else {
              return `<span class="team-member-text ${m.isOwner ? 'owner-highlight' : ''}">${m.name}</span>`;
            }
          }).join('<span class="roster-dot">•</span>');

          return `
            <div class="roster-group">
              <span class="roster-title">${group.name}</span>
              <div class="roster-chips-row">
                ${membersHTML}
              </div>
            </div>
          `;
        }).join('');
      } else if (ach.teamMembers) {
        const membersHTML = ach.teamMembers.map(m => {
          if (m.linkedin) {
            return `<a href="${m.linkedin}" target="_blank" rel="noopener noreferrer" class="team-member-link ${m.isOwner ? 'owner-highlight' : ''}" aria-label="Open ${m.name}'s LinkedIn profile"><span class="member-name">${m.name}</span><span class="member-arrow">↗</span></a>`;
          } else {
            return `<span class="team-member-text ${m.isOwner ? 'owner-highlight' : ''}">${m.name}</span>`;
          }
        }).join('<span class="roster-dot">•</span>');

        rosterHTML = `
          <div class="roster-group">
            <span class="roster-title">${ach.team || 'TEAM HEXACORE'}</span>
            <div class="roster-chips-row">
              ${membersHTML}
            </div>
          </div>
        `;
      }

      const detailTagsHTML = `
        <span class="project-label">${ach.detailLabel1 || 'PROJECT'}: <strong>${ach.detailValue1 || ach.project}</strong></span>
        <span class="team-label">${ach.detailLabel2 || 'TEAM'}: <strong>${ach.detailValue2 || ach.team}</strong></span>
      `;

      const descHTML = ach.descriptionText ? `<p class="achievement-desc-text">${ach.descriptionText}</p>` : '';
      const summaryHTML = ach.description ? `<p class="achievement-summary">"${ach.description}"</p>` : '';
      const organizerHTML = ach.organizer ? `<p class="achievement-organizer">${ach.organizer}</p>` : '';

      const secondaryPhotosHTML = ach.gallery.slice(1).map((g, idx) => `
        <div class="photo-sub-wrapper" data-ach-id="${ach.id}" data-img-idx="${idx + 1}" data-cursor="hover">
          <img src="${g.src}" 
               alt="${g.title}" 
               loading="lazy" 
               class="sub-photo-img">
          <div class="sub-overlay-bar">
            <span class="sub-caption-badge">${g.caption}</span>
            <span class="sub-arrow">↗</span>
          </div>
        </div>
      `).join('');

      return `
        <article class="compact-achievement-card" data-ach-id="${ach.id}">
          <div class="compact-achievement-grid">
            
            <!-- LEFT COLUMN: EDITORIAL METADATA & TEAM -->
            <div class="achievement-meta-col">
              
              <div class="meta-top-badge">
                <span class="badge-num">${ach.number}</span>
                <span class="badge-tag-pill"><span class="dot"></span> ${ach.badgeDate || ach.year} // RECOGNITION</span>
              </div>

              <div class="title-group">
                <h3 class="achievement-rank">${ach.title}</h3>
                <h4 class="achievement-event">${ach.event}</h4>
                ${organizerHTML}
              </div>

              <div class="project-tag-block">
                ${detailTagsHTML}
              </div>

              ${descHTML}
              ${summaryHTML}

              <!-- Compact Team Roster -->
              <div class="compact-roster-box">
                ${rosterHTML}
              </div>

            </div>

            <!-- RIGHT COLUMN: PHOTOGRAPHY COMPOSITION -->
            <div class="achievement-photos-col">
              
              <!-- Primary Photo -->
              <div class="photo-hero-wrapper" data-ach-id="${ach.id}" data-img-idx="0" data-cursor="hover">
                <img src="${ach.gallery[0].src}" 
                     alt="${ach.gallery[0].title}" 
                     loading="eager" 
                     class="hero-photo-img">
                <div class="photo-overlay-bar">
                  <span class="photo-caption-badge">${ach.gallery[0].caption}</span>
                  <span class="expand-icon">⤢ ENLARGE</span>
                </div>
              </div>

              <!-- Secondary Photos -->
              ${secondaryPhotosHTML ? `<div class="photo-secondary-row">${secondaryPhotosHTML}</div>` : ''}

            </div>

          </div>
        </article>
      `;
    }).join('');

    this.section.querySelector('.site-container').innerHTML = `
      <header class="milestones-header-intro">
        <span class="milestones-section-tag">06 / MILESTONES</span>
        <h2 class="milestones-main-headline">BUILT.<br>COMPETED.<br>RECOGNIZED.</h2>
      </header>

      ${cardsHTML}

      <div class="milestones-end-block">
        <h3 class="milestones-end-statement">THIS IS JUST THE BEGINNING.</h3>
        <p class="milestones-end-subtext">Driven by relentless learning, hands-on building, and high-impact hackathon challenges.</p>
        <a href="#contact" class="milestones-cta-btn">LET'S CONNECT ↗</a>
      </div>
    `;
  }

  attachImageLightboxListeners() {
    const clickableVisuals = this.section.querySelectorAll('[data-ach-id][data-img-idx]');
    clickableVisuals.forEach((el) => {
      el.addEventListener('click', () => {
        const achId = el.getAttribute('data-ach-id');
        const idx = parseInt(el.getAttribute('data-img-idx'), 10) || 0;
        const targetAch = this.achievements.find(a => a.id === achId);
        if (targetAch && targetAch.gallery) {
          this.currentGallery = targetAch.gallery;
          this.openLightbox(idx);
        }
      });
    });
  }

  openLightbox(index) {
    if (!this.lightbox || !this.currentGallery.length) return;

    this.currentImageIndex = index;
    this.renderLightboxHTML();

    this.lightbox.style.display = 'flex';
    if (typeof gsap !== 'undefined') {
      gsap.fromTo(this.lightbox, { opacity: 0 }, { opacity: 1, duration: 0.25 });
    } else {
      this.lightbox.style.opacity = '1';
    }

    this.attachLightboxControls();
  }

  renderLightboxHTML() {
    const item = this.currentGallery[this.currentImageIndex];
    const total = this.currentGallery.length;
    const formattedCurrent = String(this.currentImageIndex + 1).padStart(2, '0');
    const formattedTotal = String(total).padStart(2, '0');

    this.lightbox.innerHTML = `
      <div class="lb-backdrop"></div>
      <div class="lb-content-container">
        <div class="lb-header">
          <span class="lb-counter">${formattedCurrent} / ${formattedTotal} — ${item.caption}</span>
          <button class="lb-close-btn" id="lb-close" aria-label="Close Lightbox">✕ CLOSE</button>
        </div>

        <div class="lb-stage">
          <button class="lb-arrow prev" id="lb-prev" aria-label="Previous Image">‹</button>
          <div class="lb-image-wrapper">
            <img src="${item.src}" 
                 alt="${item.title || item.caption}" 
                 class="lb-image">
            <p class="lb-caption">${item.caption} — ${item.title || ''}</p>
          </div>
          <button class="lb-arrow next" id="lb-next" aria-label="Next Image">›</button>
        </div>
      </div>
    `;
  }

  attachLightboxControls() {
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

  stepLightbox(dir) {
    if (!this.currentGallery.length) return;
    this.currentImageIndex = (this.currentImageIndex + dir + this.currentGallery.length) % this.currentGallery.length;
    this.renderLightboxHTML();
    this.attachLightboxControls();
  }

  closeLightbox() {
    if (!this.lightbox) return;
    if (typeof gsap !== 'undefined') {
      gsap.to(this.lightbox, {
        opacity: 0,
        duration: 0.2,
        onComplete: () => {
          this.lightbox.style.display = 'none';
        }
      });
    } else {
      this.lightbox.style.display = 'none';
    }
  }

  handleKeyDown(e) {
    if (this.lightbox && this.lightbox.style.display === 'flex') {
      if (e.key === 'Escape') this.closeLightbox();
      if (e.key === 'ArrowLeft') this.stepLightbox(-1);
      if (e.key === 'ArrowRight') this.stepLightbox(1);
    }
  }

  initScrollReveals() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.fromTo(this.section.querySelectorAll('.milestones-section-tag, .milestones-main-headline'),
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

    if (typeof gsap.utils !== 'undefined' && typeof gsap.utils.toArray === 'function') {
      gsap.utils.toArray('.compact-achievement-card').forEach((card) => {
        gsap.fromTo(card,
          { opacity: 0, y: 35 },
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
    }
  }
}

window.AchievementsEngine = AchievementsEngine;
