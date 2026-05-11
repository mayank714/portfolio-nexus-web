'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  label?: string
  title: string
  titleHighlight?: string
  subtitle?: string
  centered?: boolean
  className?: string
}

export default function SectionHeader({
  label,
  title,
  titleHighlight,
  subtitle,
  centered = true,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn('mb-12', centered && 'text-center', className)}>
      {label && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="inline-block text-sm font-semibold tracking-widest uppercase text-primary-500 mb-3"
        >
          {label}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark-900 dark:text-white"
      >
        {title}{' '}
        {titleHighlight && (
          <span className="gradient-text">{titleHighlight}</span>
        )}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={cn(
            'mt-4 text-lg text-dark-500 dark:text-dark-400',
            centered && 'max-w-2xl mx-auto',
          )}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}
