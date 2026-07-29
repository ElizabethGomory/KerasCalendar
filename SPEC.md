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
- [x] Button component (variants: default, secondary, ghost, outline, link)
- [x] Card component
- [x] Input component
- [x] Label component
- [x] Dialog/Modal component
- [x] Select component
- [x] Toast component
- [x] Avatar component
- [x] DropdownMenu component
- [x] Tabs component
- [x] Utilidad `cn()` para merging de clases
- [x] Tipografía responsiva y tokens visuales completos

### 4. Landing Page y autenticación ✅
- [x] Landing Page con blur background y card flotante
- [x] Card con logo, nombre, descripción, beneficios
- [x] Botones Registrarse / Iniciar sesión
- [x] Login Page con proveedores OAuth
- [x] Email login page con React Hook Form + Zod
- [x] ProtectedRoute component
- [x] Servicio de auth (loginWithOAuth, loginWithEmail, logout)
- [x] Zustand auth store (user, isAuthenticated)
- [x] i18n configurado (es/en)

### 5. Dashboard con calendario personal ✅
- [x] Layout Dashboard + Sidebar flotante glassmorphism
- [x] Sidebar con navegación completa
- [x] Lista de grupos del usuario en sidebar
- [x] Calendario personal (FullCalendar 7)
- [x] Vistas: día, semana, mes, año
- [x] Modal AddActivityModal
- [x] Editar / eliminar actividades (servicios CRUD)
- [x] Persistencia en localStorage

### 6. Gestión de actividades ✅
- [x] Modal "Agregar Calendario"
- [x] Formulario: ubicación (país, ciudad) → timezone automático
- [x] Formulario: título, descripción, categoría
- [x] Etiqueta de flexibilidad (fija, flexible, muy flexible)
- [x] Configuración de repetición
- [x] Selector de horario (desde / hasta)
- [x] Selector de color
- [x] Guardar / Cancelar

### 7. Gestión de grupos y calendario grupal ✅
- [x] Modal "Crear Grupo"
- [x] Formulario: nombre, descripción, plataforma, color
- [x] Generar enlace único de invitación
- [x] Modal "Buscar Grupo" (por nombre o enlace)
- [x] Calendario grupal combinado
- [x] Horarios bloqueados / disponibles / condicionados
- [x] Restricción nocturna 23:00–07:00
- [x] Sidebar muestra "Mis Grupos"

### 8. Algoritmo de disponibilidad ✅
- [x] Convertir actividades a UTC
- [x] Respetar zona horaria de cada usuario
- [x] Excluir período nocturno por usuario
- [x] Construir intervalos de disponibilidad
- [x] Calcular intersección de intervalos
- [x] Detectar conflictos con actividades flexibles
- [x] Clasificar: disponible / condicionado / no disponible
- [x] Recalcular ante cambios

### 9. Votaciones y confirmación ✅
- [x] Sistema de votación (aceptar, rechazar)
- [x] Criterio de aprobación configurable (50% por defecto)
- [x] Confirmación automática de reuniones
- [x] Crear evento grupal
- [x] Actualizar calendarios personales
- [x] Persistencia en localStorage

### 10. Sincronización Google Calendar 🔄
- [x] UI de conexión en SettingsPage
- [ ] Conexión OAuth con Google Calendar API
- [ ] Sincronización bidireccional
- [ ] Exportar eventos a Google Calendar

### 11. Pruebas, optimización y despliegue 🔄
- [ ] Code splitting / Lazy loading (chunk grande de FullCalendar)
- [ ] WCAG AA (aria labels, focus visible, contraste)
- [ ] Navegación por teclado completa
- [ ] Pruebas unitarias
- [ ] Pruebas de integración
- [ ] Optimización de rendimiento
- [ ] Despliegue en Vercel

---

**Leyenda:** ✅ Completado | 🔄 En progreso | ⬜ Pendiente
