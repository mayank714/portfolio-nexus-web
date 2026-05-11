'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Star } from 'lucide-react'
import type { Achievement } from '@/types'
import SectionHeader from '@/components/ui/SectionHeader'
import Badge from '@/components/ui/Badge'
import { formatDate, getAchievementIcon } from '@/lib/utils'

interface AchievementsSectionProps {
  achievements: Achievement[]
}

function AchievementCard({ ach, index }: { ach: Achievement; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="relative bg-white dark:bg-dark-900 rounded-2xl border border-dark-100 dark:border-dark-800 p-6 shadow-card hover:shadow-card-hover transition-all group"
    >
      {ach.featured && (
        <div className="absolute top-4 right-4">
          <Star size={16} className="text-yellow-400 fill-yellow-400" />
        </div>
      )}

      <div className="flex items-start gap-4">
        <div className="text-4xl shrink-0">{getAchievementIcon(ach.category)}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-bold text-dark-900 dark:text-white text-base leading-tight">{ach.title}</h3>
          </div>

          <div className="flex items-center gap-2 flex-wrap mb-3">
            <Badge variant="primary" size="sm">{ach.category}</Badge>
            {ach.rank && <Badge variant="accent" size="sm">🥇 {ach.rank}</Badge>}
            <span className="text-xs text-dark-400">{formatDate(ach.date, 'MMM d, yyyy')}</span>
          </div>

          {ach.organization && (
            <p className="text-sm text-primary-500 font-medium mb-2">{ach.organization}</p>
          )}

          <p className="text-sm text-dark-600 dark:text-dark-300 leading-relaxed">{ach.description}</p>

          {ach.url && (
            <a
              href={ach.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-primary-500 hover:text-primary-400 mt-3 transition-colors font-medium"
            >
              <ExternalLink size={12} /> Learn More
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function AchievementsSection({ achievements }: AchievementsSectionProps) {
  const featured = achievements.filter((a) => a.featured)
  const rest = achievements.filter((a) => !a.featured)
  const sorted = [...featured, ...rest]

  return (
    <section id="achievements" className="section-padding bg-white dark:bg-dark-950">
      <div className="container-custom">
        <SectionHeader
          label="Recognition & Wins"
          title="My"
          titleHighlight="Achievements"
          subtitle="Awards, recognitions, hackathons, and milestones I'm proud of."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sorted.map((ach, i) => (
            <AchievementCard key={ach.id} ach={ach} index={i} />
          ))}
          {achievements.length === 0 && (
            <p className="col-span-2 text-center text-dark-400 py-12">No achievements added yet.</p>
          )}
        </div>
      </div>
    </section>
  )
}
