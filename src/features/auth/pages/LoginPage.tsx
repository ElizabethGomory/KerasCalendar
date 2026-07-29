import { motion } from 'framer-motion'
import { useNavigate } from 'react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Globe, Code, MessageCircle, Users, Mail } from 'lucide-react'
import type { OAuthProvider } from '@/types'

const oauthProviders: { provider: OAuthProvider; label: string; icon: typeof Globe }[] = [
  { provider: 'google', label: 'Google', icon: Globe },
  { provider: 'discord', label: 'Discord', icon: MessageCircle },
  { provider: 'github', label: 'GitHub', icon: Code },
  { provider: 'facebook', label: 'Facebook', icon: Users },
  { provider: 'email', label: 'Email', icon: Mail },
]

export function LoginPage() {
  const navigate = useNavigate()

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-keras-bg">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <Card className="w-[400px] shadow-xl">
          <CardHeader className="items-center text-center">
            <CardTitle>Bienvenido</CardTitle>
            <CardDescription>
              Elige cómo deseas iniciar sesión
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {oauthProviders.map(({ provider, label, icon: Icon }) => (
              <Button
                key={provider}
                variant="secondary"
                size="lg"
                className="w-full justify-start gap-3"
                onClick={() => {
                  if (provider === 'email') {
                    navigate('/login/email')
                  }
                }}
              >
                <Icon className="h-5 w-5" />
                {label}
              </Button>
            ))}

            <p className="mt-4 text-center text-xs text-keras-text/40">
              Al continuar, aceptas nuestros términos y condiciones
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
