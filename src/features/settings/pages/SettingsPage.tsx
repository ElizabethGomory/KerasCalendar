import { useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { initGoogleApi, connectGoogleCalendar, disconnectGoogleCalendar, isGoogleConnected, onGoogleStatusChange } from '@/services/google-calendar'
import type { GoogleStatus } from '@/services/google-calendar'

export function SettingsPage() {
  const [googleStatus, setGoogleStatus] = useState<GoogleStatus>('disconnected')

  useEffect(() => {
    const unsub = onGoogleStatusChange(setGoogleStatus)
    initGoogleApi()
    if (isGoogleConnected()) setGoogleStatus('connected')
    return unsub
  }, [])

  const handleGoogleConnect = useCallback(async () => {
    await connectGoogleCalendar()
  }, [])

  const handleGoogleDisconnect = useCallback(() => {
    disconnectGoogleCalendar()
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="flex h-full flex-col gap-6"
    >
      <div>
        <h1 className="text-2xl font-bold text-keras-text">Configuración</h1>
        <p className="text-sm text-keras-text/60">Personaliza tu experiencia</p>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Preferencias</CardTitle>
          <CardDescription>Configura tu zona horaria e idioma</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="language">Idioma</Label>
              <Select defaultValue="es">
                <SelectTrigger aria-label="Idioma"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="timezone">Zona horaria</Label>
              <Select defaultValue={Intl.DateTimeFormat().resolvedOptions().timeZone}>
                <SelectTrigger aria-label="Zona horaria"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value={Intl.DateTimeFormat().resolvedOptions().timeZone}>
                    {Intl.DateTimeFormat().resolvedOptions().timeZone}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end">
            <Button aria-label="Guardar cambios de preferencias">Guardar cambios</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Google Calendar</CardTitle>
          <CardDescription>Sincroniza tus actividades con Google Calendar</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`h-3 w-3 rounded-full ${
                googleStatus === 'connected' ? 'bg-green-500' :
                googleStatus === 'connecting' ? 'bg-yellow-500 animate-pulse' :
                googleStatus === 'error' ? 'bg-red-500' :
                'bg-gray-400'
              }`}
              role="status"
              aria-label={`Google Calendar: ${googleStatus === 'connected' ? 'conectado' : googleStatus === 'connecting' ? 'conectando' : googleStatus === 'error' ? 'error' : 'desconectado'}`}
            />
            <span className="text-sm text-keras-text/80">
              {googleStatus === 'connected' ? 'Conectado' :
               googleStatus === 'connecting' ? 'Conectando...' :
               googleStatus === 'error' ? 'Error de conexión' :
               'No conectado'}
            </span>
          </div>
          {googleStatus === 'connected' ? (
            <Button
              variant="secondary"
              onClick={handleGoogleDisconnect}
              aria-label="Desconectar Google Calendar"
            >
              Desconectar
            </Button>
          ) : (
            <Button
              onClick={handleGoogleConnect}
              disabled={googleStatus === 'connecting'}
              aria-label="Conectar Google Calendar"
            >
              {googleStatus === 'connecting' ? 'Conectando...' : 'Conectar Google Calendar'}
            </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
