'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon, Download } from 'lucide-react'
import { useTheme } from '@/hooks/usePortfolio'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/#about', label: 'About' },
  { href: '/#skills', label: 'Skills' },
  { href: '/#projects', label: 'Projects' },
  { href: '/#experience', label: 'Experience' },
  { href: '/#education', label: 'Education' },
  { href: '/#achievements', label: 'Achievements' },
  { href: '/#contact', label: 'Contact' },
]

interface NavbarProps {
  resumeUrl?: string | null
}

export default function Navbar({ resumeUrl }: NavbarProps) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { theme, toggle } = useTheme()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/90 dark:bg-dark-950/90 backdrop-blur-md shadow-sm border-b border-dark-100 dark:border-dark-800'
          : 'bg-transparent',
      )}
    >
      <nav className="container-custom flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition-transform">
            PN
          </div>
          <span className="font-bold text-dark-900 dark:text-white text-lg hidden sm:block">
            Portfolio<span className="gradient-text">Nexus</span>
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                pathname === link.href
                  ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                  : 'text-dark-600 dark:text-dark-300 hover:text-dark-900 dark:hover:text-white hover:bg-dark-50 dark:hover:bg-dark-800',
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            className="p-2 rounded-lg text-dark-500 dark:text-dark-400 hover:text-dark-900 dark:hover:text-white hover:bg-dark-100 dark:hover:bg-dark-800 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {resumeUrl && (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl transition-colors"
            >
              <Download size={14} />
              Resume
            </a>
          )}

          <button
            className="lg:hidden p-2 rounded-lg text-dark-500 dark:text-dark-400 hover:bg-dark-100 dark:hover:bg-dark-800 transition-colors"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white dark:bg-dark-950 border-b border-dark-100 dark:border-dark-800"
          >
            <div className="container-custom py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-4 py-3 text-sm font-medium rounded-xl transition-colors',
                    pathname === link.href
                      ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                      : 'text-dark-600 dark:text-dark-300 hover:bg-dark-50 dark:hover:bg-dark-800',
                  )}
                >
                  {link.label}
                </Link>
              ))}
              {resumeUrl && (
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 mt-2 px-4 py-3 bg-primary-600 text-white text-sm font-semibold rounded-xl"
                >
                  <Download size={14} /> Download Resume
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
