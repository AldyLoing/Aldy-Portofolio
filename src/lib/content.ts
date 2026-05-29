import 'server-only'

import { readFile, writeFile } from 'fs/promises'
import path from 'path'

export type CertificateItem = {
  file: string
  title: string
  issuer: string
}

export type SiteContent = {
  name: string
  title: string
  summary: string
  contact: {
    email: string
    whatsapp: string
    linkedin: string
    github: string
    location: string
  }
  education: Array<{
    institution: string
    major: string
    period: string
    note: string
  }>
  achievements: Array<{
    title: string
    year: string
    summary: string
  }>
  projects: Array<{
    title: string
    range: string
    description: string
    summary: string
    stack: string[]
    live?: string
    github?: string
  }>
  experience: Array<{
    title: string
    company: string
    range: string
    summary: string
  }>
  organizations: Array<{
    role: string
    organization: string
    range: string
    summary: string
  }>
  skills: {
    categories: Array<{
      label: string
      items: string[]
    }>
  }
}

const siteFile = path.join(process.cwd(), 'src/data/site.json')
const certificatesFile = path.join(process.cwd(), 'src/data/certificates.json')

export async function readSiteContent(): Promise<SiteContent> {
  const raw = await readFile(siteFile, 'utf8')
  return JSON.parse(raw) as SiteContent
}

export async function writeSiteContent(content: SiteContent) {
  await writeFile(siteFile, JSON.stringify(content, null, 2) + '\n', 'utf8')
}

export async function readCertificates(): Promise<CertificateItem[]> {
  const raw = await readFile(certificatesFile, 'utf8')
  return JSON.parse(raw) as CertificateItem[]
}

export async function writeCertificates(certificates: CertificateItem[]) {
  await writeFile(certificatesFile, JSON.stringify(certificates, null, 2) + '\n', 'utf8')
}