'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CertificationsSection from '@/components/sections/CertificationsSection'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { useCertifications, useProfile, useSocialLinks } from '@/hooks/usePortfolio'

export default function CertificationsPage() {
  const { certifications, loading } = useCertifications()
  const { profile } = useProfile()
  const { socialLinks } = useSocialLinks()

  if (loading) return <LoadingSpinner fullPage />

  return (
    <main>
      <Navbar resumeUrl={profile?.resumeUrl} />
      <div className="pt-16">
        <CertificationsSection certifications={certifications} />
      </div>
      <Footer profile={profile} socialLinks={socialLinks} />
    </main>
  )
}
