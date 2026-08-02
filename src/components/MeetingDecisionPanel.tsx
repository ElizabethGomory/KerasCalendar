import { useMemo, useState } from 'react'
import { CheckCircle2, CircleOff, MessageSquareMore } from 'lucide-react'
import { Button } from './ui/Button'
import { Card } from './ui/Card'

type Vote = {
  member: string
  decision: 'Accept' | 'Reject' | 'Alternative'
}

export function MeetingDecisionPanel() {
  const [votes, setVotes] = useState<Vote[]>([
    { member: 'Marta', decision: 'Accept' },
    { member: 'Leo', decision: 'Alternative' },
  ])
  const [message, setMessage] = useState('Reunión propuesta para mañana a las 18:30.')

  const summary = useMemo(() => {
    const accepts = votes.filter((vote) => vote.decision === 'Accept').length
    const rejects = votes.filter((vote) => vote.decision === 'Reject').length
    const alternatives = votes.filter((vote) => vote.decision === 'Alternative').length
    return { accepts, rejects, alternatives }
  }, [votes])

  const handleVote = (decision: Vote['decision']) => {
    setVotes((current) => [...current, { member: 'Tú', decision }])
    setMessage(`Voto registrado: ${decision === 'Accept' ? 'Aceptar' : decision === 'Reject' ? 'Rechazar' : 'Proponer alternativa'}.`)
  }

  return (
    <Card title="Decisiones de reunión" description="Cada integrante puede aceptar, rechazar o proponer alternativa.">
      <div className="calendar-message">{message}</div>
      <div className="vote-summary">
        <div><CheckCircle2 size={16} /> Aceptan: {summary.accepts}</div>
        <div><CircleOff size={16} /> Rechazan: {summary.rejects}</div>
        <div><MessageSquareMore size={16} /> Alternativas: {summary.alternatives}</div>
      </div>
      <div className="activity-actions">
        <Button type="button" size="sm" onClick={() => handleVote('Accept')}>Aceptar</Button>
        <Button type="button" size="sm" variant="secondary" onClick={() => handleVote('Reject')}>Rechazar</Button>
        <Button type="button" size="sm" variant="ghost" onClick={() => handleVote('Alternative')}>Alternativa</Button>
      </div>
    </Card>
  )
}
