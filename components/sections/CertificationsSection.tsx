'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ExternalLink, Award, CheckCircle, AlertCircle } from 'lucide-react'
import type { Certification } from '@/types'
import SectionHeader from '@/components/ui/SectionHeader'
import Badge from '@/components/ui/Badge'
import { formatDate, isExpired } from '@/lib/utils'

interface CertificationsSectionProps {
  certifications: Certification[]
}

function CertCard({ cert, index }: { cert: Certification; index: number }) {
  const expired = !cert.doesNotExpire && isExpired(cert.expiryDate)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="bg-white dark:bg-dark-900 rounded-2xl border border-dark-100 dark:border-dark-800 p-5 shadow-card hover:shadow-card-hover transition-all flex gap-4"
    >
      <div className="w-14 h-14 rounded-xl overflow-hidden bg-dark-100 dark:bg-dark-800 shrink-0 flex items-center justify-center border border-dark-200 dark:border-dark-700">
        {cert.issuerLogoUrl ? (
          <Image src={cert.issuerLogoUrl} alt={cert.issuer} width={56} height={56} className="object-contain p-1" />
        ) : (
          <Award size={24} className="text-primary-500" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-bold text-dark-900 dark:text-white text-base leading-tight">{cert.name}</h3>
          {cert.featured && <Badge variant="accent" size="sm">Featured</Badge>}
        </div>

        <p className="text-primary-500 font-medium text-sm mb-2">{cert.issuer}</p>

        <div className="flex items-center gap-3 text-xs text-dark-500 dark:text-dark-400 mb-3 flex-wrap">
          <span>Issued: {formatDate(cert.issueDate, 'MMM yyyy')}</span>
          {cert.doesNotExpire ? (
            <span className="flex items-center gap-1 text-green-500">
              <CheckCircle size={10} /> No Expiry
            </span>
          ) : cert.expiryDate ? (
            <span className={`flex items-center gap-1 ${expired ? 'text-red-400' : 'text-green-500'}`}>
              {expired ? <AlertCircle size={10} /> : <CheckCircle size={10} />}
              {expired ? 'Expired' : 'Valid until'}: {formatDate(cert.expiryDate, 'MMM yyyy')}
            </span>
          ) : null}
        </div>

        {cert.credentialId && (
          <p className="text-xs text-dark-400 font-mono mb-2">ID: {cert.credentialId}</p>
        )}

        {cert.skills && cert.skills.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {cert.skills.slice(0, 5).map((s) => (
              <span key={s} className="text-xs bg-dark-100 dark:bg-dark-800 text-dark-500 dark:text-dark-400 px-2 py-0.5 rounded-md">{s}</span>
            ))}
          </div>
        )}

        {cert.credentialUrl && (
          <a
            href={cert.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-primary-500 hover:text-primary-400 transition-colors font-medium"
          >
            <ExternalLink size={11} /> Verify Credential
          </a>
        )}
      </div>
    </motion.div>
  )
}

export default function CertificationsSection({ certifications }: CertificationsSectionProps) {
  return (
    <section id="certifications" className="section-padding bg-dark-50 dark:bg-dark-900/50">
      <div className="container-custom">
        <SectionHeader
          label="Professional Growth"
          title="My"
          titleHighlight="Certifications"
          subtitle="Professional certifications that validate my expertise and continuous learning."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {certifications.map((cert, i) => (
            <CertCard key={cert.id} cert={cert} index={i} />
          ))}
          {certifications.length === 0 && (
            <p className="col-span-2 text-center text-dark-400 py-12">No certifications added yet.</p>
          )}
        </div>
      </div>
    </section>
  )
}
