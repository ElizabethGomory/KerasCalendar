import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export function SettingsPage() {
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
              <Label>Idioma</Label>
              <Select defaultValue="es">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Zona horaria</Label>
              <Select defaultValue={Intl.DateTimeFormat().resolvedOptions().timeZone}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value={Intl.DateTimeFormat().resolvedOptions().timeZone}>
                    {Intl.DateTimeFormat().resolvedOptions().timeZone}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end">
            <Button>Guardar cambios</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Google Calendar</CardTitle>
          <CardDescription>Sincroniza tus actividades con Google Calendar</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="secondary">Conectar Google Calendar</Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}
