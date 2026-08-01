# Prompt maestro para IA de desarrollo (Spec-Driven Development)

---

## Rol

Actúa como un **Staff Software Engineer**, **UX/UI Designer Senior** y **Tech Lead** especializado en **Spec-Driven Development**, arquitectura escalable y aplicaciones SaaS.

Debes diseñar e implementar una aplicación completa utilizando las mejores prácticas de ingeniería de software.

### Stack obligatorio

* React 19
* TypeScript
* Vite
* Tailwind CSS
* ShadCN UI
* React Router
* TanStack Query
* React Hook Form
* Zod
* FullCalendar (o alternativa equivalente moderna)
* Zustand para estado global
* date-fns
* i18next preparado para internacionalización
* Framer Motion para animaciones
* Lucide React para iconografía

El proyecto será desplegado posteriormente en **Vercel**, por lo que toda la arquitectura debe ser compatible con este entorno.

---

# Filosofía del desarrollo

No escribas código improvisado.

Antes de generar cualquier componente:

1. Analiza todos los requerimientos.
2. Diseña la arquitectura.
3. Divide el proyecto en módulos.
4. Diseña el flujo de datos.
5. Diseña el modelo de estados.
6. Diseña el modelo de base de datos.
7. Diseña las entidades.
8. Diseña el flujo UX.
9. Diseña el diseño responsive.
10. Recién después comienza la implementación.

Todo el desarrollo debe seguir el paradigma **Spec-Driven Development**.

Cada decisión debe justificarse técnicamente.

No omitas archivos.

No simplifiques funcionalidades.

Si una funcionalidad requiere múltiples componentes, créalos.

---

# Objetivo del proyecto

Desarrollar una plataforma web que permita encontrar automáticamente horarios disponibles para reuniones entre personas de distintos países y distintos husos horarios.

El sistema deberá resolver uno de los principales problemas de los equipos internacionales:

* diferentes zonas horarias
* horarios laborales
* horarios de estudio
* hobbies
* tiempo en familia
* descanso
* tiempo libre

La plataforma analizará automáticamente la disponibilidad de todos los integrantes para sugerir horarios óptimos de reunión.

---

# Concepto del producto

La plataforma funciona como un organizador inteligente de disponibilidad.

Cada usuario carga sus actividades personales.

Las actividades privadas nunca son visibles para otros usuarios.

El sistema únicamente utiliza esa información para bloquear horarios.

Los demás integrantes únicamente visualizarán:

"No disponible"

o

"Disponible"

Nunca visualizarán el motivo.

---

# Diseño UI

El estilo visual debe ser completamente minimalista.

Inspiración:

* Apple
* Linear
* Arc Browser
* Notion
* Raycast

No utilizar interfaces sobrecargadas.

Debe transmitir tranquilidad.

---

# Estilo visual

Utilizar Glassmorphism moderno.

Características:

* fondos translúcidos
* blur de fondo
* sombras suaves, sutiles
* bordes apenas visibles
* profundidad mediante capas
* esquinas semi redondeadas
* animaciones suaves

---

# Paleta

Color principal:

Gris muy claro

```
#F5F5F5
```

Texto:

```
#202020
```

Cards:

```
rgba(255,255,255,.35)
backdrop-filter: blur(25px)
```

Sombras:

Muy suaves.

---

## Color de acción

Todo CTA debe ser naranja.

```
#FF8A00
```

Hover:

```
#FF9F26
```

---

# Responsive

Desktop Full HD como diseño principal.

Debe ocupar toda la pantalla.

También debe adaptarse correctamente a:

* notebook
* celular

El responsive debe diseñarse desde el inicio.

No como adaptación posterior.

---

# Landing Page

La primera vez que un visitante ingresa visualizará:

Pantalla completa.

De fondo:

La plataforma abierta.

Pero desenfocada.

Debe verse un calendario vacío.

Todo el fondo estará desenfocado mediante blur.

En el centro aparecerá una card flotante (no difuminada).

La card contendrá:

* logo
* nombre
* breve descripción
* beneficios
* botón Registrarse
* botón Iniciar sesión

---

# Login

Login moderno.

Opciones:

* Google
* Discord
* GitHub
* Facebook
* Email

---

# Primera pantalla del usuario

Al ingresar por primera vez:

Mostrar un calendario vacío.

Mes actual.

Año actual.

No habrá actividades.

---

# Sidebar

Sidebar flotante, colapsable.

Glassmorphism.

Contendrá:

Dashboard

Agregar Calendario

Crear Equipo 

Buscar Equipo

Configuración

Perfil

Cerrar sesión

Debajo aparecerá la lista de grupos del usuario.

Si supera la altura disponible:

scroll interno.

---

# Agregar Calendario

Al seleccionar esta opción se abrirá un modal centrado.

El formulario permitirá ingresar:

## Ubicación (solo la primera vez, luego dará por sentada el time zone del usuario)

* País
* Ciudad

El sistema obtendrá automáticamente:

* Timezone IANA

Ejemplo

America/Argentina/Salta

---

## Actividad

Cada actividad tendrá:



Título/Categoría

Categorías iniciales:

Trabajo

Estudio

Hobby

Religión

Familia

Comida

Evento

Tiempo Libre

Otra

---

Descripción: (es opcional)

---

## Etiqueta de flexibilidad

Agregar un atributo específico para indicar si una actividad puede desplazarse.

No utilizar simplemente un booleano.

Diseñar un modelo extensible que permita distintos niveles de flexibilidad.

Ejemplo conceptual:

* Fija (no puede moverse)
* Flexible (puede moverse)

El sistema utilizará esta información para calcular propuestas de reunión.

---

## Repetición

Permitir:

No repetir

Todos los días

Días específicos

Semanal

Mensual

Anual

---

## Horario

Desde

Hasta

---

## Color

Cada actividad puede tener su propio color.

---

## Color para reuniones

El usuario podrá elegir un color distinto para representar reuniones en su calendario personal.

Este color es completamente privado.

No afecta al resto.

---

## Acciones

Guardar

Cancelar

Agregar Actividad 

---

# Calendario personal

Debe ofrecer vistas:

Diaria

Semanal

Mensual

Anual

Todas las actividades son editables.

Todas son eliminables.

---

# Google Calendar

Cada usuario puede decidir si sincroniza o no sus actividades.

La sincronización debe ser opcional.

---

# Crear Equipo

Formulario con:

Nombre

Descripción

Plataforma

Ejemplos

Zoom

Meet

Discord

Slack

Teams

Otro

---

Color principal del equipo. (etiquetas)

Cada miembro podrá cambiar únicamente su representación personal.

---

Invitación

Generar enlace único.

Copiar enlace.

---

# Buscar equipo

Modal flotante.

Permitir:

Buscar por nombre.

Buscar pegando un enlace.

---

# Calendario grupal

Esta es la característica principal.

El sistema combinará todos los calendarios.

Nunca mostrará actividades privadas.

Solo calculará disponibilidad:

- por horarios vacíos
- por Actividad: "Tiempo Libre"


---

## Horarios bloqueados

Si un usuario está ocupado:

Ese horario queda bloqueado.

No se explica el motivo.

---

## Horarios posibles

Si todos están libres:

Se resaltan.

---

## Horarios condicionados

Si únicamente existen conflictos con actividades flexibles:

Mostrar ese horario como:

Disponible condicionado.

Color diferente.

---

Al usuario cuya actividad sea flexible le aparecerá una notificación.

Opciones:

Mover actividad

Recordarme luego

Ignorar

---

# Restricción nocturna

No proponer reuniones entre:

23:00

y

07:00

según el horario local de cada integrante.

El algoritmo debe convertir automáticamente todos los horarios.

Ejemplo:

Argentina

España

Brasil

Japón

Estados Unidos

Siempre respetando el descanso nocturno de cada participante.

---

# Votación

Los horarios posibles podrán votarse.

Cada integrante:

Acepta

Rechaza

Propone alternativa

Una vez alcanzado el criterio de aprobación definido por el grupo (configurable, por ejemplo unanimidad o mayoría), la reunión quedará confirmada.

---

# Confirmación

Cuando una reunión quede aprobada:

Crear automáticamente:

Evento de equipo

Actualizar todos los calendarios personales.

Actualizar el calendario grupal.

Si el usuario activó sincronización:

Agregar también el evento a Google Calendar.

---

# Nombre del evento

```
Reunión - Nombre del equipo
```

---

# Administración del equipo

Solo el creador puede:

Eliminar grupo

Cancelar reuniones

---

Puede además:

Transferir propiedad.

Salir del grupo.

---

Los demás usuarios únicamente podrán:

Salir del grupo.

---

# Privacidad

Nunca mostrar actividades personales.

Nunca mostrar horarios privados.

Nunca mostrar categorías.

Solo disponibilidad.

---

# Animaciones

Utilizar Framer Motion.

Animaciones:

Fade

Scale

Blur

Slide

Duración inferior a 300 ms.

---

# Accesibilidad

Cumplir WCAG AA.

Navegación por teclado.

ARIA labels.

Contraste correcto.

Focus visible.

---

# Arquitectura

Separar en módulos:

```
/app

/components

/features

/auth

/calendar

/groups

/users

/settings

/hooks

/services

/lib

/utils

/types

/store

/routes

/assets
```
"Si estas carpetas se pueden unir o modificar para una organización más simple, hazlo"
---

# Base de datos (modelo conceptual)

Diseñar entidades para:

Usuario

Actividad

Equipo

Miembro

Invitación

Reunión

Votación

Disponibilidad

Configuración

Sincronización

Zona horaria

---

# Algoritmo de disponibilidad

El algoritmo debe:

1. Convertir todas las actividades al mismo estándar temporal (UTC).
2. Respetar la zona horaria de cada usuario.
3. Excluir automáticamente el período de descanso (23:00–07:00 local).
4. Construir intervalos de disponibilidad por participante.
5. Calcular la intersección de los intervalos disponibles.
6. Detectar conflictos con actividades flexibles.
7. Clasificar los resultados en:

   * Disponible.
   * Disponible condicionado.
   * No disponible.

8. Mostrar las propuestas convertidas nuevamente al horario local de cada usuario.
9. Recalcular automáticamente ante cualquier modificación de una actividad o de la composición del grupo.

---

# Buenas prácticas

* Código modular y desacoplado.
* Componentes reutilizables.
* Tipado estricto.
* Sin lógica de negocio en los componentes de UI.
* Arquitectura escalable.
* Lazy Loading.
* Code Splitting.
* Manejo centralizado de errores.
* Variables de entorno.
* Preparado para pruebas unitarias e integración.
* Optimización de rendimiento y accesibilidad.

---

# Orden de implementación

No desarrolles todo en un único paso. Sigue esta secuencia:

1. Definir la arquitectura general del proyecto.
2. Crear la estructura de carpetas y configuración inicial.
3. Implementar el sistema de diseño (Design System) y los tokens visuales.
4. Construir la Landing Page y la autenticación.
5. Desarrollar el Dashboard con el calendario personal.
6. Implementar la gestión de actividades y disponibilidad.
7. Desarrollar la gestión de grupos y el calendario grupal.
8. Implementar el algoritmo de cálculo de disponibilidad.
9. Añadir el sistema de votaciones y confirmación de reuniones.
10. Integrar la sincronización con Google Calendar.
11. Incorporar pruebas, optimización, accesibilidad y preparación para despliegue en Vercel.

**No avances al siguiente paso hasta que el anterior esté completamente implementado, validado y documentado.**
