'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Star, Quote } from 'lucide-react'
import type { Testimonial } from '@/types'
import SectionHeader from '@/components/ui/SectionHeader'
import Badge from '@/components/ui/Badge'
import { getInitials } from '@/lib/utils'

interface TestimonialsSectionProps {
  testimonials: Testimonial[]
}

function TestimonialCard({ t, index }: { t: Testimonial; index: number }) {
  const stars = Math.round(Number(t.rating))

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white dark:bg-dark-900 rounded-2xl border border-dark-100 dark:border-dark-800 p-6 shadow-card hover:shadow-card-hover transition-all flex flex-col"
    >
      <div className="flex items-center justify-between mb-4">
        <Quote size={24} className="text-primary-300 dark:text-primary-700" />
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={14}
              className={i < stars ? 'text-yellow-400 fill-yellow-400' : 'text-dark-300 dark:text-dark-600'}
            />
          ))}
        </div>
      </div>

      <p className="text-dark-600 dark:text-dark-300 text-sm leading-relaxed flex-1 italic mb-6">
        &ldquo;{t.content}&rdquo;
      </p>

      <div className="flex items-center gap-3 pt-4 border-t border-dark-100 dark:border-dark-800">
        <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
          {t.avatarUrl ? (
            <Image src={t.avatarUrl} alt={t.name} width={40} height={40} className="object-cover w-full h-full" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-xs font-bold">
              {getInitials(t.name)}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            {t.linkedinUrl ? (
              <a href={t.linkedinUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-dark-900 dark:text-white text-sm hover:text-primary-500 transition-colors">
                {t.name}
              </a>
            ) : (
              <span className="font-semibold text-dark-900 dark:text-white text-sm">{t.name}</span>
            )}
            <Badge variant="default" size="sm">{t.relationship}</Badge>
          </div>
          <p className="text-xs text-dark-500 dark:text-dark-400 truncate">{t.position} · {t.company}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  if (testimonials.length === 0) return null

  return (
    <section id="testimonials" className="section-padding bg-white dark:bg-dark-950">
      <div className="container-custom">
        <SectionHeader
          label="What Others Say"
          title="Testimonials &"
          titleHighlight="Reviews"
          subtitle="Kind words from colleagues, managers, and clients I've worked with."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.id} t={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
