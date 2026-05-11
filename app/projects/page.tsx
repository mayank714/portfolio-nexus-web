'use client'

import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ProjectsSection from '@/components/sections/ProjectsSection'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { useProjects, useSocialLinks, useProfile } from '@/hooks/usePortfolio'

export default function ProjectsPage() {
  const { projects, loading } = useProjects()
  const { profile } = useProfile()
  const { socialLinks } = useSocialLinks()

  if (loading) return <LoadingSpinner fullPage />

  return (
    <main>
      <Navbar resumeUrl={profile?.resumeUrl} />
      <div className="pt-16">
        <ProjectsSection projects={projects} />
      </div>
      <Footer profile={profile} socialLinks={socialLinks} />
    </main>
  )
}
