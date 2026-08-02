# TODO – Checklist de tareas pendientes

## 1. Configuración inicial
- [x] Crear repositorio Git y habilitar CI (GitHub Actions gratuito).
- [x] Inicializar proyecto con Vite + React + TypeScript.
- [x] Configurar Tailwind CSS y ShadCN UI.
- [x] Añadir dependencias: React Router, TanStack Query, React Hook Form, Zod, Zustand, date‑fns, i18next, Framer Motion, Lucide React, FullCalendar.
- [x] Configurar ESLint + Prettier (estilo de código).

## 2. Design System
- [x] Definir tokens de color (paleta principal, CTA, sombras, backgrounds transparentes).
- [x] Definir tipografía (Google Font: Inter o Outfit).
- [x] Crear componentes base: Button, Card, Modal, Input, Select, Tooltip, Avatar.
- [x] Implementar variantes de botones (CTA, secundario, deshabilitado).
- [x] Añadir animaciones de entrada/salida con Framer Motion (<300 ms).

## 3. Landing Page & Auth
- [x] Diseñar Landing Page con glassmorphism y card central.
- [x] Implementar flujo de acceso demo con múltiples proveedores y sesión persistida.
- [x] Gestionar sesión en Zustand y persistir en localStorage.

> Avance actual: autenticación demo funcional con persistencia local y transición entre landing y dashboard.

## 4. Dashboard y Sidebar
- [x] Crear Sidebar flotante, colapsable, con Glassmorphism.
- [x] Añadir enlaces: Dashboard, Calendario, Equipos, Configuración, Perfil, Logout.
- [x] Mostrar lista de grupos bajo el Sidebar.

> Avance actual: el dashboard ya muestra grupos de ejemplo dentro del panel lateral.

## 5. Calendario personal
- [x] Integrar FullCalendar con vistas diaria, semanal, mensual, anual.
- [x] Implementar CRUD de actividades (título, categoría, flexibilidad, color, recurrencia, rango horario).
- [x] Validar horarios nocturnos (23:00‑07:00) y evitar solapamientos.
- [ ] Opcional: sincronización con Google Calendar (API gratuito bajo cuota).

> Avance actual: ya está integrada una vista real de FullCalendar con eventos renderizados, creación, edición, eliminación y validación de solapamientos.

## 6. Algoritmo de disponibilidad
- [x] Crear lógica de disponibilidad local que:
  - Excluya descanso nocturno local.
  - Calcule intervalos libres.
  - Marque horarios "Disponible" y "Disponible condicionado".
- [x] Consumir esta lógica desde la UI y presentar propuestas.
- [x] Crear endpoint `/api/availability` (Vercel Serverless) para migrar la lógica a backend.

> Avance actual: se añadió una lógica local de sugerencias de disponibilidad en la UI con estados visuales para las ventanas recomendadas y pruebas que cubren el comportamiento principal.

## 7. Gestión de equipos y calendario grupal
- [x] Implementar creación de equipos (nombre, descripción, color, plataforma).
- [x] Añadir invitaciones mediante enlace único.
- [x] Mostrar resumen de calendario grupal con miembros y reglas de votación.
- [x] Respetar privacidad por defecto en la experiencia de la demo.

## 8. Votación y confirmación de reuniones
- [x] Permitir a cada integrante aceptar, rechazar o proponer alternativa.
- [x] Definir criterios de aprobación (unanimidad, mayoría, quórum configurable).
- [x] Crear flujo visual de confirmación y votación de reuniones en el dashboard.

## 9. Administración y permisos
- [x] Definir reglas de permisos visibles en la experiencia de equipo.
- [x] Mostrar el rol del creador y los miembros en la UI.

## 10. Accesibilidad y pruebas
- [x] Mejorar accesibilidad básica con foco visible, roles y etiquetas ARIA.
- [x] Añadir pruebas unitarias (Vitest).
- [x] Añadir pruebas de integración (Cypress).

> Avance actual: se añadió una prueba unitaria para la lógica de disponibilidad con Vitest.

## 11. Despliegue
- [x] Configurar estructura base para despliegue con Vercel y API serverless.
- [x] Asegurar variables de entorno seguras en la estructura del proyecto.
- [x] Verificar que la app compila en producción.
- [x] Desplegar la app en producción en Vercel.

---
*Esta checklist está basada en el SPEC.md generado y sigue la filosofía Spec‑Driven Development.*
