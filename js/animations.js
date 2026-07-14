/**
 * ÓPTICA Kors — animations.js
 * Inicializa AOS (scroll reveal) y el gesto de marca "Enfoque": la imagen
 * principal del héroe pasa de difusa a nítida, representando la promesa
 * central de una óptica: llevarte de lo borroso a lo claro.
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    initAOS();
    initFocusReveal();
  });

  function initAOS() {
    if (typeof AOS === 'undefined') return;
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60,
      disable: function () {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      }
    });
  }

  /* Efecto de enfoque: al cargar, la fotografía del héroe (y de cada
     .focus-frame en la página) pasa de borrosa a nítida suavemente. */
  function initFocusReveal() {
    var frames = document.querySelectorAll('.focus-frame');
    if (!frames.length) return;

    frames.forEach(function (frame, i) {
      setTimeout(function () {
        frame.classList.add('is-focused');
      }, 350 + i * 150);
    });
  }
})();
