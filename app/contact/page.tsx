'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ContactSection from '@/components/sections/ContactSection'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { useProfile, useSocialLinks } from '@/hooks/usePortfolio'

export default function ContactPage() {
  const { profile, loading } = useProfile()
  const { socialLinks } = useSocialLinks()

  if (loading) return <LoadingSpinner fullPage />

  return (
    <main>
      <Navbar resumeUrl={profile?.resumeUrl} />
      <div className="pt-16">
        <ContactSection profile={profile} socialLinks={socialLinks} />
      </div>
      <Footer profile={profile} socialLinks={socialLinks} />
    </main>
  )
}
