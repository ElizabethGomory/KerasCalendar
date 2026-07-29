import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuthStore } from '@/store'

export function ProfilePage() {
  const user = useAuthStore((s) => s.user)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="flex h-full flex-col gap-6"
    >
      <div>
        <h1 className="text-2xl font-bold text-keras-text">Perfil</h1>
        <p className="text-sm text-keras-text/60">Gestiona tu información personal</p>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-lg">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{user?.name || 'Usuario'}</CardTitle>
              <p className="text-sm text-keras-text/60">{user?.email}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="profile-name">Nombre</Label>
              <Input id="profile-name" defaultValue={user?.name || ''} />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="profile-email">Email</Label>
              <Input id="profile-email" type="email" defaultValue={user?.email || ''} />
            </div>
          </div>
          <div className="flex justify-end">
            <Button>Guardar cambios</Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
