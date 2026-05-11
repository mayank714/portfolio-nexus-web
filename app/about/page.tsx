'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import AboutSection from '@/components/sections/AboutSection'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { useProfile, useSocialLinks } from '@/hooks/usePortfolio'

export default function AboutPage() {
  const { profile, loading } = useProfile()
  const { socialLinks } = useSocialLinks()

  if (loading) return <LoadingSpinner fullPage />

  return (
    <main>
      <Navbar resumeUrl={profile?.resumeUrl} />
      <div className="pt-16">
        <AboutSection profile={profile} />
      </div>
      <Footer profile={profile} socialLinks={socialLinks} />
    </main>
  )
}
