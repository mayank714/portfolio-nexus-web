'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  User, Code, Briefcase, GraduationCap, Trophy, Award, MessageSquare,
  Link as LinkIcon, Settings, LogOut, BarChart2, Eye, Mail, ChevronRight,
} from 'lucide-react'
import toast from 'react-hot-toast'
import AdminLogin from '@/components/admin/AdminLogin'
import {
  profileApi, skillsApi, projectsApi, experienceApi, educationApi,
  achievementsApi, certificationsApi, testimonialsApi, contactApi, socialLinksApi,
} from '@/lib/api'

interface AdminUser {
  id: string
  email: string
  name: string
}

interface Stats {
  skills: number
  projects: number
  experience: number
  education: number
  achievements: number
  certifications: number
  testimonials: number
  messages: number
  socialLinks: number
}

const navItems = [
  { id: 'overview', label: 'Overview', icon: BarChart2 },
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'skills', label: 'Skills', icon: Code },
  { id: 'projects', label: 'Projects', icon: Eye },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'achievements', label: 'Achievements', icon: Trophy },
  { id: 'certifications', label: 'Certifications', icon: Award },
  { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
  { id: 'messages', label: 'Messages', icon: Mail },
  { id: 'social', label: 'Social Links', icon: LinkIcon },
]

const statCards = (s: Stats) => [
  { label: 'Skills', value: s.skills, icon: Code, color: 'from-blue-500 to-blue-600' },
  { label: 'Projects', value: s.projects, icon: Eye, color: 'from-purple-500 to-purple-600' },
  { label: 'Experience', value: s.experience, icon: Briefcase, color: 'from-green-500 to-green-600' },
  { label: 'Education', value: s.education, icon: GraduationCap, color: 'from-yellow-500 to-orange-500' },
  { label: 'Achievements', value: s.achievements, icon: Trophy, color: 'from-red-500 to-pink-500' },
  { label: 'Certifications', value: s.certifications, icon: Award, color: 'from-cyan-500 to-teal-500' },
  { label: 'Testimonials', value: s.testimonials, icon: MessageSquare, color: 'from-indigo-500 to-violet-500' },
  { label: 'Messages', value: s.messages, icon: Mail, color: 'from-rose-500 to-red-500' },
]

export default function AdminPage() {
  const [admin, setAdmin] = useState<AdminUser | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [activeSection, setActiveSection] = useState('overview')
  const [stats, setStats] = useState<Stats | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    const savedToken = localStorage.getItem('admin_token')
    const savedAdmin = localStorage.getItem('admin_user')
    if (savedToken && savedAdmin) {
      setToken(savedToken)
      setAdmin(JSON.parse(savedAdmin))
    }
  }, [])

  useEffect(() => {
    if (!token) return
    Promise.allSettled([
      skillsApi.getAll(), projectsApi.getAll(), experienceApi.getAll(),
      educationApi.getAll(), achievementsApi.getAll(), certificationsApi.getAll(),
      testimonialsApi.getAll(), contactApi.getAll(), socialLinksApi.getAll(),
    ]).then(([skills, projects, exp, edu, ach, certs, test, msgs, social]) => {
      setStats({
        skills: skills.status === 'fulfilled' ? (skills.value as any[]).length : 0,
        projects: projects.status === 'fulfilled' ? (projects.value as any[]).length : 0,
        experience: exp.status === 'fulfilled' ? (exp.value as any[]).length : 0,
        education: edu.status === 'fulfilled' ? (edu.value as any[]).length : 0,
        achievements: ach.status === 'fulfilled' ? (ach.value as any[]).length : 0,
        certifications: certs.status === 'fulfilled' ? (certs.value as any[]).length : 0,
        testimonials: test.status === 'fulfilled' ? (test.value as any[]).length : 0,
        messages: msgs.status === 'fulfilled' ? (msgs.value as any[]).length : 0,
        socialLinks: social.status === 'fulfilled' ? (social.value as any[]).length : 0,
      })
    })
  }, [token])

  const handleLogin = (t: string, a: AdminUser) => {
    localStorage.setItem('admin_token', t)
    localStorage.setItem('admin_user', JSON.stringify(a))
    setToken(t)
    setAdmin(a)
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_user')
    setToken(null)
    setAdmin(null)
    toast.success('Logged out successfully')
  }

  if (!token || !admin) {
    return <AdminLogin onLogin={handleLogin} />
  }

  return (
    <div className="min-h-screen bg-dark-950 flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-60' : 'w-16'} transition-all duration-300 bg-dark-900 border-r border-dark-800 flex flex-col shrink-0`}>
        <div className="p-4 border-b border-dark-800 flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center text-white font-bold text-sm shrink-0">
            PN
          </div>
          {sidebarOpen && <span className="font-bold text-white text-sm">Portfolio Nexus</span>}
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                activeSection === item.id
                  ? 'bg-primary-600 text-white'
                  : 'text-dark-400 hover:text-white hover:bg-dark-800'
              }`}
              title={!sidebarOpen ? item.label : undefined}
            >
              <item.icon size={16} className="shrink-0" />
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-dark-800">
          {sidebarOpen && (
            <div className="flex items-center gap-2 px-3 py-2 mb-2">
              <div className="w-7 h-7 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">
                {admin.name[0]?.toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-xs font-medium truncate">{admin.name}</p>
                <p className="text-dark-500 text-xs truncate">{admin.email}</p>
              </div>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-dark-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
            title={!sidebarOpen ? 'Logout' : undefined}
          >
            <LogOut size={16} className="shrink-0" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        {/* Top bar */}
        <div className="sticky top-0 bg-dark-950/80 backdrop-blur-md border-b border-dark-800 px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen((v) => !v)}
              className="p-2 text-dark-400 hover:text-white hover:bg-dark-800 rounded-lg transition-colors"
            >
              <ChevronRight size={18} className={`transition-transform ${sidebarOpen ? 'rotate-180' : ''}`} />
            </button>
            <div>
              <h1 className="text-white font-semibold capitalize">{activeSection === 'overview' ? 'Dashboard Overview' : `Manage ${activeSection}`}</h1>
              <p className="text-dark-400 text-xs">Portfolio Nexus Admin</p>
            </div>
          </div>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-primary-400 hover:text-primary-300 transition-colors"
          >
            <Eye size={14} /> View Portfolio
          </a>
        </div>

        <div className="p-6">
          {activeSection === 'overview' && stats && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="mb-6">
                <h2 className="text-xl font-bold text-white">Welcome back, {admin.name}! 👋</h2>
                <p className="text-dark-400 mt-1">Here&apos;s a snapshot of your portfolio data.</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {statCards(stats).map((card) => (
                  <motion.div
                    key={card.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-dark-900 border border-dark-800 rounded-2xl p-5 hover:border-dark-700 transition-colors"
                  >
                    <div className={`w-10 h-10 bg-gradient-to-br ${card.color} rounded-xl flex items-center justify-center mb-3`}>
                      <card.icon size={18} className="text-white" />
                    </div>
                    <div className="text-3xl font-bold text-white">{card.value}</div>
                    <div className="text-dark-400 text-sm mt-1">{card.label}</div>
                  </motion.div>
                ))}
              </div>

              <div className="bg-dark-900 border border-dark-800 rounded-2xl p-6">
                <h3 className="text-white font-semibold mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {navItems.filter((n) => n.id !== 'overview').map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className="flex items-center gap-2 p-3 bg-dark-800 hover:bg-dark-700 rounded-xl text-sm text-dark-300 hover:text-white transition-colors text-left"
                    >
                      <item.icon size={14} className="text-primary-400 shrink-0" />
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeSection !== 'overview' && (
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-dark-900 border border-dark-800 rounded-2xl p-8 text-center"
            >
              <div className="text-5xl mb-4">🚧</div>
              <h2 className="text-xl font-bold text-white mb-2 capitalize">{activeSection} Management</h2>
              <p className="text-dark-400 max-w-md mx-auto">
                This section is ready for CRUD operations. Connect to the API endpoints at{' '}
                <code className="text-primary-400 text-sm bg-dark-800 px-2 py-0.5 rounded">/api/v1/{activeSection === 'social' ? 'social-links' : activeSection}</code>
                {' '}to implement full management functionality.
              </p>
              <p className="text-dark-500 text-sm mt-4">
                Use the Swagger docs at{' '}
                <a
                  href="http://localhost:3001/api/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-400 hover:underline"
                >
                  http://localhost:3001/api/docs
                </a>
                {' '}to explore all available endpoints.
              </p>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  )
}
