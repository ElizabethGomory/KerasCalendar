import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useNavigate } from 'react-router'

export function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="relative flex h-screen w-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="glass flex h-full w-full items-center justify-center">
          <div className="grid h-full w-full grid-cols-7 gap-2 p-8 opacity-30">
            {Array.from({ length: 35 }).map((_, i) => (
              <div
                key={i}
                className="flex aspect-square items-center justify-center rounded-xl bg-white/20 text-xs text-keras-text/30"
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute inset-0 backdrop-blur-xl" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <Card className="w-[420px] shadow-xl">
          <CardContent className="flex flex-col items-center gap-6 p-10">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FF8A00] text-2xl font-bold text-white shadow-lg">
              K
            </div>

            <div className="text-center">
              <h1 className="text-2xl font-bold text-keras-text">
                KerasCalendar
              </h1>
              <p className="mt-2 text-sm text-keras-text/60">
                Encuentra el horario perfecto para reuniones
                entre equipos internacionales, sin importar
                los husos horarios.
              </p>
            </div>

            <ul className="flex w-full flex-col gap-2 text-sm text-keras-text/70">
              {[
                'Disponibilidad en tiempo real',
                'Multi-zona horaria',
                'Privacidad total',
                'Sincronización opcional con Google Calendar',
              ].map((benefit) => (
                <li key={benefit} className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#FF8A00]/10 text-xs text-[#FF8A00]">
                    ✓
                  </span>
                  {benefit}
                </li>
              ))}
            </ul>

            <div className="flex w-full flex-col gap-3">
              <Button
                size="lg"
                className="w-full"
                onClick={() => navigate('/login')}
              >
                Registrarse
              </Button>
              <Button
                variant="secondary"
                size="lg"
                className="w-full"
                onClick={() => navigate('/login')}
              >
                Iniciar sesión
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
