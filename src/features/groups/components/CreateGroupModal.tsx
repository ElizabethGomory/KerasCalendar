import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Copy, Check } from 'lucide-react'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { groupSchema, type GroupFormData } from '@/lib/schemas'
import { createGroup } from '@/services/groups'
import { useAuthStore } from '@/store'
import type { Platform } from '@/types'

const platforms: { value: Platform; label: string }[] = [
  { value: 'zoom', label: 'Zoom' },
  { value: 'meet', label: 'Google Meet' },
  { value: 'discord', label: 'Discord' },
  { value: 'slack', label: 'Slack' },
  { value: 'teams', label: 'Microsoft Teams' },
  { value: 'other', label: 'Otro' },
]

interface CreateGroupModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateGroupModal({ open, onOpenChange }: CreateGroupModalProps) {
  const [inviteLink, setInviteLink] = useState('')
  const [copied, setCopied] = useState(false)
  const user = useAuthStore((s) => s.user)
  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<GroupFormData>({
    resolver: zodResolver(groupSchema),
    defaultValues: { color: '#FF8A00', platform: 'zoom' },
  })

  const selectedPlatform = watch('platform')

  const onSubmit = async (data: GroupFormData) => {
    if (!user) return
    const { group } = await createGroup({ ...data, userId: user.id })
    const link = `${window.location.origin}/join/${group.id}?code=${inviteLink}`
    setInviteLink(link)
  }

  const copyLink = async () => {
    if (inviteLink) {
      await navigator.clipboard.writeText(inviteLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleClose = () => {
    reset()
    setInviteLink('')
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Crear Grupo</DialogTitle>
          <DialogDescription>Crea un grupo para coordinar reuniones</DialogDescription>
        </DialogHeader>

        {!inviteLink ? (
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Nombre del grupo</Label>
              <Input id="name" {...register('name')} />
              {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="desc">Descripción</Label>
              <Input id="desc" {...register('description')} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label>Plataforma</Label>
                <Select value={selectedPlatform} onValueChange={(v) => setValue('platform', v as Platform)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {platforms.map((p) => (
                      <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="grp-color">Color</Label>
                <Input id="grp-color" type="color" {...register('color')} className="h-10 w-full p-1" />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="secondary" onClick={handleClose}>Cancelar</Button>
              <Button type="submit">Crear Grupo</Button>
            </DialogFooter>
          </form>
        ) : (
          <div className="flex flex-col gap-4">
            <p className="text-sm text-keras-text/60">
              Comparte este enlace con los miembros del grupo:
            </p>
            <div className="flex items-center gap-2">
              <Input value={inviteLink} readOnly className="flex-1" />
              <Button variant="secondary" size="icon" onClick={copyLink}>
                {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            {copied && <p className="text-xs text-green-600">¡Enlace copiado!</p>}
            <DialogFooter>
              <Button onClick={handleClose}>Listo</Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
