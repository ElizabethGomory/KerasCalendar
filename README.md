# KerasCalendar

KerasCalendar es una experiencia de producto para coordinar reuniones y disponibilidad entre equipos, con un calendario personal, sugerencias inteligentes y un flujo básico de equipos y votación.

## Funcionalidades actuales
- Landing con acceso demo y persistencia de sesión
- Dashboard con resumen de equipos y reuniones
- Calendario personal con creación, edición y eliminación de actividades
- Validación de solapamientos y horarios nocturnos
- Sugerencias de disponibilidad con API serverless
- Panel de equipos y votación de reuniones

## Desarrollo local
```bash
npm install
npm run dev
```

## Pruebas y build
```bash
npm test
npm run build
npm run test:e2e
```

## Variables de entorno
Copia .env.example a .env.local y ajusta los valores si necesitas integrar un entorno real.

## Despliegue
El proyecto está preparado para desplegarse en Vercel, incluyendo una ruta de API en api/availability.ts.

