# Instrucciones para Configurar EmailJS

## 📧 Configuración de Envío Automático de Correos

Se ha implementado EmailJS para enviar correos automáticamente cuando un cliente solicita cualquier servicio. El correo se enviará a: **juanpmuniz36@gmail.com**

## 🔧 Pasos para Configurar EmailJS

### 1. Crear cuenta en EmailJS
1. Ve a https://www.emailjs.com/
2. Crea una cuenta gratuita (permite hasta 200 correos/mes)
3. Inicia sesión en tu cuenta

### 2. Configurar un Servicio de Email
1. En el dashboard, ve a **Email Services**
2. Haz clic en **Add New Service**
3. Selecciona **Gmail** como proveedor
4. Conecta tu cuenta de Gmail (juanpmuniz36@gmail.com)
5. Guarda el **Service ID** que se genera (ejemplo: `service_xxxxxxx`)

### 3. Crear un Template de Email
1. Ve a **Email Templates**
2. Haz clic en **Create New Template**
3. Configura el template con los siguientes campos:

**Asunto del correo:**
```
Nueva Solicitud de Servicio - {{servicio}}
```

**Contenido del correo (HTML):**
```html
<h2>Nueva Solicitud de Servicio - TelloTech</h2>

<p><strong>Servicio:</strong> {{servicio}}</p>
<p><strong>Cliente:</strong> {{from_name}}</p>
<p><strong>Correo:</strong> {{from_email}}</p>
<p><strong>Teléfono:</strong> {{telefono}}</p>
<p><strong>Empresa:</strong> {{empresa}}</p>
<p><strong>Tipo de Servicio:</strong> {{tipo_servicio}}</p>
<p><strong>Alcance/Duración:</strong> {{alcance}}</p>
<p><strong>Descripción:</strong> {{descripcion}}</p>
<p><strong>Servicios Adicionales:</strong> {{extras}}</p>
{{#total}}<p><strong>Total Estimado:</strong> ${{total}}</p>{{/total}}
<p><strong>Fecha:</strong> {{fecha}}</p>

<hr>
<p>Este correo fue generado automáticamente desde el sitio web de TelloTech.</p>
```

4. Guarda el template y copia el **Template ID** (ejemplo: `template_xxxxxxx`)

### 4. Obtener tu Public Key
1. Ve a **Account** → **General**
2. Copia tu **Public Key** (ejemplo: `xxxxxxxxxxxxxxxx`)

### 5. Configurar en los Archivos JavaScript

Debes reemplazar los valores en los siguientes archivos:

- `servicios/desarrollo-software/script.js`
- `servicios/datos-ia/script.js`
- `servicios/mantenimiento/script.js`
- `servicios/nube/script.js`
- `servicios/ciberseguridad/script.js`

En cada archivo, busca estas líneas al inicio:

```javascript
const EMAILJS_PUBLIC_KEY = 'TU_PUBLIC_KEY_AQUI';
const EMAILJS_SERVICE_ID = 'TU_SERVICE_ID_AQUI';
const EMAILJS_TEMPLATE_ID = 'TU_TEMPLATE_ID_AQUI';
```

Y reemplázalas con tus valores reales:

```javascript
const EMAILJS_PUBLIC_KEY = 'tu_public_key_aqui';
const EMAILJS_SERVICE_ID = 'tu_service_id_aqui';
const EMAILJS_TEMPLATE_ID = 'tu_template_id_aqui';
```

## ✅ Verificación

Una vez configurado:
1. Abre la consola del navegador (F12)
2. Envía una solicitud de servicio desde cualquier página
3. Deberías ver en la consola: "Correo enviado exitosamente"
4. Revisa tu bandeja de entrada en juanpmuniz36@gmail.com

## 📝 Notas Importantes

- El correo se envía automáticamente cuando el usuario hace clic en "Enviar Solicitud" o "Contratar Plan"
- Si hay un error, se registrará en la consola del navegador pero no interrumpirá el flujo del usuario
- El plan gratuito de EmailJS permite 200 correos por mes
- Todos los datos del formulario se incluyen en el correo

## 🆘 Solución de Problemas

**Error: "EmailJS no está cargado"**
- Verifica que el script de EmailJS esté incluido en el HTML
- Revisa la consola del navegador para errores de carga

**Error: "Invalid Public Key"**
- Verifica que hayas copiado correctamente tu Public Key
- Asegúrate de que no haya espacios extra

**No recibo correos**
- Verifica que el Service ID y Template ID sean correctos
- Revisa la carpeta de spam
- Verifica que el servicio de Gmail esté correctamente conectado en EmailJS

