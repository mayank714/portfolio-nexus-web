// ─── Profile ──────────────────────────────────────────────────────────────────
export interface Profile {
  id: string
  firstName: string
  lastName: string
  title: string
  bio: string
  shortBio: string | null
  email: string | null
  phone: string | null
  location: string | null
  country: string | null
  avatarUrl: string | null
  resumeUrl: string | null
  yearsOfExperience: number | null
  openToWork: boolean | null
  languages: string[] | null
  interests: string[] | null
  createdAt: string
  updatedAt: string
}

// ─── Skill ────────────────────────────────────────────────────────────────────
export type SkillCategory =
  | 'Frontend' | 'Backend' | 'Database' | 'DevOps' | 'Mobile'
  | 'Cloud' | 'Tools' | 'Languages' | 'Frameworks' | 'Testing' | 'Other'

export type ProficiencyLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'

export interface Skill {
  id: string
  name: string
  category: SkillCategory
  proficiency: ProficiencyLevel
  proficiencyPercent: number | null
  iconUrl: string | null
  color: string | null
  yearsOfExperience: number
  isVisible: boolean
  sortOrder: number
  createdAt: string
  updatedAt: string
}

// ─── Project ──────────────────────────────────────────────────────────────────
export type ProjectStatus = 'Completed' | 'In Progress' | 'Archived' | 'Planned'

export type ProjectCategory =
  | 'Web' | 'Mobile' | 'Desktop' | 'API' | 'Data Science' | 'ML/AI' | 'Open Source' | 'Other'

export interface Project {
  id: string
  title: string
  description: string
  shortDescription: string | null
  techStack: string[]
  imageUrl: string | null
  screenshots: string[] | null
  liveUrl: string | null
  githubUrl: string | null
  demoVideoUrl: string | null
  status: ProjectStatus
  category: ProjectCategory
  featured: boolean
  startDate: string | null
  endDate: string | null
  likes: number
  isVisible: boolean
  sortOrder: number
  createdAt: string
  updatedAt: string
}

// ─── Work Experience ──────────────────────────────────────────────────────────
export type EmploymentType =
  | 'Full-time' | 'Part-time' | 'Contract' | 'Freelance'
  | 'Internship' | 'Apprenticeship' | 'Self-employed'

export interface WorkExperience {
  id: string
  company: string
  companyLogoUrl: string | null
  companyUrl: string | null
  position: string
  description: string
  responsibilities: string[] | null
  achievements: string[] | null
  techStack: string[] | null
  employmentType: EmploymentType
  location: string | null
  remote: boolean
  startDate: string
  endDate: string | null
  current: boolean
  isVisible: boolean
  sortOrder: number
  createdAt: string
  updatedAt: string
}

// ─── Education ────────────────────────────────────────────────────────────────
export type DegreeType =
  | 'High School' | 'Diploma' | "Associate's" | "Bachelor's" | "Master's"
  | 'PhD' | 'Post-Doctoral' | 'Certification Course' | 'Bootcamp' | 'Online Course' | 'Other'

export interface Education {
  id: string
  institution: string
  institutionLogoUrl: string | null
  institutionUrl: string | null
  degree: string
  degreeType: DegreeType
  fieldOfStudy: string
  grade: string | null
  gradeScale: string | null
  location: string | null
  startDate: string
  endDate: string | null
  current: boolean
  description: string | null
  activities: string[] | null
  subjects: string[] | null
  honors: string[] | null
  isVisible: boolean
  sortOrder: number
  createdAt: string
  updatedAt: string
}

// ─── Achievement ──────────────────────────────────────────────────────────────
export type AchievementCategory =
  | 'Award' | 'Hackathon' | 'Competition' | 'Scholarship' | 'Recognition'
  | 'Publication' | 'Speaking' | 'Open Source' | 'Community' | 'Milestone' | 'Other'

export interface Achievement {
  id: string
  title: string
  description: string
  category: AchievementCategory
  organization: string | null
  organizationLogoUrl: string | null
  date: string
  url: string | null
  imageUrl: string | null
  rank: string | null
  featured: boolean
  isVisible: boolean
  sortOrder: number
  createdAt: string
  updatedAt: string
}

// ─── Certification ────────────────────────────────────────────────────────────
export interface Certification {
  id: string
  name: string
  issuer: string
  issuerLogoUrl: string | null
  issueDate: string
  expiryDate: string | null
  doesNotExpire: boolean
  credentialId: string | null
  credentialUrl: string | null
  imageUrl: string | null
  skills: string[] | null
  featured: boolean
  isVisible: boolean
  sortOrder: number
  createdAt: string
  updatedAt: string
}

// ─── Testimonial ──────────────────────────────────────────────────────────────
export type RelationshipType =
  | 'Colleague' | 'Manager' | 'Direct Report' | 'Client'
  | 'Mentor' | 'Mentee' | 'Professor' | 'Classmate' | 'Other'

export interface Testimonial {
  id: string
  name: string
  position: string
  company: string
  avatarUrl: string | null
  linkedinUrl: string | null
  content: string
  rating: number
  relationship: RelationshipType
  approved: boolean
  featured: boolean
  isVisible: boolean
  sortOrder: number
  createdAt: string
  updatedAt: string
}

// ─── Social Link ──────────────────────────────────────────────────────────────
export type SocialPlatform =
  | 'GitHub' | 'LinkedIn' | 'Twitter' | 'Instagram' | 'YouTube'
  | 'Medium' | 'Dev.to' | 'Hashnode' | 'Stack Overflow' | 'LeetCode'
  | 'HackerRank' | 'CodePen' | 'Dribbble' | 'Behance' | 'Website' | 'Email' | 'Other'

export interface SocialLink {
  id: string
  platform: SocialPlatform
  url: string
  displayName: string | null
  iconClass: string | null
  color: string | null
  isVisible: boolean
  sortOrder: number
  createdAt: string
  updatedAt: string
}

// ─── Contact Message ──────────────────────────────────────────────────────────
export type MessageStatus = 'Unread' | 'Read' | 'Replied' | 'Archived' | 'Spam'

export interface ContactMessage {
  id: string
  name: string
  email: string
  phone: string | null
  subject: string
  message: string
  company: string | null
  status: MessageStatus
  ipAddress: string | null
  adminNotes: string | null
  repliedAt: string | null
  createdAt: string
  updatedAt: string
}

// ─── Contact Form DTO ─────────────────────────────────────────────────────────
export interface CreateContactMessageDto {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  company?: string
}

// ─── Auth ─────────────────────────────────────────────────────────────────────
export interface LoginDto {
  email: string
  password: string
}

export interface AuthResponse {
  access_token: string
  admin: {
    id: string
    email: string
    name: string
  }
}

// ─── API Response Wrapper ─────────────────────────────────────────────────────
export interface ApiResponse<T> {
  statusCode: number
  message: string
  data: T
  timestamp: string
}

// ─── Grouped Skills ───────────────────────────────────────────────────────────
export type GroupedSkills = Record<SkillCategory, Skill[]>

// ─── Portfolio Data (full page load) ─────────────────────────────────────────
export interface PortfolioData {
  profile: Profile | null
  skills: Skill[]
  projects: Project[]
  experiences: WorkExperience[]
  education: Education[]
  achievements: Achievement[]
  certifications: Certification[]
  testimonials: Testimonial[]
  socialLinks: SocialLink[]
}
