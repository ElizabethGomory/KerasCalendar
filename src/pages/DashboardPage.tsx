import { motion } from 'framer-motion'
import { CalendarClock, Link2, LogOut, Users2, Vote } from 'lucide-react'
import { useMemo, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { MeetingDecisionPanel } from '../components/MeetingDecisionPanel'
import { TeamPanel } from '../components/TeamPanel'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import type { Team } from '../lib/team'
import { useAuthStore } from '../store/authStore'

const initialTeams: Team[] = [
  {
    id: 'team-1',
    name: 'Equipo de Diseño',
    description: 'Revisión de propuesta visual y feedback semanal.',
    color: '#ff8a00',
    platform: 'Slack',
    inviteLink: 'https://calendar.app/invite/abc123',
    votingRule: 'majority',
    members: [
      { id: '1', name: 'Marta', role: 'Creadora', availability: 'Disponible' },
      { id: '2', name: 'Leo', role: 'Product', availability: 'Disponible condicionado' },
    ],
  },
  {
    id: 'team-2',
    name: 'Equipo de Producto',
    description: 'Planificación de entregas y dudas de producto.',
    color: '#7dd3fc',
    platform: 'Discord',
    inviteLink: 'https://calendar.app/invite/xyz789',
    votingRule: 'quorum',
    members: [
      { id: '3', name: 'Nora', role: 'PM', availability: 'Disponible' },
      { id: '4', name: 'Dani', role: 'Engineering', availability: 'Ocupado' },
    ],
  },
]

export function DashboardPage() {
  const userName = useAuthStore((state) => state.userName)
  const signOut = useAuthStore((state) => state.signOut)
  const [teams, setTeams] = useState<Team[]>(initialTeams)

  const summary = useMemo(() => {
    return teams.map((team) => ({
      ...team,
      memberCount: team.members.length,
    }))
  }, [teams])

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
            <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'active' : '')}>
              Dashboard
            </NavLink>
            <NavLink to="/calendar" className={({ isActive }) => (isActive ? 'active' : '')}>
              Calendario
            </NavLink>
            <NavLink to="/settings" className={({ isActive }) => (isActive ? 'active' : '')}>
              Configuración
            </NavLink>
            <div className="sidebar-separator" aria-hidden="true" />
            <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'active' : '')}>
              Equipos
            </NavLink>
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
                <span>3 ventanas de reunión</span>
              </div>
              <div className="metric-pill">
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

          <div className="team-summary-grid">
            {summary.map((team) => (
              <Card key={team.id} title={team.name} description={team.description}>
                <div className="team-summary-list">
                  <span><Users2 size={14} /> {team.memberCount} miembros</span>
                  <span><Link2 size={14} /> {team.platform}</span>
                  <span><Vote size={14} /> {team.votingRule === 'quorum' ? 'Quórum configurable' : 'Mayoría simple'}</span>
                </div>
              </Card>
            ))}
          </div>

          <TeamPanel teams={teams} onCreateTeam={(team) => setTeams((current) => [team, ...current])} />
          <MeetingDecisionPanel />
        </div>
      </motion.section>
    </main>
  )
}
