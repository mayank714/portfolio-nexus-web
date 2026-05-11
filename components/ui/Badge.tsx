import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'primary' | 'accent' | 'success' | 'warning' | 'info' | 'default'
  size?: 'sm' | 'md'
  className?: string
}

const variantMap = {
  primary: 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300',
  accent: 'bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300',
  success: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
  warning: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300',
  info: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
  default: 'bg-dark-100 dark:bg-dark-800 text-dark-700 dark:text-dark-300',
}

const sizeMap = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-xs',
}

export default function Badge({ children, variant = 'default', size = 'md', className }: BadgeProps) {
  return (
    <span className={cn('inline-flex items-center rounded-full font-medium', variantMap[variant], sizeMap[size], className)}>
      {children}
    </span>
  )
}
