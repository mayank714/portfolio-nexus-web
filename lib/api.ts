import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import {
  ApiResponse, Profile, Skill, Project, WorkExperience, Education,
  Achievement, Certification, Testimonial, SocialLink, ContactMessage,
  CreateContactMessageDto, AuthResponse, LoginDto,
} from '@/types'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1'

const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
})

apiClient.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('admin_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('admin_token')
      localStorage.removeItem('admin_user')
    }
    return Promise.reject(error)
  },
)

async function get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const response = await apiClient.get<ApiResponse<T>>(url, config)
  return response.data.data
}

async function post<T>(url: string, data?: unknown): Promise<T> {
  const response = await apiClient.post<ApiResponse<T>>(url, data)
  return response.data.data
}

async function patch<T>(url: string, data?: unknown): Promise<T> {
  const response = await apiClient.patch<ApiResponse<T>>(url, data)
  return response.data.data
}

async function del<T>(url: string): Promise<T> {
  const response = await apiClient.delete<ApiResponse<T>>(url)
  return response.data.data
}

// ─── Auth ──────────────────────────────────────────────────────────────────────
export const authApi = {
  login: (dto: LoginDto) => post<AuthResponse>('/auth/login', dto),
}

// ─── Profile ──────────────────────────────────────────────────────────────────
export const profileApi = {
  get: () => get<Profile>('/profile'),
  create: (data: Partial<Profile>) => post<Profile>('/profile', data),
  update: (id: string, data: Partial<Profile>) => patch<Profile>(`/profile/${id}`, data),
  delete: (id: string) => del<void>(`/profile/${id}`),
}

// ─── Skills ───────────────────────────────────────────────────────────────────
export const skillsApi = {
  getAll: () => get<Skill[]>('/skills'),
  getVisible: () => get<Skill[]>('/skills?visible=true'),
  getById: (id: string) => get<Skill>(`/skills/${id}`),
  create: (data: Partial<Skill>) => post<Skill>('/skills', data),
  update: (id: string, data: Partial<Skill>) => patch<Skill>(`/skills/${id}`, data),
  delete: (id: string) => del<void>(`/skills/${id}`),
}

// ─── Projects ─────────────────────────────────────────────────────────────────
export const projectsApi = {
  getAll: () => get<Project[]>('/projects'),
  getFeatured: () => get<Project[]>('/projects?featured=true'),
  getById: (id: string) => get<Project>(`/projects/${id}`),
  create: (data: Partial<Project>) => post<Project>('/projects', data),
  update: (id: string, data: Partial<Project>) => patch<Project>(`/projects/${id}`, data),
  delete: (id: string) => del<void>(`/projects/${id}`),
}

// ─── Experience ───────────────────────────────────────────────────────────────
export const experienceApi = {
  getAll: () => get<WorkExperience[]>('/experience'),
  getById: (id: string) => get<WorkExperience>(`/experience/${id}`),
  create: (data: Partial<WorkExperience>) => post<WorkExperience>('/experience', data),
  update: (id: string, data: Partial<WorkExperience>) => patch<WorkExperience>(`/experience/${id}`, data),
  delete: (id: string) => del<void>(`/experience/${id}`),
}

// ─── Education ────────────────────────────────────────────────────────────────
export const educationApi = {
  getAll: () => get<Education[]>('/education'),
  getById: (id: string) => get<Education>(`/education/${id}`),
  create: (data: Partial<Education>) => post<Education>('/education', data),
  update: (id: string, data: Partial<Education>) => patch<Education>(`/education/${id}`, data),
  delete: (id: string) => del<void>(`/education/${id}`),
}

// ─── Achievements ─────────────────────────────────────────────────────────────
export const achievementsApi = {
  getAll: () => get<Achievement[]>('/achievements'),
  getById: (id: string) => get<Achievement>(`/achievements/${id}`),
  create: (data: Partial<Achievement>) => post<Achievement>('/achievements', data),
  update: (id: string, data: Partial<Achievement>) => patch<Achievement>(`/achievements/${id}`, data),
  delete: (id: string) => del<void>(`/achievements/${id}`),
}

// ─── Certifications ───────────────────────────────────────────────────────────
export const certificationsApi = {
  getAll: () => get<Certification[]>('/certifications'),
  getById: (id: string) => get<Certification>(`/certifications/${id}`),
  create: (data: Partial<Certification>) => post<Certification>('/certifications', data),
  update: (id: string, data: Partial<Certification>) => patch<Certification>(`/certifications/${id}`, data),
  delete: (id: string) => del<void>(`/certifications/${id}`),
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
export const testimonialsApi = {
  getAll: () => get<Testimonial[]>('/testimonials'),
  getApproved: () => get<Testimonial[]>('/testimonials?approved=true'),
  getById: (id: string) => get<Testimonial>(`/testimonials/${id}`),
  create: (data: Partial<Testimonial>) => post<Testimonial>('/testimonials', data),
  update: (id: string, data: Partial<Testimonial>) => patch<Testimonial>(`/testimonials/${id}`, data),
  delete: (id: string) => del<void>(`/testimonials/${id}`),
}

// ─── Social Links ─────────────────────────────────────────────────────────────
export const socialLinksApi = {
  getAll: () => get<SocialLink[]>('/social-links'),
  getById: (id: string) => get<SocialLink>(`/social-links/${id}`),
  create: (data: Partial<SocialLink>) => post<SocialLink>('/social-links', data),
  update: (id: string, data: Partial<SocialLink>) => patch<SocialLink>(`/social-links/${id}`, data),
  delete: (id: string) => del<void>(`/social-links/${id}`),
}

// ─── Contact ──────────────────────────────────────────────────────────────────
export const contactApi = {
  send: (data: CreateContactMessageDto) => post<ContactMessage>('/contact', data),
  getAll: () => get<ContactMessage[]>('/contact'),
  getById: (id: string) => get<ContactMessage>(`/contact/${id}`),
  update: (id: string, data: Partial<ContactMessage>) => patch<ContactMessage>(`/contact/${id}`, data),
  delete: (id: string) => del<void>(`/contact/${id}`),
}

export default apiClient
