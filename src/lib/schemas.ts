import { z } from 'zod'

export const activitySchema = z.object({
  title: z.string().min(1, 'El título es requerido').max(100),
  description: z.string().max(500).optional(),
  category: z.enum(['work', 'study', 'hobby', 'religion', 'family', 'food', 'event', 'other']),
  flexibility: z.enum(['fixed', 'flexible', 'very_flexible']),
  repeat: z.enum(['none', 'daily', 'specific_days', 'weekly', 'monthly', 'annual']),
  specificDays: z.array(z.number()).optional(),
  startTime: z.string().min(1, 'Hora de inicio requerida'),
  endTime: z.string().min(1, 'Hora de fin requerida'),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/, 'Color inválido'),
  country: z.string().min(1, 'País requerido'),
  city: z.string().min(1, 'Ciudad requerida'),
})

export type ActivityFormData = z.infer<typeof activitySchema>

export const groupSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido').max(80),
  description: z.string().max(500).optional(),
  platform: z.enum(['zoom', 'meet', 'discord', 'slack', 'teams', 'other']),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/, 'Color inválido'),
})

export type GroupFormData = z.infer<typeof groupSchema>

export const loginEmailSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
})

export type LoginEmailData = z.infer<typeof loginEmailSchema>
