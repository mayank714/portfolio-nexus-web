'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  onClick?: () => void
  delay?: number
  animate?: boolean
}

export default function Card({ children, className, hover = true, onClick, delay = 0, animate = true }: CardProps) {
  const base = cn(
    'bg-white dark:bg-dark-900 rounded-2xl border border-dark-100 dark:border-dark-800 shadow-card',
    hover && 'card-hover cursor-default',
    onClick && 'cursor-pointer',
    className,
  )

  if (!animate) {
    return <div className={base} onClick={onClick}>{children}</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={base}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
}
