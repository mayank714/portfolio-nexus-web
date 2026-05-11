'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ExperienceSection from '@/components/sections/ExperienceSection'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { useExperience, useProfile, useSocialLinks } from '@/hooks/usePortfolio'

export default function ExperiencePage() {
  const { experiences, loading } = useExperience()
  const { profile } = useProfile()
  const { socialLinks } = useSocialLinks()

  if (loading) return <LoadingSpinner fullPage />

  return (
    <main>
      <Navbar resumeUrl={profile?.resumeUrl} />
      <div className="pt-16">
        <ExperienceSection experiences={experiences} />
      </div>
      <Footer profile={profile} socialLinks={socialLinks} />
    </main>
  )
}
