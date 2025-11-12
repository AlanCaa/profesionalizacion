# 🔧 Configuración del Template de EmailJS

## ⚠️ Error: "The recipients address is empty"

Este error significa que el campo **"To Email"** en tu template de EmailJS está vacío o mal configurado.

## ✅ Solución: Configurar el Template Correctamente

### Paso 1: Acceder al Template
1. Ve a https://www.emailjs.com/
2. Inicia sesión en tu cuenta
3. Ve a **Email Templates**
4. Busca y edita el template con ID: `template_62ij553`

### Paso 2: Configurar el Campo "To Email"

En la sección **"To Email"** del template, debes poner:

```
{{to_email}}
```

**IMPORTANTE:** Este campo NO debe estar vacío. Debe contener exactamente `{{to_email}}` (con las llaves dobles).

### Paso 3: Configurar el Asunto

En el campo **"Subject"**, puedes usar:

```
Nueva Solicitud de Servicio - {{servicio}}
```

### Paso 4: Configurar el Contenido del Correo

En el campo **"Content"** (cuerpo del correo), puedes usar este formato:

**Opción 1: Formato Simple (Recomendado)**
```
{{message}}
```

**Opción 2: Formato Detallado**
```
Nueva Solicitud de Servicio - TelloTech

Servicio: {{servicio}}
Tipo de Servicio: {{tipo_servicio}}
Alcance/Duración: {{alcance}}

Datos del Cliente:
- Nombre: {{from_name}}
- Correo: {{from_email}}
- Teléfono: {{telefono}}
- Empresa: {{empresa}}

Descripción: {{descripcion}}

Servicios Adicionales: {{extras}}

{{#total}}Total Estimado: ${{total}}{{/total}}

Fecha: {{fecha}}
```

### Paso 5: Guardar el Template

1. Haz clic en **"Save"** para guardar los cambios
2. Asegúrate de que el template esté **"Active"** (activo)

## 📋 Verificación Rápida

Tu template debe tener estos campos configurados:

- ✅ **To Email:** `{{to_email}}` (OBLIGATORIO - no puede estar vacío)
- ✅ **From Name:** `{{from_name}}` (opcional)
- ✅ **Reply To:** `{{reply_to}}` (opcional)
- ✅ **Subject:** `Nueva Solicitud - {{servicio}}` (o el que prefieras)
- ✅ **Content:** `{{message}}` o el formato detallado de arriba

## 🧪 Probar el Template

1. En EmailJS, ve a tu template
2. Haz clic en **"Test"** o **"Send Test Email"**
3. Verifica que el correo llegue correctamente

## ⚡ Solución Rápida

Si quieres una solución inmediata, simplemente:

1. Abre tu template `template_62ij553`
2. En el campo **"To Email"**, escribe: `juanpmuniz36@gmail.com` (directamente, sin variables)
3. Guarda el template

Esto enviará todos los correos a esa dirección directamente, sin necesidad de usar la variable `{{to_email}}`.

## 🔍 Verificar que Funciona

Después de configurar el template:

1. Abre la consola del navegador (F12)
2. Envía una solicitud de prueba
3. Deberías ver: "Correo enviado exitosamente!"
4. Revisa tu bandeja de entrada en juanpmuniz36@gmail.com

