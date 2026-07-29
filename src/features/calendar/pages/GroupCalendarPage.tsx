import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { motion } from 'framer-motion'
import { Calendar } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/react/daygrid'
import timeGridPlugin from '@fullcalendar/react/timegrid'
import interactionPlugin from '@fullcalendar/react/interaction'
import esLocale from '@fullcalendar/react/locales/es'
import '@fullcalendar/react/skeleton.css'
import '@fullcalendar/react/themes/classic/theme.css'
import '@fullcalendar/react/themes/classic/palette.css'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuthStore, useGroupStore } from '@/store'
import { fetchGroupMeetings, createMeeting, castVote } from '@/services/meetings'
import { calculateAvailability } from '@/services/availability'
import { useCalendarStore } from '@/store'
import type { Meeting, Group, AvailabilitySlot } from '@/types'

export function GroupCalendarPage() {
  const { groupId } = useParams<{ groupId: string }>()
  const user = useAuthStore((s) => s.user)
  const activities = useCalendarStore((s) => s.activities)
  const [meetings, setMeetings] = useState<Meeting[]>([])
  const [availability, setAvailability] = useState<AvailabilitySlot[]>([])
  const [group, setGroup] = useState<Group | null>(null)

  useEffect(() => {
    if (!groupId || !user) return
    const groups = useGroupStore.getState().groups
    setGroup(groups.find((g) => g.id === groupId) || null)
    fetchGroupMeetings(groupId).then(setMeetings)
  }, [groupId, user])

  useEffect(() => {
    if (!user) return
    const userSchedule = {
      userId: user.id,
      timezone: user.timezone,
      activities,
    }
    const result = calculateAvailability([userSchedule])
    setAvailability(result)
  }, [activities, user])

  const proposeMeeting = async () => {
    if (!groupId || !user || availability.length === 0) return
    const slot = availability[0]
    await createMeeting({
      groupId,
      title: `Reunión - ${group?.name || 'Grupo'}`,
      startTime: slot.startTime,
      endTime: slot.endTime,
      status: 'pending',
      createdBy: user.id,
    })
    const updated = await fetchGroupMeetings(groupId)
    setMeetings(updated)
  }

  const handleVote = async (meetingId: string, value: 'accept' | 'reject') => {
    if (!user) return
    await castVote(meetingId, user.id, value)
    const updated = await fetchGroupMeetings(groupId!)
    setMeetings(updated)
  }

  const availabilityEvents = availability.map((slot, i) => ({
    id: `avail-${i}`,
    title: slot.status === 'available' ? 'Disponible' : slot.status === 'conditioned' ? 'Condicionado' : 'No disponible',
    start: `2026-07-28T${slot.startTime}:00`,
    end: `2026-07-28T${slot.endTime}:00`,
    backgroundColor: slot.status === 'available' ? '#22c55e' : slot.status === 'conditioned' ? '#f59e0b' : '#ef4444',
    borderColor: 'transparent',
    textColor: '#fff',
    classNames: ['rounded-lg'],
  }))

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="flex h-full flex-col"
    >
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-keras-text">
            {group?.name || 'Calendario Grupal'}
          </h1>
          <p className="text-sm text-keras-text/60">
            Disponibilidad combinada del grupo
          </p>
        </div>
        <Button onClick={proposeMeeting}>Proponer Reunión</Button>
      </div>

      <div className="glass flex-1 rounded-2xl p-4 overflow-auto mb-4">
        <Calendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          locale={esLocale}
          initialView="timeGridDay"
          weekends
          events={availabilityEvents}
          height="auto"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'timeGridDay,timeGridWeek',
          }}
          slotMinTime="07:00:00"
          slotMaxTime="23:00:00"
        />
      </div>

      {meetings.length > 0 && (
        <div className="grid gap-3">
          <h2 className="text-lg font-semibold text-keras-text">Reuniones</h2>
          {meetings.map((meeting) => (
            <Card key={meeting.id} className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-sm">{meeting.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <span className="text-sm text-keras-text/60">
                  {meeting.startTime} - {meeting.endTime}
                  <span className={`ml-2 inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                    meeting.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                    meeting.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {meeting.status === 'confirmed' ? 'Confirmada' :
                     meeting.status === 'cancelled' ? 'Cancelada' : 'Pendiente'}
                  </span>
                </span>
                {meeting.status === 'pending' && (
                  <div className="flex gap-2">
                    <Button size="sm" variant="secondary" onClick={() => handleVote(meeting.id, 'accept')}>
                      Aceptar
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => handleVote(meeting.id, 'reject')}>
                      Rechazar
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </motion.div>
  )
}
