'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { ExternalLink, Github, Star, Clock, Eye } from 'lucide-react'
import type { Project, ProjectCategory } from '@/types'
import SectionHeader from '@/components/ui/SectionHeader'
import Badge from '@/components/ui/Badge'
import Card from '@/components/ui/Card'
import { cn, formatDateRange, truncate } from '@/lib/utils'

const statusColor = {
  Completed: 'success' as const,
  'In Progress': 'info' as const,
  Archived: 'default' as const,
  Planned: 'warning' as const,
}

interface ProjectsProps {
  projects: Project[]
}

function ProjectCard({ project, delay }: { project: Project; delay: number }) {
  return (
    <Card delay={delay} className="overflow-hidden flex flex-col group">
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary-900 to-accent-900">
        {project.imageUrl ? (
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl opacity-30">
            {project.category === 'Mobile' ? '📱' : project.category === 'API' ? '🔌' : '🌐'}
          </div>
        )}
        <div className="absolute top-3 right-3 flex gap-2">
          {project.featured && (
            <span className="bg-yellow-500/90 text-yellow-900 text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <Star size={10} fill="currentColor" /> Featured
            </span>
          )}
          <Badge variant={statusColor[project.status] ?? 'default'} size="sm">{project.status}</Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-bold text-dark-900 dark:text-white text-lg leading-tight">{project.title}</h3>
            <Badge variant="default" size="sm">{project.category}</Badge>
          </div>
          <p className="text-dark-500 dark:text-dark-400 text-sm leading-relaxed">
            {truncate(project.shortDescription || project.description, 120)}
          </p>
        </div>

        {(project.startDate || project.endDate) && (
          <p className="text-xs text-dark-400 flex items-center gap-1">
            <Clock size={12} />
            {formatDateRange(project.startDate!, project.endDate, false)}
          </p>
        )}

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 6).map((tech) => (
            <span key={tech} className="text-xs bg-dark-100 dark:bg-dark-800 text-dark-600 dark:text-dark-300 px-2 py-0.5 rounded-md font-mono">
              {tech}
            </span>
          ))}
          {project.techStack.length > 6 && (
            <span className="text-xs text-dark-400">+{project.techStack.length - 6} more</span>
          )}
        </div>

        {/* Links */}
        <div className="flex items-center gap-3 mt-auto pt-3 border-t border-dark-100 dark:border-dark-800">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-primary-500 hover:text-primary-400 transition-colors font-medium"
            >
              <Eye size={14} /> Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-dark-500 dark:text-dark-400 hover:text-dark-800 dark:hover:text-white transition-colors font-medium ml-auto"
            >
              <Github size={14} /> Source
            </a>
          )}
        </div>
      </div>
    </Card>
  )
}

export default function ProjectsSection({ projects }: ProjectsProps) {
  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))] as Array<'All' | ProjectCategory>
  const [filter, setFilter] = useState<'All' | ProjectCategory>('All')

  const shown = filter === 'All' ? projects : projects.filter((p) => p.category === filter)

  return (
    <section id="projects" className="section-padding bg-dark-50 dark:bg-dark-900/50">
      <div className="container-custom">
        <SectionHeader
          label="What I've Built"
          title="My"
          titleHighlight="Projects"
          subtitle="A collection of projects showcasing my skills and passion for building things."
        />

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={cn(
                'px-4 py-2 rounded-xl text-sm font-medium transition-all',
                filter === cat
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'bg-white dark:bg-dark-800 text-dark-600 dark:text-dark-300 hover:bg-dark-100 dark:hover:bg-dark-700 border border-dark-100 dark:border-dark-700',
              )}
            >
              {cat} {cat === 'All' ? `(${projects.length})` : `(${projects.filter((p) => p.category === cat).length})`}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shown.map((project, i) => (
            <ProjectCard key={project.id} project={project} delay={i * 0.1} />
          ))}
        </div>

        {shown.length === 0 && (
          <div className="text-center py-16 text-dark-400">
            <p className="text-lg">No projects found in this category.</p>
          </div>
        )}
      </div>
    </section>
  )
}
