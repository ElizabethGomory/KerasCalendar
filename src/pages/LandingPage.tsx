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
        aria-label="Bienvenida a KerasCalendar"
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
            Coordina reuniones de forma más inteligente: convierte tus bloques de agenda en una experiencia de disponibilidad compartida, con reglas de privacidad, equipo y decisión colectiva.
          </p>

          <div className="hero-actions" role="group" aria-label="Acciones principales">
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
              <span>Equipos y reuniones</span>
            </div>
          </div>

          <div className="hero-note">
            <strong>Listo para presentar</strong>
            <span>Diseño orientado a producto, flujo demo completo y base preparada para integración real.</span>
          </div>
        </Card>
      </motion.section>
    </main>
  )
}
