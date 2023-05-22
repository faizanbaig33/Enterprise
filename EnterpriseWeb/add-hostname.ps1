Param (
    [Parameter(HelpMessage = "Hostname to add to host file and generate a certificate for.", Position = 0)]
    [string]$Hostname
)

$ErrorActionPreference = "Stop";

# LoadYml function that will read YML file and deserialize it
function LoadYml {
    param (
        [Parameter(Mandatory = $true)]
        $FileName
    )
	# Load file content to a string array containing all YML file lines
    [string[]]$fileContent = Get-Content $FileName
    $content = ''
    # Convert a string array to a string
    foreach ($line in $fileContent) { $content = $content + "`n" + $line }
    # Deserialize a string to the PowerShell object
    $yml = ConvertFrom-YAML $content
    # return the object
    Write-Output $yml
}
 
# WriteYml function that writes the YML content to a file
function WriteYml {
    param (
        [Parameter(Mandatory = $true)]
        $FileName,
        [Parameter(Mandatory = $true)]
        $Content
    )
	#Serialize a PowerShell object to string
    $result = ConvertTo-YAML $Content
    #write to a file
    Set-Content -Path $FileName -Value $result -Force
}

# Check for Sitecore Gallery
Import-Module PowerShellGet
$SitecoreGallery = Get-PSRepository | Where-Object { $_.SourceLocation -eq "https://sitecore.myget.org/F/sc-powershell/api/v2" }
if (-not $SitecoreGallery) {
    Write-Host "Adding Sitecore PowerShell Gallery..." -ForegroundColor Green
    Register-PSRepository -Name SitecoreGallery -SourceLocation https://sitecore.myget.org/F/sc-powershell/api/v2 -InstallationPolicy Trusted
    $SitecoreGallery = Get-PSRepository -Name SitecoreGallery
}

#Install and Import SitecoreDockerTools
$dockerToolsVersion = "10.2.7"
Remove-Module SitecoreDockerTools -ErrorAction SilentlyContinue
if (-not (Get-InstalledModule -Name SitecoreDockerTools -RequiredVersion $dockerToolsVersion -ErrorAction SilentlyContinue)) {
    Write-Host "Installing SitecoreDockerTools..." -ForegroundColor Green
    Install-Module SitecoreDockerTools -RequiredVersion $dockerToolsVersion -Scope CurrentUser -Repository $SitecoreGallery.Name
}
Write-Host "Importing SitecoreDockerTools..." -ForegroundColor Green
Import-Module SitecoreDockerTools -RequiredVersion $dockerToolsVersion

#Install and Import YAML helper module
$powershellYamlVersion = "0.4.2"
Remove-Module powershell-yaml -ErrorAction SilentlyContinue
if (-not (Get-InstalledModule -Name powershell-yaml -RequiredVersion $powershellYamlVersion -ErrorAction SilentlyContinue)) {
    Write-Host "Installing powershell-yaml..." -ForegroundColor Green
    Install-Module powershell-yaml -RequiredVersion $powershellYamlVersion -Scope CurrentUser -Repository $SitecoreGallery.Name
}
Write-Host "Importing powershell-yaml..." -ForegroundColor Green
Import-Module powershell-yaml -RequiredVersion $powershellYamlVersion

##################################
# Configure TLS/HTTPS certificates
##################################
$certsPath = ".\docker\traefik\certs"
$mkcert = ".\mkcert.exe"
if ($null -ne (Get-Command mkcert.exe -ErrorAction SilentlyContinue)) {
    # mkcert installed in PATH
    $mkcert = "mkcert"
} elseif (-not (Test-Path (Join-path $certsPath "mkcert.exe"))) {
    Write-Error "Unable to find mkcert.exe. Did you run 'Init.ps1'?"
}

Write-Host "Creating certificate files..." -ForegroundColor Green

Push-Location ".\docker\traefik\certs"
try {
    #Write-Host "Generating Traefik TLS certificate..." -ForegroundColor Green
    & $mkcert $hostname
}
catch {
    Write-Error "An error occurred while attempting to generate TLS certificate: $_" #-ForegroundColor Red
}
finally {
    Pop-Location
}

################################
# Add Windows hosts file entries
################################

Write-Host "Adding Windows hosts file entries..." -ForegroundColor Green

# Required for communication
Add-HostsEntry $hostname

###################################
# Update the certs_config.yaml file
###################################

$configFile = ".\docker\traefik\config\dynamic\certs_config.yaml"
if (Test-Path $configFile) {
    $config = LoadYml -Filename $configFile
} else {
    $config = @{tls=@{certificates=[System.Collections.Generic.List[Object]]::new()}}
}

$delegate = [Func[Object,bool]]{ $args[0].certFile -eq "C:/etc/traefik/certs/$hostname.pem" }
if (-not [Linq.Enumerable]::Any($config.tls.certificates, $delegate)) {
    $config.tls.certificates.Add(@{certFile="C:/etc/traefik/certs/$hostname.pem"; keyFile="C:/etc/traefik/certs/$hostname-key.pem"})
}
$config.tls.certificates = [System.Linq.Enumerable]::ToArray($config.tls.certificates)

WriteYml -FileName $configFile -Content $config