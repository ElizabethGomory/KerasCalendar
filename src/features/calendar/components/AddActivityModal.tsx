import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
  DialogFooter, DialogClose,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { activitySchema, type ActivityFormData } from '@/lib/schemas'
import { createActivity } from '@/services/activities'
import type { ActivityCategory, RepeatType, FlexibilityLevel } from '@/types'

const categories: { value: ActivityCategory; label: string }[] = [
  { value: 'work', label: 'Trabajo' },
  { value: 'study', label: 'Estudio' },
  { value: 'hobby', label: 'Hobby' },
  { value: 'religion', label: 'Religión' },
  { value: 'family', label: 'Familia' },
  { value: 'food', label: 'Comida' },
  { value: 'event', label: 'Evento' },
  { value: 'other', label: 'Otra' },
]

const flexibilities: { value: FlexibilityLevel; label: string }[] = [
  { value: 'fixed', label: 'Fija (no puede moverse)' },
  { value: 'flexible', label: 'Flexible' },
  { value: 'very_flexible', label: 'Muy flexible' },
]

const repeatOptions: { value: RepeatType; label: string }[] = [
  { value: 'none', label: 'No repetir' },
  { value: 'daily', label: 'Todos los días' },
  { value: 'weekly', label: 'Semanal' },
  { value: 'monthly', label: 'Mensual' },
  { value: 'annual', label: 'Anual' },
]

interface AddActivityModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddActivityModal({ open, onOpenChange }: AddActivityModalProps) {
  const [saving, setSaving] = useState(false)
  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<ActivityFormData>({
    resolver: zodResolver(activitySchema),
    defaultValues: {
      color: '#FF8A00',
      category: 'work',
      flexibility: 'fixed',
      repeat: 'none',
    },
  })

  const selectedCategory = watch('category')
  const selectedFlexibility = watch('flexibility')
  const selectedRepeat = watch('repeat')

  const onSubmit = async (data: ActivityFormData) => {
    setSaving(true)
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
      await createActivity({
        title: data.title,
        description: data.description,
        category: data.category,
        flexibility: data.flexibility,
        repeat: data.repeat,
        specificDays: data.specificDays,
        startTime: data.startTime,
        endTime: data.endTime,
        color: data.color,
        userId: '1',
        timezone: tz,
      })
      reset()
      onOpenChange(false)
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Agregar Actividad</DialogTitle>
          <DialogDescription>Completa los datos para registrar tu actividad</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="country">País</Label>
              <Input id="country" {...register('country')} />
              {errors.country && <p className="text-xs text-red-500">{errors.country.message}</p>}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="city">Ciudad</Label>
              <Input id="city" {...register('city')} />
              {errors.city && <p className="text-xs text-red-500">{errors.city.message}</p>}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="title">Título</Label>
            <Input id="title" {...register('title')} />
            {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="description">Descripción</Label>
            <Input id="description" {...register('description')} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label>Categoría</Label>
              <Select value={selectedCategory} onValueChange={(v) => setValue('category', v as ActivityCategory)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Flexibilidad</Label>
              <Select value={selectedFlexibility} onValueChange={(v) => setValue('flexibility', v as FlexibilityLevel)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {flexibilities.map((f) => (
                    <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label>Repetición</Label>
              <Select value={selectedRepeat} onValueChange={(v) => setValue('repeat', v as RepeatType)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {repeatOptions.map((r) => (
                    <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="color">Color</Label>
              <div className="flex items-center gap-2">
                <Input id="color" type="color" {...register('color')} className="h-10 w-12 p-1" />
                <span className="text-xs text-keras-text/50">{watch('color')}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="startTime">Desde</Label>
              <Input id="startTime" type="time" {...register('startTime')} />
              {errors.startTime && <p className="text-xs text-red-500">{errors.startTime.message}</p>}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="endTime">Hasta</Label>
              <Input id="endTime" type="time" {...register('endTime')} />
              {errors.endTime && <p className="text-xs text-red-500">{errors.endTime.message}</p>}
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">Cancelar</Button>
            </DialogClose>
            <Button type="submit" disabled={saving}>
              {saving ? 'Guardando...' : 'Guardar'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
