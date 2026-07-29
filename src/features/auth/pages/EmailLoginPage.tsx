import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { loginEmailSchema, type LoginEmailData } from '@/lib/schemas'
import { loginWithEmail } from '@/services/auth'

export function EmailLoginPage() {
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginEmailData>({
    resolver: zodResolver(loginEmailSchema),
  })

  const onSubmit = async (data: LoginEmailData) => {
    try {
      setError('')
      await loginWithEmail(data.email, data.password)
      navigate('/dashboard')
    } catch {
      setError('Credenciales inválidas')
    }
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-keras-bg">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="w-[400px] shadow-xl">
          <CardHeader className="items-center text-center">
            <CardTitle>Iniciar sesión</CardTitle>
            <CardDescription>Ingresa tu email y contraseña</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium text-keras-text/80">
                  Email
                </label>
                <Input id="email" type="email" {...register('email')} />
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="password" className="text-sm font-medium text-keras-text/80">
                  Contraseña
                </label>
                <Input id="password" type="password" {...register('password')} />
                {errors.password && (
                  <p className="text-xs text-red-500">{errors.password.message}</p>
                )}
              </div>
              {error && <p className="text-xs text-red-500">{error}</p>}
              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Ingresando...' : 'Ingresar'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
