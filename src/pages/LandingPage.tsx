import { motion } from 'framer-motion'
import { CalendarDays, ShieldCheck, Sparkles, Users2 } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { useAuthStore } from '../store/authStore'

const providers = ['Google', 'Discord', 'GitHub', 'Email']

export function LandingPage() {
  const signIn = useAuthStore((state) => state.signIn)

  return (
    <main className="landing-shell">
      <motion.section
        className="hero-panel"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="hero-glow" />
        <Card className="hero-card">
          <div className="hero-brand">
            <div className="brand-badge">
              <CalendarDays size={18} />
            </div>
            <div>
              <p className="eyebrow">KerasCalendar</p>
              <h1>Encuentra horarios en minutos, no en mensajes.</h1>
            </div>
          </div>

          <p className="hero-copy">
            Coordina reuniones entre equipos internacionales con disponibilidad privada,
            reglas inteligentes y un calendario claro para cada persona.
          </p>

          <div className="hero-actions">
            <Button onClick={() => signIn('Email')}>Entrar a la demo</Button>
            <Button variant="secondary" onClick={() => signIn('Google')}>
              Crear cuenta
            </Button>
          </div>

          <div className="provider-list" aria-label="Métodos de acceso">
            {providers.map((provider) => (
              <button key={provider} type="button" onClick={() => signIn(provider)}>
                {provider}
              </button>
            ))}
          </div>

          <div className="feature-grid">
            <div className="feature-item">
              <Sparkles size={18} />
              <span>Disponibilidad inteligente</span>
            </div>
            <div className="feature-item">
              <ShieldCheck size={18} />
              <span>Privacidad por defecto</span>
            </div>
            <div className="feature-item">
              <Users2 size={18} />
              <span>Calendarios de equipo</span>
            </div>
          </div>
        </Card>
      </motion.section>
    </main>
  )
}
