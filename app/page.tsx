'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import SkillsSection from '@/components/sections/SkillsSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import ExperienceSection from '@/components/sections/ExperienceSection'
import EducationSection from '@/components/sections/EducationSection'
import AchievementsSection from '@/components/sections/AchievementsSection'
import CertificationsSection from '@/components/sections/CertificationsSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import ContactSection from '@/components/sections/ContactSection'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { usePortfolioData } from '@/hooks/usePortfolio'

export default function HomePage() {
  const {
    profile, skills, groupedSkills, skillCategories,
    projects, experiences, education, achievements, certifications,
    testimonials, socialLinks, loading,
  } = usePortfolioData()

  if (loading) return <LoadingSpinner fullPage />

  return (
    <main className="overflow-x-hidden">
      <Navbar resumeUrl={profile?.resumeUrl} />

      <HeroSection profile={profile} socialLinks={socialLinks} />
      <AboutSection profile={profile} />
      <SkillsSection skills={skills} grouped={groupedSkills} categories={skillCategories} />
      <ProjectsSection projects={projects} />
      <ExperienceSection experiences={experiences} />
      <EducationSection education={education} />
      <AchievementsSection achievements={achievements} />
      <CertificationsSection certifications={certifications} />
      <TestimonialsSection testimonials={testimonials} />
      <ContactSection profile={profile} socialLinks={socialLinks} />

      <Footer profile={profile} socialLinks={socialLinks} />
    </main>
  )
}
