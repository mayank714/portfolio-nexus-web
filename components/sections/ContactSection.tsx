'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { Send, Mail, MapPin, Phone } from 'lucide-react'
import type { Profile, SocialLink } from '@/types'
import SectionHeader from '@/components/ui/SectionHeader'
import { contactApi } from '@/lib/api'
import { getPlatformColor } from '@/lib/utils'
import {
  FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaYoutube, FaMedium,
  FaDev, FaStackOverflow, FaCodepen, FaDribbble, FaBehance, FaEnvelope, FaGlobe, FaLink,
} from 'react-icons/fa'
import { SiHashnode, SiLeetcode } from 'react-icons/si'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
})

type FormData = z.infer<typeof schema>

function SocialIcon({ platform }: { platform: string }) {
  const size = 18
  switch (platform) {
    case 'GitHub': return <FaGithub size={size} />
    case 'LinkedIn': return <FaLinkedin size={size} />
    case 'Twitter': return <FaTwitter size={size} />
    case 'Instagram': return <FaInstagram size={size} />
    case 'YouTube': return <FaYoutube size={size} />
    case 'Medium': return <FaMedium size={size} />
    case 'Dev.to': return <FaDev size={size} />
    case 'Hashnode': return <SiHashnode size={size} />
    case 'Stack Overflow': return <FaStackOverflow size={size} />
    case 'LeetCode': return <SiLeetcode size={size} />
    case 'CodePen': return <FaCodepen size={size} />
    case 'Dribbble': return <FaDribbble size={size} />
    case 'Behance': return <FaBehance size={size} />
    case 'Email': return <FaEnvelope size={size} />
    case 'Website': return <FaGlobe size={size} />
    default: return <FaLink size={size} />
  }
}

interface ContactSectionProps {
  profile: Profile | null
  socialLinks: SocialLink[]
}

export default function ContactSection({ profile, socialLinks }: ContactSectionProps) {
  const [submitted, setSubmitted] = useState(false)
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    try {
      await contactApi.send(data)
      toast.success('Message sent! I\'ll get back to you soon.')
      setSubmitted(true)
      reset()
    } catch {
      toast.error('Failed to send message. Please try again.')
    }
  }

  return (
    <section id="contact" className="section-padding bg-dark-50 dark:bg-dark-900/50">
      <div className="container-custom">
        <SectionHeader
          label="Get In Touch"
          title="Contact"
          titleHighlight="Me"
          subtitle="Have a project in mind or just want to say hi? I'd love to hear from you."
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            <div>
              <h3 className="text-xl font-bold text-dark-900 dark:text-white mb-4">Let&apos;s Talk</h3>
              <p className="text-dark-600 dark:text-dark-300 leading-relaxed">
                I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
            </div>

            <div className="space-y-4">
              {profile?.email && (
                <a href={`mailto:${profile.email}`} className="flex items-center gap-4 group">
                  <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center text-primary-600 dark:text-primary-400 group-hover:bg-primary-200 dark:group-hover:bg-primary-900/50 transition-colors">
                    <Mail size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-dark-400 uppercase tracking-wide">Email</p>
                    <p className="text-sm font-medium text-dark-800 dark:text-dark-200 group-hover:text-primary-500 transition-colors">{profile.email}</p>
                  </div>
                </a>
              )}
              {profile?.phone && (
                <a href={`tel:${profile.phone}`} className="flex items-center gap-4 group">
                  <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center text-primary-600 dark:text-primary-400 group-hover:bg-primary-200 dark:group-hover:bg-primary-900/50 transition-colors">
                    <Phone size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-dark-400 uppercase tracking-wide">Phone</p>
                    <p className="text-sm font-medium text-dark-800 dark:text-dark-200">{profile.phone}</p>
                  </div>
                </a>
              )}
              {profile?.location && (
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center text-primary-600 dark:text-primary-400">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-dark-400 uppercase tracking-wide">Location</p>
                    <p className="text-sm font-medium text-dark-800 dark:text-dark-200">{profile.location}{profile.country ? `, ${profile.country}` : ''}</p>
                  </div>
                </div>
              )}
            </div>

            {socialLinks.filter((s) => s.isVisible).length > 0 && (
              <div>
                <p className="text-sm font-semibold text-dark-700 dark:text-dark-300 mb-3">Find me on</p>
                <div className="flex flex-wrap gap-2">
                  {socialLinks.filter((s) => s.isVisible).map((link) => (
                    <a
                      key={link.id}
                      href={link.platform === 'Email' ? `mailto:${link.url}` : link.url}
                      target={link.platform === 'Email' ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      title={link.displayName || link.platform}
                      className="p-2.5 bg-white dark:bg-dark-800 border border-dark-100 dark:border-dark-700 rounded-xl hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
                      style={{ color: getPlatformColor(link.platform) }}
                    >
                      <SocialIcon platform={link.platform} />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Right form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="bg-white dark:bg-dark-900 rounded-2xl border border-dark-100 dark:border-dark-800 p-8 shadow-card">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="text-5xl mb-4">✉️</div>
                  <h3 className="text-xl font-bold text-dark-900 dark:text-white mb-2">Message Sent!</h3>
                  <p className="text-dark-500 dark:text-dark-400 mb-6">Thanks for reaching out. I&apos;ll get back to you within 24 hours.</p>
                  <button onClick={() => setSubmitted(false)} className="btn-outline">Send Another</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1.5">Name *</label>
                      <input {...register('name')} placeholder="John Doe" className="input-field" />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1.5">Email *</label>
                      <input {...register('email')} type="email" placeholder="john@example.com" className="input-field" />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1.5">Phone</label>
                      <input {...register('phone')} placeholder="+1 234 567 890" className="input-field" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1.5">Company</label>
                      <input {...register('company')} placeholder="Your Company" className="input-field" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1.5">Subject *</label>
                    <input {...register('subject')} placeholder="Project Discussion" className="input-field" />
                    {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1.5">Message *</label>
                    <textarea {...register('message')} rows={5} placeholder="Tell me about your project..." className="input-field resize-none" />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                  </div>
                  <button type="submit" disabled={isSubmitting} className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <><Send size={16} /> Send Message</>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
