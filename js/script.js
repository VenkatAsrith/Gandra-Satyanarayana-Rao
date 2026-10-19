/**
 * GANDRA SATYANARAYANA RAO — OFFICIAL PUBLIC PROFILE JAVASCRIPT
 * Vanilla JS | Accessible | Lightbox | Navigation | Scroll Reveal
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileMenu();
  initScrollReveal();
  initGallery();
  initSmoothScroll();
});

/* --------------------------------------------------------------------------
   01. STRUCTURED DATA ARCHITECTURE (Section 40)
   -------------------------------------------------------------------------- */
const publicProfileData = {
  identity: {
    fullName: "Gandra Satyanarayana Rao",
    commonName: "Sathenna",
    birthYear: 1965,
    currentOffice: "Member of Legislative Assembly (MLA)",
    constituency: "Bhupalpalle (Assembly Constituency No. 108)",
    district: "Jayashankar Bhupalpally",
    state: "Telangana",
    partyAffiliation: "Indian National Congress",
    termStart: "December 3, 2023",
    nativeVillage: "Buddharam, Ghanapuram Mandal",
    profession: "Agriculture",
    education: "BA (Kakatiya University, Warangal, 1983) & ITI Civil Diploma"
  },
  
  timeline: [
    {
      period: "Early Career",
      role: "Sarpanch",
      area: "Bhudharam Village",
      description: "Commenced public representation as village Sarpanch in native Bhudharam, focusing on rural civic priorities."
    },
    {
      period: "1996",
      role: "ZPTC Member",
      area: "Ghanapuram Mandal",
      description: "Elected as Zilla Parishad Territorial Constituency (ZPTC) member from Ghanapuram under TDP."
    },
    {
      period: "2014",
      role: "MLA Candidate",
      area: "Bhupalpalle",
      description: "Contested the Bhupalpalle Assembly constituency in the 2014 general elections."
    },
    {
      period: "2018",
      role: "MLA Candidate",
      area: "Bhupalpalle",
      description: "Contested the 2018 Telangana Legislative Assembly election, securing 53,982 votes."
    },
    {
      period: "Sep 30, 2021",
      role: "Congress Affiliation",
      area: "Bhupalpally",
      description: "Formally joined the Indian National Congress under TPCC leadership, strengthening constituency cadre."
    },
    {
      period: "Dec 3, 2023",
      role: "Elected MLA",
      area: "Bhupalpalle (108)",
      description: "Elected to the 3rd Telangana Legislative Assembly with 123,116 votes (54.55%), winning by a margin of 52,699 votes."
    }
  ],

  publicActivities: [
    {
      title: "Advocacy for Singareni Coal Workers in Assembly",
      date: "September 18, 2026",
      location: "Telangana Legislative Assembly",
      category: "Legislative",
      description: "Raised critical concerns in the state legislature regarding Singareni coal miners, welfare of retired employees, contract workers' conditions, and rehabilitation for land-displaced persons."
    },
    {
      title: "Assembly Interventions on Crop Diversification & Storage",
      date: "September 16, 2026",
      location: "Telangana Legislative Assembly",
      category: "Agriculture",
      description: "Advocated for cold storage infrastructure to help farmers preserve agricultural yields, highlighted vegetable farming support, and oil palm sapling availability."
    },
    {
      title: "Indiramma Housing Scheme Implementation Review",
      date: "September 16, 2026",
      location: "Jayashankar Bhupalpally",
      category: "Housing & Welfare",
      description: "Conducted administrative review directing officials to expedite quality construction of Indiramma houses to ensure timely delivery to eligible beneficiaries."
    },
    {
      title: "Protection of Chalivagu Irrigation Reservoir",
      date: "August 7, 2026",
      location: "Chalivagu Project Site",
      category: "Irrigation",
      description: "Monitored water retention levels and warned against water diversion to safeguard irrigation for farmers and sarpanches across local command areas."
    },
    {
      title: "Ghanapur Irrigation Modernization Sanction",
      date: "July 29, 2026",
      location: "Ghanapur",
      category: "Irrigation",
      description: "Announced ₹31 crore sanction for modernizing 4 major crop canals under Ghanapur reservoir to ensure dependable water distribution."
    },
    {
      title: "Kotanchu Temple Cultural Heritage Development",
      date: "January 11, 2026",
      location: "Regonda Mandal",
      category: "Heritage",
      description: "Facilitated ₹12.15 crore development initiative for pilgrim amenities and restoration at Sri Lakshmi Narasimha Swamy Temple in Kotanchu."
    }
  ]
};

/* --------------------------------------------------------------------------
   02. HEADER STICKY & SCROLL LISTENER
   -------------------------------------------------------------------------- */
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* --------------------------------------------------------------------------
   03. ACCESSIBLE MOBILE MENU DRAWER
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const drawer = document.querySelector('.mobile-nav-drawer');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !drawer) return;

  const openDrawer = () => {
    drawer.classList.add('active');
    document.body.classList.add('menu-open');
    toggleBtn.setAttribute('aria-expanded', 'true');
  };

  const closeDrawer = () => {
    drawer.classList.remove('active');
    document.body.classList.remove('menu-open');
    toggleBtn.setAttribute('aria-expanded', 'false');
  };

  toggleBtn.addEventListener('click', () => {
    const isOpen = drawer.classList.contains('active');
    if (isOpen) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  drawer.addEventListener('click', (e) => {
    if (e.target === drawer) {
      closeDrawer();
    }
  });

  navLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('active')) {
      closeDrawer();
      toggleBtn.focus();
    }
  });
}

/* --------------------------------------------------------------------------
   04. SCROLL REVEAL (INTERSECTION OBSERVER)
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal-up');
  if (!elements.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    elements.forEach(el => el.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.12
  });

  elements.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   05. GALLERY FILTERING & LIGHTBOX MODAL
   -------------------------------------------------------------------------- */
function initGallery() {
  const filterPills = document.querySelectorAll('.filter-pill');
  const galleryCards = document.querySelectorAll('.gallery-card');
  const lightbox = document.querySelector('.lightbox-modal');

  if (filterPills.length && galleryCards.length) {
    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        const filter = pill.getAttribute('data-filter');

        galleryCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // Lightbox Modal Setup
  if (!lightbox) return;

  const lightboxImg = lightbox.querySelector('.lightbox-img');
  const lightboxTitle = lightbox.querySelector('.lightbox-title');
  const lightboxDesc = lightbox.querySelector('.lightbox-desc');
  const closeBtn = lightbox.querySelector('.lightbox-close-btn');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');

  let currentItems = [];
  let currentIndex = 0;

  const updateLightboxContent = (index) => {
    if (index < 0 || index >= currentItems.length) return;
    currentIndex = index;
    const item = currentItems[index];
    const img = item.querySelector('img');
    const title = item.querySelector('.gallery-card-title')?.textContent || '';
    const category = item.querySelector('.gallery-card-category')?.textContent || '';

    if (lightboxImg && img) {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
    }
    if (lightboxTitle) lightboxTitle.textContent = title;
    if (lightboxDesc) lightboxDesc.textContent = category;
  };

  const openLightbox = (card) => {
    const visibleCards = Array.from(galleryCards).filter(c => c.style.display !== 'none');
    currentItems = visibleCards.length ? visibleCards : Array.from(galleryCards);
    const index = currentItems.indexOf(card);
    currentIndex = index !== -1 ? index : 0;

    updateLightboxContent(currentIndex);
    lightbox.classList.add('active');
    document.body.classList.add('menu-open');
    closeBtn?.focus();
  };

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.classList.remove('menu-open');
  };

  galleryCards.forEach(card => {
    card.addEventListener('click', () => openLightbox(card));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(card);
      }
    });
  });

  closeBtn?.addEventListener('click', closeLightbox);

  prevBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    const newIndex = (currentIndex - 1 + currentItems.length) % currentItems.length;
    updateLightboxContent(newIndex);
  });

  nextBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    const newIndex = (currentIndex + 1) % currentItems.length;
    updateLightboxContent(newIndex);
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowLeft') {
      const newIndex = (currentIndex - 1 + currentItems.length) % currentItems.length;
      updateLightboxContent(newIndex);
    } else if (e.key === 'ArrowRight') {
      const newIndex = (currentIndex + 1) % currentItems.length;
      updateLightboxContent(newIndex);
    }
  });
}

/* --------------------------------------------------------------------------
   06. SMOOTH SCROLLING FOR IN-PAGE ANCHORS
   -------------------------------------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}
