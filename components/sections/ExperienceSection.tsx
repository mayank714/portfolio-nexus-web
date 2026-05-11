'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { MapPin, ExternalLink } from 'lucide-react'
import type { WorkExperience } from '@/types'
import SectionHeader from '@/components/ui/SectionHeader'
import Badge from '@/components/ui/Badge'
import { formatDateRange } from '@/lib/utils'

interface ExperienceSectionProps {
  experiences: WorkExperience[]
}

function ExperienceCard({ exp, index }: { exp: WorkExperience; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pl-8 pb-10 last:pb-0"
    >
      {/* Timeline dot */}
      <div className="absolute left-0 top-0 w-4 h-4 bg-primary-500 rounded-full border-2 border-white dark:border-dark-950 shadow-md" />
      {/* Timeline line */}
      {index !== -1 && (
        <div className="absolute left-[7px] top-4 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-accent-500/20" />
      )}

      <div className="bg-white dark:bg-dark-900 rounded-2xl border border-dark-100 dark:border-dark-800 p-6 shadow-card hover:shadow-card-hover transition-shadow">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl overflow-hidden bg-dark-100 dark:bg-dark-800 shrink-0 flex items-center justify-center">
            {exp.companyLogoUrl ? (
              <Image src={exp.companyLogoUrl} alt={exp.company} width={48} height={48} className="object-contain" />
            ) : (
              <span className="text-xl">{exp.company[0]}</span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-dark-900 dark:text-white text-lg">{exp.position}</h3>
            <div className="flex items-center gap-2 flex-wrap">
              {exp.companyUrl ? (
                <a href={exp.companyUrl} target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:underline font-medium flex items-center gap-1 text-sm">
                  {exp.company} <ExternalLink size={12} />
                </a>
              ) : (
                <span className="text-primary-500 font-medium text-sm">{exp.company}</span>
              )}
              <Badge variant="default" size="sm">{exp.employmentType}</Badge>
              {exp.remote && <Badge variant="success" size="sm">Remote</Badge>}
              {exp.current && <Badge variant="info" size="sm">Current</Badge>}
            </div>
          </div>
          <div className="text-right shrink-0">
            <p className="text-xs font-medium text-dark-500 dark:text-dark-400">
              {formatDateRange(exp.startDate, exp.endDate, exp.current)}
            </p>
            {exp.location && (
              <p className="text-xs text-dark-400 flex items-center gap-1 justify-end mt-1">
                <MapPin size={10} /> {exp.location}
              </p>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-dark-600 dark:text-dark-300 text-sm leading-relaxed mb-4">{exp.description}</p>

        {/* Responsibilities */}
        {exp.responsibilities && exp.responsibilities.length > 0 && (
          <div className="mb-4">
            <h4 className="text-xs font-semibold text-dark-700 dark:text-dark-300 uppercase tracking-wide mb-2">Key Responsibilities</h4>
            <ul className="space-y-1">
              {exp.responsibilities.slice(0, 5).map((r, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-dark-600 dark:text-dark-300">
                  <span className="text-primary-500 mt-1 shrink-0">▸</span> {r}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Achievements */}
        {exp.achievements && exp.achievements.length > 0 && (
          <div className="mb-4">
            <h4 className="text-xs font-semibold text-dark-700 dark:text-dark-300 uppercase tracking-wide mb-2">Achievements</h4>
            <ul className="space-y-1">
              {exp.achievements.map((a, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-dark-600 dark:text-dark-300">
                  <span className="text-green-500 mt-1 shrink-0">✓</span> {a}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tech stack */}
        {exp.techStack && exp.techStack.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-3 border-t border-dark-100 dark:border-dark-800">
            {exp.techStack.map((t) => (
              <span key={t} className="text-xs bg-dark-100 dark:bg-dark-800 text-dark-600 dark:text-dark-300 px-2 py-0.5 rounded-md font-mono">{t}</span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default function ExperienceSection({ experiences }: ExperienceSectionProps) {
  return (
    <section id="experience" className="section-padding bg-white dark:bg-dark-950">
      <div className="container-custom">
        <SectionHeader
          label="My Journey"
          title="Work"
          titleHighlight="Experience"
          subtitle="My professional timeline and the companies I've had the privilege to work with."
        />
        <div className="max-w-3xl mx-auto">
          {experiences.map((exp, i) => (
            <ExperienceCard key={exp.id} exp={exp} index={i} />
          ))}
          {experiences.length === 0 && (
            <p className="text-center text-dark-400 py-12">No work experience added yet.</p>
          )}
        </div>
      </div>
    </section>
  )
}
