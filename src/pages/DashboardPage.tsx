import { motion } from 'framer-motion'
import { CalendarClock, LogOut, Sparkles, Users2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { useAuthStore } from '../store/authStore'

export function DashboardPage() {
  const { userName, signOut } = useAuthStore((state) => ({
    userName: state.userName,
    signOut: state.signOut,
  }))

  return (
    <main className="dashboard-shell">
      <motion.section
        className="dashboard-grid"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <aside className="sidebar-card">
          <div>
            <p className="eyebrow">Panel</p>
            <h2>Tu espacio de trabajo</h2>
          </div>
          <nav className="nav-links">
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/calendar">Calendario</Link>
            <Link to="/dashboard">Equipos</Link>
            <Link to="/dashboard">Configuración</Link>
          </nav>
          <div className="group-list">
            <p className="eyebrow">Grupos</p>
            <ul>
              <li>Equipo Diseño</li>
              <li>Product Squad</li>
              <li>Planeación</li>
            </ul>
          </div>
          <Button variant="ghost" className="logout-button" onClick={signOut}>
            <LogOut size={16} /> Cerrar sesión
          </Button>
        </aside>

        <div className="content-stack">
          <Card title={`Hola, ${userName ?? 'usuario'}`} description="Tu siguiente propuesta de reunión está lista para revisar.">
            <div className="metric-row">
              <div className="metric-pill">
                <Sparkles size={16} />
                <span>3 ventanas de reunión</span>
              </div>
              <div className="metric-pill">
                <Users2 size={16} />
                <span>2 equipos activos</span>
              </div>
            </div>
          </Card>

          <div className="dashboard-cards">
            <Card title="Calendario personal" description="Bloqueos y disponibilidad resumidos.">
              <div className="event-list">
                <div className="event-item">
                  <CalendarClock size={16} />
                  <span>Trabajo · 09:00 - 17:00</span>
                </div>
                <div className="event-item">
                  <CalendarClock size={16} />
                  <span>Estudio · 20:00 - 21:30</span>
                </div>
              </div>
            </Card>
            <Card title="Propuesta recomendada" description="El mejor slot de la semana según tus reglas.">
              <p className="proposal-text">Jueves · 18:30 - 19:30 · Disponible condicionado</p>
            </Card>
          </div>
        </div>
      </motion.section>
    </main>
  )
}
