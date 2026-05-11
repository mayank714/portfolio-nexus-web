'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { useTestimonials, useProfile, useSocialLinks } from '@/hooks/usePortfolio'

export default function TestimonialsPage() {
  const { testimonials, loading } = useTestimonials()
  const { profile } = useProfile()
  const { socialLinks } = useSocialLinks()

  if (loading) return <LoadingSpinner fullPage />

  return (
    <main>
      <Navbar resumeUrl={profile?.resumeUrl} />
      <div className="pt-16">
        <TestimonialsSection testimonials={testimonials} />
      </div>
      <Footer profile={profile} socialLinks={socialLinks} />
    </main>
  )
}
