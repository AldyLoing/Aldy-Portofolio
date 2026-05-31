import 'server-only'

import { readFile, writeFile } from 'fs/promises'

type JsonValue = Record<string, unknown> | unknown[]

function hasGitHubStorage() {
  return Boolean(process.env.GITHUB_TOKEN && process.env.GITHUB_REPO)
}

function getRepoPath(filePath: string) {
  return filePath.replace(/^\/+/, '')
}

async function readLocalJson<T>(fallbackPath: string) {
  const raw = await readFile(fallbackPath, 'utf8')
  return JSON.parse(raw) as T
}

async function writeLocalJson(fallbackPath: string, value: JsonValue) {
  await writeFile(fallbackPath, JSON.stringify(value, null, 2) + '\n', 'utf8')
}

async function readGitHubJson<T>(repoPath: string) {
  const repo = process.env.GITHUB_REPO
  const token = process.env.GITHUB_TOKEN
  const branch = process.env.GITHUB_BRANCH || 'main'

  if (!repo || !token) {
    throw new Error('GitHub storage is not configured.')
  }

  const response = await fetch(`https://api.github.com/repos/${repo}/contents/${getRepoPath(repoPath)}?ref=${branch}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28'
    },
    cache: 'no-store'
  })

  if (!response.ok) {
    throw new Error(`Failed to read ${repoPath} from GitHub.`)
  }

  const data = await response.json()
  const content = String(data.content || '').replace(/\n/g, '')
  return JSON.parse(Buffer.from(content, 'base64').toString('utf8')) as T
}

async function writeGitHubJson(repoPath: string, value: JsonValue) {
  const repo = process.env.GITHUB_REPO
  const token = process.env.GITHUB_TOKEN
  const branch = process.env.GITHUB_BRANCH || 'main'

  if (!repo || !token) {
    throw new Error('GitHub storage is not configured.')
  }

  const fileUrl = `https://api.github.com/repos/${repo}/contents/${getRepoPath(repoPath)}?ref=${branch}`
  const currentResponse = await fetch(fileUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28'
    },
    cache: 'no-store'
  })

  if (!currentResponse.ok) {
    throw new Error(`Failed to load current ${repoPath} revision.`)
  }

  const current = await currentResponse.json()
  const nextContent = Buffer.from(JSON.stringify(value, null, 2) + '\n').toString('base64')

  const writeResponse = await fetch(`https://api.github.com/repos/${repo}/contents/${getRepoPath(repoPath)}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
      'X-GitHub-Api-Version': '2022-11-28'
    },
    body: JSON.stringify({
      message: `chore: update ${repoPath}`,
      content: nextContent,
      sha: current.sha,
      branch
    })
  })

  if (!writeResponse.ok) {
    throw new Error(`Failed to write ${repoPath} to GitHub.`)
  }
}

export async function readJsonResource<T>(repoPath: string, fallbackPath: string) {
  if (hasGitHubStorage()) {
    return readGitHubJson<T>(repoPath)
  }

  return readLocalJson<T>(fallbackPath)
}

export async function writeJsonResource<T>(repoPath: string, fallbackPath: string, value: T) {
  if (hasGitHubStorage()) {
    return writeGitHubJson(repoPath, value as JsonValue)
  }

  return writeLocalJson(fallbackPath, value as JsonValue)
}