'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import EducationSection from '@/components/sections/EducationSection'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { useEducation, useProfile, useSocialLinks } from '@/hooks/usePortfolio'

export default function EducationPage() {
  const { education, loading } = useEducation()
  const { profile } = useProfile()
  const { socialLinks } = useSocialLinks()

  if (loading) return <LoadingSpinner fullPage />

  return (
    <main>
      <Navbar resumeUrl={profile?.resumeUrl} />
      <div className="pt-16">
        <EducationSection education={education} />
      </div>
      <Footer profile={profile} socialLinks={socialLinks} />
    </main>
  )
}
