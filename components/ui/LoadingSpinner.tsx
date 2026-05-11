import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  fullPage?: boolean
}

const sizeMap = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12' }

export default function LoadingSpinner({ size = 'md', className, fullPage = false }: LoadingSpinnerProps) {
  const spinner = (
    <div
      className={cn(
        'border-2 border-dark-200 dark:border-dark-700 border-t-primary-500 rounded-full animate-spin',
        sizeMap[size],
        className,
      )}
    />
  )

  if (fullPage) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 dark:bg-dark-950/80 backdrop-blur-sm z-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-dark-200 dark:border-dark-700 border-t-primary-500 rounded-full animate-spin" />
          <p className="text-dark-500 dark:text-dark-400 text-sm">Loading portfolio...</p>
        </div>
      </div>
    )
  }

  return spinner
}

export function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-dark-900 rounded-2xl border border-dark-100 dark:border-dark-800 p-6 animate-pulse">
      <div className="h-4 bg-dark-200 dark:bg-dark-700 rounded w-3/4 mb-3" />
      <div className="h-3 bg-dark-100 dark:bg-dark-800 rounded w-1/2 mb-6" />
      <div className="space-y-2">
        <div className="h-3 bg-dark-100 dark:bg-dark-800 rounded" />
        <div className="h-3 bg-dark-100 dark:bg-dark-800 rounded w-5/6" />
        <div className="h-3 bg-dark-100 dark:bg-dark-800 rounded w-4/6" />
      </div>
    </div>
  )
}
