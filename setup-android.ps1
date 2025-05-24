# Android Development Setup Script for React + Cordova
# Run this script as Administrator in PowerShell

Write-Host "🚀 Setting up Android Development Environment..." -ForegroundColor Green

# Check if running as administrator
if (-NOT ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator"))
{
    Write-Host "❌ This script requires Administrator privileges. Please run PowerShell as Administrator." -ForegroundColor Red
    exit 1
}

# Check if Chocolatey is installed
if (!(Get-Command choco -ErrorAction SilentlyContinue)) {
    Write-Host "📦 Installing Chocolatey package manager..." -ForegroundColor Yellow
    Set-ExecutionPolicy Bypass -Scope Process -Force
    [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
    iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
}

Write-Host "✅ Chocolatey is available" -ForegroundColor Green

# Install Android Studio
Write-Host "📱 Installing Android Studio..." -ForegroundColor Yellow
choco install androidstudio -y

# Install Gradle
Write-Host "🔧 Installing Gradle..." -ForegroundColor Yellow
choco install gradle -y

# Install OpenJDK 11 (required for Cordova)
Write-Host "☕ Installing OpenJDK 11..." -ForegroundColor Yellow
choco install openjdk11 -y

Write-Host "🎯 Setting up environment variables..." -ForegroundColor Yellow

# Get the current user's Android SDK path
$androidSdkPath = "$env:LOCALAPPDATA\Android\Sdk"

# Set environment variables
[Environment]::SetEnvironmentVariable("ANDROID_HOME", $androidSdkPath, "User")
[Environment]::SetEnvironmentVariable("ANDROID_SDK_ROOT", $androidSdkPath, "User")

# Update PATH
$currentPath = [Environment]::GetEnvironmentVariable("PATH", "User")
$pathsToAdd = @(
    "$androidSdkPath\platform-tools",
    "$androidSdkPath\tools",
    "$androidSdkPath\tools\bin"
)

foreach ($pathToAdd in $pathsToAdd) {
    if ($currentPath -notlike "*$pathToAdd*") {
        $currentPath += ";$pathToAdd"
    }
}
[Environment]::SetEnvironmentVariable("PATH", $currentPath, "User")

Write-Host "✅ Environment variables set!" -ForegroundColor Green

Write-Host "📋 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Restart your PowerShell/Terminal" -ForegroundColor White
Write-Host "2. Open Android Studio and complete the initial setup" -ForegroundColor White
Write-Host "3. Install Android SDK Platform 34 and build tools" -ForegroundColor White
Write-Host "4. Run: cordova requirements android" -ForegroundColor White
Write-Host "5. Run: npm run cordova:build:android" -ForegroundColor White

Write-Host "🎉 Android development environment setup complete!" -ForegroundColor Green
Write-Host "💡 Note: You may need to restart your computer for all changes to take effect." -ForegroundColor Yellow
