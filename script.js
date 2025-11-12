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
   CARRUSEL AUTOMÁTICO
   ========================= */
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelector(".slides");
  if (slides) {
    let index = 0;
    const totalSlides = slides.children.length;

    setInterval(() => {
      index = (index + 1) % totalSlides;
      slides.style.transform = `translateX(-${index * 100}%)`;
      slides.style.transition = "transform 1s ease-in-out";
    }, 4000);
  }
});

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

