/**
 * UDAYAN BORGE (MR_RAJEE) — CONTACT & FOOTER ENGINE
 * Approved stable editorial Contact section & minimal site footer.
 */

const CONTACT_DATA = {
  email: "borgeudayan@gmail.com",
  github: "https://github.com/udayan-afk",
  linkedin: "https://linkedin.com/in/udayanborge",
  openTo: [
    "COLLABORATIONS",
    "HACKATHONS",
    "INTERESTING PROJECTS",
    "NEW IDEAS"
  ]
};

class ContactEngine {
  constructor() {
    this.data = typeof CONTACT_DATA !== 'undefined' ? CONTACT_DATA : {
      email: "borgeudayan@gmail.com",
      github: "https://github.com/udayan-afk",
      linkedin: "https://linkedin.com/in/udayanborge"
    };
    this.section = document.getElementById('contact');
    this.footer = document.querySelector('.site-footer');
    
    this.init();
  }

  init() {
    if (!this.section) return;

    this.renderContactSection();
    this.attachCopyEmailListener();
    this.attachFormListener();
    this.attachBackToTopListener();
    this.initScrollReveals();
  }

  renderContactSection() {
    const statusItemsHTML = (this.data.openTo || []).join(' / ');

    this.section.querySelector('.site-container').innerHTML = `
      <div class="contact-editorial-composition">
        
        <!-- TOP META ROW -->
        <div class="contact-top-meta-row">
          <span class="contact-section-tag">07 / CONTACT</span>
          <span class="contact-top-phrase">LET'S BUILD TOGETHER</span>
        </div>

        <!-- MAIN TWO-COLUMN EDITORIAL COMPOSITION -->
        <div class="contact-two-column-grid">
          
          <!-- LEFT COLUMN: HEADLINE, COPY & CTA -->
          <div class="contact-col-left">
            <h2 class="contact-main-headline">
              <span class="headline-black">LET'S</span><br>
              <span class="headline-black">BUILD</span><br>
              <span class="headline-vermillion">TOGETHER.</span>
            </h2>

            <p class="contact-supporting-copy">
              Have an idea, a project, or just want to say hi? I'm always open to interesting conversations.
            </p>

            <div class="contact-cta-wrapper">
              <a href="mailto:${this.data.email}" class="contact-pill-cta" data-cursor="hover">
                <span>GET IN TOUCH</span>
                <span class="cta-arrow">→</span>
              </a>
            </div>
          </div>

          <!-- RIGHT COLUMN: CONTACT ROWS & METADATA -->
          <div class="contact-col-right">
            
            <div class="contact-row-item">
              <span class="row-label">EMAIL</span>
              <div class="row-link-wrapper">
                <a href="mailto:${this.data.email}" class="contact-row-link" data-cursor="hover">
                  <span class="link-text">${this.data.email}</span>
                  <span class="link-arrow">↗</span>
                </a>
                <button class="copy-email-btn" id="copy-email-btn" aria-label="Copy Email to Clipboard">
                  <span class="copy-btn-text">COPY EMAIL →</span>
                </button>
              </div>
            </div>

            <div class="contact-row-item">
              <span class="row-label">GITHUB</span>
              <a href="${this.data.github}" target="_blank" rel="noopener noreferrer" class="contact-row-link" data-cursor="hover">
                <span class="link-text">github.com/udayan-afk</span>
                <span class="link-arrow">↗</span>
              </a>
            </div>

            <div class="contact-row-item">
              <span class="row-label">LINKEDIN</span>
              <a href="${this.data.linkedin}" target="_blank" rel="noopener noreferrer" class="contact-row-link" data-cursor="hover">
                <span class="link-text">Udayan Borge</span>
                <span class="link-arrow">↗</span>
              </a>
            </div>

            <!-- OPEN TO METADATA STATEMENT -->
            <div class="open-to-statement-line">
              <span class="open-to-dot"></span>
              <span class="open-to-label">OPEN TO</span>
              <span class="open-to-items">${statusItemsHTML}</span>
            </div>

            <div class="form-scroll-trigger-wrapper">
              <a href="#contact-form-block" class="form-scroll-link" id="scroll-to-form-btn">
                <span>SEND A MESSAGE</span>
                <span class="scroll-arrow">↓</span>
              </a>
            </div>

          </div>

        </div>

        <!-- SECONDARY LOWER SECTION: DIRECT MESSAGE FORM -->
        <div class="contact-form-secondary-block" id="contact-form-block">
          <div class="form-header-block">
            <span class="form-tag">DIRECT MESSAGE</span>
            <h3 class="form-title">SEND ME A MESSAGE</h3>
          </div>

          <form id="contact-form" class="contact-editorial-form" novalidate>
            <div class="form-lines-grid">
              
              <div class="form-line-group">
                <label for="contact-name" class="form-line-label">NAME <span class="required-star">*</span></label>
                <input type="text" id="contact-name" name="name" class="form-line-input" placeholder="Your Name" autocomplete="name" required>
                <span class="form-error" id="error-name"></span>
              </div>

              <div class="form-line-group">
                <label for="contact-email" class="form-line-label">EMAIL <span class="required-star">*</span></label>
                <input type="email" id="contact-email" name="email" class="form-line-input" placeholder="your@email.com" autocomplete="email" required>
                <span class="form-error" id="error-email"></span>
              </div>

              <div class="form-line-group full-width">
                <label for="contact-phone" class="form-line-label">PHONE <span class="required-star">*</span></label>
                <input type="tel" id="contact-phone" name="phone" class="form-line-input" placeholder="+91..." autocomplete="tel" required>
                <span class="form-error" id="error-phone"></span>
              </div>

              <div class="form-line-group full-width">
                <label for="contact-message" class="form-line-label">MESSAGE <span class="required-star">*</span></label>
                <textarea id="contact-message" name="message" class="form-line-textarea" rows="3" placeholder="Tell me about your project..." required></textarea>
                <span class="form-error" id="error-message"></span>
              </div>

            </div>

            <div class="form-action-row">
              <button type="submit" class="contact-submit-btn" id="contact-submit-btn" data-cursor="hover">
                <span class="btn-text">SEND MESSAGE</span>
                <span class="btn-arrow">↗</span>
              </button>
            </div>

            <div class="form-status-msg" id="form-status-msg" aria-live="polite"></div>
          </form>
        </div>

        <!-- PERSONAL SIGNATURE ELEMENT / TOP IDENTITY AREA -->
        <div class="contact-personal-signature" id="personal-identity-area">
          <!-- Subtle corner web-line motif -->
          <div class="sig-corner-web" aria-hidden="true">
            <svg viewBox="0 0 100 100" width="80" height="80" fill="none">
              <!-- Radial spoke lines -->
              <line x1="100" y1="0" x2="0" y2="0" stroke="var(--spider-blue)" stroke-width="0.8" opacity="0.3"/>
              <line x1="100" y1="0" x2="100" y2="100" stroke="var(--spider-blue)" stroke-width="0.8" opacity="0.3"/>
              <line x1="100" y1="0" x2="0" y2="100" stroke="var(--spider-blue)" stroke-width="0.75" opacity="0.25"/>
              <line x1="100" y1="0" x2="25" y2="100" stroke="var(--spider-blue)" stroke-width="0.6" opacity="0.2"/>
              <line x1="100" y1="0" x2="0" y2="25" stroke="var(--spider-blue)" stroke-width="0.6" opacity="0.2"/>
              <line x1="100" y1="0" x2="60" y2="100" stroke="var(--spider-blue)" stroke-width="0.6" opacity="0.2"/>
              <line x1="100" y1="0" x2="0" y2="60" stroke="var(--spider-blue)" stroke-width="0.6" opacity="0.2"/>
              <!-- Web concentric arc segments -->
              <path d="M 75 0 A 25 25 0 0 1 100 25" stroke="var(--spider-blue)" stroke-width="0.75" opacity="0.25"/>
              <path d="M 50 0 A 50 50 0 0 1 100 50" stroke="var(--spider-blue)" stroke-width="0.7" opacity="0.22"/>
              <path d="M 25 0 A 75 75 0 0 1 100 75" stroke="var(--spider-blue)" stroke-width="0.65" opacity="0.18"/>
            </svg>
          </div>

          <div class="sig-title-block">
            <div class="sig-name-wrap">
              <span class="sig-name">MR_RAJEE</span>
              <!-- Circular indicator with subtle spider-web line graphic & dual accents -->
              <div class="sig-indicator-badge" title="Friendly Neighborhood Developer" aria-label="Personal Status Indicator">
                <span class="sig-indicator-dot" aria-hidden="true"></span>
                <svg class="sig-web-line-graphic" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="3" stroke="var(--spider-blue)" stroke-width="1" opacity="0.75"/>
                  <circle cx="12" cy="12" r="7.5" stroke="var(--spider-blue)" stroke-width="0.9" stroke-dasharray="2 2" opacity="0.5"/>
                  <line x1="12" y1="2" x2="12" y2="22" stroke="var(--spider-red)" stroke-width="1.1" opacity="0.8"/>
                  <line x1="2" y1="12" x2="22" y2="12" stroke="var(--spider-red)" stroke-width="1.1" opacity="0.8"/>
                  <line x1="4.9" y1="4.9" x2="19.1" y2="19.1" stroke="var(--spider-blue)" stroke-width="0.9" opacity="0.6"/>
                  <line x1="4.9" y1="19.1" x2="19.1" y2="4.9" stroke="var(--spider-blue)" stroke-width="0.9" opacity="0.6"/>
                </svg>
              </div>
            </div>
            <span class="sig-sub">COMPUTER ENGINEERING • PUNE, INDIA</span>
          </div>
        </div>

      </div>
    `;
  }

  attachFormListener() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleContactSubmit();
    });

    ['name', 'email', 'phone', 'message'].forEach(fieldName => {
      const input = document.getElementById(`contact-${fieldName}`);
      if (input) {
        input.addEventListener('input', () => {
          input.classList.remove('input-error');
          const errSpan = document.getElementById(`error-${fieldName}`);
          if (errSpan) errSpan.textContent = '';
        });
      }
    });

    // Smooth scroll to form button
    const scrollBtn = document.getElementById('scroll-to-form-btn');
    if (scrollBtn) {
      scrollBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const formBlock = document.getElementById('contact-form-block');
        if (formBlock) {
          if (window.animationEngine && window.animationEngine.lenis) {
            window.animationEngine.lenis.scrollTo(formBlock);
          } else {
            formBlock.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    }
  }

  handleContactSubmit() {
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const phoneInput = document.getElementById('contact-phone');
    const messageInput = document.getElementById('contact-message');
    const statusMsg = document.getElementById('form-status-msg');

    let isValid = true;
    let firstErrorInput = null;

    [nameInput, emailInput, phoneInput, messageInput].forEach(input => {
      if (input) input.classList.remove('input-error');
    });
    ['name', 'email', 'phone', 'message'].forEach(field => {
      const errSpan = document.getElementById(`error-${field}`);
      if (errSpan) errSpan.textContent = '';
    });
    if (statusMsg) {
      statusMsg.style.display = 'none';
      statusMsg.className = 'form-status-msg';
      statusMsg.innerHTML = '';
    }

    const nameVal = nameInput ? nameInput.value.trim() : '';
    const emailVal = emailInput ? emailInput.value.trim() : '';
    const phoneVal = phoneInput ? phoneInput.value.trim() : '';
    const messageVal = messageInput ? messageInput.value.trim() : '';

    if (!nameVal || nameVal.length < 2) {
      this.showFieldError('name', 'Please enter your name.');
      if (!firstErrorInput) firstErrorInput = nameInput;
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailVal || !emailRegex.test(emailVal)) {
      this.showFieldError('email', 'Please enter a valid email address.');
      if (!firstErrorInput) firstErrorInput = emailInput;
      isValid = false;
    }

    const phoneDigits = phoneVal.replace(/\D/g, '');
    const phoneRegex = /^[+\d\s()--]{7,20}$/;
    if (!phoneVal || !phoneRegex.test(phoneVal) || phoneDigits.length < 7) {
      this.showFieldError('phone', 'Please enter a valid phone number.');
      if (!firstErrorInput) firstErrorInput = phoneInput;
      isValid = false;
    }

    if (!messageVal || messageVal.length < 10) {
      this.showFieldError('message', 'Please enter a message (at least 10 characters).');
      if (!firstErrorInput) firstErrorInput = messageInput;
      isValid = false;
    }

    if (!isValid) {
      if (firstErrorInput) firstErrorInput.focus();
      return;
    }

    const subject = `Portfolio Contact — ${nameVal}`;
    const body = `Name: ${nameVal}\n\nEmail: ${emailVal}\n\nPhone: ${phoneVal}\n\nMessage:\n${messageVal}`;
    const mailtoUrl = `mailto:${this.data.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;

    if (statusMsg) {
      statusMsg.className = 'form-status-msg status-ready';
      statusMsg.innerHTML = `
        <div class="status-msg-content">
          <span class="status-badge-icon">✓</span>
          <div class="status-text-block">
            <span class="status-title">YOUR EMAIL CLIENT IS READY — SEND THE MESSAGE.</span>
            <p class="status-desc">Your default email application has opened with your message. If it didn't launch automatically, please send the message directly to <strong>${this.data.email}</strong>.</p>
          </div>
        </div>
      `;
      statusMsg.style.display = 'block';
    }
  }

  showFieldError(fieldName, message) {
    const input = document.getElementById(`contact-${fieldName}`);
    const errorSpan = document.getElementById(`error-${fieldName}`);
    if (input) input.classList.add('input-error');
    if (errorSpan) errorSpan.textContent = message;
  }

  attachCopyEmailListener() {
    const copyBtn = document.getElementById('copy-email-btn');
    const emailText = this.data.email || 'borgeudayan@gmail.com';

    if (!copyBtn) return;

    copyBtn.addEventListener('click', (e) => {
      e.preventDefault();

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(emailText).then(() => {
          this.showCopiedState(copyBtn);
        }).catch(() => {
          this.fallbackCopyText(emailText, copyBtn);
        });
      } else {
        this.fallbackCopyText(emailText, copyBtn);
      }
    });
  }

  fallbackCopyText(text, btn) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      this.showCopiedState(btn);
    } catch (err) {
      console.warn('Clipboard copy failed');
    }
    document.body.removeChild(textArea);
  }

  showCopiedState(btn) {
    const textSpan = btn.querySelector('.copy-btn-text') || btn;

    btn.classList.add('copied');
    textSpan.textContent = 'COPIED ✓';

    setTimeout(() => {
      btn.classList.remove('copied');
      textSpan.textContent = 'COPY EMAIL →';
    }, 2000);
  }

  attachBackToTopListener() {
    const topBtn = document.getElementById('back-to-top-btn');
    if (!topBtn) return;

    topBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (window.animationEngine && window.animationEngine.lenis) {
        window.animationEngine.lenis.scrollTo(0);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  initScrollReveals() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.fromTo(this.section.querySelectorAll('.contact-top-meta-row, .contact-two-column-grid'),
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

    gsap.fromTo(this.section.querySelectorAll('.contact-form-secondary-block, .contact-personal-signature'),
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#contact-form-block',
          start: 'top 85%'
        }
      }
    );
  }
}

window.ContactEngine = ContactEngine;
