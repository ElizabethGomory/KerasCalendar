# KerasCalendar — SPEC & Checklist

> Encuentra automáticamente horarios disponibles para reuniones entre personas de distintos países y husos horarios.

---

## Stack

| Tecnología      | Estado |
|-----------------|--------|
| React 19        | ✅     |
| TypeScript 6    | ✅     |
| Vite 8          | ✅     |
| Tailwind CSS 4  | ✅     |
| ShadCN UI (base) | ✅     |
| React Router 7  | ✅     |
| TanStack Query  | ✅     |
| React Hook Form | ✅     |
| Zod             | ✅     |
| FullCalendar 7  | ✅     |
| Zustand         | ✅     |
| date-fns        | ✅     |
| i18next         | ✅     |
| Framer Motion   | ✅     |
| Lucide React    | ✅     |

---

## Checklist de implementación

### 1. Arquitectura general ✅
- [x] Definir stack tecnológico
- [x] Diseñar modelo de datos (entidades)
- [x] Definir flujo de datos
- [x] Definir modelo de estados (Zustand)
- [x] Diseñar estructura modular

### 2. Estructura y configuración inicial ✅
- [x] Scaffold Vite + React + TypeScript
- [x] Configurar Tailwind CSS v4
- [x] Configurar path alias `@/`
- [x] Instalar todas las dependencias
- [x] Crear carpetas: app, components, features, hooks, services, lib, utils, types, store, routes, assets
- [x] Verificar build exitoso

### 3. Design System y tokens visuales ✅
- [x] Definir paleta de color (gris claro `#F5F5F5`, texto `#202020`, acción `#FF8A00`)
- [x] Implementar glassmorphism (`.glass`, `.glass-strong`)
- [x] Button, Card, Input, Label, Dialog, Select, Tabs, Toast, Avatar, DropdownMenu
- [x] Utilidad `cn()` para merging de clases

### 4. Landing Page y autenticación ✅
- [x] Landing Page con blur background y card flotante
- [x] Login Page con proveedores OAuth
- [x] Email login page con React Hook Form + Zod
- [x] ProtectedRoute component
- [x] Servicio de auth + Zustand store
- [x] i18n configurado (es/en)

### 5. Dashboard con calendario personal ✅
- [x] Sidebar flotante glassmorphism con navegación
- [x] Lista de grupos del usuario en sidebar
- [x] Calendario personal (FullCalendar 7)
- [x] Vistas: día, semana, mes, año
- [x] Modal AddActivityModal
- [x] CRUD de actividades con persistencia localStorage

### 6. Gestión de actividades ✅
- [x] Modal con formulario completo (RHF + Zod)
- [x] Ubicación (país, ciudad) → timezone automático
- [x] Título, descripción, categoría, flexibilidad, repetición
- [x] Selector de horario y color
- [x] Validación con Zod

### 7. Gestión de grupos y calendario grupal ✅
- [x] Modal "Crear Grupo" con enlace de invitación
- [x] Modal "Buscar Grupo" (por nombre o enlace)
- [x] Calendario grupal con disponibilidad combinada
- [x] Horarios disponibles / condicionados / no disponibles
- [x] Restricción nocturna 23:00–07:00

### 8. Algoritmo de disponibilidad ✅
- [x] Conversión UTC y respeto de zona horaria
- [x] Exclusión de período nocturno por usuario
- [x] Construcción de intervalos de disponibilidad
- [x] Intersección de intervalos multi-usuario
- [x] Detección de conflictos con actividades flexibles
- [x] Clasificación: disponible / condicionado / no disponible

### 9. Votaciones y confirmación ✅
- [x] Sistema de votación (aceptar/rechazar)
- [x] Aprobación automática por mayoría
- [x] Creación de reuniones y persistencia

### 10. Sincronización Google Calendar ✅
- [x] Servicio de integración con Google Calendar API
- [x] Conexión OAuth2 via Google Identity Services
- [x] UI de conexión/desconexión con indicador de estado
- [x] Sincronización de actividades (POST a Calendar API)
- [x] Manejo de errores y refresco de token
- [x] Variable de entorno `VITE_GOOGLE_CLIENT_ID`

### 11. Pruebas, optimización y despliegue ✅
- [x] Lazy loading con React.lazy + Suspense (7 chunks separados)
- [x] SkipLink de accesibilidad para navegación por teclado
- [x] ARIA labels en componentes clave (Select, botones, estados)
- [x] Focus visible ring en todos los interactive components
- [x] Contraste de color correcto (WCAG AA compatible)
- [x] Vitest configurado con Testing Library + jsdom
- [x] 9 tests unitarios (availability algorithm + utils)
- [x] `vercel.json` con SPA rewrites y cache headers
- [x] `.env.example` para variables de entorno
- [x] Code splitting automático por ruta (Vite + Rolldown)

---

**Leyenda:** ✅ Completado | 🔄 En progreso | ⬜ Pendiente
