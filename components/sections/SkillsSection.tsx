'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import type { Skill, SkillCategory, GroupedSkills } from '@/types'
import SectionHeader from '@/components/ui/SectionHeader'
import { proficiencyToPercent, getCategoryColor, cn } from '@/lib/utils'

interface SkillsSectionProps {
  skills: Skill[]
  grouped: GroupedSkills
  categories: SkillCategory[]
}

function SkillBar({ skill, delay }: { skill: Skill; delay: number }) {
  const percent = proficiencyToPercent(skill.proficiency, skill.proficiencyPercent)

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="group"
    >
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          {skill.iconUrl ? (
            <img src={skill.iconUrl} alt={skill.name} className="w-4 h-4 object-contain" />
          ) : null}
          <span className="text-sm font-medium text-dark-800 dark:text-dark-200">{skill.name}</span>
          {skill.yearsOfExperience > 0 && (
            <span className="text-xs text-dark-400">{skill.yearsOfExperience}y</span>
          )}
        </div>
        <span className="text-xs font-semibold text-primary-500">{percent}%</span>
      </div>
      <div className="skill-bar">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${percent}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: delay + 0.2, ease: 'easeOut' }}
          className="skill-bar-fill"
        />
      </div>
      <p className="text-xs text-dark-400 mt-1">{skill.proficiency}</p>
    </motion.div>
  )
}

export default function SkillsSection({ skills, grouped, categories }: SkillsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<SkillCategory | 'All'>('All')

  const displayed: SkillCategory[] = activeCategory === 'All' ? categories : [activeCategory]

  return (
    <section id="skills" className="section-padding bg-white dark:bg-dark-950">
      <div className="container-custom">
        <SectionHeader
          label="What I Know"
          title="My"
          titleHighlight="Skills"
          subtitle="Technologies and tools I work with, organized by category."
        />

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <button
            onClick={() => setActiveCategory('All')}
            className={cn(
              'px-4 py-2 rounded-xl text-sm font-medium transition-all',
              activeCategory === 'All'
                ? 'bg-primary-600 text-white shadow-md'
                : 'bg-dark-100 dark:bg-dark-800 text-dark-600 dark:text-dark-300 hover:bg-dark-200 dark:hover:bg-dark-700',
            )}
          >
            All ({skills.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                'px-4 py-2 rounded-xl text-sm font-medium transition-all',
                activeCategory === cat
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'bg-dark-100 dark:bg-dark-800 text-dark-600 dark:text-dark-300 hover:bg-dark-200 dark:hover:bg-dark-700',
              )}
            >
              {cat} ({grouped[cat]?.length ?? 0})
            </button>
          ))}
        </div>

        {/* Skills grid */}
        <div className="space-y-10">
          {displayed.map((cat) => {
            const catSkills = grouped[cat] ?? []
            if (!catSkills.length) return null
            return (
              <div key={cat}>
                <div className="flex items-center gap-3 mb-6">
                  <span className={cn('tag text-sm font-semibold', getCategoryColor(cat))}>{cat}</span>
                  <div className="flex-1 h-px bg-dark-100 dark:bg-dark-800" />
                  <span className="text-xs text-dark-400">{catSkills.length} skills</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-5">
                  {catSkills.map((skill, i) => (
                    <SkillBar key={skill.id} skill={skill} delay={i * 0.05} />
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Summary chips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 flex flex-wrap justify-center gap-2"
        >
          {skills.map((skill) => (
            <span
              key={skill.id}
              className={cn('tag cursor-default', getCategoryColor(skill.category))}
              title={`${skill.proficiency} · ${skill.yearsOfExperience}y`}
            >
              {skill.name}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
