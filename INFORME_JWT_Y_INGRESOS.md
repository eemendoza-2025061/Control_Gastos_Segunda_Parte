# Informe: Tokens JWT e Implementación de Ingresos

**Fecha:** 01/09/2026
**Autor:** eemendoza-2025061

---

## 1) ¿Qué es un token JWT y de qué depende?

Un **JWT (JSON Web Token)** es como un "carnet de identidad" digital firmado que se le entrega al usuario tras iniciar sesión. El frontend lo guarda y lo envía en cada petición; el backend lo verifica para saber quién es el usuario sin consultar la base de datos en cada request.

Está formado por **3 partes** (separadas por puntos):

1. **Header** → indica el algoritmo de firma utilizado (HS256).
2. **Payload** → los datos del usuario: `{ id, email, role }`.
3. **Firma** → se calcula combinando header + payload + un **secreto**.

**De qué depende el token en este proyecto:**

| Dependencia | Dónde se define | Valor |
|---|---|---|
| Secreto (`config.jwt.secret`) | `backend/src/config/env.ts` | `JWT_SECRET` (default `'admin'`) |
| Tiempo de expiración | `backend/src/config/env.ts` | `JWT_EXPIRES_IN` (default `'20m'`) |
| Datos del payload | `backend/src/utils/jwt.util.ts` | `id`, `email`, `role` |
| Librería que firma/verifica | dependencia `jsonwebtoken` | versión 9.x |

Los valores se leen de variables de entorno (`.env`) con un valor por defecto definido en código.

---

## 2) Backend — ¿cómo está implementado el token?

**Flujo completo del login:**

```
POST /api/auth/login
   │  body: { email, password }
   ▼
Controller  →  backend/src/controllers/auth.controller.ts
   │  (valida que lleguen email y password)
   ▼  backend/src/services/auth.service.ts
   │  1) Busca el usuario por email (repositorio → PostgreSQL)
   │  2) bcrypt.compare(password, user.password) → verifica la contraseña
   │  3) generateToken(user) → firma el JWT
   ▼  backend/src/utils/jwt.util.ts
jwt.sign(payload, secret, { expiresIn: '20m' })
   ▼
Respuesta: { token, user (sin password) }
```

**Archivos clave:**

- `utils/jwt.util.ts` → **genera** el token: `jwt.sign(payload, config.jwt.secret, { expiresIn })`.
- `middlewares/auth.middleware.ts` → **verifica** el token en cada ruta protegida. Lee el header `Authorization: Bearer <token>` y ejecuta `jwt.verify(...)`. Si la firma o la expiración fallan → `401 Token inválido o expirado`.
- `routes/auth.routes.ts` → `/login`, `/logout` (sin estado) y `/me` (protegida con el middleware).
- `controllers/auth.controller.ts` → recibe las peticiones y responde JSON.
- `services/auth.service.ts` → lógica de negocio: verifica credenciales con **bcryptjs** (nunca se comparan contraseñas en texto plano) y responde `{ token, user }` eliminando el password.
- `config/env.ts` → lee el secreto y la expiración del entorno.

Detalles de seguridad: mensaje genérico "Credenciales inválidas" (no se revela si el email existe) y nunca se devuelve la contraseña en ninguna respuesta.

---

## 3) Frontend — ¿cómo se maneja el token?

**Archivos clave:**

- `core/services/auth.service.ts` → corazón del auth en Angular:
  - `login()` hace `POST /api/auth/login`; si es exitoso **guarda el token en `localStorage`** (clave `'token'`) y el usuario en un `BehaviorSubject`.
  - `scheduleLogout()` **decodifica el payload del JWT** (parte central), lee `exp` y programa un temporizador para cerrar sesión automáticamente cuando expira.
  - `logout()` borra el token y redirige a `/login`.
  - Al arrancar la app (`checkTokenAndLoadUser`) se valida con `GET /api/auth/me` para restaurar el usuario tras recargar la página.
- `core/interceptors/auth.interceptor.ts` → agrega automáticamente a cada petición HTTP el header `Authorization: Bearer <token>`.
- `core/interceptors/auth-error.interceptor.ts` → si alguna petición devuelve `401`, cierra la sesión y redirige al login con el mensaje "Tu sesión ha expirado".
- `core/guards/auth.guard.ts` → protege rutas: sin token no se puede acceder a `/dashboard` ni `/incomes`; redirige a `/login`.
- `config/app.config.ts` → registra los interceptores con `provideHttpClient(withInterceptors([...]))`.
- `environments/environment.ts` → URL de la API: `http://localhost:3000/api`.

**Ciclo completo del token:**

```
Login → backend firma JWT → frontend lo guarda en localStorage
   ↓
Cada petición: el interceptor agrega "Authorization: Bearer <token>"
   ↓
Backend: el middleware auth.middleware verifica firma + expiración
   ↓
Si expira: 401 → el interceptor cierra sesión → vuelve al login
```

---

## 4) Lo implementado hoy: página de Ingresos (frontend)

### Objetivo
El ítem "Ingresos" del menú lateral no llevaba a ninguna página. Se creó la página de Ingresos reutilizando el diseño del dashboard (mismo sidebar, mismos colores dark mode y la central `#8b5cf6`), con funcionalidad real en el navegador.

### Archivos involucrados

| Archivo | Qué se hizo |
|---|---|
| `frontend/src/app/features/auth/incomes/incomes.component.ts` | **Nuevo.** Página completa (standalone, HTML y CSS inline, mismo estilo del dashboard). |
| `frontend/src/app/app.routes.ts` | Se agregó la ruta `/incomes` (protegida con `authGuard`). |
| `frontend/src/app/features/auth/dashboard/dashboard.component.ts` | Navegación al menú, "Total de ingresos" calculado y sección "Meta de ahorros" conectada a los datos reales. Moneda en quetzales `Q`. |
| `frontend/pnpm-workspace.yaml` | Configuración de `allowBuilds` para que `ng serve`/`ng build` instalen las dependencias nativas correctamente. |
| `database/init.sql` | Se agregó la tabla `incomes` lista para PostgreSQL. |

### Cómo funciona (por ahora con `localStorage`)
- Al abrir la página, `loadIncomes()` lee de `localStorage` la clave **`lumina_ingresos`** (con 3 registros de ejemplo si está vacía).
- **Agregar Ingreso**: el formulario captura descripción, monto, tipo (Fijo/Variable) y fecha; al enviar agrega el registro y **lo persiste en `localStorage`**.
- **Editar** y **Eliminar**: botones de lápiz y basurero por fila (`editIncome()` / `deleteIncome()`).
- Las tarjetas "Fijos/Variables Totales" y el "Total de ingresos" se recalculan solos mediante *getters* (`fijosTotal`, `variablesTotal`).
- El buscador filtra la tabla con `filteredIncomes`.
- **Sección de Ahorros** (dentro de la misma página): tarjetas "Total Ahorros" y "Meta de Ahorro", formulario "Registrar Ahorro" (categorías Emergencia/Inversión/Retiro) e historial. Persisten en `lumina_ahorros`.
- La **barra de progreso de la meta de ahorro** vive en el dashboard, leyendo los mismos datos (`ahorrosTotal` vs. meta `10000`).
- **Moneda:** todo se muestra en quetzales `Q` (método `money()`).

### Punto importante para la explicación
Hoy los datos de ingresos/ahorros se guardan en `localStorage` del navegador. La tabla `incomes` quedó definida en `init.sql`; el siguiente paso natural es crear los endpoints `GET/POST/PUT/DELETE /api/incomes` (protegidos con `authenticateJWT`) y reemplazar `localStorage` por llamadas HTTP para persistir en PostgreSQL.

---

## 5) Posibles preguntas del profesor + respuestas

- **¿Qué son los tokens?** Credenciales firmadas (JWT) que permiten identificar al usuario en peticiones posteriores sin mantener sesión en el servidor.
- **¿De qué dependía el token aquí?** De tres cosas: un secreto (`JWT_SECRET`), un tiempo de vida (`expiresIn: 20m`) y los datos del payload (id, email, role). Lo firma la librería `jsonwebtoken`.
- **¿Dónde se guarda?** En el `localStorage` del navegador, clave `'token'`.
- **¿Cómo se envía en cada petición?** Header `Authorization: Bearer <token>`, inyectado por el interceptor de Angular (`auth.interceptor.ts`).
- **¿Cómo se valida en el servidor?** El middleware `authenticateJWT` ejecuta `jwt.verify(token, secret)` en cada ruta protegida.
- **¿Cómo expira?** El backend fija 20 minutos al firmar; además el frontend decodifica el payload y programa un temporizador para cerrar sesión al expirar.
- **¿Las contraseñas viajan en texto plano?** No; se comparan contra el hash con `bcryptjs` y nunca se devuelven en las respuestas.
- **¿El módulo de Ingresos está conectado a PostgreSQL?** Hoy usa `localStorage`; la tabla ya está en `init.sql` y el siguiente paso es crear los endpoints protegidos por token.

---

## 6) Configuración del entorno (contexto general)

- Backend: Express + TypeScript + PostgreSQL (puerto 3000).
- Frontend: Angular 19 standalone + pnpm.
- Rama de trabajo: `emendoza-2025061`.
- Credenciales de prueba (seed en `init.sql` certificadas con bcrypt):
  - `admin@example.com` / rol `admin`
  - `user@example.com` / rol `user`