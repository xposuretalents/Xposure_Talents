document.addEventListener('DOMContentLoaded', () => {

  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');
  const themeToggle = document.querySelector('.theme-toggle');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = lightbox?.querySelector('img');
  const lightboxClose = lightbox?.querySelector('.lightbox-close');

  loadDynamicContent();

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

  async function loadDynamicContent() {
    try {
      const cacheExpiry = 3600000;

      if (document.getElementById('artists-list')) {
        await loadArtists();
      }

      if (document.getElementById('events-list')) {
        await loadEvents();
      }

      if (document.getElementById('gallery-list')) {
        await loadGallery();
      }
    } catch (error) {
      console.error('Error loading dynamic content:', error);
    }
  }

  async function loadArtists() {
    const container = document.getElementById('artists-list');
    if (!container) return;

    try {
      const cachedData = getCachedData('artists');
      let artists = cachedData;

      if (!artists) {
        const response = await fetch('artists.json');
        if (!response.ok) throw new Error('Failed to load artists');
        artists = await response.json();
        setCachedData('artists', artists);
      }

      if (artists.length === 0) {
        container.innerHTML = '<p style="color: var(--text-muted); text-align: center; padding: 2rem;">No artists available</p>';
        return;
      }

      container.innerHTML = artists.map(artist => createArtistCard(artist)).join('');

      setupGalleryListeners();
    } catch (error) {
      console.error('Error loading artists:', error);
      container.innerHTML = '<p style="color: var(--text-muted); text-align: center; padding: 2rem;">Unable to load artists. Please try again later.</p>';
    }
  }

  async function loadEvents() {
    const container = document.getElementById('events-list');
    if (!container) return;

    try {
      const cachedData = getCachedData('events');
      let events = cachedData;

      if (!events) {
        const response = await fetch('events.json');
        if (!response.ok) throw new Error('Failed to load events');
        events = await response.json();
        setCachedData('events', events);
      }

      if (events.length === 0) {
        container.innerHTML = '<p style="color: var(--text-muted); text-align: center; padding: 2rem;">No events available</p>';
        return;
      }

      container.innerHTML = events.map(event => createEventCard(event)).join('');

      const eventFilter = document.getElementById('eventFilter');
      if (eventFilter) {
        eventFilter.dispatchEvent(new Event('change'));
      }
    } catch (error) {
      console.error('Error loading events:', error);
      container.innerHTML = '<p style="color: var(--text-muted); text-align: center; padding: 2rem;">Unable to load events. Please try again later.</p>';
    }
  }

  async function loadGallery() {
    const container = document.getElementById('gallery-list');
    if (!container) return;

    try {
      const cachedData = getCachedData('gallery');
      let galleryItems = cachedData;

      if (!galleryItems) {
        const response = await fetch('gallery.json');
        if (!response.ok) throw new Error('Failed to load gallery');
        galleryItems = await response.json();
        setCachedData('gallery', galleryItems);
      }

      if (galleryItems.length === 0) {
        container.innerHTML = '<p style="color: var(--text-muted); text-align: center; padding: 2rem;">No gallery images available</p>';
        return;
      }

      container.innerHTML = galleryItems.map(item => createGalleryItem(item)).join('');

      setupGalleryListeners();
    } catch (error) {
      console.error('Error loading gallery:', error);
      container.innerHTML = '<p style="color: var(--text-muted); text-align: center; padding: 2rem;">Unable to load gallery. Please try again later.</p>';
    }
  }

  function createArtistCard(artist) {
    const socialLinks = Object.entries(artist.social || {})
      .map(([platform, url]) => {
        const icons = {
          instagram: '<rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="12" cy="12" r="4"/>',
          youtube: '<path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"/>',
          spotify: '<path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2z"/>'
        };

        return `
          <a href="${url}" class="social-link" target="_blank" rel="noopener" aria-label="${platform}">
            <svg viewBox="0 0 24 24" fill="currentColor">
              ${icons[platform] || ''}
            </svg>
          </a>
        `;
      }).join('');

    return `
      <div class="artist-card">
        <img src="${artist.image}" alt="${artist.name}" class="artist-image" loading="lazy">
        <div class="artist-overlay">
          <div class="artist-socials">
            ${socialLinks}
          </div>
        </div>
        <div class="artist-info">
          <h3 class="artist-name">${artist.name}</h3>
          <p class="artist-genre">${artist.genre}</p>
          <p class="artist-upcoming">Upcoming: ${artist.upcoming}</p>
        </div>
      </div>
    `;
  }

  function createEventCard(event) {
    const buttonClass = event.status === 'past' ? 'btn-secondary' : 'btn-primary';
    const buttonText = event.status === 'past' ? 'View Gallery' : 'Get Details';
    const buttonLink = event.status === 'past' ? 'gallery.html' : 'contact.html';

    return `
      <div class="event-card" data-status="${event.status}">
        <img src="${event.image}" alt="${event.title}" class="event-image" loading="lazy">
        <div class="event-content">
          <h3 class="event-title">${event.title}</h3>
          <div class="event-meta">
            <div class="event-date">📅 ${event.date}</div>
            <div class="event-location">📍 ${event.location}</div>
          </div>
          <p>${event.description}</p>
          <a href="${buttonLink}" class="btn ${buttonClass} btn-small mt-2">${buttonText}</a>
        </div>
      </div>
    `;
  }

  function createGalleryItem(item) {
    return `
      <div class="gallery-item">
        <img src="${item.image}" alt="${item.caption}" data-large="${item.image}" loading="lazy">
        <div class="gallery-caption">${item.caption}</div>
      </div>
    `;
  }

  function setupGalleryListeners() {
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
  }

  function getCachedData(key) {
    try {
      const cached = localStorage.getItem(`xposure_${key}`);
      if (!cached) return null;

      const { data, timestamp } = JSON.parse(cached);
      const cacheExpiry = 3600000;

      if (Date.now() - timestamp > cacheExpiry) {
        localStorage.removeItem(`xposure_${key}`);
        return null;
      }

      return data;
    } catch (error) {
      return null;
    }
  }

  function setCachedData(key, data) {
    try {
      const cacheObj = {
        data: data,
        timestamp: Date.now()
      };
      localStorage.setItem(`xposure_${key}`, JSON.stringify(cacheObj));
    } catch (error) {
      console.warn('Unable to cache data:', error);
    }
  }
});
