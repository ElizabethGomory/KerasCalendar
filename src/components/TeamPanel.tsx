import { useMemo, useState } from 'react'
import { Users2, Link2, Vote } from 'lucide-react'
import { Button } from './ui/Button'
import { Card } from './ui/Card'
import { createTeamDraft, getTeamDecisionLabel, type Team } from '../lib/team'

type TeamPanelProps = {
  teams: Team[]
  onCreateTeam: (team: Team) => void
}

export function TeamPanel({ teams, onCreateTeam }: TeamPanelProps) {
  const [draft, setDraft] = useState(createTeamDraft())
  const [message, setMessage] = useState('')

  const teamSummary = useMemo(() => {
    return teams.map((team) => ({
      ...team,
      decisionLabel: getTeamDecisionLabel(team.votingRule),
    }))
  }, [teams])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!draft.name.trim()) {
      setMessage('El nombre del equipo es obligatorio.')
      return
    }

    onCreateTeam({
      id: crypto.randomUUID(),
      name: draft.name.trim(),
      description: draft.description.trim() || 'Equipo creado desde la demo',
      color: draft.color,
      platform: draft.platform,
      inviteLink: draft.inviteLink,
      votingRule: 'majority',
      members: [
        { id: '1', name: 'Marta', role: 'Creadora', availability: 'Disponible' },
        { id: '2', name: 'Leo', role: 'Product', availability: 'Disponible condicionado' },
      ],
    })

    setDraft(createTeamDraft())
    setMessage('Equipo creado correctamente.')
  }

  return (
    <Card title="Equipos y reuniones" description="Crea grupos, comparte enlaces y define cómo se aprobarán las reuniones.">
      <form className="calendar-form" onSubmit={handleSubmit}>
        {message ? <p className="calendar-message">{message}</p> : null}
        <input
          aria-label="Nombre del equipo"
          placeholder="Nombre del equipo"
          value={draft.name}
          onChange={(event) => setDraft((current) => ({ ...current, name: event.target.value }))}
        />
        <input
          aria-label="Descripción del equipo"
          placeholder="Descripción"
          value={draft.description}
          onChange={(event) => setDraft((current) => ({ ...current, description: event.target.value }))}
        />
        <select
          aria-label="Plataforma"
          value={draft.platform}
          onChange={(event) => setDraft((current) => ({ ...current, platform: event.target.value }))}
        >
          <option>Slack</option>
          <option>Discord</option>
          <option>Teams</option>
          <option>WhatsApp</option>
        </select>
        <div className="team-actions">
          <Button type="submit" size="sm">
            <Users2 size={16} /> Crear equipo
          </Button>
        </div>
      </form>

      <div className="team-list">
        {teamSummary.map((team) => (
          <div key={team.id} className="team-card">
            <div className="team-card-header">
              <span className="team-dot" style={{ background: team.color }} />
              <div>
                <strong>{team.name}</strong>
                <p>{team.description}</p>
              </div>
            </div>
            <div className="team-meta">
              <span><Link2 size={14} /> {team.platform}</span>
              <span><Vote size={14} /> {team.decisionLabel}</span>
            </div>
            <div className="team-members">
              {team.members.map((member) => (
                <span key={member.id}>{member.name} · {member.availability}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
