const planButtons = document.querySelectorAll('.plan-btn');
const extras = document.querySelectorAll('.extra');
const duraciones = document.querySelectorAll('input[name="duracion"]');
const totalSpan = document.getElementById('total');
let planSeleccionado = null;
let precioBase = 0;
let duracionSeleccionada = 1;


planButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    planButtons.forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    planSeleccionado = btn.dataset.nombre;
    precioBase = parseFloat(btn.dataset.precio);
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
  const fecha = new Date().toLocaleString();

  const ticketHTML = `
    <html>
    <head>
      <title>Ticket de Compra - Tech Solutions</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          padding: 20px;
          color: #222;
        }
        .ticket {
          max-width: 350px;
          margin: auto;
          border: 1px solid #ccc;
          border-radius: 10px;
          padding: 20px;
          background: #fafafa;
        }
        h2 {
          text-align: center;
          color: #0a66c2;
        }
        p {
          margin: 6px 0;
        }
        .total {
          font-weight: bold;
          text-align: center;
          font-size: 18px;
          margin-top: 10px;
        }
        .footer {
          text-align: center;
          font-size: 12px;
          margin-top: 15px;
          color: #555;
        }
      </style>
    </head>
    <body>
      <div class="ticket">
        <h2>Tech Solutions</h2>
        <p><strong>Cliente:</strong> ${nombre}</p>
        <p><strong>Correo:</strong> ${correo}</p>
        <p><strong>Plan:</strong> ${plan}</p>
        <p><strong>Duración:</strong> ${duracion}</p>
        <p><strong>Extras:</strong> ${extras || 'Ninguno'}</p>
        <p class="total">Total a pagar: $${total}</p>
        <div class="footer">
          <p>Fecha: ${fecha}</p>
          <p>¡Gracias por tu compra!</p>
        </div>
      </div>
      <script>
        window.onload = () => {
          window.print();
          window.onafterprint = () => window.close();
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

  generarTicket(datosTicket);

  setTimeout(() => {
    window.location.href = '../servicios.html';
  }, 1500);

  this.reset();
  planButtons.forEach(b => b.classList.remove('selected'));
  totalSpan.textContent = '0';
  planSeleccionado = null;
  precioBase = 0;
});
