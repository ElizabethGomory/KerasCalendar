import { useState } from 'react'
import { useNavigate } from 'react-router'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
  DialogFooter, DialogClose,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getGroupBySlug, getGroupByCode, joinGroup } from '@/services/groups'
import { useAuthStore } from '@/store'

interface SearchGroupModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SearchGroupModal({ open, onOpenChange }: SearchGroupModalProps) {
  const navigate = useNavigate()
  const user = useAuthStore((s) => s.user)
  const [name, setName] = useState('')
  const [link, setLink] = useState('')
  const [found, setFound] = useState<{ id: string; name: string } | null>(null)
  const [error, setError] = useState('')

  const searchByName = async () => {
    setError('')
    setFound(null)
    const group = await getGroupBySlug(name)
    if (group) setFound({ id: group.id, name: group.name })
    else setError('Grupo no encontrado')
  }

  const searchByLink = async () => {
    setError('')
    setFound(null)
    const code = link.split('code=').pop() || link
    const group = await getGroupByCode(code)
    if (group) setFound({ id: group.id, name: group.name })
    else setError('Enlace inválido o expirado')
  }

  const joinAndRedirect = async () => {
    if (!found || !user) return
    await joinGroup(found.id, user.id)
    onOpenChange(false)
    navigate(`/dashboard/groups/${found.id}`)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Buscar Grupo</DialogTitle>
          <DialogDescription>Encuentra un grupo por nombre o enlace</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="name">
          <TabsList className="w-full">
            <TabsTrigger value="name" className="flex-1">Buscar por nombre</TabsTrigger>
            <TabsTrigger value="link" className="flex-1">Pegar enlace</TabsTrigger>
          </TabsList>
          <TabsContent value="name" className="flex flex-col gap-3">
            <Label htmlFor="search-name">Nombre del grupo</Label>
            <Input id="search-name" value={name} onChange={(e) => setName(e.target.value)} />
            <Button onClick={searchByName}>Buscar</Button>
          </TabsContent>
          <TabsContent value="link" className="flex flex-col gap-3">
            <Label htmlFor="search-link">Enlace de invitación</Label>
            <Input id="search-link" value={link} onChange={(e) => setLink(e.target.value)} placeholder="Pega el enlace aquí" />
            <Button onClick={searchByLink}>Buscar</Button>
          </TabsContent>
        </Tabs>

        {error && <p className="text-sm text-red-500">{error}</p>}

        {found && (
          <div className="glass rounded-xl p-4 flex items-center justify-between">
            <span className="font-medium">{found.name}</span>
            <Button size="sm" onClick={joinAndRedirect}>Unirse</Button>
          </div>
        )}

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cerrar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
