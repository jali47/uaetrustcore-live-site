// UAE TrustCore interactive behaviour. Loaded as an external same-origin script for CSP compatibility.
(() => {
  const BOOKING_URL = 'https://calendly.com/uaetrustcore/30min';

  document.querySelectorAll('[data-booking-link]').forEach((link) => {
    link.setAttribute('href', BOOKING_URL);
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
  });

  const header = document.getElementById('siteHeader');
  const menuButton = document.getElementById('menuButton');
  const siteNav = document.getElementById('siteNav');

  if (header) {
    const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 20);
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
  }

  if (menuButton && siteNav) {
    const closeMenu = () => {
      siteNav.classList.remove('open');
      document.body.classList.remove('menu-open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
    };

    menuButton.addEventListener('click', () => {
      const isOpen = siteNav.classList.toggle('open');
      document.body.classList.toggle('menu-open', isOpen);
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    });

    siteNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });
  }

  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    revealElements.forEach((element) => revealObserver.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add('visible'));
  }

  const checklist = document.getElementById('readinessChecklist');
  const score = document.getElementById('readinessScore');
  const ring = document.getElementById('scoreRing');
  const title = document.getElementById('readinessTitle');
  const message = document.getElementById('readinessMessage');

  if (checklist && score && ring && title && message) {
    const updateReadiness = () => {
      const inputs = [...checklist.querySelectorAll('input[type="checkbox"]')];
      const selected = inputs.filter((input) => input.checked).length;
      const value = Math.round((selected / inputs.length) * 100);

      score.textContent = String(value);
      ring.style.setProperty('--score', value);

      if (selected === 0) {
        title.textContent = 'Start your check';
        message.textContent = 'Select each control currently in place to see a simple readiness indicator.';
      } else if (value < 40) {
        title.textContent = 'Important basics are missing';
        message.textContent = 'Prioritise MFA, protected backups and a documented recovery contact list.';
      } else if (value < 75) {
        title.textContent = 'A useful foundation exists';
        message.textContent = 'The next step is to close remaining gaps and validate that recovery works.';
      } else if (value < 100) {
        title.textContent = 'Good foundation—validate it';
        message.textContent = 'Regular testing and evidence are needed to confirm the controls work as intended.';
      } else {
        title.textContent = 'Strong basic readiness';
        message.textContent = 'Maintain the controls, review evidence regularly and test recovery under realistic conditions.';
      }
    };

    checklist.addEventListener('change', updateReadiness);
    updateReadiness();
  }

  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
