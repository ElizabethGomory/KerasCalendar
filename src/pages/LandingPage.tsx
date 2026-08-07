import { motion } from 'framer-motion'
import { CalendarDays } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { useAuthStore } from '../store/authStore'

export function LandingPage() {
  const signIn = useAuthStore((state) => state.signIn)

  return (
    <main className="landing-shell">
      <motion.section
        className="hero-panel"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        aria-label="Bienvenida a KerasCalendar"
      >
        <Card className="hero-card">
          <div className="hero-brand">
            <div className="brand-badge">
              <CalendarDays size={18} />
            </div>
            <div>
              <p className="eyebrow">KerasCalendar</p>
              <h1>Organiza tu agenda y reuniones internacionales con claridad.</h1>
            </div>
          </div>

          <p className="hero-copy">
            Keras Calendar simplifica tu trabajo global con una agenda personal clara, coordinación entre equipos de distintos países y un flujo que funciona con cualquier huso horario.
          </p>

          <ul className="feature-list">
            <li>Organizar la agenda personal</li>
            <li>Organizar reuniones internacionales</li>
            <li>Encontrar horarios compatibles entre equipos de distintos países</li>
            <li>Trabajar correctamente sin importar el huso horario</li>
          </ul>

          <div className="hero-actions" role="group" aria-label="Acciones principales">
            <Button onClick={() => signIn('Email')}>Entrar a la demo</Button>
            <Button variant="secondary" onClick={() => signIn('Google')}>
              Crear cuenta
            </Button>
          </div>
        </Card>
      </motion.section>
    </main>
  )
}
