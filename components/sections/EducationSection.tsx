'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { MapPin, ExternalLink, GraduationCap } from 'lucide-react'
import type { Education } from '@/types'
import SectionHeader from '@/components/ui/SectionHeader'
import Badge from '@/components/ui/Badge'
import { formatDateRange } from '@/lib/utils'

interface EducationSectionProps {
  education: Education[]
}

function EducationCard({ edu, index }: { edu: Education; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white dark:bg-dark-900 rounded-2xl border border-dark-100 dark:border-dark-800 p-6 shadow-card hover:shadow-card-hover transition-all"
    >
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-xl overflow-hidden bg-dark-100 dark:bg-dark-800 shrink-0 flex items-center justify-center border border-dark-200 dark:border-dark-700">
          {edu.institutionLogoUrl ? (
            <Image src={edu.institutionLogoUrl} alt={edu.institution} width={56} height={56} className="object-contain p-1" />
          ) : (
            <GraduationCap size={24} className="text-primary-500" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between flex-wrap gap-2 mb-1">
            <div>
              <h3 className="font-bold text-dark-900 dark:text-white text-lg leading-tight">{edu.degree}</h3>
              <p className="text-dark-500 dark:text-dark-400 text-sm">{edu.fieldOfStudy}</p>
            </div>
            <Badge variant="primary" size="sm">{edu.degreeType}</Badge>
          </div>

          <div className="flex items-center gap-2 flex-wrap mb-3">
            {edu.institutionUrl ? (
              <a href={edu.institutionUrl} target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:underline font-medium text-sm flex items-center gap-1">
                {edu.institution} <ExternalLink size={10} />
              </a>
            ) : (
              <span className="text-primary-500 font-medium text-sm">{edu.institution}</span>
            )}
            <span className="text-dark-300 dark:text-dark-600">•</span>
            <span className="text-xs text-dark-500 dark:text-dark-400">{formatDateRange(edu.startDate, edu.endDate, edu.current)}</span>
            {edu.current && <Badge variant="success" size="sm">Current</Badge>}
          </div>

          {(edu.grade || edu.location) && (
            <div className="flex items-center gap-4 mb-3">
              {edu.grade && (
                <span className="text-sm text-dark-600 dark:text-dark-300 font-medium">
                  Grade: <span className="text-primary-500">{edu.grade}{edu.gradeScale ? ` / ${edu.gradeScale}` : ''}</span>
                </span>
              )}
              {edu.location && (
                <span className="flex items-center gap-1 text-xs text-dark-400">
                  <MapPin size={10} /> {edu.location}
                </span>
              )}
            </div>
          )}

          {edu.description && (
            <p className="text-sm text-dark-600 dark:text-dark-300 leading-relaxed mb-3">{edu.description}</p>
          )}

          {edu.subjects && edu.subjects.length > 0 && (
            <div className="mb-2">
              <span className="text-xs font-semibold text-dark-500 dark:text-dark-400 uppercase tracking-wide">Key Subjects: </span>
              <span className="text-xs text-dark-600 dark:text-dark-300">{edu.subjects.join(' · ')}</span>
            </div>
          )}

          {edu.honors && edu.honors.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {edu.honors.map((h) => (
                <Badge key={h} variant="accent" size="sm">🏅 {h}</Badge>
              ))}
            </div>
          )}

          {edu.activities && edu.activities.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {edu.activities.map((a) => (
                <span key={a} className="tag tag-default text-xs">{a}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function EducationSection({ education }: EducationSectionProps) {
  return (
    <section id="education" className="section-padding bg-dark-50 dark:bg-dark-900/50">
      <div className="container-custom">
        <SectionHeader
          label="Academic Background"
          title="My"
          titleHighlight="Education"
          subtitle="My academic qualifications and the institutions that shaped my foundation."
        />
        <div className="max-w-3xl mx-auto grid grid-cols-1 gap-6">
          {education.map((edu, i) => (
            <EducationCard key={edu.id} edu={edu} index={i} />
          ))}
          {education.length === 0 && (
            <p className="text-center text-dark-400 py-12">No education records added yet.</p>
          )}
        </div>
      </div>
    </section>
  )
}
