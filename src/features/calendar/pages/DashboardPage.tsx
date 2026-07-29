import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/react/daygrid'
import timeGridPlugin from '@fullcalendar/react/timegrid'
import interactionPlugin from '@fullcalendar/react/interaction'
import listPlugin from '@fullcalendar/react/list'
import esLocale from '@fullcalendar/react/locales/es'
import '@fullcalendar/react/skeleton.css'
import '@fullcalendar/react/themes/classic/theme.css'
import '@fullcalendar/react/themes/classic/palette.css'
import { Button } from '@/components/ui/button'
import { AddActivityModal } from '@/features/calendar/components/AddActivityModal'
import { fetchActivities } from '@/services/activities'
import { useCalendarStore } from '@/store'
import type { Activity } from '@/types'

export function DashboardPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const activities = useCalendarStore((s) => s.activities)

  useEffect(() => {
    fetchActivities()
  }, [])

  const events = activities.map((a: Activity) => ({
    id: a.id,
    title: a.title,
    start: `2026-07-28T${a.startTime}:00`,
    end: `2026-07-28T${a.endTime}:00`,
    backgroundColor: a.color,
    borderColor: a.color,
    textColor: '#202020',
    classNames: ['rounded-lg', 'shadow-sm'],
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
          <h1 className="text-2xl font-bold text-keras-text">Dashboard</h1>
          <p className="text-sm text-keras-text/60">Gestiona tu disponibilidad y calendario</p>
        </div>
        <Button onClick={() => setModalOpen(true)}>
          Agregar Actividad
        </Button>
      </div>

      <div className="glass flex-1 rounded-2xl p-4 overflow-auto">
        <Calendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
          locale={esLocale}
          initialView="dayGridMonth"
          weekends
          events={events}
          height="auto"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listYear',
          }}
        />
      </div>

      <AddActivityModal open={modalOpen} onOpenChange={setModalOpen} />
    </motion.div>
  )
}
