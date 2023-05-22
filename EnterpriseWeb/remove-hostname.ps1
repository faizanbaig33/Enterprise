Param (
    [Parameter(HelpMessage = "Hostname to remove from the host file and the certificate for.", Position = 0)]
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

Write-Host "Removing certificate files..." -ForegroundColor Green

$certPath = ".\docker\traefik\certs\$hostname.pem"
$keyPath = ".\docker\traefik\certs\$hostname-key.pem"

if (Test-Path $certPath) {
    Remove-Item $certPath -Force
}

if (Test-Path $keyPath) {
    Remove-Item $keyPath
}

################################
# Add Windows hosts file entries
################################

Write-Host "Removing Windows hosts file entries..." -ForegroundColor Green

# Required for communication
Remove-HostsEntry $hostname

###################################
# Update the certs_config.yaml file
###################################

$configFile = ".\docker\traefik\config\dynamic\certs_config.yaml"
if (Test-Path $configFile) {
    $config = LoadYml -Filename $configFile
} else {
    $config = @{tls=@{certificates=[System.Collections.Generic.List[Object]]::new()}}
}

$delegate =  [Func[Object,bool]]{ $args[0].certFile -ne "C:/etc/traefik/certs/$hostname.pem" }
$filtered = [Linq.Enumerable]::Where($config.tls.certificates, $delegate)
$config.tls.certificates = [System.Linq.Enumerable]::ToArray($filtered)

WriteYml -FileName $configFile -Content $config