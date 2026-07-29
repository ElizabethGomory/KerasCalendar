import type { Group, GroupMember, Invitation } from '@/types'
import { useGroupStore } from '@/store'

const GROUPS_KEY = 'keras-groups'
const MEMBERS_KEY = 'keras-members'
const INVITES_KEY = 'keras-invites'

function loadGroups(): Group[] {
  try {
    return JSON.parse(localStorage.getItem(GROUPS_KEY) || '[]')
  } catch { return [] }
}

function saveGroups(groups: Group[]) {
  localStorage.setItem(GROUPS_KEY, JSON.stringify(groups))
  useGroupStore.getState().setGroups(groups)
}

function loadMembers(): GroupMember[] {
  try {
    return JSON.parse(localStorage.getItem(MEMBERS_KEY) || '[]')
  } catch { return [] }
}

function saveMembers(members: GroupMember[]) {
  localStorage.setItem(MEMBERS_KEY, JSON.stringify(members))
}

function loadInvites(): Invitation[] {
  try {
    return JSON.parse(localStorage.getItem(INVITES_KEY) || '[]')
  } catch { return [] }
}

function saveInvites(invites: Invitation[]) {
  localStorage.setItem(INVITES_KEY, JSON.stringify(invites))
}

export function generateInviteCode(): string {
  return crypto.randomUUID().slice(0, 8)
}

export async function fetchGroups(): Promise<Group[]> {
  const groups = loadGroups()
  useGroupStore.getState().setGroups(groups)
  return groups
}

export async function createGroup(data: Omit<Group, 'id' | 'ownerId' | 'createdAt' | 'updatedAt'> & { userId: string }): Promise<{ group: Group; invite: Invitation }> {
  const group: Group = {
    ...data,
    ownerId: data.userId,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  const groups = [...loadGroups(), group]
  saveGroups(groups)

  const member: GroupMember = {
    id: crypto.randomUUID(),
    groupId: group.id,
    userId: data.userId,
    personalColor: data.color,
    joinedAt: new Date().toISOString(),
  }
  saveMembers([...loadMembers(), member])

  const invite: Invitation = {
    id: crypto.randomUUID(),
    groupId: group.id,
    code: generateInviteCode(),
    createdBy: data.userId,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
  }
  saveInvites([...loadInvites(), invite])

  return { group, invite }
}

export async function getGroupByCode(code: string): Promise<Group | null> {
  const invites = loadInvites()
  const invite = invites.find((i) => i.code === code)
  if (!invite) return null
  const groups = loadGroups()
  return groups.find((g) => g.id === invite.groupId) || null
}

export async function getGroupBySlug(name: string): Promise<Group | null> {
  const groups = loadGroups()
  return groups.find((g) => g.name.toLowerCase().includes(name.toLowerCase())) || null
}

export async function joinGroup(groupId: string, userId: string): Promise<void> {
  const members = loadMembers()
  if (members.some((m) => m.groupId === groupId && m.userId === userId)) return
  saveMembers([...members, {
    id: crypto.randomUUID(),
    groupId,
    userId,
    personalColor: '#FF8A00',
    joinedAt: new Date().toISOString(),
  }])
}

export async function fetchUserGroups(userId: string): Promise<Group[]> {
  const members = loadMembers().filter((m) => m.userId === userId)
  const groups = loadGroups()
  return groups.filter((g) => members.some((m) => m.groupId === g.id))
}
