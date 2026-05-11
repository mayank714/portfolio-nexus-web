'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { MapPin, Mail, Phone, Globe, Calendar, BookOpen } from 'lucide-react'
import type { Profile } from '@/types'
import SectionHeader from '@/components/ui/SectionHeader'
import { getInitials } from '@/lib/utils'

interface AboutSectionProps {
  profile: Profile | null
}

export default function AboutSection({ profile }: AboutSectionProps) {
  if (!profile) return null

  const name = `${profile.firstName} ${profile.lastName}`

  const stats = [
    { label: 'Years Experience', value: profile.yearsOfExperience ? `${profile.yearsOfExperience}+` : 'N/A', icon: '💼' },
    { label: 'Languages Spoken', value: profile.languages?.length ? profile.languages.length : 'N/A', icon: '🌍' },
    { label: 'Interests', value: profile.interests?.length ? profile.interests.length : 'N/A', icon: '🎯' },
  ]

  const contacts = [
    profile.email && { icon: <Mail size={14} />, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
    profile.phone && { icon: <Phone size={14} />, label: 'Phone', value: profile.phone, href: `tel:${profile.phone}` },
    profile.location && { icon: <MapPin size={14} />, label: 'Location', value: `${profile.location}${profile.country ? `, ${profile.country}` : ''}`, href: undefined },
  ].filter(Boolean)

  return (
    <section id="about" className="section-padding bg-dark-50 dark:bg-dark-900/50">
      <div className="container-custom">
        <SectionHeader label="Get To Know Me" title="About" titleHighlight="Me" subtitle="A bit about who I am, what I do, and what drives me." />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Avatar + stats */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center lg:items-start gap-8"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl blur-xl opacity-20 scale-105" />
              <div className="relative w-64 h-64 rounded-2xl overflow-hidden border-2 border-primary-500/20 shadow-2xl">
                {profile.avatarUrl ? (
                  <Image src={profile.avatarUrl} alt={name} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary-600 to-accent-600 flex items-center justify-center text-white text-5xl font-bold">
                    {getInitials(name)}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 w-full">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-white dark:bg-dark-800 rounded-xl p-4 text-center border border-dark-100 dark:border-dark-700 shadow-sm">
                  <div className="text-2xl mb-1">{stat.icon}</div>
                  <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-xs text-dark-500 dark:text-dark-400 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-bold text-dark-900 dark:text-white mb-1">{name}</h3>
              <p className="text-primary-500 font-medium">{profile.title}</p>
            </div>

            <p className="text-dark-600 dark:text-dark-300 leading-relaxed text-lg">{profile.bio}</p>

            <div className="space-y-3">
              {contacts.map((c: any) => (
                <div key={c.label} className="flex items-center gap-3 text-dark-600 dark:text-dark-300">
                  <span className="text-primary-500 shrink-0">{c.icon}</span>
                  <span className="text-sm font-medium text-dark-500 dark:text-dark-400 w-16 shrink-0">{c.label}:</span>
                  {c.href ? (
                    <a href={c.href} className="hover:text-primary-500 transition-colors">{c.value}</a>
                  ) : (
                    <span>{c.value}</span>
                  )}
                </div>
              ))}
            </div>

            {profile.languages && profile.languages.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-dark-700 dark:text-dark-300 mb-2 flex items-center gap-2">
                  <Globe size={14} className="text-primary-500" /> Languages
                </h4>
                <div className="flex flex-wrap gap-2">
                  {profile.languages.map((lang) => (
                    <span key={lang} className="tag tag-primary">{lang}</span>
                  ))}
                </div>
              </div>
            )}

            {profile.interests && profile.interests.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-dark-700 dark:text-dark-300 mb-2 flex items-center gap-2">
                  <BookOpen size={14} className="text-primary-500" /> Interests
                </h4>
                <div className="flex flex-wrap gap-2">
                  {profile.interests.map((interest) => (
                    <span key={interest} className="tag tag-accent">{interest}</span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
