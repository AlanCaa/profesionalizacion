/* ============================================================
   SCRIPT PRINCIPAL DEL SITIO WEB "TECH SOLUTIONS"
   Funcionalidades incluidas:
   - Carrusel automático en página de inicio
   - Navegación dinámica (SPA o multipágina)
   - Control de submenús de servicios
   - Envío del formulario de contacto con Formspree
   - Mensajes emergentes (popup)
   ============================================================ */


/* =========================
   NAVEGACIÓN ENTRE SECCIONES (SPA)
   ========================= */
function mostrarSeccion(id) {
  const secciones = document.querySelectorAll(".seccion");
  secciones.forEach(sec => sec.classList.remove("activa"));

  const activa = document.getElementById(id);
  if (activa) activa.classList.add("activa");
}

/* =========================
   SUBMENÚ DE SERVICIOS
   ========================= */
function mostrarServicio(servicioId) {
  document.querySelectorAll(".servicio").forEach(s => s.classList.add("oculto"));
  const servicio = document.getElementById(servicioId);
  if (servicio) servicio.classList.remove("oculto");
}

/* =========================
   CONTADOR ANIMADO DE ESTADÍSTICAS
   ========================= */
function animarContador(elemento, objetivo, duracion = 2000) {
  let inicio = 0;
  const incremento = objetivo / (duracion / 16); // 60 FPS aproximadamente
  const timer = setInterval(() => {
    inicio += incremento;
    if (inicio >= objetivo) {
      elemento.textContent = objetivo.toLocaleString('es-MX');
      clearInterval(timer);
    } else {
      elemento.textContent = Math.floor(inicio).toLocaleString('es-MX');
    }
  }, 16);
}

function iniciarContadores() {
  const contadores = document.querySelectorAll('.numero-grande');
  const opciones = {
    threshold: 0.5,
    rootMargin: '0px'
  };

  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting && !entrada.target.classList.contains('contado')) {
        entrada.target.classList.add('contado');
        const objetivo = parseInt(entrada.target.getAttribute('data-target'));
        animarContador(entrada.target, objetivo);
      }
    });
  }, opciones);

  contadores.forEach(contador => {
    observador.observe(contador);
  });
}

// Iniciar contadores cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', iniciarContadores);
} else {
  iniciarContadores();
}

/* =========================
   ANIMACIONES DE ENTRADA AL SCROLL
   ========================= */
function iniciarAnimacionesScroll() {
  const elementosAnimables = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .slide-up, .scale-in');
  
  const opciones = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('animated');
        observador.unobserve(entrada.target);
      }
    });
  }, opciones);

  elementosAnimables.forEach(elemento => {
    observador.observe(elemento);
  });
}

// Iniciar animaciones cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', iniciarAnimacionesScroll);
} else {
  iniciarAnimacionesScroll();
}

// Animar elementos visibles al cargar la página (sin scroll)
function animarElementosIniciales() {
  const elementosIniciales = document.querySelectorAll('.navbar, .seccion-bienvenido .fade-in');
  elementosIniciales.forEach((elemento, index) => {
    setTimeout(() => {
      elemento.classList.add('animated');
    }, index * 200);
  });
}

// Ejecutar animaciones iniciales
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', animarElementosIniciales);
} else {
  animarElementosIniciales();
}

/* =========================
   BOTÓN FLOTANTE SUBIR ARRIBA
   ========================= */
function inicializarBotonSubir() {
  const btnSubir = document.getElementById('btnSubir');
  
  if (!btnSubir) return;

  // Mostrar/ocultar botón según el scroll
  function toggleBoton() {
    if (window.scrollY > 300) {
      btnSubir.classList.add('visible');
    } else {
      btnSubir.classList.remove('visible');
    }
  }

  // Event listener para el scroll
  window.addEventListener('scroll', toggleBoton);

  // Event listener para el click
  btnSubir.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Verificar estado inicial
  toggleBoton();
}

// Inicializar botón cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', inicializarBotonSubir);
} else {
  inicializarBotonSubir();
}

