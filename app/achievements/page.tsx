'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import AchievementsSection from '@/components/sections/AchievementsSection'
import CertificationsSection from '@/components/sections/CertificationsSection'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { useAchievements, useCertifications, useProfile, useSocialLinks } from '@/hooks/usePortfolio'

export default function AchievementsPage() {
  const { achievements, loading: loadA } = useAchievements()
  const { certifications, loading: loadC } = useCertifications()
  const { profile } = useProfile()
  const { socialLinks } = useSocialLinks()

  if (loadA || loadC) return <LoadingSpinner fullPage />

  return (
    <main>
      <Navbar resumeUrl={profile?.resumeUrl} />
      <div className="pt-16">
        <AchievementsSection achievements={achievements} />
        <CertificationsSection certifications={certifications} />
      </div>
      <Footer profile={profile} socialLinks={socialLinks} />
    </main>
  )
}
