// Configuración de EmailJS
const EMAILJS_PUBLIC_KEY = 'e6tWnwh39FEjbydUp';
const EMAILJS_SERVICE_ID = 'service_sdqz4jg';
const EMAILJS_TEMPLATE_ID = 'template_62ij553';
const EMAIL_DESTINO = 'juanpmuniz36@gmail.com';

// Inicializar EmailJS cuando esté cargado
function inicializarEmailJS() {
  if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
    console.log('EmailJS inicializado correctamente');
  } else {
    console.error('EmailJS no está disponible');
  }
}

// Esperar a que EmailJS se cargue
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    setTimeout(inicializarEmailJS, 500);
  });
} else {
  setTimeout(inicializarEmailJS, 500);
}

// Función para enviar correo electrónico
function enviarCorreo(datos) {
  return new Promise((resolve, reject) => {
    if (typeof emailjs === 'undefined') {
      console.error('EmailJS no está cargado');
      reject('EmailJS no está disponible');
      return;
    }

    const templateParams = {
      to_email: EMAIL_DESTINO,
      reply_to: datos.correo,
      from_name: datos.nombre,
      from_email: datos.correo,
      message: `Nueva solicitud de servicio:\n\nServicio: ${datos.servicio}\nPlan: ${datos.plan || 'No especificado'}\nDuración: ${datos.duracion || 'No especificado'}\nExtras: ${datos.extras || 'Ninguno'}\nTotal: $${datos.total || 'No especificado'}\n\nDatos del cliente:\nNombre: ${datos.nombre}\nCorreo: ${datos.correo}\n\nFecha: ${new Date().toLocaleString('es-MX')}`,
      telefono: datos.telefono || 'No proporcionado',
      empresa: datos.empresa || 'No proporcionado',
      servicio: datos.servicio,
      tipo_servicio: datos.plan || 'No especificado',
      alcance: datos.duracion || 'No especificado',
      descripcion: datos.descripcion || 'No proporcionada',
      extras: datos.extras || 'Ninguno',
      total: datos.total || 'No especificado',
      fecha: new Date().toLocaleString('es-MX')
    };

    console.log('Enviando correo con parámetros:', templateParams);

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
      .then((response) => {
        console.log('Correo enviado exitosamente!', response.status, response.text);
        resolve(response);
      })
      .catch((error) => {
        console.error('Error al enviar correo:', error);
        reject(error);
      });
  });
}

const planCards = document.querySelectorAll('.plan-card');
const extras = document.querySelectorAll('.extra');
const duraciones = document.querySelectorAll('input[name="duracion"]');
const totalSpan = document.getElementById('total');
let planSeleccionado = null;
let precioBase = 0;
let duracionSeleccionada = 1;

// Selección de planes con las nuevas cards
planCards.forEach(card => {
  card.addEventListener('click', () => {
    planCards.forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    planSeleccionado = card.dataset.nombre;
    precioBase = parseFloat(card.dataset.precio);
    calcularTotal();
  });
});


extras.forEach(extra => extra.addEventListener('change', calcularTotal));
duraciones.forEach(radio => radio.addEventListener('change', () => {
  duracionSeleccionada = parseInt(radio.value);
  calcularTotal();
}));

function calcularTotal() {
  if (!precioBase) {
    totalSpan.textContent = '0';
    return;
  }

  let total = precioBase;
  extras.forEach(e => {
    if (e.checked) total += parseFloat(e.value);
  });

  let subtotal = total * duracionSeleccionada;

  if (duracionSeleccionada === 3) subtotal *= 0.95; 
  if (duracionSeleccionada === 12) subtotal *= 0.85; 

  totalSpan.textContent = subtotal.toFixed(2);
}


function generarTicket({ nombre, correo, plan, duracion, extras, total }) {
  const fecha = new Date().toLocaleString('es-MX');

  const ticketHTML = `
    <html>
    <head>
      <title>Solicitud de Plan - TelloTech</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          padding: 20px;
          color: #222;
        }
        .solicitud {
          max-width: 500px;
          margin: auto;
          border: 1px solid #ccc;
          border-radius: 10px;
          padding: 30px;
          background: #fafafa;
        }
        h2 {
          text-align: center;
          color: #003366;
          margin-bottom: 20px;
        }
        .info-section {
          margin-bottom: 15px;
          padding-bottom: 15px;
          border-bottom: 1px solid #ddd;
        }
        .info-section:last-child {
          border-bottom: none;
        }
        .label {
          font-weight: bold;
          color: #003366;
          display: block;
          margin-bottom: 5px;
        }
        .value {
          color: #555;
          margin-bottom: 10px;
        }
        .footer {
          text-align: center;
          font-size: 12px;
          margin-top: 20px;
          color: #555;
          padding-top: 20px;
          border-top: 1px solid #ddd;
        }
        .badge {
          display: inline-block;
          padding: 5px 10px;
          border-radius: 5px;
          background-color: #003366;
          color: white;
          font-size: 0.85rem;
          margin-top: 5px;
        }
        .total {
          font-weight: bold;
          text-align: center;
          font-size: 1.5rem;
          color: #003366;
          margin-top: 10px;
        }
      </style>
    </head>
    <body>
      <div class="solicitud">
        <h2>TelloTech</h2>
        <h3 style="text-align: center; color: #0055aa; margin-bottom: 25px;">Solicitud de Plan</h3>
        
        <div class="info-section">
          <span class="label">Cliente:</span>
          <span class="value">${nombre}</span>
        </div>
        
        <div class="info-section">
          <span class="label">Correo:</span>
          <span class="value">${correo}</span>
        </div>
        
        <div class="info-section">
          <span class="label">Plan Seleccionado:</span>
          <div class="value">
            <span class="badge">${plan}</span>
          </div>
        </div>
        
        <div class="info-section">
          <span class="label">Duración:</span>
          <div class="value">${duracion}</div>
        </div>
        
        ${extras && extras !== 'Ninguno' ? `
        <div class="info-section">
          <span class="label">Opciones Adicionales:</span>
          <div class="value">${extras}</div>
        </div>
        ` : ''}
        
        <div class="info-section">
          <span class="label">Total Estimado:</span>
          <div class="total">$${total}</div>
        </div>
        
        <div class="footer">
          <p><strong>Fecha:</strong> ${fecha}</p>
          <p>Nos pondremos en contacto contigo pronto para una cotización personalizada.</p>
          <p style="margin-top: 15px; color: #003366;"><strong>¡Gracias por confiar en nosotros!</strong></p>
        </div>
      </div>
      <script>
        window.onload = () => {
          window.print();
          setTimeout(() => {
            window.close();
          }, 1000);
        };
      </script>
    </body>
    </html>
  `;

  const ventana = window.open('', '_blank');
  ventana.document.open();
  ventana.document.write(ticketHTML);
  ventana.document.close();
}


document.getElementById('formCotizacion').addEventListener('submit', function(e) {
  e.preventDefault();

  if (!planSeleccionado) {
    alert('Por favor, selecciona un plan antes de enviar.');
    return;
  }

  const nombre = document.getElementById('nombre').value;
  const correo = document.getElementById('correo').value;
  const duracionTexto =
    duracionSeleccionada === 1 ? '1 mes' :
    duracionSeleccionada === 3 ? '3 meses' :
    '12 meses (anual)';

  const extrasSeleccionados = [];
  extras.forEach(e => {
    if (e.checked) extrasSeleccionados.push(e.parentElement.textContent.trim());
  });

  const datosTicket = {
    nombre,
    correo,
    plan: planSeleccionado,
    duracion: duracionTexto,
    extras: extrasSeleccionados.join(', '),
    total: totalSpan.textContent
  };

  // Preparar datos para el correo
  const datosCorreo = {
    nombre,
    correo,
    servicio: 'Ciberseguridad',
    plan: planSeleccionado,
    duracion: duracionTexto,
    extras: extrasSeleccionados.join(', ') || 'Ninguno',
    total: totalSpan.textContent
  };

  // Enviar correo electrónico
  enviarCorreo(datosCorreo)
    .then(() => {
      console.log('✅ Correo enviado exitosamente a', EMAIL_DESTINO);
    })
    .catch((error) => {
      console.error('❌ Error al enviar correo:', error);
      alert('Hubo un problema al enviar la notificación por correo. Por favor, contacta directamente a ' + EMAIL_DESTINO);
    });

  generarTicket(datosTicket);

  setTimeout(() => {
    window.location.href = '../../index.html#nuestros-servicios';
  }, 1500);

  this.reset();
  planCards.forEach(c => c.classList.remove('selected'));
  totalSpan.textContent = '0';
  planSeleccionado = null;
  precioBase = 0;
});

// Animaciones al scroll
function iniciarAnimacionesCiberseguridad() {
  const elementosAnimables = document.querySelectorAll('.plan-card, .cotizacion-card, .fade-in');
  
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
  document.addEventListener('DOMContentLoaded', iniciarAnimacionesCiberseguridad);
} else {
  iniciarAnimacionesCiberseguridad();
}

