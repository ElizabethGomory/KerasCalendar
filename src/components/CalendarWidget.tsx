import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import { useMemo, useRef, useState } from 'react'
import type { CalendarActivity } from '../types/calendar'
import esLocale from '@fullcalendar/core/locales/es'

type Props = {
  activities: CalendarActivity[]
  onDateSelect?: (date: string) => void
  onEventSelect?: (activityId: string) => void
}

const dayNames = ['Dom', 'Lun', 'Mar', 'Miér', 'Jue', 'Vie', 'Sáb']
const viewLabels: Record<string, string> = {
  dayGridMonth: 'Mes',
  timeGridWeek: 'Semana',
  year: 'Anual',
}

export function CalendarWidget({ activities, onDateSelect, onEventSelect }: Props) {
  const calendarRef = useRef<any>(null)
  const [currentTitle, setCurrentTitle] = useState('')
  const [selectedView, setSelectedView] = useState('Mes')

  const events = useMemo(
    () =>
      activities.map((activity) => ({
        id: activity.id,
        title: activity.title,
        start: `${activity.date}T${activity.start}`,
        end: `${activity.date}T${activity.end}`,
        backgroundColor: activity.color,
        borderColor: activity.color,
        textColor: '#111111',
      })),
    [activities],
  )

  const viewMap: Record<string, string> = {
    Mes: 'dayGridMonth',
    Semana: 'timeGridWeek',
    Anual: 'year',
  }

  const changeView = (value: string) => {
    const calendarApi = calendarRef.current?.getApi()
    if (!calendarApi) return

    if (value === 'Hoy') {
      calendarApi.today()
      calendarApi.changeView('dayGridMonth')
      setSelectedView('Mes')
      return
    }

    calendarApi.changeView(viewMap[value] ?? 'dayGridMonth')
    setSelectedView(value)
  }

  return (
    <div className="fullcalendar-shell">
      <div className="calendar-topbar">
        <div className="calendar-title">{currentTitle}</div>
        <div className="calendar-nav">
          <button type="button" className="calendar-nav-button" onClick={() => calendarRef.current?.getApi().prev()}>
            Anterior
          </button>
          <button type="button" className="calendar-nav-button" onClick={() => calendarRef.current?.getApi().next()}>
            Siguiente
          </button>
        </div>
        <div className="calendar-view-select">
          <select value={selectedView} onChange={(event) => changeView(event.target.value)}>
            <option>Mes</option>
            <option>Semana</option>
            <option>Hoy</option>
            <option>Anual</option>
          </select>
        </div>
      </div>

      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale={esLocale}
        locales={[esLocale]}
        headerToolbar={false}
        views={{
          year: {
            type: 'dayGrid',
            duration: { years: 1 },
            buttonText: 'Anual',
          },
          timeGridWeek: {
            slotLabelFormat: { hour: '2-digit', minute: '2-digit', hour12: false },
            slotMinTime: '00:00:00',
            slotMaxTime: '23:00:00',
          },
        }}
        dayHeaderContent={(arg) => {
          const label = dayNames[arg.date.getDay()]
          if (arg.view.type === 'timeGridWeek') {
            return <div>{`${label} ${arg.date.getDate()}`}</div>
          }
          return <div>{label}</div>
        }}
        eventDisplay="block"
        displayEventTime={false}
        events={events}
        selectable
        dateClick={(arg) => onDateSelect?.(arg.dateStr)}
        eventClick={(arg) => {
          arg.jsEvent.preventDefault()
          onEventSelect?.(arg.event.id)
        }}
        editable
        height="auto"
        datesSet={(arg) => {
          setCurrentTitle(arg.view.title)
          setSelectedView(viewLabels[arg.view.type] ?? selectedView)
        }}
      />
    </div>
  )
}
