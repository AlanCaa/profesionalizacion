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
    setTimeout(inicializarEmailJS, 500); // Esperar un poco más para asegurar que EmailJS esté cargado
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
      message: `Nueva solicitud de servicio:\n\nServicio: ${datos.servicio}\nTipo: ${datos.tipoServicio || 'No especificado'}\nAlcance: ${datos.alcance || datos.volumen || datos.modalidad || datos.urgencia || 'No especificado'}\nDescripción: ${datos.descripcion || 'No proporcionada'}\nExtras: ${datos.extras || 'Ninguno'}\n\nDatos del cliente:\nNombre: ${datos.nombre}\nCorreo: ${datos.correo}\nTeléfono: ${datos.telefono || 'No proporcionado'}\nEmpresa: ${datos.empresa || 'No proporcionado'}\n\nFecha: ${new Date().toLocaleString('es-MX')}`,
      telefono: datos.telefono || 'No proporcionado',
      empresa: datos.empresa || 'No proporcionado',
      servicio: datos.servicio,
      tipo_servicio: datos.tipoServicio || 'No especificado',
      alcance: datos.alcance || datos.volumen || datos.modalidad || datos.urgencia || 'No especificado',
      descripcion: datos.descripcion || 'No proporcionada',
      extras: datos.extras || 'Ninguno',
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

// Animaciones al scroll
function iniciarAnimacionesDesarrollo() {
  const elementosAnimables = document.querySelectorAll('.servicio-card, .solicitud-card, .fade-in');
  
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
  document.addEventListener('DOMContentLoaded', iniciarAnimacionesDesarrollo);
} else {
  iniciarAnimacionesDesarrollo();
}

// Manejo del formulario
document.getElementById('formSolicitud').addEventListener('submit', function(e) {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value;
  const correo = document.getElementById('correo').value;
  const telefono = document.getElementById('telefono').value;
  const empresa = document.getElementById('empresa').value;
  const tipoServicio = document.querySelector('input[name="tipoServicio"]:checked')?.value;
  const alcance = document.querySelector('input[name="alcance"]:checked')?.value;
  const descripcion = document.getElementById('descripcion').value;
  
  const extrasSeleccionados = [];
  document.querySelectorAll('.extra:checked').forEach(e => {
    extrasSeleccionados.push(e.value);
  });

  if (!tipoServicio) {
    alert('Por favor, selecciona un tipo de servicio.');
    return;
  }

  // Preparar datos para el correo
  const tipoServicioTexto = tipoServicio === 'web-movil' ? 'Aplicaciones Web y Móviles' : 
    tipoServicio === 'sistemas-gestion' ? 'Sistemas de Gestión (ERP, CRM, POS)' : 
    tipoServicio === 'automatizacion' ? 'Automatización (RPA, Scripts, Bots)' : 
    'Integración de Sistemas';

  const alcanceTexto = alcance === 'pequeño' ? 'Pequeño (1-3 meses)' : 
    alcance === 'mediano' ? 'Mediano (3-6 meses)' : 
    'Grande (6+ meses)';

  const extrasTexto = extrasSeleccionados.length > 0 ? 
    extrasSeleccionados.map(extra => {
      const nombres = {
        'diseño': 'Diseño UI/UX',
        'testing': 'Testing y QA',
        'capacitacion': 'Capacitación',
        'mantenimiento': 'Mantenimiento'
      };
      return nombres[extra] || extra;
    }).join(', ') : 'Ninguno';

  const datosCorreo = {
    nombre,
    correo,
    telefono,
    empresa,
    servicio: 'Desarrollo y Software',
    tipoServicio: tipoServicioTexto,
    alcance: alcanceTexto,
    descripcion,
    extras: extrasTexto
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

  // Generar resumen de la solicitud
  const resumenHTML = `
    <html>
    <head>
      <title>Solicitud de Proyecto - TelloTech</title>
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
      </style>
    </head>
    <body>
      <div class="solicitud">
        <h2>TelloTech</h2>
        <h3 style="text-align: center; color: #0055aa; margin-bottom: 25px;">Solicitud de Proyecto</h3>
        
        <div class="info-section">
          <span class="label">Cliente:</span>
          <span class="value">${nombre}</span>
        </div>
        
        <div class="info-section">
          <span class="label">Correo:</span>
          <span class="value">${correo}</span>
        </div>
        
        <div class="info-section">
          <span class="label">Teléfono:</span>
          <span class="value">${telefono}</span>
        </div>
        
        <div class="info-section">
          <span class="label">Empresa:</span>
          <span class="value">${empresa}</span>
        </div>
        
        <div class="info-section">
          <span class="label">Tipo de Servicio:</span>
          <div class="value">
            ${tipoServicio === 'web-movil' ? 'Aplicaciones Web y Móviles' : 
              tipoServicio === 'sistemas-gestion' ? 'Sistemas de Gestión (ERP, CRM, POS)' : 
              tipoServicio === 'automatizacion' ? 'Automatización (RPA, Scripts, Bots)' : 
              'Integración de Sistemas'}
          </div>
        </div>
        
        <div class="info-section">
          <span class="label">Alcance:</span>
          <div class="value">
            <span class="badge">
              ${alcance === 'pequeño' ? 'Pequeño (1-3 meses)' : 
                alcance === 'mediano' ? 'Mediano (3-6 meses)' : 
                'Grande (6+ meses)'}
            </span>
          </div>
        </div>
        
        <div class="info-section">
          <span class="label">Descripción del Proyecto:</span>
          <div class="value" style="white-space: pre-wrap;">${descripcion}</div>
        </div>
        
        ${extrasSeleccionados.length > 0 ? `
        <div class="info-section">
          <span class="label">Servicios Adicionales:</span>
          <div class="value">
            ${extrasSeleccionados.map(extra => {
              const nombres = {
                'diseño': 'Diseño UI/UX',
                'testing': 'Testing y QA',
                'capacitacion': 'Capacitación',
                'mantenimiento': 'Mantenimiento'
              };
              return nombres[extra] || extra;
            }).join(', ')}
          </div>
        </div>
        ` : ''}
        
        <div class="footer">
          <p><strong>Fecha:</strong> ${new Date().toLocaleString('es-MX')}</p>
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
  ventana.document.write(resumenHTML);
  ventana.document.close();

  // Mostrar mensaje de confirmación
  alert('¡Solicitud enviada exitosamente! Nos pondremos en contacto contigo pronto.');

  // Redirigir después de un momento
  setTimeout(() => {
    window.location.href = '../../index.html#nuestros-servicios';
  }, 2000);

  // Resetear formulario
  this.reset();
});

