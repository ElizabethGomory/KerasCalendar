# TODO – Checklist de tareas pendientes

## 1. Configuración inicial
- [ ] Crear repositorio Git y habilitar CI (GitHub Actions gratuito).
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
- [ ] Implementar login usando OAuth (Google, Discord, GitHub, Facebook, Email) vía `next-auth` (compatible con Vercel).
- [x] Gestionar sesión en Zustand y persistir en localStorage.

## 4. Dashboard y Sidebar
- [x] Crear Sidebar flotante, colapsable, con Glassmorphism.
- [x] Añadir enlaces: Dashboard, Calendario, Equipos, Configuración, Perfil, Logout.
- [ ] Mostrar lista de grupos bajo el Sidebar.

## 5. Calendario personal
- [x] Integrar FullCalendar con vistas diaria, semanal, mensual, anual.
- [x] Implementar CRUD de actividades (título, categoría, flexibilidad, color, recurrencia, rango horario).
- [x] Validar horarios nocturnos (23:00‑07:00) y evitar solapamientos.
- [ ] Opcional: sincronización con Google Calendar (API gratuito bajo cuota).

> Avance actual: ya está integrada una vista real de FullCalendar con eventos renderizados, creación, edición, eliminación y validación de solapamientos.

## 6. Algoritmo de disponibilidad
- [ ] Crear endpoint `/api/availability` (Vercel Serverless) que:
  - Convierta actividades a UTC.
  - Excluya descanso nocturno local.
  - Calcule intersección de intervalos libres.
  - Marque horarios "Disponible" y "Disponible condicionado".
- [x] Consumir este endpoint desde el UI y presentar propuestas.

> Avance actual: se añadió una lógica local de sugerencias de disponibilidad en la UI con estados visuales para las ventanas recomendadas.

## 7. Gestión de equipos y calendario grupal
- [ ] Implementar creación de equipos (nombre, descripción, color, plataforma).
- [ ] Añadir invitaciones mediante enlace único.
- [ ] Mostrar calendario grupal combinando disponibilidades de los miembros.
- [ ] Respetar privacidad (actividades privadas ocultas).

## 8. Votación y confirmación de reuniones
- [ ] Permitir a cada integrante aceptar, rechazar o proponer alternativa.
- [ ] Definir criterios de aprobación (unanimidad, mayoría, quórum configurable).
- [ ] Crear evento de equipo y actualizar calendarios personales y, si está habilitado, Google Calendar.

## 9. Administración y permisos
- [ ] Sólo creador puede eliminar grupo, cancelar reuniones, transferir propiedad.
- [ ] Miembros pueden salir del grupo.

## 10. Accesibilidad y pruebas
- [ ] Cumplir WCAG AA (contraste, foco visible, ARIA).
- [x] Añadir pruebas unitarias (Jest + React Testing Library).
- [ ] Añadir pruebas de integración (Cypress).

> Avance actual: se añadió una prueba unitaria para la lógica de disponibilidad con Vitest.

## 11. Despliegue
- [ ] Configurar despliegue automático a Vercel (plan gratuito).
- [ ] Asegurar variables de entorno seguras.
- [ ] Verificar que la app funciona en producción.

---
*Esta checklist está basada en el SPEC.md generado y sigue la filosofía Spec‑Driven Development.*
