'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  profileApi, skillsApi, projectsApi, experienceApi, educationApi,
  achievementsApi, certificationsApi, testimonialsApi, socialLinksApi,
} from '@/lib/api'
import { groupBy } from '@/lib/utils'
import type {
  Profile, Skill, Project, WorkExperience, Education, Achievement,
  Certification, Testimonial, SocialLink, SkillCategory, GroupedSkills,
} from '@/types'

export function useProfile() {
  const [data, setData] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    profileApi.get()
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  return { profile: data, loading, error }
}

export function useSkills() {
  const [data, setData] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    skillsApi.getAll()
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  const grouped = groupBy(data, 'category') as GroupedSkills
  const categories = Object.keys(grouped) as SkillCategory[]

  return { skills: data, grouped, categories, loading, error }
}

export function useProjects(featuredOnly = false) {
  const [data, setData] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fn = featuredOnly ? projectsApi.getFeatured : projectsApi.getAll
    fn()
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [featuredOnly])

  return { projects: data, loading, error }
}

export function useExperience() {
  const [data, setData] = useState<WorkExperience[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    experienceApi.getAll()
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  return { experiences: data, loading, error }
}

export function useEducation() {
  const [data, setData] = useState<Education[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    educationApi.getAll()
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  return { education: data, loading, error }
}

export function useAchievements() {
  const [data, setData] = useState<Achievement[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    achievementsApi.getAll()
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  return { achievements: data, loading, error }
}

export function useCertifications() {
  const [data, setData] = useState<Certification[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    certificationsApi.getAll()
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  return { certifications: data, loading, error }
}

export function useTestimonials() {
  const [data, setData] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    testimonialsApi.getApproved()
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  return { testimonials: data, loading, error }
}

export function useSocialLinks() {
  const [data, setData] = useState<SocialLink[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    socialLinksApi.getAll()
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  return { socialLinks: data, loading, error }
}

export function usePortfolioData() {
  const profile = useProfile()
  const skills = useSkills()
  const projects = useProjects()
  const experience = useExperience()
  const education = useEducation()
  const achievements = useAchievements()
  const certifications = useCertifications()
  const testimonials = useTestimonials()
  const socialLinks = useSocialLinks()

  const loading =
    profile.loading || skills.loading || projects.loading || experience.loading ||
    education.loading || achievements.loading || certifications.loading ||
    testimonials.loading || socialLinks.loading

  return {
    profile: profile.profile,
    skills: skills.skills,
    groupedSkills: skills.grouped,
    skillCategories: skills.categories,
    projects: projects.projects,
    experiences: experience.experiences,
    education: education.education,
    achievements: achievements.achievements,
    certifications: certifications.certifications,
    testimonials: testimonials.testimonials,
    socialLinks: socialLinks.socialLinks,
    loading,
  }
}

export function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')

  useEffect(() => {
    const stored = localStorage.getItem('theme') as 'light' | 'dark' | null
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const initial = stored ?? (prefersDark ? 'dark' : 'light')
    setTheme(initial)
    document.documentElement.classList.toggle('dark', initial === 'dark')
  }, [])

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark'
      localStorage.setItem('theme', next)
      document.documentElement.classList.toggle('dark', next === 'dark')
      return next
    })
  }, [])

  return { theme, toggle }
}

export function useIntersectionObserver(threshold = 0.1) {
  const [isVisible, setIsVisible] = useState(false)
  const [ref, setRef] = useState<HTMLElement | null>(null)

  useEffect(() => {
    if (!ref) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold },
    )
    observer.observe(ref)
    return () => observer.disconnect()
  }, [ref, threshold])

  return { ref: setRef, isVisible }
}
