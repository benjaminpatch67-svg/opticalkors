/**
 * ÓPTICA Kors — main.js
 * Lógica de interfaz: navegación, formularios, filtros de catálogo,
 * acordeón de preguntas frecuentes, slider de testimonios y contadores.
 * Código modular: cada función controla una sola responsabilidad y se
 * inicializa solo si el elemento correspondiente existe en la página.
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    initNavbar();
    initMobileMenu();
    initBackToTop();
    initCounters();
    initCatalogFilters();
    initQuickView();
    initAccordion();
    initTestimonialSlider();
    initAppointmentForm();
    initContactForm();
    initObservacionesFromQuery();
    setActiveNavLink();
    document.querySelectorAll('[data-year]').forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  });

  /* ---------------------------------------------------------------------
   * Navbar: fondo sólido al hacer scroll
   * ------------------------------------------------------------------- */
  function initNavbar() {
    var nav = document.querySelector('.navbar');
    if (!nav) return;
    var toggle = function () {
      nav.classList.toggle('is-scrolled', window.scrollY > 24);
    };
    toggle();
    window.addEventListener('scroll', toggle, { passive: true });
  }

  /* ---------------------------------------------------------------------
   * Menú móvil
   * ------------------------------------------------------------------- */
  function initMobileMenu() {
    var btn = document.querySelector('.nav-toggle');
    var links = document.querySelector('.nav-links');
    if (!btn || !links) return;

    btn.addEventListener('click', function () {
      var isOpen = links.classList.toggle('mobile-open');
      btn.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('mobile-open');
        btn.innerHTML = '<i class="fa-solid fa-bars"></i>';
        document.body.style.overflow = '';
      });
    });
  }

  /* ---------------------------------------------------------------------
   * Resalta el enlace activo del menú según la página actual
   * ------------------------------------------------------------------- */
  function setActiveNavLink() {
    var current = (window.location.pathname.split('/').pop() || 'index.html');
    document.querySelectorAll('.nav-links a').forEach(function (a) {
      var href = a.getAttribute('href');
      if (href === current || (current === '' && href === 'index.html')) {
        a.classList.add('active');
      }
    });
  }

  /* ---------------------------------------------------------------------
   * Botón "volver arriba"
   * ------------------------------------------------------------------- */
  function initBackToTop() {
    var btn = document.querySelector('.top-btn');
    if (!btn) return;
    window.addEventListener('scroll', function () {
      btn.classList.toggle('show', window.scrollY > 480);
    }, { passive: true });
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------------------------------------------------------------------
   * Contadores animados (estadísticas de "Sobre nosotros")
   * ------------------------------------------------------------------- */
  function initCounters() {
    var counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    var animate = function (el) {
      var target = parseInt(el.getAttribute('data-count'), 10);
      var suffix = el.getAttribute('data-suffix') || '';
      var duration = 1600;
      var start = null;

      function step(ts) {
        if (!start) start = ts;
        var progress = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target).toLocaleString('es-CO') + suffix;
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    };

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function (el) { observer.observe(el); });
  }

  /* ---------------------------------------------------------------------
   * Decoración del tema infantil: osito (azul) y conejita (rosa) con
   * gafas, más estrellitas y una nube. Se inyectan/retiran del DOM al
   * activar o desactivar el filtro "Infantil" del catálogo.
   * ------------------------------------------------------------------- */
  var KIDS_DECOR_HTML =
    '<svg class="mascot-oso" viewBox="0 0 120 120" aria-hidden="true">' +
      '<circle cx="30" cy="26" r="14" fill="#BEE4FA"/>' +
      '<circle cx="90" cy="26" r="14" fill="#BEE4FA"/>' +
      '<circle cx="30" cy="26" r="7" fill="#8FD3F4"/>' +
      '<circle cx="90" cy="26" r="7" fill="#8FD3F4"/>' +
      '<circle cx="60" cy="62" r="46" fill="#CFEAFB"/>' +
      '<ellipse cx="60" cy="78" rx="22" ry="17" fill="#EAF6FF"/>' +
      '<ellipse cx="60" cy="80" rx="6" ry="4" fill="#3C6E8A"/>' +
      '<path d="M50 90 Q60 98 70 90" stroke="#3C6E8A" stroke-width="2.5" fill="none" stroke-linecap="round"/>' +
      '<circle cx="42" cy="58" r="14" fill="none" stroke="#2E6E8E" stroke-width="3.5"/>' +
      '<circle cx="78" cy="58" r="14" fill="none" stroke="#2E6E8E" stroke-width="3.5"/>' +
      '<line x1="56" y1="58" x2="64" y2="58" stroke="#2E6E8E" stroke-width="3.5"/>' +
      '<circle cx="42" cy="58" r="4" fill="#2E6E8E"/>' +
      '<circle cx="78" cy="58" r="4" fill="#2E6E8E"/>' +
      '<circle cx="24" cy="80" r="6" fill="#F7C6DC" opacity=".8"/>' +
      '<circle cx="96" cy="80" r="6" fill="#F7C6DC" opacity=".8"/>' +
    '</svg>' +
    '<svg class="mascot-conejo" viewBox="0 0 120 130" aria-hidden="true">' +
      '<ellipse cx="38" cy="24" rx="12" ry="26" fill="#FBD8E7"/>' +
      '<ellipse cx="82" cy="24" rx="12" ry="26" fill="#FBD8E7"/>' +
      '<ellipse cx="38" cy="26" rx="6" ry="16" fill="#FFF0F5"/>' +
      '<ellipse cx="82" cy="26" rx="6" ry="16" fill="#FFF0F5"/>' +
      '<circle cx="60" cy="72" r="44" fill="#FBE1EC"/>' +
      '<ellipse cx="60" cy="86" rx="20" ry="15" fill="#FFF5FA"/>' +
      '<path d="M60 82 L55 90 L65 90 Z" fill="#C75389"/>' +
      '<path d="M50 96 Q60 103 70 96" stroke="#C75389" stroke-width="2.5" fill="none" stroke-linecap="round"/>' +
      '<circle cx="43" cy="66" r="13" fill="none" stroke="#C75389" stroke-width="3.5"/>' +
      '<circle cx="77" cy="66" r="13" fill="none" stroke="#C75389" stroke-width="3.5"/>' +
      '<line x1="56" y1="66" x2="64" y2="66" stroke="#C75389" stroke-width="3.5"/>' +
      '<circle cx="43" cy="66" r="3.6" fill="#C75389"/>' +
      '<circle cx="77" cy="66" r="3.6" fill="#C75389"/>' +
      '<circle cx="26" cy="86" r="6" fill="#F6A8C6" opacity=".8"/>' +
      '<circle cx="94" cy="86" r="6" fill="#F6A8C6" opacity=".8"/>' +
    '</svg>' +
    '<svg class="decor-estrella decor-estrella-1" viewBox="0 0 24 24" aria-hidden="true">' +
      '<path d="M12 0 C13 8 16 11 24 12 C16 13 13 16 12 24 C11 16 8 13 0 12 C8 11 11 8 12 0 Z" fill="#FFD873"/>' +
    '</svg>' +
    '<svg class="decor-estrella decor-estrella-2" viewBox="0 0 24 24" aria-hidden="true">' +
      '<path d="M12 0 C13 8 16 11 24 12 C16 13 13 16 12 24 C11 16 8 13 0 12 C8 11 11 8 12 0 Z" fill="#F7C6DC"/>' +
    '</svg>' +
    '<svg class="decor-estrella decor-estrella-3" viewBox="0 0 24 24" aria-hidden="true">' +
      '<path d="M12 0 C13 8 16 11 24 12 C16 13 13 16 12 24 C11 16 8 13 0 12 C8 11 11 8 12 0 Z" fill="#A9DEF9"/>' +
    '</svg>' +
    '<svg class="decor-nube" viewBox="0 0 100 60" aria-hidden="true">' +
      '<ellipse cx="30" cy="35" rx="24" ry="18" fill="#FFFFFF"/>' +
      '<ellipse cx="60" cy="30" rx="28" ry="22" fill="#FFFFFF"/>' +
      '<ellipse cx="82" cy="40" rx="18" ry="14" fill="#FFFFFF"/>' +
    '</svg>';

  function toggleKidsDecor(section, show) {
    if (!section) return;
    var existing = section.querySelector('.kids-decor');
    if (show) {
      if (existing) return;
      var wrap = document.createElement('div');
      wrap.className = 'kids-decor';
      wrap.innerHTML = KIDS_DECOR_HTML;
      section.insertBefore(wrap, section.firstChild);
    } else if (existing) {
      existing.remove();
    }
  }


  function initCatalogFilters() {
    var buttons = document.querySelectorAll('.filter-btn');
    var cards = document.querySelectorAll('[data-category]');
    if (!buttons.length || !cards.length) return;

    /* Sección que envuelve filtros + grilla del catálogo, donde se
     * aplica el tema infantil (azul claro + rosa pastel) */
    var catalogSection = document.getElementById('catalogoInterfaz') ||
      buttons[0].closest('.section');

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        buttons.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var category = btn.getAttribute('data-filter');

        cards.forEach(function (card) {
          var match = category === 'todos' || card.getAttribute('data-category') === category;
          card.style.display = match ? '' : 'none';
          if (match) {
            card.classList.add('aos-animate');
          }
        });

        if (catalogSection) {
          var isInfantil = category === 'infantil';
          catalogSection.classList.toggle('theme-infantil', isInfantil);
          toggleKidsDecor(catalogSection, isInfantil);
        }
      });
    });

    /* Asegura que todas las tarjetas visibles al cargar la página
     * (filtro "todos") queden visibles de inmediato, sin depender
     * de que el scroll dispare la animación de AOS. */
    cards.forEach(function (card) { card.classList.add('aos-animate'); });
  }

  /* ---------------------------------------------------------------------
   * Vista rápida de especificaciones (modal) en tarjetas del catálogo
   * (monturas hombre/mujer y lentes de contacto), estilo Opticas Ova
   * ------------------------------------------------------------------- */
  function initQuickView() {
    var buttons = document.querySelectorAll('.btn-quickview');
    var modal = document.getElementById('qvModal');
    if (!buttons.length || !modal) return;

    var imgEl = document.getElementById('qvImg');
    var brandEl = document.getElementById('qvBrand');
    var nameEl = document.getElementById('qvName');
    var priceEl = document.getElementById('qvPrice');
    var specsEl = document.getElementById('qvSpecs');
    var ctaEl = modal.querySelector('.qv-modal__cta');

    function openModal(btn) {
      var specs = [];
      try { specs = JSON.parse(btn.getAttribute('data-specs') || '[]'); } catch (e) { specs = []; }

      imgEl.src = btn.getAttribute('data-img') || '';
      imgEl.alt = btn.getAttribute('data-alt') || '';
      brandEl.textContent = btn.getAttribute('data-brand') || '';
      nameEl.textContent = btn.getAttribute('data-name') || '';
      priceEl.textContent = btn.getAttribute('data-price') || '';

      specsEl.innerHTML = '';
      specs.forEach(function (spec) {
        var li = document.createElement('li');
        var strong = document.createElement('strong');
        strong.textContent = spec.label;
        li.appendChild(strong);
        li.appendChild(document.createTextNode(spec.value));
        specsEl.appendChild(li);
      });

      if (ctaEl) {
        var nombreMontura = btn.getAttribute('data-name') || '';
        var marcaMontura = btn.getAttribute('data-brand') || '';
        ctaEl.setAttribute('href', 'contacto.html?montura=' + encodeURIComponent(nombreMontura) +
          '&marca=' + encodeURIComponent(marcaMontura) + '#agenda');
      }

      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('qv-lock');
    }

    function closeModal() {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('qv-lock');
    }

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        openModal(btn);
      });
    });

    modal.querySelectorAll('[data-qv-close]').forEach(function (el) {
      el.addEventListener('click', closeModal);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
    });
  }

  /* ---------------------------------------------------------------------
   * Acordeón de preguntas frecuentes
   * ------------------------------------------------------------------- */
  function initAccordion() {
    var items = document.querySelectorAll('.faq-item');
    if (!items.length) return;

    items.forEach(function (item) {
      var question = item.querySelector('.faq-q');
      var answer = item.querySelector('.faq-a');

      question.addEventListener('click', function () {
        var isOpen = item.classList.contains('open');

        items.forEach(function (other) {
          other.classList.remove('open');
          other.querySelector('.faq-a').style.maxHeight = null;
          other.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
        });

        if (!isOpen) {
          item.classList.add('open');
          answer.style.maxHeight = answer.scrollHeight + 'px';
          question.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  /* ---------------------------------------------------------------------
   * Slider de testimonios
   * ------------------------------------------------------------------- */
  function initTestimonialSlider() {
    var slides = document.querySelectorAll('.testi-slide');
    var dotsWrap = document.querySelector('.testi-dots');
    if (!slides.length || !dotsWrap) return;

    var current = 0;
    var timer;

    slides.forEach(function (_, i) {
      var dot = document.createElement('button');
      dot.setAttribute('aria-label', 'Ver testimonio ' + (i + 1));
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', function () { goTo(i); resetTimer(); });
      dotsWrap.appendChild(dot);
    });

    var dots = dotsWrap.querySelectorAll('button');

    function goTo(index) {
      slides[current].classList.remove('active');
      dots[current].classList.remove('active');
      current = (index + slides.length) % slides.length;
      slides[current].classList.add('active');
      dots[current].classList.add('active');
    }

    function resetTimer() {
      clearInterval(timer);
      timer = setInterval(function () { goTo(current + 1); }, 6000);
    }

    resetTimer();
  }

  /* ---------------------------------------------------------------------
   * Si se llega desde el catálogo con ?montura=...&marca=... (botón
   * "Consultar" de una tarjeta o del modal de vista rápida), precarga
   * el textarea de observaciones y hace scroll hasta el formulario.
   * Aplica tanto en contacto.html como en index.html (mismo formulario).
   * ------------------------------------------------------------------- */
  function initObservacionesFromQuery() {
    var textarea = document.getElementById('observaciones');
    if (!textarea) return;

    var params = new URLSearchParams(window.location.search);
    var montura = params.get('montura');
    var marca = params.get('marca');
    if (!montura && !marca) return;

    var partes = [marca, montura].filter(Boolean).join(' ');
    textarea.value = 'Estoy interesado/a en: ' + partes + '.';

    var agenda = document.getElementById('agenda');
    if (agenda) {
      agenda.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  /* ---------------------------------------------------------------------
   * Validación del formulario de agendamiento de citas
   * ------------------------------------------------------------------- */
  function initAppointmentForm() {
    var form = document.querySelector('#appointment-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validateForm(form)) return;

      var getVal = function (name) {
        var field = form.querySelector('[name="' + name + '"]');
        return field ? field.value.trim() : '';
      };

      var mensaje = 'Nueva solicitud de cita - Óptica Kors\n' +
        'Nombre: ' + getVal('nombre') + '\n' +
        'Apellidos: ' + getVal('apellidos') + '\n' +
        'Teléfono: ' + getVal('telefono') + '\n' +
        'Correo: ' + getVal('correo') + '\n' +
        'Fecha: ' + getVal('fecha') + '\n' +
        'Hora: ' + getVal('hora') + '\n' +
        'Servicio: ' + getVal('servicio') + '\n' +
        'Observaciones: ' + getVal('observaciones');

      var url = 'https://wa.me/573246006598?text=' + encodeURIComponent(mensaje);
      window.open(url, '_blank', 'noopener');

      showSuccess(form);
    });

    form.querySelectorAll('.form-control').forEach(function (field) {
      field.addEventListener('blur', function () { validateField(field); });
    });
  }

  function initContactForm() {
    var form = document.querySelector('#contact-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (validateForm(form)) {
        showSuccess(form);
      }
    });

    form.querySelectorAll('.form-control').forEach(function (field) {
      field.addEventListener('blur', function () { validateField(field); });
    });
  }

  function validateForm(form) {
    var valid = true;
    form.querySelectorAll('.form-control[required]').forEach(function (field) {
      if (!validateField(field)) valid = false;
    });
    return valid;
  }

  function validateField(field) {
    var value = field.value.trim();
    var isValid = true;

    if (field.hasAttribute('required') && value === '') {
      isValid = false;
    } else if (field.type === 'email' && value !== '') {
      isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    } else if (field.type === 'tel' && value !== '') {
      isValid = /^[0-9+\s()-]{7,15}$/.test(value);
    }

    field.classList.toggle('is-invalid', !isValid);
    return isValid;
  }

  function showSuccess(form) {
    var successBox = form.parentElement.querySelector('.form-success');
    form.reset();
    form.querySelectorAll('.is-invalid').forEach(function (f) { f.classList.remove('is-invalid'); });
    if (successBox) {
      successBox.classList.add('show');
      successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(function () { successBox.classList.remove('show'); }, 6000);
    }
  }
})();
