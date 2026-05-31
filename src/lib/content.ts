import 'server-only'

import path from 'path'
import { readJsonResource, writeJsonResource } from './storage'

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
  return readJsonResource<SiteContent>('src/data/site.json', siteFile)
}

export async function writeSiteContent(content: SiteContent) {
  await writeJsonResource('src/data/site.json', siteFile, content)
}

export async function readCertificates(): Promise<CertificateItem[]> {
  return readJsonResource<CertificateItem[]>('src/data/certificates.json', certificatesFile)
}

export async function writeCertificates(certificates: CertificateItem[]) {
  await writeJsonResource('src/data/certificates.json', certificatesFile, certificates)
}