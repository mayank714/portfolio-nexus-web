import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format, formatDistanceToNow, parseISO } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateStr: string | null | undefined, fmt = 'MMM yyyy'): string {
  if (!dateStr) return ''
  try {
    return format(parseISO(dateStr), fmt)
  } catch {
    return dateStr
  }
}

export function formatDateRange(startDate: string, endDate: string | null, current: boolean): string {
  const start = formatDate(startDate)
  const end = current ? 'Present' : endDate ? formatDate(endDate) : 'Present'
  return `${start} — ${end}`
}

export function timeAgo(dateStr: string): string {
  try {
    return formatDistanceToNow(parseISO(dateStr), { addSuffix: true })
  } catch {
    return dateStr
  }
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength).trimEnd() + '…'
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function proficiencyToPercent(level: string, override?: number | null): number {
  if (override != null) return override
  const map: Record<string, number> = {
    Beginner: 25,
    Intermediate: 55,
    Advanced: 80,
    Expert: 95,
  }
  return map[level] ?? 50
}

export function getPlatformIcon(platform: string): string {
  const icons: Record<string, string> = {
    GitHub: 'FaGithub',
    LinkedIn: 'FaLinkedin',
    Twitter: 'FaTwitter',
    Instagram: 'FaInstagram',
    YouTube: 'FaYoutube',
    Medium: 'FaMedium',
    'Dev.to': 'FaDev',
    Hashnode: 'SiHashnode',
    'Stack Overflow': 'FaStackOverflow',
    LeetCode: 'SiLeetcode',
    HackerRank: 'FaHackerrank',
    CodePen: 'FaCodepen',
    Dribbble: 'FaDribbble',
    Behance: 'FaBehance',
    Website: 'FaGlobe',
    Email: 'FaEnvelope',
  }
  return icons[platform] ?? 'FaLink'
}

export function getPlatformColor(platform: string): string {
  const colors: Record<string, string> = {
    GitHub: '#333',
    LinkedIn: '#0A66C2',
    Twitter: '#1DA1F2',
    Instagram: '#E4405F',
    YouTube: '#FF0000',
    Medium: '#000000',
    'Dev.to': '#0A0A0A',
    Hashnode: '#2962FF',
    'Stack Overflow': '#F58025',
    LeetCode: '#FFA116',
    HackerRank: '#2EC866',
    CodePen: '#000000',
    Dribbble: '#EA4C89',
    Behance: '#1769FF',
    Website: '#4F46E5',
    Email: '#EA4335',
  }
  return colors[platform] ?? '#64748b'
}

export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    Frontend: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    Backend: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    Database: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
    DevOps: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
    Mobile: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300',
    Cloud: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300',
    Tools: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
    Languages: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
    Frameworks: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300',
    Testing: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300',
    Other: 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300',
  }
  return colors[category] ?? colors.Other
}

export function getAchievementIcon(category: string): string {
  const icons: Record<string, string> = {
    Award: '🏆',
    Hackathon: '💻',
    Competition: '🥇',
    Scholarship: '🎓',
    Recognition: '⭐',
    Publication: '📄',
    Speaking: '🎤',
    'Open Source': '🌐',
    Community: '🤝',
    Milestone: '🎯',
    Other: '✨',
  }
  return icons[category] ?? '✨'
}

export function isExpired(dateStr: string | null): boolean {
  if (!dateStr) return false
  return new Date(dateStr) < new Date()
}

export function groupBy<T>(arr: T[], key: keyof T): Record<string, T[]> {
  return arr.reduce((acc, item) => {
    const group = String(item[key])
    if (!acc[group]) acc[group] = []
    acc[group].push(item)
    return acc
  }, {} as Record<string, T[]>)
}
