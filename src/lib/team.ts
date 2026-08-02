export type TeamMember = {
  id: string
  name: string
  role: string
  availability: 'Disponible' | 'Disponible condicionado' | 'Ocupado'
}

export type Team = {
  id: string
  name: string
  description: string
  color: string
  platform: string
  members: TeamMember[]
  inviteLink: string
  votingRule: 'unanimity' | 'majority' | 'quorum'
}

export function createTeamDraft() {
  return {
    name: '',
    description: '',
    color: '#7dd3fc',
    platform: 'Slack',
    inviteLink: `https://calendar.app/invite/${Math.random().toString(36).slice(2, 8)}`,
  }
}

export function getTeamDecisionLabel(rule: Team['votingRule']) {
  switch (rule) {
    case 'majority':
      return 'Mayoría simple'
    case 'quorum':
      return 'Quórum configurable'
    default:
      return 'Unanimidad'
  }
}
