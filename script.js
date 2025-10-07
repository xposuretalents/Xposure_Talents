document.addEventListener('DOMContentLoaded', () => {

  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');
  const themeToggle = document.querySelector('.theme-toggle');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = lightbox?.querySelector('img');
  const lightboxClose = lightbox?.querySelector('.lightbox-close');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  if (menuToggle && menu) {
    menuToggle.addEventListener('click', () => {
      menu.classList.toggle('open');
      const isOpen = menu.classList.contains('open');
      menuToggle.textContent = isOpen ? '✕' : '☰';
      menuToggle.setAttribute('aria-expanded', isOpen);
    });

    document.addEventListener('click', (e) => {
      if (!menu.contains(e.target) && !menuToggle.contains(e.target)) {
        menu.classList.remove('open');
        menuToggle.textContent = '☰';
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.menu a').forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
      link.classList.add('active');
    }
  });

  if (themeToggle) {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
      document.body.classList.add('light-mode');
      updateThemeIcon();
    }

    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light-mode');
      const currentTheme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
      localStorage.setItem('theme', currentTheme);
      updateThemeIcon();
    });
  }

  function updateThemeIcon() {
    const icon = themeToggle?.querySelector('.theme-icon');
    if (icon) {
      icon.textContent = document.body.classList.contains('light-mode') ? '☀️' : '🌙';
    }
  }

  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  document.querySelectorAll('.gallery-grid img, .gallery-item').forEach(item => {
    item.addEventListener('click', (e) => {
      const img = e.target.tagName === 'IMG' ? e.target : e.target.querySelector('img');
      if (img && lightbox && lightboxImg) {
        const largeSrc = img.dataset.large || img.src;
        lightboxImg.src = largeSrc;
        lightboxImg.alt = img.alt || 'Gallery image';
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (lightbox) {
    const closeLightbox = () => {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    };

    lightboxClose?.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('open')) {
        closeLightbox();
      }
    });
  }

  const eventFilter = document.getElementById('eventFilter');
  if (eventFilter) {
    const events = document.querySelectorAll('.event-card, [data-status]');

    eventFilter.addEventListener('change', () => {
      const filterValue = eventFilter.value;

      events.forEach(event => {
        const status = event.dataset.status;
        if (filterValue === 'all' || status === filterValue) {
          event.style.display = '';
        } else {
          event.style.display = 'none';
        }
      });
    });

    eventFilter.dispatchEvent(new Event('change'));
  }

  const contactForm = document.getElementById('bookingForm') || document.getElementById('contactForm');
  if (contactForm) {
    const inputs = contactForm.querySelectorAll('input[required], textarea[required], select[required]');

    inputs.forEach(input => {
      input.addEventListener('invalid', (e) => {
        e.preventDefault();
        input.classList.add('error');
      });

      input.addEventListener('input', () => {
        input.classList.remove('error');
      });
    });

    contactForm.addEventListener('submit', (e) => {
      const existingMessage = contactForm.parentElement?.querySelector('.status-message');
      if (existingMessage) {
        existingMessage.remove();
      }
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });

          if (menu?.classList.contains('open')) {
            menu.classList.remove('open');
            if (menuToggle) menuToggle.textContent = '☰';
          }
        }
      }
    });
  });

  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          imageObserver.unobserve(img);
        }
      });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
  }

  const animateOnHover = (selector, animation) => {
    document.querySelectorAll(selector).forEach(el => {
      el.addEventListener('mouseenter', () => {
        el.style.animation = animation;
      });
      el.addEventListener('animationend', () => {
        el.style.animation = '';
      });
    });
  };

  animateOnHover('.btn', 'pulse 0.3s ease');

  document.querySelectorAll('.artist-card, .event-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transition = 'all 0.3s ease';
    });
  });

  let scrollTimer;
  window.addEventListener('scroll', () => {
    document.body.classList.add('scrolling');
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      document.body.classList.remove('scrolling');
    }, 150);
  }, { passive: true });

  const textareas = document.querySelectorAll('textarea');
  textareas.forEach(textarea => {
    textarea.addEventListener('input', function() {
      this.style.height = 'auto';
      this.style.height = this.scrollHeight + 'px';
    });
  });

  console.log('%cXposureTalents', 'font-size: 24px; font-weight: bold; background: linear-gradient(135deg, #a855f7, #22d3ee); -webkit-background-clip: text; -webkit-text-fill-color: transparent;');
  console.log('%cConnecting artists with stages, media, and audiences.', 'font-size: 14px; color: #a855f7;');
});
