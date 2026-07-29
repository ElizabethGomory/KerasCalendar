import type { Meeting, Vote, VoteValue } from '@/types'

const MEETINGS_KEY = 'keras-meetings'
const VOTES_KEY = 'keras-votes'

function loadMeetings(): Meeting[] {
  try { return JSON.parse(localStorage.getItem(MEETINGS_KEY) || '[]') } catch { return [] }
}

function saveMeetings(meetings: Meeting[]) {
  localStorage.setItem(MEETINGS_KEY, JSON.stringify(meetings))
}

function loadVotes(): Vote[] {
  try { return JSON.parse(localStorage.getItem(VOTES_KEY) || '[]') } catch { return [] }
}

function saveVotes(votes: Vote[]) {
  localStorage.setItem(VOTES_KEY, JSON.stringify(votes))
}

export async function createMeeting(data: Omit<Meeting, 'id' | 'createdAt' | 'updatedAt'>): Promise<Meeting> {
  const meeting: Meeting = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  saveMeetings([...loadMeetings(), meeting])
  return meeting
}

export async function castVote(meetingId: string, userId: string, value: VoteValue, alternativeStart?: string, alternativeEnd?: string): Promise<Vote> {
  const votes = loadVotes()
  const existing = votes.findIndex((v) => v.meetingId === meetingId && v.userId === userId)
  const vote: Vote = {
    id: existing >= 0 ? votes[existing].id : crypto.randomUUID(),
    meetingId,
    userId,
    value,
    alternativeStartTime: alternativeStart,
    alternativeEndTime: alternativeEnd,
    createdAt: existing >= 0 ? votes[existing].createdAt : new Date().toISOString(),
  }
  if (existing >= 0) votes[existing] = vote
  else votes.push(vote)
  saveVotes(votes)

  const meetings = loadMeetings()
  const meeting = meetings.find((m) => m.id === meetingId)
  if (meeting) {
    const allVotes = votes.filter((v) => v.meetingId === meetingId)
    const membersCount = 3
    const approvalThreshold = Math.ceil(membersCount * 0.5)
    const accepted = allVotes.filter((v) => v.value === 'accept').length

    if (accepted >= approvalThreshold) {
      meeting.status = 'confirmed'
      meeting.updatedAt = new Date().toISOString()
      saveMeetings(meetings)
    }
  }

  return vote
}

export async function getMeetingVotes(meetingId: string): Promise<Vote[]> {
  return loadVotes().filter((v) => v.meetingId === meetingId)
}

export async function fetchGroupMeetings(groupId: string): Promise<Meeting[]> {
  return loadMeetings().filter((m) => m.groupId === groupId)
}
