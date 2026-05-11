'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { TypeAnimation } from 'react-type-animation'
import { ArrowDown, Download, Mail, MapPin, Briefcase } from 'lucide-react'
import {
  FaGithub, FaLinkedin, FaTwitter, FaGlobe, FaEnvelope, FaLink,
} from 'react-icons/fa'
import type { Profile, SocialLink } from '@/types'
import { getPlatformColor, getInitials } from '@/lib/utils'

function SocialIcon({ platform, size = 20 }: { platform: string; size?: number }) {
  const p = { size }
  switch (platform) {
    case 'GitHub': return <FaGithub {...p} />
    case 'LinkedIn': return <FaLinkedin {...p} />
    case 'Twitter': return <FaTwitter {...p} />
    case 'Website': return <FaGlobe {...p} />
    case 'Email': return <FaEnvelope {...p} />
    default: return <FaLink {...p} />
  }
}

interface HeroSectionProps {
  profile: Profile | null
  socialLinks: SocialLink[]
}

export default function HeroSection({ profile, socialLinks }: HeroSectionProps) {
  const name = profile ? `${profile.firstName} ${profile.lastName}` : 'Your Name'
  const titles = profile?.title
    ? [profile.title, 2000, 'Full Stack Developer', 2000, 'Problem Solver', 2000]
    : ['Full Stack Developer', 2000, 'Software Engineer', 2000]

  const visibleLinks = socialLinks.filter((s) => s.isVisible).slice(0, 6)

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950 pt-16"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 hero-pattern opacity-30" />
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-pulse-slow animation-delay-500" />

      <div className="container-custom relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20">
        {/* Left: Text */}
        <div>
          {profile?.openToWork && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-400 rounded-full px-4 py-2 text-sm font-medium mb-6"
            >
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Open to Work
            </motion.div>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
          >
            Hi, I&apos;m{' '}
            <span className="gradient-text">{name}</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-dark-300 font-medium mb-6 min-h-[2rem]"
          >
            <TypeAnimation
              sequence={titles}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-dark-400 text-lg leading-relaxed mb-8 max-w-lg"
          >
            {profile?.shortBio || profile?.bio?.slice(0, 200) || 'Passionate developer crafting modern digital experiences with clean code and creative solutions.'}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4 mb-8"
          >
            {profile?.location && (
              <span className="flex items-center gap-1.5 text-dark-400 text-sm">
                <MapPin size={14} className="text-primary-400" />
                {profile.location}{profile.country ? `, ${profile.country}` : ''}
              </span>
            )}
            {profile?.yearsOfExperience && (
              <span className="flex items-center gap-1.5 text-dark-400 text-sm">
                <Briefcase size={14} className="text-primary-400" />
                {profile.yearsOfExperience}+ Years Experience
              </span>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-3 mb-8"
          >
            <Link href="/#contact" className="btn-primary flex items-center gap-2">
              <Mail size={16} /> Get In Touch
            </Link>
            {profile?.resumeUrl && (
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline flex items-center gap-2"
              >
                <Download size={16} /> Download CV
              </a>
            )}
          </motion.div>

          {visibleLinks.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex items-center gap-3"
            >
              {visibleLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.platform === 'Email' ? `mailto:${link.url}` : link.url}
                  target={link.platform === 'Email' ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  title={link.displayName || link.platform}
                  className="p-2.5 bg-dark-800 hover:bg-dark-700 rounded-xl transition-all duration-200 hover:scale-110"
                  style={{ color: getPlatformColor(link.platform) }}
                >
                  <SocialIcon platform={link.platform} />
                </a>
              ))}
            </motion.div>
          )}
        </div>

        {/* Right: Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex justify-center lg:justify-end"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full blur-2xl opacity-30 scale-110 animate-pulse-slow" />
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary-500/30 shadow-2xl">
              {profile?.avatarUrl ? (
                <Image
                  src={profile.avatarUrl}
                  alt={name}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary-600 to-accent-600 flex items-center justify-center text-white text-6xl font-bold">
                  {getInitials(name)}
                </div>
              )}
            </div>

            {/* Floating badges */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-4 -right-4 bg-white dark:bg-dark-800 rounded-xl px-3 py-2 shadow-lg border border-dark-100 dark:border-dark-700 text-sm font-medium"
            >
              🚀 Available for projects
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
              className="absolute -bottom-4 -left-4 bg-white dark:bg-dark-800 rounded-xl px-3 py-2 shadow-lg border border-dark-100 dark:border-dark-700 text-sm font-medium"
            >
              💻 {profile?.yearsOfExperience || 'N'}+ Yrs Experience
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.a
        href="/#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-dark-400 hover:text-primary-400 transition-colors animate-bounce-slow"
      >
        <ArrowDown size={24} />
      </motion.a>
    </section>
  )
}
