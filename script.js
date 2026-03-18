/* ============================================
   KALPESH ROUNDHAL — PORTFOLIO SCRIPT
   Features:
   - Dark / Light mode toggle (persisted to localStorage)
   - Sticky navbar with scroll-active state
   - Active nav link highlighting (IntersectionObserver)
   - Scroll-reveal animations (IntersectionObserver)
   - Skill-bar progress animation on scroll
   - Typewriter effect in hero section
   - Mobile menu (hamburger)
   - Contact form validation
   ============================================ */

/* ─────────────────────────────────────
   1. THEME TOGGLE (dark / light)
───────────────────────────────────── */
const themeToggle = document.getElementById('themeToggle');
const htmlEl      = document.documentElement;

/**
 * Apply a theme and save it to localStorage.
 * @param {'dark'|'light'} theme
 */
function applyTheme(theme) {
  htmlEl.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

// Restore saved theme, or respect system preference
const savedTheme  = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

// Toggle on button click
themeToggle.addEventListener('click', () => {
  const current = htmlEl.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
});


/* ─────────────────────────────────────
   2. STICKY NAVBAR — add class on scroll
───────────────────────────────────── */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });


/* ─────────────────────────────────────
   3. MOBILE HAMBURGER MENU
───────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
const mobileLinks = document.querySelectorAll('.mobile-link');

function closeMobileNav() {
  hamburger.classList.remove('open');
  mobileNav.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
}

hamburger.addEventListener('click', () => {
  const isOpen = mobileNav.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
});

// Close drawer when a link is tapped
mobileLinks.forEach(link => link.addEventListener('click', closeMobileNav));


/* ─────────────────────────────────────
   4. ACTIVE NAV LINK (IntersectionObserver)
   Highlights the nav link for the
   section currently in the viewport.
───────────────────────────────────── */
const sections  = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      navAnchors.forEach(a => {
        a.classList.toggle(
          'active',
          a.getAttribute('href') === `#${entry.target.id}`
        );
      });
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }   // trigger when section is ~midscreen
);

sections.forEach(s => sectionObserver.observe(s));


/* ─────────────────────────────────────
   5. SCROLL-REVEAL ANIMATION
   Adds '.visible' when element enters viewport.
───────────────────────────────────── */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target); // only animate once
      }
    });
  },
  { threshold: 0.12 }
);

revealEls.forEach(el => revealObserver.observe(el));


/* ─────────────────────────────────────
   6. SKILL-BAR ANIMATION
   Animates progress bars to their
   target width (data-width attribute)
   when they scroll into view.
───────────────────────────────────── */
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill  = entry.target;
        const width = fill.getAttribute('data-width');
        // Slight delay makes it feel more alive
        setTimeout(() => { fill.style.width = `${width}%`; }, 150);
        skillObserver.unobserve(fill);
      }
    });
  },
  { threshold: 0.3 }
);

skillFills.forEach(fill => skillObserver.observe(fill));


/* ─────────────────────────────────────
   7. TYPEWRITER EFFECT (hero tagline)
   Cycles through an array of strings.
───────────────────────────────────── */
const typedEl  = document.getElementById('typedText');
const phrases  = ['Web Developer', 'UI Enthusiast', 'Problem Solver', 'Open Source Contributor'];
let phraseIdx  = 0;  // which phrase we're on
let charIdx    = 0;  // which character within the phrase
let isDeleting = false;
let typingTimer;

function type() {
  const currentPhrase = phrases[phraseIdx];

  if (isDeleting) {
    // Remove a character
    typedEl.textContent = currentPhrase.substring(0, charIdx - 1);
    charIdx--;
  } else {
    // Add a character
    typedEl.textContent = currentPhrase.substring(0, charIdx + 1);
    charIdx++;
  }

  let delay = isDeleting ? 60 : 100; // delete faster than type

  if (!isDeleting && charIdx === currentPhrase.length) {
    // Finished typing — pause, then start deleting
    delay = 1800;
    isDeleting = true;
  } else if (isDeleting && charIdx === 0) {
    // Finished deleting — move to next phrase
    isDeleting = false;
    phraseIdx  = (phraseIdx + 1) % phrases.length;
    delay = 300;
  }

  typingTimer = setTimeout(type, delay);
}

// Start typing after a short initial pause
setTimeout(type, 600);


/* ─────────────────────────────────────
   8. CONTACT FORM VALIDATION
───────────────────────────────────── */
const contactForm   = document.getElementById('contactForm');
const nameInput     = document.getElementById('name');
const emailInput    = document.getElementById('email');
const messageInput  = document.getElementById('message');
const nameError     = document.getElementById('nameError');
const emailError    = document.getElementById('emailError');
const messageError  = document.getElementById('messageError');
const formSuccess   = document.getElementById('formSuccess');

/**
 * Validate a single field.
 * @param {HTMLInputElement|HTMLTextAreaElement} input
 * @param {HTMLElement}  errorEl  — element to show error message in
 * @returns {boolean}
 */
function validateField(input, errorEl) {
  const value = input.value.trim();
  let   error = '';

  if (input.id === 'name') {
    if (!value)               error = 'Name is required.';
    else if (value.length < 2) error = 'Name must be at least 2 characters.';
  }

  if (input.id === 'email') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value)                    error = 'Email is required.';
    else if (!emailRegex.test(value)) error = 'Please enter a valid email.';
  }

  if (input.id === 'message') {
    if (!value)                error = 'Message is required.';
    else if (value.length < 10) error = 'Message must be at least 10 characters.';
  }

  // Visual state
  errorEl.textContent = error;
  input.classList.toggle('invalid', !!error);
  input.classList.toggle('valid',  !error && value.length > 0);

  return !error;
}

// Real-time validation on blur (when user leaves a field)
[nameInput, emailInput, messageInput].forEach((input, i) => {
  const errors = [nameError, emailError, messageError];
  input.addEventListener('blur',  () => validateField(input, errors[i]));
  // Clear error while user is actively fixing it
  input.addEventListener('input', () => {
    if (input.classList.contains('invalid')) validateField(input, errors[i]);
  });
});

// Form submit
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const validName    = validateField(nameInput,    nameError);
  const validEmail   = validateField(emailInput,   emailError);
  const validMessage = validateField(messageInput, messageError);

  if (validName && validEmail && validMessage) {
    // In a real project you'd send data to a backend / Formspree here.
    // For now, simulate a successful send:
    formSuccess.classList.add('show');
    contactForm.reset();

    // Remove valid states after reset
    [nameInput, emailInput, messageInput].forEach(el => {
      el.classList.remove('valid', 'invalid');
    });

    // Hide success message after 5 seconds
    setTimeout(() => formSuccess.classList.remove('show'), 5000);
  }
});


/* ─────────────────────────────────────
   9. SMOOTH SCROLL for all anchor links
   (Backup for browsers where CSS
    scroll-behavior isn't sufficient)
───────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href');
    if (targetId === '#') return;

    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});