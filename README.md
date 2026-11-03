# DuxBrain Landings

Creado con create-next-app@latest, npm, TypeScript, App Router, ESLint, Tailwind y src/. Node 22.15.0 y npm 10.9.2. Git inicializado por el generador. Sin despliegue.

## Estado actual

- Tres landings implementadas: Plugin, Campus y Campus Secure; revisadas visualmente en escritorio y móvil. Capturas completas en docs/capturas/.
- Integración preparada para la pestaña existente CP David Parte 2, sheetId 897385192, con esquema A:T confirmado.
- Entrega real pendiente de configurar y verificar: fila de cabeceras, estado comercial permitido, credenciales/permisos Google, SMTP y Redis.
- LEADS_SHEETS_WRITES_ENABLED=false. El commit y push guardan el código; no activan envíos reales ni autorizan despliegues.
- Logos oficiales todavía ausentes. Revisión comercial pendiente: condiciones de precios, alumno activo, impuestos y alcance de integración y controles de seguridad.

## Uso

`npm ci` para instalar; `npm run dev` para desarrollo. Verificar con `npm run lint` y `npm run build`. Producción local: `npm start`.

Rutas: / (revisión), /plugin, /campus y /campus-secure. Campus Secure es el mismo Campus y precio, con foco en seguridad.

## Estructura

- src/app/layout.tsx: idioma, metadatos base y Bai Jamjuree con next/font/google.
- src/app/globals.css: tokens de marca y diseño mobile first.
- src/app/page.tsx: índice de revisión.
- src/app/{plugin,campus,campus-secure}/page.tsx: páginas y metadatos propios.
- src/components/landing.tsx: Header, Hero, Benefits, VisualDemo, Steps, FAQ, FinalCTA y Footer.
- src/components/lead-form.tsx: formulario conectado al endpoint, bloqueo de doble envío y estados de recepción.
- src/content/landings.ts: contenido separado por landing.
- src/lib/leads.ts: payload, UTM y cliente de POST /api/leads.
- src/app/api/leads/route.ts y src/server/: endpoint Node.js, validación, Sheets, SMTP, Redis y mapeo.
- .env.example: configuración sin secretos.
- docs/configuracion-leads.md: configuración, estructura pendiente y procedimientos operativos.
- tests/leads.spec.ts: pruebas con servicios simulados, sin escrituras ni correos reales.
- public/brand/README.md: instrucciones para logos.

## Dependencias

Aplicación: next, react, react-dom, googleapis y nodemailer. Desarrollo: @playwright/test, @types/nodemailer, @tailwindcss/turbopack, @types/node, @types/react, @types/react-dom, babel-plugin-react-compiler, eslint, eslint-config-next, tailwindcss, typescript. Versiones fijadas en package-lock.json. Sin librerías adicionales de UI, iconos, animación ni formularios.

## Logos

Faltan los PNG oficiales en public/brand/. Se necesitan la variante oscura para fondo claro y la blanca para fondo oscuro (nombres propuestos: duxbrain-logo.png y duxbrain-logo-white.png). Conservar nombres y extensiones reales al integrarlos. Sustituir el nombre en texto en Header, Footer y el índice por el recurso oficial, conservando proporción y texto alternativo. No se ha inventado logo ni favicon.

## Formulario: implementación y activación

POST /api/leads guarda primero en Google Sheets y luego notifica por SMTP IONOS. Si falla SMTP después de guardar, confirma recepción y deja el aviso pendiente. Honeypot, origen permitido, cuerpo de 8 KiB, validación, UUID e idempotencia/límites persistentes mediante Redis REST. No hay éxito simulado ni secretos en cliente.

**Bloqueado hasta configurar**: fila de cabeceras y valor comercial LEADS_INITIAL_STATUS de la pestaña existente CP David Parte 2 (897385192), cuenta de servicio, SMTP y Redis. Nombre y esquema A:T confirmados en código: 20 valores RAW; academia/UTM solo en correo, estado técnico SMTP en Redis. No crear pestañas ni alterar estructura para encajar el código. Copiar .env.example a .env.local sin sobrescribir una configuración existente. Mantener LEADS_SHEETS_WRITES_ENABLED=false hasta verificar la fila/estado y autorizar una prueba real.

Instrucciones completas y limitaciones: [docs/configuracion-leads.md](docs/configuracion-leads.md). `npm test` ejecuta pruebas simuladas; no escribe ni envía emails reales. La entrega con credenciales reales sigue pendiente. La revisión visual histórica y sus capturas preceden esta integración; el script de capturas intercepta ahora /api/leads para impedir envíos reales.

## Antes de publicar

Confirmar condiciones de precio, alumno activo y alcance técnico de integración/controles. Añadir logos y capturas reales: el mockup se identifica como ilustrativo. Configurar canonical/OG cuando exista dominio definitivo.

npm audit detectó 16 avisos moderados en dependencias de desarrollo ESLint/minimatch. npm audit --omit=dev devuelve 0 vulnerabilidades. No se aplicó audit fix --force.

Revisión visual completada con Playwright y Chrome de Windows tras fallar la conexión al navegador integrado. Se añadió @playwright/test como dependencia de desarrollo. Informe y enlaces a las seis capturas: [docs/revision-visual.md](docs/revision-visual.md). Para repetir: `node scripts/review-landings.mjs` con el servidor local activo en el puerto 3000.
