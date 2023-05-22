#!/usr/bin/env pwsh
[Diagnostics.CodeAnalysis.SuppressMessageAttribute('PSAvoidUsingPlainTextForPassword', '', Justification='Value will be stored unencrypted in .env,
# and used only for transient local development environments', Scope='Function')]

[CmdletBinding(DefaultParameterSetName = "no-arguments")]
Param (
    [Parameter(HelpMessage = "Enables initialization of values in the .env file, which may be placed in source control.",
        ParameterSetName = "env-init")]
    [switch]$FEDOnly,

    [Parameter(Mandatory = $false,
        HelpMessage = "The path to a valid Sitecore license.xml file.",
        ParameterSetName = "env-init")]
    [string]$LicenseXmlPath = ".\license\license.xml",

    # We do not need to use [SecureString] here since the value will be stored unencrypted in .env,
    # and used only for transient local development environments.
    [Parameter(Mandatory = $false,
        HelpMessage = "Sets the sitecore\\admin password for this environment via environment variable.",
        ParameterSetName = "env-init")]
    [string]$AdminPassword = "b"
)

$ErrorActionPreference = "Stop";

if (!$FEDOnly) {
    if (-not $LicenseXmlPath.EndsWith("license.xml")) {
        Write-Error "Sitecore license file must be named 'license.xml'."
    }
    if (-not (Test-Path $LicenseXmlPath)) {
        Write-Error "Could not find Sitecore license file at path '$LicenseXmlPath'."
    }
    # We actually want the folder that it's in for mounting
    $LicenseXmlPath = (Get-Item $LicenseXmlPath).Directory.FullName
}

Write-Host "Preparing your development environment!" -ForegroundColor Green

################################################
# Retrieve and import SitecoreDockerTools module
################################################

if (!$FEDOnly) {
    # Check for Sitecore Gallery
    Import-Module PowerShellGet
    $SitecoreGallery = Get-PSRepository | Where-Object { $_.SourceLocation -eq "https://sitecore.myget.org/F/sc-powershell/api/v2" }
    if (-not $SitecoreGallery) {
        Write-Host "Adding Sitecore PowerShell Gallery..." -ForegroundColor Green
        Register-PSRepository -Name SitecoreGallery -SourceLocation https://sitecore.myget.org/F/sc-powershell/api/v2 -InstallationPolicy Trusted
        $SitecoreGallery = Get-PSRepository -Name SitecoreGallery
    }

    # Install and Import SitecoreDockerTools
    $dockerToolsVersion = "10.2.7"
    Remove-Module SitecoreDockerTools -ErrorAction SilentlyContinue
    if (-not (Get-InstalledModule -Name SitecoreDockerTools -RequiredVersion $dockerToolsVersion -ErrorAction SilentlyContinue)) {
        Write-Host "Installing SitecoreDockerTools..." -ForegroundColor Green
        Install-Module SitecoreDockerTools -RequiredVersion $dockerToolsVersion -Scope CurrentUser -Repository $SitecoreGallery.Name
    }
    Write-Host "Importing SitecoreDockerTools..." -ForegroundColor Green
    Import-Module SitecoreDockerTools -RequiredVersion $dockerToolsVersion
    Write-SitecoreDockerWelcome
}

##################################
# Configure TLS/HTTPS certificates
##################################

if (!$FEDOnly) {
    Push-Location docker\traefik\certs
    try {
        $mkcert = ".\mkcert.exe"
        if ($null -ne (Get-Command mkcert.exe -ErrorAction SilentlyContinue)) {
            # mkcert installed in PATH
            $mkcert = "mkcert"
        } elseif (-not (Test-Path $mkcert)) {
            Write-Host "Downloading and installing mkcert certificate tool..." -ForegroundColor Green
            Invoke-WebRequest "https://github.com/FiloSottile/mkcert/releases/download/v1.4.1/mkcert-v1.4.1-windows-amd64.exe" -UseBasicParsing -OutFile mkcert.exe
            if ((Get-FileHash mkcert.exe).Hash -ne "1BE92F598145F61CA67DD9F5C687DFEC17953548D013715FF54067B34D7C3246") {
                Remove-Item mkcert.exe -Force
                throw "Invalid mkcert.exe file"
            }
        }
        Write-Host "Generating Traefik TLS certificate..." -ForegroundColor Green
        & $mkcert -install

        # stash CAROOT path for messaging at the end of the script
        $caRoot = "$(& $mkcert -CAROOT)\rootCA.pem"
    }
    catch {
        Write-Error "An error occurred while attempting to generate TLS certificate: $_"
    }
    finally {
        Pop-Location
    }
}

################################
# Add Windows hosts file entries
################################

if (!$FEDOnly) {
    Write-Host "Adding Sitecore hosts file entries..." -ForegroundColor Green

    & ".\add-hostname.ps1" "cm.local.ew.andersencorp.com"
    & ".\add-hostname.ps1" "id.local.ew.andersencorp.com"

    Write-Host "Adding site hosts file entries..." -ForegroundColor Green

    & ".\add-hostname.ps1" "preview.local.andersenwindows.com"
    & ".\add-hostname.ps1" "www.local.andersenwindows.com"
    & ".\add-hostname.ps1" "preview.local.renewalbyandersen.com"
    & ".\add-hostname.ps1" "www.local.renewalbyandersen.com"
}

# TODO: Update the host file on Mac once we add

#######################################
# Create the Docker .env file if needed
#######################################
if (!$FEDOnly) {
    if (-not (Test-Path ".\.env")) {
        Copy-Item ".\.env.template" ".\.env"
    }
}

###############################
# Populate the Docker .env file
###############################

if (!$FEDOnly) {
    Write-Host "Populating required .env file values..." -ForegroundColor Green

    # HOST_LICENSE_FOLDER
    Set-EnvFileVariable "HOST_LICENSE_FOLDER" -Value $LicenseXmlPath

    # CM_HOST
    Set-EnvFileVariable "CM_HOST" -Value "cm.local.ew.andersencorp.com"

    # ID_HOST
    Set-EnvFileVariable "ID_HOST" -Value "id.local.ew.andersencorp.com"

    # RENDERING_HOST
    Set-EnvFileVariable "RENDERING_HOST_AW" -Value "www.local.andersenwindows.com"

    # RENDERING_HOST
    Set-EnvFileVariable "RENDERING_HOST_RBA" -Value "www.local.renewalbyandersen.com"

    # REPORTING_API_KEY = random 64-128 chars
    Set-EnvFileVariable "REPORTING_API_KEY" -Value (Get-SitecoreRandomString 128 -DisallowSpecial)

    # TELERIK_ENCRYPTION_KEY = random 64-128 chars
    Set-EnvFileVariable "TELERIK_ENCRYPTION_KEY" -Value (Get-SitecoreRandomString 128)

    # MEDIA_REQUEST_PROTECTION_SHARED_SECRET
    Set-EnvFileVariable "MEDIA_REQUEST_PROTECTION_SHARED_SECRET" -Value (Get-SitecoreRandomString 64)

    # SITECORE_IDSECRET = random 64 chars
    Set-EnvFileVariable "SITECORE_IDSECRET" -Value (Get-SitecoreRandomString 64 -DisallowSpecial)

    # SITECORE_ID_CERTIFICATE
    $idCertPassword = Get-SitecoreRandomString 12 -DisallowSpecial
    Set-EnvFileVariable "SITECORE_ID_CERTIFICATE" -Value (Get-SitecoreCertificateAsBase64String -DnsName "localhost" -Password (ConvertTo-SecureString -String $idCertPassword -Force -AsPlainText) -KeyLength 2048)

    # SITECORE_ID_CERTIFICATE_PASSWORD
    Set-EnvFileVariable "SITECORE_ID_CERTIFICATE_PASSWORD" -Value $idCertPassword

    # SQL_SA_PASSWORD
    # Need to ensure it meets SQL complexity requirements
    Set-EnvFileVariable "SQL_SA_PASSWORD" -Value (Get-SitecoreRandomString 19 -DisallowSpecial -EnforceComplexity)

    # SQL_SERVER
    Set-EnvFileVariable "SQL_SERVER" -Value "mssql"

    # SQL_SA_LOGIN
    Set-EnvFileVariable "SQL_SA_LOGIN" -Value "sa"

    # SITECORE_ADMIN_PASSWORD
    Set-EnvFileVariable "SITECORE_ADMIN_PASSWORD" -Value $AdminPassword

    # JSS_EDITING_SECRET
    # Populate it for the Next.js local environment as well
    $jssEditingSecret = Get-SitecoreRandomString 64 -DisallowSpecial
    Set-EnvFileVariable "JSS_EDITING_SECRET" -Value $jssEditingSecret
}

#######################################
# Create the NextJS .env file if needed
#######################################

Push-Location src\rendering
try
{
    if (-not (Test-Path ".env.local")) {
        if ($FEDOnly) {
            Copy-Item ".env.local.ee" ".env.local"
        } else {
            Copy-Item ".env.local.sc" ".env.local"
        }
    }
}
catch {
    Write-Error "An error occurred while creating the NextJS local environment file: $_"
}
finally {
    Pop-Location
}

##########################################
# Add the .gitconfig to the local settings
##########################################
Write-Host "Configuring Git to include the .gitconfig file..." -ForegroundColor Green
git config --local include.path ../.gitconfig

Write-Host "Done!" -ForegroundColor Green

if (!$FEDOnly) {
    Write-Host
    Write-Host ("#"*75) -ForegroundColor Cyan
    Write-Host "To avoid HTTPS errors, set the NODE_EXTRA_CA_CERTS environment variable" -ForegroundColor Cyan
    Write-Host "using the following commmand:" -ForegroundColor Cyan
    Write-Host "setx NODE_EXTRA_CA_CERTS $caRoot"
    Write-Host
    Write-Host "You will need to restart your terminal or VS Code for it to take effect." -ForegroundColor Cyan
    Write-Host ("#"*75) -ForegroundColor Cyan
}
