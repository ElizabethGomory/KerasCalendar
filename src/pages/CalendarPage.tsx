import { format, endOfMonth, endOfWeek, startOfMonth, startOfWeek } from 'date-fns'
import { CalendarDays } from 'lucide-react'
import { useEffect, useState, type FormEvent } from 'react'
import { NavLink } from 'react-router-dom'
import { CalendarWidget } from '../components/CalendarWidget'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { getAvailabilitySuggestions, type Activity } from '../lib/availability'
import { validateActivity } from '../lib/activityValidation'
import { useAuthStore } from '../store/authStore'

type CalendarFormState = {
  title: string
  category: string
  newCategory: string
  date: string
  start: string
  end: string
  color: string
  repeatDays: string[]
  repeatMonths: number
}

const dayNames = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
const categoryOptions = ['Trabajo', 'Estudio', 'Hobby', 'Familia', 'Tiempo Libre', 'Nueva etiqueta']

const initialForm: CalendarFormState = {
  title: '',
  category: 'Trabajo',
  newCategory: '',
  date: '2026-08-03',
  start: '09:00',
  end: '17:00',
  color: '#ff8a00',
  repeatDays: [],
  repeatMonths: 1,
}

const initialActivities: Activity[] = [
  {
    id: '1',
    title: 'Trabajo',
    category: 'Trabajo',
    description: 'Bloque principal de trabajo',
    date: '2026-08-03',
    start: '09:00',
    end: '17:00',
    color: '#ff8a00',
    flexibility: 'fija',
    recurring: 'none',
  },
  {
    id: '2',
    title: 'Estudio',
    category: 'Estudio',
    description: 'Clase de inglés',
    date: '2026-08-03',
    start: '19:00',
    end: '20:30',
    color: '#f9c74f',
    flexibility: 'flexible',
    recurring: 'weekly',
  },
]

export function CalendarPage() {
  const [activities, setActivities] = useState<Activity[]>(initialActivities)
  const [form, setForm] = useState<CalendarFormState>(initialForm)
  const [message, setMessage] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [suggestions, setSuggestions] = useState<Awaited<ReturnType<typeof getAvailabilitySuggestions>>>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const today = new Date()
  const monthStart = startOfMonth(today)
  const monthEnd = endOfMonth(today)
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 })
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 })
  void calendarStart
  void calendarEnd

  useEffect(() => {
    async function loadSuggestions() {
      try {
        const response = await fetch('/api/availability', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ activities, windowSizeHours: 2 }),
        })
        const data = await response.json()
        setSuggestions(data.slots ? [{ day: data.day, slots: data.slots }] : [])
      } catch (error) {
        setSuggestions(getAvailabilitySuggestions(activities, 2))
      }
    }

    loadSuggestions()
  }, [activities])

  const dayActivities = activities.filter((activity) => activity.date === form.date)

  const openModal = (date?: string) => {
    setMessage('')
    setEditingId(null)
    setForm((current) => ({
      ...initialForm,
      date: date ?? current.date,
    }))
    setIsModalOpen(true)
  }

  const handleEventSelect = (activityId: string) => {
    const activity = activities.find((item) => item.id === activityId)
    if (activity) {
      handleEdit(activity)
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingId(null)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!form.title.trim()) {
      setMessage('El título es obligatorio.')
      return
    }

    const category = form.category === 'Nueva etiqueta' ? (form.newCategory.trim() || 'Nueva etiqueta') : form.category
    const activityDraft: Activity = {
      id: editingId ?? crypto.randomUUID(),
      title: form.title.trim(),
      category,
      description: '',
      date: form.date,
      start: form.start,
      end: form.end,
      color: form.color,
      flexibility: 'flexible',
      recurring: form.repeatDays.length > 0 ? 'weekly' : 'none',
      repeatDays: form.repeatDays,
      repeatMonths: form.repeatMonths,
    }

    const validation = validateActivity(activityDraft, activities)
    if (!validation.valid) {
      setMessage(validation.message)
      return
    }

    setActivities((current) => {
      if (editingId) {
        return current.map((item) => (item.id === editingId ? activityDraft : item))
      }
      return [...current, activityDraft]
    })

    setMessage('Actividad guardada correctamente.')
    setEditingId(null)
    setForm(initialForm)
    setIsModalOpen(false)
  }

  const handleEdit = (activity: Activity) => {
    setEditingId(activity.id)
    setForm({
      title: activity.title,
      category: categoryOptions.includes(activity.category) ? activity.category : 'Nueva etiqueta',
      newCategory: categoryOptions.includes(activity.category) ? '' : activity.category,
      date: activity.date,
      start: activity.start,
      end: activity.end,
      color: activity.color,
      repeatDays: activity.repeatDays ?? [],
      repeatMonths: activity.repeatMonths ?? 1,
    })
    setMessage('Editando actividad.')
    setIsModalOpen(true)
  }

  const handleDelete = (id: string) => {
    setActivities((current) => current.filter((activity) => activity.id !== id))
    setMessage('Actividad eliminada.')
    if (editingId === id) {
      setEditingId(null)
      setForm(initialForm)
    }
  }

  const toggleWeekDay = (day: string) => {
    setForm((current) => {
      const hasDay = current.repeatDays.includes(day)
      return {
        ...current,
        repeatDays: hasDay
          ? current.repeatDays.filter((item) => item !== day)
          : [...current.repeatDays, day],
      }
    })
  }

  const signOut = useAuthStore((state) => state.signOut)

  return (
    <main className="dashboard-shell">
      <section className="dashboard-grid">
        <aside className="sidebar-card">
          <div>
            <p className="eyebrow">Calendario</p>
            <h2>Vista personal</h2>
          </div>
          <nav className="nav-links" aria-label="Navegación del calendario">
            <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'active' : '')}>
              Dashboard
            </NavLink>
            <NavLink to="/calendar" className={({ isActive }) => (isActive ? 'active' : '')}>
              Calendario
            </NavLink>
            <NavLink to="/settings" className={({ isActive }) => (isActive ? 'active' : '')}>
              Configuración
            </NavLink>
            <div className="sidebar-separator" aria-hidden="true" />
            <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'active' : '')}>
              Equipos
            </NavLink>
          </nav>
          <Button type="button" onClick={openModal} className="calendar-add-button">
            Agregar actividad
          </Button>
          <Button variant="ghost" className="logout-button" onClick={signOut}>
            Cerrar sesión
          </Button>
        </aside>

        <div className="content-stack">
          <Card title="Calendario personal" description="Añade actividades y revisa espacios disponibles.">
            <div className="calendar-header">
              <div className="calendar-title-group">
                <CalendarDays size={18} />
                <h3>{format(today, 'MMMM yyyy')}</h3>
              </div>
            </div>
            <CalendarWidget
              activities={activities}
              onDateSelect={(date) => openModal(date)}
              onEventSelect={handleEventSelect}
            />
          </Card>

          <Card title="Actividades" description="Gestiona tus bloques y edita o elimina los que ya no necesites.">
            <div className="activity-list">
              {activities.map((activity) => (
                <div key={activity.id} className="activity-item">
                  <div>
                    <strong>{activity.title}</strong>
                    <p>{activity.date} · {activity.start} - {activity.end}</p>
                  </div>
                  <div className="activity-actions">
                    <Button type="button" size="sm" variant="secondary" onClick={() => handleEdit(activity)}>
                      Editar
                    </Button>
                    <Button type="button" size="sm" variant="ghost" onClick={() => handleDelete(activity.id)}>
                      Eliminar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Sugerencias de disponibilidad" description="Ventanas recomendadas según tus actividades.">
            {suggestions.length === 0 ? <p className="calendar-message">No hay propuestas disponibles todavía.</p> : suggestions.map((suggestion) => (
              <div key={suggestion.day} className="availability-block">
                <h4>{suggestion.day}</h4>
                <ul>
                  {suggestion.slots.map((slot) => (
                    <li key={slot.label}>
                      <span>{slot.label}</span>
                      <strong>{slot.status}</strong>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Card>
        </div>
      </section>

      {isModalOpen ? (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Formulario de edición de actividad" onClick={closeModal}>
          <div className="modal-card-inner" onClick={(event) => event.stopPropagation()}>
            <Card className="modal-card">
              <div className="modal-header">
                <div>
                  <p className="eyebrow">Actividad</p>
                  <h2>{editingId ? 'Editar actividad' : 'Agregar actividad'}</h2>
                </div>
                <button type="button" className="modal-close" onClick={closeModal} aria-label="Cerrar formulario">
                  ✕
                </button>
              </div>

              <form className="activity-form" onSubmit={handleSubmit}>
                {message ? <p className="calendar-message">{message}</p> : null}
                <input
                  aria-label="Título de actividad"
                  placeholder="Título"
                  value={form.title}
                  onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
                />
                <div className="activity-row">
                  <div>
                    <label className="visually-hidden">Etiqueta</label>
                    <select
                      aria-label="Etiqueta"
                      value={form.category}
                      onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))}
                    >
                      {categoryOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    {form.category === 'Nueva etiqueta' ? (
                      <input
                        aria-label="Nueva etiqueta"
                        placeholder="Nombre de etiqueta"
                        value={form.newCategory}
                        onChange={(event) => setForm((current) => ({ ...current, newCategory: event.target.value }))}
                      />
                    ) : null}
                  </div>

                  <div>
                    <label className="visually-hidden">Color</label>
                    <input
                      type="color"
                      aria-label="Color de actividad"
                      className="color-input"
                      value={form.color}
                      onChange={(event) => setForm((current) => ({ ...current, color: event.target.value }))}
                    />
                  </div>
                </div>

                <div className="activity-row">
                  <input
                    aria-label="Fecha"
                    type="date"
                    value={form.date}
                    onChange={(event) => setForm((current) => ({ ...current, date: event.target.value }))}
                  />
                  <div className="calendar-form-row">
                    <input
                      aria-label="Hora de inicio"
                      type="time"
                      value={form.start}
                      onChange={(event) => setForm((current) => ({ ...current, start: event.target.value }))}
                    />
                    <input
                      aria-label="Hora de fin"
                      type="time"
                      value={form.end}
                      onChange={(event) => setForm((current) => ({ ...current, end: event.target.value }))}
                    />
                  </div>
                </div>

                <div className="activity-group">
                  <p className="eyebrow">Repeticiones</p>
                  <div className="day-picker">
                    {dayNames.map((day) => (
                      <label key={day} className={`day-checkbox ${form.repeatDays.includes(day) ? 'selected' : ''}`}>
                        <input
                          type="checkbox"
                          checked={form.repeatDays.includes(day)}
                          onChange={() => toggleWeekDay(day)}
                        />
                        {day}
                      </label>
                    ))}
                  </div>
                  <select
                    aria-label="Meses de repetición"
                    value={form.repeatMonths}
                    onChange={(event) => setForm((current) => ({ ...current, repeatMonths: Number(event.target.value) }))}
                  >
                    {[1, 3, 6, 12].map((months) => (
                      <option key={months} value={months}>
                        {months} {months === 1 ? 'mes' : 'meses'}
                      </option>
                    ))}
                  </select>
                </div>

                {dayActivities.length > 0 ? (
                  <div className="existing-activities">
                    <h3>Actividades existentes</h3>
                    {dayActivities.map((activity) => (
                      <div key={activity.id} className="existing-activity-item">
                        <div>
                          <strong>{activity.title}</strong>
                          <p>{activity.start} - {activity.end}</p>
                        </div>
                        <div className="activity-actions">
                          <Button type="button" size="sm" variant="secondary" onClick={() => handleEdit(activity)}>
                            Editar
                          </Button>
                          <Button type="button" size="sm" variant="ghost" onClick={() => handleDelete(activity.id)}>
                            Eliminar
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}

                <Button type="submit" className="calendar-action">
                  Agregar actividad
                </Button>
              </form>
            </Card>
          </div>
        </div>
      ) : null}
    </main>
  )
}
