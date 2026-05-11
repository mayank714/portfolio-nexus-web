'use client'

import Link from 'next/link'
import { Heart } from 'lucide-react'
import type { Profile, SocialLink } from '@/types'
import { getPlatformColor } from '@/lib/utils'
import {
  FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaYoutube,
  FaMedium, FaDev, FaStackOverflow, FaCodepen, FaDribbble, FaBehance,
  FaEnvelope, FaGlobe, FaLink,
} from 'react-icons/fa'
import { SiHashnode, SiLeetcode } from 'react-icons/si'

function SocialIcon({ platform }: { platform: string }) {
  const props = { size: 18 }
  switch (platform) {
    case 'GitHub': return <FaGithub {...props} />
    case 'LinkedIn': return <FaLinkedin {...props} />
    case 'Twitter': return <FaTwitter {...props} />
    case 'Instagram': return <FaInstagram {...props} />
    case 'YouTube': return <FaYoutube {...props} />
    case 'Medium': return <FaMedium {...props} />
    case 'Dev.to': return <FaDev {...props} />
    case 'Hashnode': return <SiHashnode {...props} />
    case 'Stack Overflow': return <FaStackOverflow {...props} />
    case 'LeetCode': return <SiLeetcode {...props} />
    case 'CodePen': return <FaCodepen {...props} />
    case 'Dribbble': return <FaDribbble {...props} />
    case 'Behance': return <FaBehance {...props} />
    case 'Email': return <FaEnvelope {...props} />
    case 'Website': return <FaGlobe {...props} />
    default: return <FaLink {...props} />
  }
}

interface FooterProps {
  profile: Profile | null
  socialLinks: SocialLink[]
}

export default function Footer({ profile, socialLinks }: FooterProps) {
  const name = profile ? `${profile.firstName} ${profile.lastName}` : 'Portfolio Nexus'

  return (
    <footer className="bg-dark-950 border-t border-dark-800 text-dark-400">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                PN
              </div>
              <span className="font-bold text-white text-lg">Portfolio<span className="gradient-text">Nexus</span></span>
            </div>
            <p className="text-sm leading-relaxed">{profile?.shortBio || profile?.bio?.slice(0, 120) || 'A dynamic portfolio showcasing skills, projects, and professional journey.'}</p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/#about', label: 'About' },
                { href: '/#skills', label: 'Skills' },
                { href: '/#projects', label: 'Projects' },
                { href: '/#experience', label: 'Experience' },
                { href: '/#education', label: 'Education' },
                { href: '/#contact', label: 'Contact' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-primary-400 transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Connect</h3>
            <div className="flex flex-wrap gap-3">
              {socialLinks.filter((s) => s.isVisible).map((link) => (
                <a
                  key={link.id}
                  href={link.platform === 'Email' ? `mailto:${link.url}` : link.url}
                  target={link.platform === 'Email' ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  title={link.displayName || link.platform}
                  className="p-2.5 bg-dark-800 rounded-lg hover:bg-dark-700 transition-colors"
                  style={{ color: getPlatformColor(link.platform) }}
                >
                  <SocialIcon platform={link.platform} />
                </a>
              ))}
            </div>
            {profile?.email && (
              <p className="mt-4 text-sm">
                <a href={`mailto:${profile.email}`} className="hover:text-primary-400 transition-colors">
                  {profile.email}
                </a>
              </p>
            )}
          </div>
        </div>

        <div className="border-t border-dark-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Built with <Heart size={14} className="text-red-500 fill-red-500" /> using Next.js & NestJS
          </p>
        </div>
      </div>
    </footer>
  )
}
