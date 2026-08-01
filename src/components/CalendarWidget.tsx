import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import timeGridPlugin from '@fullcalendar/timegrid'
import { useMemo } from 'react'
import type { CalendarActivity } from '../types/calendar'

type Props = {
  activities: CalendarActivity[]
}

export function CalendarWidget({ activities }: Props) {
  const events = useMemo(
    () =>
      activities.map((activity) => ({
        id: activity.id,
        title: `${activity.title} · ${activity.category}`,
        start: `${activity.date}T${activity.start}`,
        end: `${activity.date}T${activity.end}`,
        backgroundColor: activity.color,
        borderColor: activity.color,
        textColor: '#111111',
      })),
    [activities],
  )

  return (
    <div className="fullcalendar-shell">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,listWeek',
        }}
        events={events}
        selectable
        editable
        height="auto"
      />
    </div>
  )
}
