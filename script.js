document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Mobile nav toggle ---------- */
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    const isOpen = navbar.classList.toggle('nav-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navbar.classList.remove('nav-open'));
  });

  /* ---------- Toast helper ---------- */
  const toastEl = document.getElementById('toast');
  let toastTimer;
  function showToast(message) {
    clearTimeout(toastTimer);
    toastEl.textContent = message;
    toastEl.classList.add('show');
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2600);
  }

  /* ---------- Bag counter ---------- */
  const bagCount = document.getElementById('bagCount');
  let bagTotal = 0;
  bagCount.dataset.empty = 'true';

  document.querySelectorAll('[data-add-to-bag]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      bagTotal += 1;
      bagCount.textContent = bagTotal;
      bagCount.dataset.empty = 'false';
      bagCount.classList.remove('bump');
      // trigger reflow so the animation can replay
      void bagCount.offsetWidth;
      bagCount.classList.add('bump');

      const card = btn.closest('.product-card');
      const name = card ? card.querySelector('.product-card__name').textContent : 'Item';
      showToast(`${name} added to your bag`);
    });
  });

  /* ---------- Category filter on bestsellers grid ---------- */
  const categories = document.querySelectorAll('.category');
  const productCards = document.querySelectorAll('.product-card');

  categories.forEach(cat => {
    cat.addEventListener('click', (e) => {
      e.preventDefault();
      const filter = cat.dataset.filter;
      const alreadyActive = cat.classList.contains('is-active');

      categories.forEach(c => c.classList.remove('is-active'));

      if (alreadyActive) {
        productCards.forEach(card => { card.style.display = ''; });
        document.getElementById('shop').scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }

      cat.classList.add('is-active');
      productCards.forEach(card => {
        card.style.display = (card.dataset.category === filter) ? '' : 'none';
      });
      document.querySelector('.bestsellers').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* ---------- Newsletter form ---------- */
  const newsletterForm = document.getElementById('newsletterForm');
  const newsletterEmail = document.getElementById('newsletterEmail');
  const newsletterFeedback = document.getElementById('newsletterFeedback');

  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!newsletterEmail.value || !newsletterEmail.checkValidity()) {
      newsletterFeedback.textContent = 'Please enter a valid email address.';
      return;
    }
    newsletterFeedback.textContent = `You're on the list — check ${newsletterEmail.value} for 10% off.`;
    newsletterForm.reset();
  });

  /* ---------- Footer subscribe form ---------- */
  const footerForm = document.getElementById('footerForm');
  const footerEmail = document.getElementById('footerEmail');

  footerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!footerEmail.value || !footerEmail.checkValidity()) {
      showToast('Please enter a valid email address');
      return;
    }
    showToast('Thanks for staying in touch!');
    footerForm.reset();
  });

  /* ---------- Scroll reveal ---------- */
  const revealTargets = document.querySelectorAll(
    '.hero-copy, .arch--large, .category, .product-card, .story__inner, .testimonial, .newsletter'
  );

  if ('IntersectionObserver' in window) {
    revealTargets.forEach(el => el.classList.add('reveal'));

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealTargets.forEach(el => io.observe(el));
  }
});