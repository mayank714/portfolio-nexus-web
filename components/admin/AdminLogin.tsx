'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { Lock, Mail } from 'lucide-react'
import { authApi } from '@/lib/api'

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type FormData = z.infer<typeof schema>

interface AdminLoginProps {
  onLogin: (token: string, admin: { id: string; email: string; name: string }) => void
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    try {
      const res = await authApi.login(data)
      onLogin(res.access_token, res.admin)
      toast.success(`Welcome back, ${res.admin.name}!`)
    } catch {
      toast.error('Invalid credentials. Please try again.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-950 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
            PN
          </div>
          <h1 className="text-3xl font-bold text-white">Admin Login</h1>
          <p className="text-dark-400 mt-2">Sign in to manage your portfolio</p>
        </div>

        <div className="bg-dark-900 border border-dark-800 rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-1.5">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400" />
                <input
                  {...register('email')}
                  type="email"
                  placeholder="admin@portfolio.com"
                  className="input-field pl-9"
                />
              </div>
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-300 mb-1.5">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400" />
                <input
                  {...register('password')}
                  type="password"
                  placeholder="••••••••"
                  className="input-field pl-9"
                />
              </div>
              {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full flex items-center justify-center gap-2 mt-6 disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <><Lock size={16} /> Sign In</>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
