# Configuración de solicitudes de demo

## Estado actual

Esquema confirmado en código, integración probada con servicios simulados. No se han realizado escrituras ni enviado correos reales. Mantener `LEADS_SHEETS_WRITES_ENABLED=false`. No hay despliegue ni push.

Documento existente: `17E_ejZKmoQYxw1xzY_0e3QK-kNtB-4kJY7D7DVX733c`; pestaña `CP David Parte 2`, sheetId `897385192`. No crear otro documento, pestaña, columnas o cabeceras ni modificar fórmulas, validaciones o registros existentes.

El nombre y las cabeceras A:T están confirmados. **Sigue pendiente verificar el número de fila de las cabeceras** (`GOOGLE_SHEET_HEADER_ROW`, vacío) y el vocabulario/validación permitido de `lead_status` (`LEADS_INITIAL_STATUS`, vacío). No se supone que sea «Nuevo».

## Mapeo confirmado (exactamente 20 valores)

| Columna | Cabecera exacta | Valor |
| --- | --- | --- |
| A | id | `web_` + UUID de solicitud, estable durante los reintentos; identificador propio, no de Meta |
| B | created_time | Fecha del servidor, ISO 8601 UTC |
| C | ad_id | Parámetro explícito ad_id o vacío |
| D | ad_name | Parámetro explícito ad_name o vacío |
| E | adset_id | Parámetro explícito adset_id o vacío |
| F | adset_name | Parámetro explícito adset_name o vacío |
| G | campaign_id | Parámetro explícito campaign_id o vacío |
| H | campaign_name | Parámetro explícito campaign_name o vacío |
| I | form_id | web_plugin / web_campus / web_campus_secure |
| J | form_name | DuxBrain Web - Plugin / DuxBrain Web - Campus / DuxBrain Web - Campus Secure |
| K | is_organic | Booleano false (FALSE en Sheets) solo con medio pagado explícito; en otro caso vacío. Nunca TRUE por ausencia de UTM |
| L | platform | facebook / instagram si está identificado; si es desconocido o contradictorio, web |
| M | ¿tienes_academia_online? | Vacío; no se pregunta |
| N | ¿te_gustaría_tener_un_campus_online? | Vacío; no se pregunta |
| O | ¿cuántos_alumnos_tienes? | Rango declarado en el formulario |
| P | email | Email validado |
| Q | full_name | Nombre validado |
| R | phone_number | Texto, conservando el prefijo internacional |
| S | website | Vacío; no se recoge URL de academia. El honeypot website NO se guarda aquí |
| T | lead_status | LEADS_INITIAL_STATUS confirmado; estado comercial, jamás técnico de SMTP |

Academia y las seis UTM (source, medium, campaign, content, term, id) van completas, dentro de los límites, en el aviso de correo. **No quedan almacenadas en Sheets**: ninguna columna cambia de significado para guardarlas. No se deriva campaign_id de utm_campaign ni ad_id de utm_content.

El append usa exactamente `'CP David Parte 2'!A:T`, `valueInputOption: RAW` y `INSERT_ROWS`. Solo existe operación de append: se ha eliminado la actualización de celdas para marcar correos. Antes de reservar/enviar, el preflight consulta metadatos para comprobar nombre y sheetId y lee la fila completa de cabeceras indicada, exigiendo los 20 nombres exactos en orden y sin columnas adicionales con contenido. Si hay discrepancia, responde controladamente 503 y no ejecuta append ni SMTP.

Antes de activar, comprobar que la tabla detectada en A:T permite append sin interferir con fórmulas, totales, validaciones o automatizaciones: Google determina la tabla según el rango. No editar la hoja para que pase el preflight. Si la geometría es incompatible, adaptar el código antes de activar. Un rango de respuesta inesperado tras append se considera incierto: puede haberse guardado la fila; nunca se deshace ni se reintenta automáticamente.

## Configurar Google Cloud y .env.local

1. En un proyecto de Google Cloud, APIs y servicios → Biblioteca → habilitar Google Sheets API. No implementar login del visitante ni crear un documento de Sheets nuevo.
2. IAM → Cuentas de servicio → crear una cuenta dedicada sin roles amplios de proyecto. Obtener una clave JSON si lo permite la política de la organización.
3. Guardar el JSON fuera del repositorio o en credentials/ (ignorada). Extraer localmente client_email y private_key; no compartir secretos por chat. Compartir el documento existente como Editora con el email de esa cuenta, sin hacerlo público ni cambiar sus datos. El permiso de Google es a nivel de documento, no de una única pestaña; el código restringe el destino.
4. Copiar `.env.example` a `.env.local` solo si este último no existe. Los IDs y nombre de pestaña ya están incluidos. Completar GOOGLE_SERVICE_ACCOUNT_EMAIL y GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY. La clave admite saltos reales o secuencias literales `\n`, convertidas en servidor; copiarla entre comillas dobles. Nunca usar prefijo NEXT_PUBLIC_.
5. Verificar la fila de cabeceras por lectura y completar GOOGLE_SHEET_HEADER_ROW. Confirmar el valor permitido para lead_status y completar LEADS_INITIAL_STATUS sin cambiar validaciones. No hay valores por defecto.
6. Mantener LEADS_SHEETS_WRITES_ENABLED=false hasta que se autorice la primera prueba real. No se ha creado .env.local ni sobrescrito secretos locales durante esta adaptación.

`.env.example` puede versionarse; `.env.local`, credentials/ y JSON de claves están ignorados (solo los JSON no secretos explícitamente permitidos del proyecto se versionan). No añadir claves con git add -f. Revocar/rotar una clave si se expone.

Referencias: [habilitar APIs](https://developers.google.com/workspace/guides/enable-apis), [cuentas de servicio](https://cloud.google.com/iam/docs/creating-managing-service-accounts), [lectura/escritura de valores](https://developers.google.com/workspace/sheets/api/guides/values).

## Parámetros para enlaces de campañas Meta

El cliente captura únicamente parámetros permitidos de la URL y el servidor vuelve a validarlos. Configurar C:H expresamente: ad_id, ad_name, adset_id, adset_name, campaign_id, campaign_name. IDs: hasta 64 caracteres, dígitos. Nombres y UTM: hasta 250 caracteres por valor. platform: hasta 32. Se rechazan controles/saltos de línea, tipos incorrectos y valores demasiado largos en servidor. No se resuelven macros en la landing: marcadores {{...}} sin sustituir se descartan. Las UTM no se usan como sustitutos de IDs.

Contrato para el enlace del anuncio, con valores reales URL-encoded:

```text
utm_source=facebook_o_instagram&utm_medium=paid_social&utm_campaign=NOMBRE_CAMPANA&utm_content=NOMBRE_ANUNCIO&utm_term=NOMBRE_CONJUNTO&utm_id=ID_CAMPANA&ad_id=ID_ANUNCIO&ad_name=NOMBRE_ANUNCIO&adset_id=ID_CONJUNTO&adset_name=NOMBRE_CONJUNTO&campaign_id=ID_CAMPANA&campaign_name=NOMBRE_CAMPANA
```

En el campo de parámetros del anuncio pueden prepararse las variables dinámicas y revisar la URL final antes de activar:

```text
utm_source={{site_source_name}}&utm_medium=paid_social&utm_campaign={{campaign.name}}&utm_content={{ad.name}}&utm_term={{adset.name}}&utm_id={{campaign.id}}&ad_id={{ad.id}}&ad_name={{ad.name}}&adset_id={{adset.id}}&adset_name={{adset.name}}&campaign_id={{campaign.id}}&campaign_name={{campaign.name}}
```

La disponibilidad/sustitución de macros debe comprobarse en la cuenta y anuncio reales; la documentación pública de Meta no fue accesible durante esta sesión. También se puede usar un enlace con valores explícitos correctamente codificados. No probar atribución usando literalmente los marcadores de ejemplo.

Normalización implementada: utm_source o platform explícito con fb/facebook → facebook; ig/instagram → instagram (sin distinguir mayúsculas). Conflicto entre fuentes reconocidas → web. Meta genérico, Messenger/Audience Network u otros valores no reconocidos → web, sin atribuirlos a Facebook o Instagram por conjetura. platform es opcional si utm_source ya identifica el origen. Solo utm_medium igual a paid, paid_social, social_paid, cpc, ppc o cpm (normalizado) marca K como FALSE; otro medio, ausencia de UTM o solo presencia de IDs no determina organicidad y deja K vacía. Es atribución declarada por el enlace, no verificación de facturación de Meta.

Referencia para revisar las opciones en Meta: [parámetros dinámicos de URL](https://www.facebook.com/business/help/2360940870872492).

## SMTP IONOS

Completar localmente SMTP_USER (buzón completo), SMTP_PASSWORD (contraseña del buzón) y SMTP_FROM (dirección autorizada, sin nombre de presentación). Host smtp.ionos.es, puerto 465, secure=true. LEADS_NOTIFICATION_TO=info@duxbrain.ai ya está configurado. Remitente/destinatario nunca provienen del formulario. Reply-To usa el email validado. El correo incluye academia, todas las UTM, atribución explícita, landing y referencia web_UUID; HTML escapado y versión de texto. Sin acceso a ficheros/URLs, sin logs de credenciales ni datos completos, TLS verificado.

La aceptación SMTP no garantiza bandeja de entrada: revisar también spam. No se ha enviado un correo real. Referencia: [SMTP de Nodemailer](https://nodemailer.com/smtp).

## Redis, estado SMTP y fiabilidad

Configurar Redis persistente compatible con Upstash REST: UPSTASH_REDIS_REST_URL y UPSTASH_REDIS_REST_TOKEN con GET, SET y EVAL. Generar localmente LEADS_HASH_SECRET aleatorio de al menos 32 caracteres. No existe fallback en memoria. La reserva atómica NX por UUID usa HMAC de contenido, estado de recepción y estado técnico notification (`pending`, `sending`, `sent`). Las actualizaciones Lua conservan los otros campos y TTL. `lead_status` en Sheets solo contiene el estado comercial inicial.

Primero se reserva (notification=pending), luego se guarda la fila y se registra state=saved, después se cambia notification=sending y se intenta SMTP. Si SMTP se acepta, notification=sent. Si falla, se intenta conservar notification=pending y se confirma al visitante porque la fila existe. Si Redis falla o el proceso se interrumpe, puede quedar sending o processing: reconciliar, no asumir que no se envió. Ninguno de estos estados se escribe en Sheets.

Mismo UUID/hash guardado confirma sin otra fila/aviso; otro contenido con ese UUID o estado incierto devuelve 409. La fila usa siempre web_UUID. Recargar el formulario puede generar otra intención; no hay deduplicación perfecta ni transacción distribuida entre Sheets/Redis/SMTP. Timeout de Sheets puede haber guardado la fila: no confirmar ni repetir automáticamente, comprobar por web_UUID. No borrar una reserva sin reconciliar primero. Los correos usan Message-ID estable, que no garantiza entrega única.

Redis conserva las reservas/estados 7 días; no contiene academia, email, teléfono ni UTM en claro. Academia/UTM solo están en el correo: si falla SMTP, **no se pueden reconstruir esos campos desde Sheets ni desde Redis**. Si se necesita recuperación íntegra de esa información, acordar una cola cifrada con retención antes de publicar; esta adaptación no añade otro registro de datos personales ni reutiliza columnas.

### Revisión/reintento de avisos (operación interna)

Usar la referencia UUID de los logs seguros y consultar la clave `duxbrain:lead:v1:UUID` mediante una herramienta administrativa de Redis autenticada; para revisión masiva usar SCAN con el prefijo, sin exponer tokens ni publicar endpoint administrativo. Dentro de 7 días, contrastar notification=pending/sending con la fila A=web_UUID y con el buzón remitente/destinatario. No hay columna técnica en Sheets por la que filtrar. Un estado sending puede significar correo aceptado con respuesta perdida.

Si no llegó el aviso, un operador autorizado lo reenvía desde el buzón IONOS a info@duxbrain.ai con el web_UUID y los datos disponibles de la fila; indicar si academia/UTM no son recuperables. No reenviar el formulario ni crear otra fila. Después de confirmar el aviso, actualizar únicamente notification en Redis preservando hash, state y TTL; **no modificar lead_status ni ningún registro de Sheets**. Si Redis no está disponible, usar logs y UUID para reconciliar antes de cualquier reintento. Para volumen alto, preparar worker/cola autenticada con controles por UUID. Nada de esto se ejecuta automáticamente contra cuentas reales en los tests.

## Protección y alojamiento futuro

APP_URL debe ser el origen exacto, sin ruta; localhost:3000 para desarrollo. JSON, Origin exacto, honeypot vacío, cuerpo máximo 8 KiB leído con plazo de 5 s, validación de campos y límites persistentes (5 intentos por IP y 200 globales por ventana de 10 min). Buckets con TTL de 660 s. Ajustar cuotas a la campaña y añadir controles de red/WAF si corresponde.

En producción, LEADS_TRUSTED_IP_HEADER debe identificar una cabecera de IP única sobrescrita por el proxy fiable; no confiar ciegamente en cabeceras del visitante ni listas de IP. En desarrollo puede quedar vacía, usando un bucket local compartido. Copiar secretos al gestor de variables del futuro alojamiento, configurar APP_URL HTTPS final y reiniciar. Runtime Node.js, SMTP saliente 465, función con duración suficiente (maxDuration=120 según soporte del proveedor). Redis 4 s por llamada; Google 8 s con abort a 10 s, sin retry de append; SMTP 12 s global, navegador 100 s. No exportación estática/Edge.

## Pruebas y primera entrega real (todavía no autorizada)

`npm test`, `npm run lint`, `npm run build`. Los tests inyectan Sheets/SMTP/Redis simulados y bloquean red real. Verifican el esquema A:T, vacíos M/N/S, atribución desconocida y pagada, IDs separados de UTM, 20 valores RAW, teléfono texto, web_UUID estable, estado SMTP fuera de Sheets y fallos de servicios. El script de revisión visual también intercepta /api/leads para evitar escrituras con credenciales locales.

Pendiente para la primera prueba real: credenciales y permisos Google, fila de cabeceras verificada, LEADS_INITIAL_STATUS permitido, SMTP y Redis configurados. Antes de habilitar, comprobar nombre/sheetId, cabeceras exactas y compatibilidad del append con la tabla y sus reglas, sin alterar nada. Con autorización expresa de prueba, cambiar el interruptor a true, reiniciar y enviar **una sola** solicitud ficticia identificable; comprobar fila nueva A:T, web_UUID, datos vacíos y notificación por correo, y estado técnico en Redis. Para desarrollo local usar npm run dev (sin cabecera de proxy de producción). Si algo es incierto, conservar referencia y reconciliar antes de repetir. No eliminar filas ficticias sin decisión del propietario.

## Repositorio

origin=https://github.com/Deika79/DuxBrain-Landings.git. Commit y push autorizados para guardar el estado; no autorizan despliegues ni activan envíos. No se usa force push ni reescritura de historial. Revisar diff y exclusión de secretos antes de subir código.
