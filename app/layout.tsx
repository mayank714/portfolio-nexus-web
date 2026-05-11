import type { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Portfolio Nexus',
    template: '%s | Portfolio Nexus',
  },
  description: 'A dynamic, full-featured developer portfolio showcasing projects, skills, experience, and more.',
  keywords: ['portfolio', 'developer', 'software engineer', 'full stack', 'projects', 'resume'],
  authors: [{ name: 'Portfolio Nexus' }],
  creator: 'Portfolio Nexus',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Portfolio Nexus',
    title: 'Portfolio Nexus',
    description: 'A dynamic, full-featured developer portfolio.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio Nexus',
    description: 'A dynamic, full-featured developer portfolio.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased min-h-screen">
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1e293b',
              color: '#f1f5f9',
              border: '1px solid #334155',
              borderRadius: '12px',
              fontSize: '14px',
            },
            success: { iconTheme: { primary: '#22c55e', secondary: '#fff' } },
            error: { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
          }}
        />
      </body>
    </html>
  )
}
