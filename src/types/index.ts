export type OAuthProvider = 'google' | 'discord' | 'github' | 'facebook' | 'email'

export type ActivityCategory =
  | 'work'
  | 'study'
  | 'hobby'
  | 'religion'
  | 'family'
  | 'food'
  | 'event'
  | 'other'

export type RepeatType = 'none' | 'daily' | 'specific_days' | 'weekly' | 'monthly' | 'annual'

export type FlexibilityLevel = 'fixed' | 'flexible' | 'very_flexible'

export type Platform = 'zoom' | 'meet' | 'discord' | 'slack' | 'teams' | 'other'

export type AvailabilityStatus = 'available' | 'conditioned' | 'unavailable'

export type VoteValue = 'accept' | 'reject' | 'alternative'

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  oauthProvider: OAuthProvider
  timezone: string
  createdAt: string
  updatedAt: string
}

export interface Activity {
  id: string
  userId: string
  title: string
  description?: string
  category: ActivityCategory
  flexibility: FlexibilityLevel
  repeat: RepeatType
  specificDays?: number[]
  startTime: string
  endTime: string
  color: string
  timezone: string
  isGoogleSynced: boolean
  createdAt: string
  updatedAt: string
}

export interface Group {
  id: string
  name: string
  description?: string
  platform: Platform
  color: string
  ownerId: string
  createdAt: string
  updatedAt: string
}

export interface GroupMember {
  id: string
  groupId: string
  userId: string
  personalColor: string
  joinedAt: string
}

export interface Invitation {
  id: string
  groupId: string
  code: string
  createdBy: string
  expiresAt: string
  createdAt: string
}

export interface Meeting {
  id: string
  groupId: string
  title: string
  startTime: string
  endTime: string
  status: 'pending' | 'confirmed' | 'cancelled'
  createdBy: string
  createdAt: string
  updatedAt: string
}

export interface Vote {
  id: string
  meetingId: string
  userId: string
  value: VoteValue
  alternativeStartTime?: string
  alternativeEndTime?: string
  createdAt: string
}

export interface AvailabilitySlot {
  startTime: string
  endTime: string
  status: AvailabilityStatus
}

export interface UserSettings {
  id: string
  userId: string
  nightStart: string
  nightEnd: string
  language: string
  googleSyncEnabled: boolean
  googleCalendarId?: string
  updatedAt: string
}
