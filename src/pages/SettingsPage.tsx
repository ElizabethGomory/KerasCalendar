import { useState } from 'react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { useAuthStore } from '../store/authStore'

const languages = ['Español', 'English', 'Français']
const timezones = ['America/Argentina/Buenos_Aires', 'America/Bogota', 'Europe/Madrid', 'Europe/London']
const fonts = [
  'Inter',
  'Nunito',
  'Roboto',
  'Poppins',
  'Open Sans',
  'Lato',
  'Source Sans Pro',
  'Work Sans',
  'Manrope',
  'Jakarta Sans',
]

export function SettingsPage() {
  const userName = useAuthStore((state) => state.userName)
  const timezone = useAuthStore((state) => state.timezone)
  const setTimezone = useAuthStore((state) => state.setTimezone)
  const [language, setLanguage] = useState(languages[0])
  const [font, setFont] = useState(fonts[0])
  const [sidebarColor, setSidebarColor] = useState('#ff8a00')
  const [backgroundColor, setBackgroundColor] = useState('#f5f5f5')

  const handleBackgroundChange = (value: string) => {
    setBackgroundColor(value)
    const isDark = parseInt(value.slice(1), 16) < 0x888888
    document.documentElement.style.setProperty('--bg', isDark ? '#0f172a' : 'linear-gradient(135deg, #f5f5f5 0%, #f8efe8 100%)')
    document.documentElement.style.setProperty('--text', isDark ? '#ffffff' : '#202020')
    document.documentElement.style.setProperty('--text-strong', isDark ? '#ffffff' : '#141414')
    document.documentElement.style.setProperty('--sidebar-bg', isDark ? 'rgba(15, 23, 42, 0.85)' : 'rgba(255, 255, 255, 0.58)')
    document.documentElement.style.setProperty('--surface', isDark ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.9)')
    document.documentElement.style.setProperty('--surface-border', isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.7)')
  }

  const handleSidebarColor = (value: string) => {
    setSidebarColor(value)
    document.documentElement.style.setProperty('--sidebar-bg', value)
    document.documentElement.style.setProperty('--surface', `${value}1a`)
    document.documentElement.style.setProperty('--surface-border', `${value}33`)
  }

  return (
    <main className="dashboard-shell">
      <section className="dashboard-grid">
        <aside className="sidebar-card">
          <div>
            <p className="eyebrow">Perfil</p>
            <h2>{userName ?? 'Usuario'}</h2>
          </div>
          <Card title="Perfil" description="Gestiona tus datos y preferencias personales.">
            <div className="settings-field">
              <label>Idioma</label>
              <select value={language} onChange={(event) => setLanguage(event.target.value)}>
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>
            <div className="settings-field">
              <label>Zona horaria</label>
              <select value={timezone ?? timezones[0]} onChange={(event) => setTimezone(event.target.value)}>
                {timezones.map((zone) => (
                  <option key={zone} value={zone}>
                    {zone}
                  </option>
                ))}
              </select>
            </div>
          </Card>
          <Card title="Apariencia" description="Ajusta modo y acento visual.">
            <div className="settings-field">
              <label>Modo</label>
              <div className="mode-buttons">
                <Button type="button" size="sm" variant="secondary" onClick={() => handleBackgroundChange('#f5f5f5')}>
                  Light
                </Button>
                <Button type="button" size="sm" variant="secondary" onClick={() => handleBackgroundChange('#0f172a')}>
                  Dark
                </Button>
              </div>
            </div>
            <div className="settings-field">
              <label>Fondo</label>
              <input type="color" value={backgroundColor} onChange={(event) => handleBackgroundChange(event.target.value)} />
            </div>
          </Card>
          <Card title="Personalización" description="Personaliza tipografía y colores.">
            <div className="settings-field">
              <label>Tipografía</label>
              <select value={font} onChange={(event) => setFont(event.target.value)}>
                {fonts.map((fontOption) => (
                  <option key={fontOption} value={fontOption}>
                    {fontOption}
                  </option>
                ))}
              </select>
            </div>
            <div className="settings-field">
              <label>Color del Sidebar</label>
              <input type="color" value={sidebarColor} onChange={(event) => handleSidebarColor(event.target.value)} />
            </div>
          </Card>
        </aside>
        <div className="content-stack">
          <Card title="Resumen de configuración" description="Tus preferencias actuales se aplican al instante.">
            <p>Selecciona tu idioma, zona horaria y estilo para que tu calendario y dashboard se adapten a tu flujo.</p>
            <div className="settings-field">
              <label>Configuración activa</label>
              <p className="proposal-text">Idioma: {language}</p>
              <p className="proposal-text">Zona horaria: {timezone ?? timezones[0]}</p>
              <p className="proposal-text">Tipografía: {font}</p>
            </div>
          </Card>
        </div>
      </section>
    </main>
  )
}
