import { test, expect } from '@playwright/test'

const pages = ['/', '/projects', '/certifications', '/contact']

for (const p of pages) {
  test(`page ${p} loads`, async ({ page, baseURL }) => {
    await page.goto(baseURL! + p)
    await expect(page).toHaveTitle(/Aldy|Portfolio/i)
    await page.screenshot({ path: `artifacts/screenshots${p === '/' ? '/home' : p}.png` })
  })
}

test('home has hero title and download cv button', async ({ page, baseURL }) => {
  await page.goto(baseURL! + '/')
  await expect(page.getByRole('heading', { name: /Aldy Oscar Pancasila Loing/i })).toBeVisible()
  await expect(page.getByRole('link', { name: /Unduh CV/i })).toBeVisible()
})

test('contact page has mailto link', async ({ page, baseURL }) => {
  await page.goto(baseURL! + '/contact')
  const links = page.locator('a[href^="mailto:"]')
  await expect(links.first()).toBeVisible()
})
