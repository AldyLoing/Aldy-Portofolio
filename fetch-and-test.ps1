<#
  fetch-and-test.ps1
  Script to download certificates from Google Drive (via rclone) and run install/build/test.

  Usage:
    1. Install rclone and configure remote 'gdrive' with access to your Drive.
    2. Run: .\fetch-and-test.ps1 -DriveFolderId '1thVG50udVvUa9t4SDGK8kl9HyDos_cGc'
#>

param(
  [Parameter(Mandatory=$true)]
  [string]$DriveFolderId,
  [string]$OutputDir = "public/certificates"
)

set -ev

# Ensure artifacts dirs
New-Item -ItemType Directory -Path artifacts\logs -Force | Out-Null
New-Item -ItemType Directory -Path artifacts\screenshots -Force | Out-Null

Write-Output "Downloading certificates to $OutputDir"

if (!(Get-Command rclone -ErrorAction SilentlyContinue)) {
  Write-Error "rclone not found. Install rclone: https://rclone.org/downloads/"
  exit 2
}

# Sync folder (user must configure remote named 'gdrive')
rclone sync gdrive:$("$DriveFolderId") $OutputDir --create-empty-src-dirs --progress 2>&1 | Tee-Object artifacts\logs\rclone.log

Write-Output "Place your CV file as public/cv.pdf. If you have a docx, convert it manually or use libreoffice: soffice --headless --convert-to pdf your.docx --outdir public"

Write-Output "Installing dependencies..."
npm install 2>&1 | Tee-Object artifacts\logs\npm-install.log

Write-Output "Type checking"
npx tsc --noEmit 2>&1 | Tee-Object artifacts\logs\tsc.log

Write-Output "Running ESLint"
npx eslint . --ext .ts,.tsx 2>&1 | Tee-Object artifacts\logs\eslint.log

Write-Output "Building..."
npm run build 2>&1 | Tee-Object artifacts\logs\build.log

Write-Output "Starting server for smoke tests"
$env:PORT = 3000
Start-Process -FilePath npm -ArgumentList 'run','start' -NoNewWindow
Start-Sleep -Seconds 4

# Simple smoke checks using Invoke-WebRequest
$urls = @('http://localhost:3000/','http://localhost:3000/projects','http://localhost:3000/certifications','http://localhost:3000/contact')
foreach ($u in $urls) {
  try {
    $r = Invoke-WebRequest -UseBasicParsing -Uri $u -TimeoutSec 10
    "$u => $($r.StatusCode)" | Tee-Object artifacts\logs\smoke.log -Append
  } catch {
    "ERROR fetching $u: $_" | Tee-Object artifacts\logs\smoke.log -Append
  }
}

Write-Output "Run Playwright tests (optional)"
npx playwright install --with-deps 2>&1 | Tee-Object artifacts\logs\playwright-install.log
npx playwright test --output=artifacts/screenshots 2>&1 | Tee-Object artifacts\logs\playwright-test.log

Write-Output "All done. Check artifacts/logs and artifacts/screenshots"
