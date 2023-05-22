[CmdletBinding(DefaultParameterSetName = "no-arguments")]
Param (
    [Parameter(HelpMessage = "Alternative login using app client.",
        ParameterSetName = "by-pass")]
    [switch]$ByPass = $false,

    [Parameter(HelpMessage = "First time running 'up', do some additional setup.",
        ParameterSetName = "quick")]
    [switch]$First = $false,

    [Parameter(HelpMessage = "Login to Sitecore to pre-authenticate the CLI.",
        ParameterSetName = "quick")]
    [switch]$Login = $false,

    [Parameter(HelpMessage = "Push serialized Sitecore items.",
        ParameterSetName = "quick")]
    [switch]$Push = $false,

    [Parameter(HelpMessage = "Clean the docker data folder before build.",
        ParameterSetName = "quick")]
    [switch]$DockerCleanData = $false,

    [Parameter(HelpMessage = "Don't use cache for the docker build.",
        ParameterSetName = "quick")]
    [switch]$DockerBuildNoCache = $false)

$ErrorActionPreference = "Stop";
# Double check whether init has been run
$envPath = ".env";
$envCheckVariable = "HOST_LICENSE_FOLDER";
if (-not (Test-Path $envPath)) {
    Write-Error "Could not find .env file. Did you run 'init.ps1 -InitEnv'?"
}

$envCheckVariable = "HOST_LICENSE_FOLDER";
$envCheck = Get-Content $envPath -Encoding UTF8 | Where-Object { $_ -imatch "^$envCheckVariable=.+" }
if (-not $envCheck) {
    Write-Error "$envCheckVariable does not have a value. Did you run 'init.ps1 -InitEnv'?"
}

# Check if we should clean first
if ($DockerCleanData) {
  Write-Host "Cleaning Docker data folders..." -ForegroundColor Green
  Push-Location docker
  & ".\clean.ps1"
  Pop-Location
}

# Generate the type definition files for Sitecore items
dotnet leprechaun -g -c src/Leprechaun.config

# Build all containers in the Sitecore instance, forcing a pull of latest base containers
if ($DockerBuildNoCache) {
  Write-Host "Building containers without cache..." -ForegroundColor Green
  docker-compose build --no-cache
} else {
  Write-Host "Building containers..." -ForegroundColor Green
  docker-compose build
}
if ($LASTEXITCODE -ne 0) {
    Write-Error "Container build failed, see errors above."
}

# Start the Sitecore instance
Write-Host "Starting Sitecore environment..." -ForegroundColor Green
docker-compose up -d

# Wait for Traefik to expose CM route
Write-Host "Waiting for CM to become available..." -ForegroundColor Green
$startTime = Get-Date
do {
    Start-Sleep -Milliseconds 100
    try {
        $status = Invoke-RestMethod "http://localhost:8079/api/http/routers/cm-secure@docker"
    } catch {
        if ($_.Exception.Response.StatusCode.value__ -ne "404") {
            throw
        }
    }
} while ($status.status -ne "enabled" -and $startTime.AddSeconds(15) -gt (Get-Date))
if (-not $status.status -eq "enabled") {
    $status
    Write-Error "Timeout waiting for Sitecore CM to become available via Traefik proxy. Check CM container logs."
}

if ($Login -or $First) {
  if ($ByPass) {
    dotnet sitecore login --cm https://cm.local.ew.andersencorp.com/ --auth https://id.local.ew.andersencorp.com/ --allow-write true --client-id "SitecoreCLIServer" --client-secret "testsecret" --client-credentials true
  }else {
    dotnet sitecore login --cm https://cm.local.ew.andersencorp.com/ --auth https://id.local.ew.andersencorp.com/ --allow-write true
  }

  if ($LASTEXITCODE -ne 0) {
    Write-Error "Unable to log into Sitecore, did the Sitecore environment start correctly? See logs above."
  }
}

if ($First) {
    # Populate Solr managed schemas to avoid errors during item deploy
    Write-Host "Populating Solr managed schema..." -ForegroundColor Green
    dotnet sitecore index schema-populate

    Write-Host "Rebuilding indexes..." -ForegroundColor Green
    dotnet sitecore index rebuild
} else {
    Write-Host "Skipping index rebuild...  Run manually if necessary" -ForegroundColor Yellow
}

if ($Push) {
  # Push serialized Sitecore items
  Write-Host "Pushing serialized Sitecore items..." -ForegroundColor Green
  dotnet sitecore ser push
}

Write-Host "Opening site..." -ForegroundColor Green

Start-Process https://cm.local.ew.andersencorp.com/sitecore/

Write-Host ""
Write-Host "Use the following command to monitor your Rendering Host:" -ForegroundColor Green
Write-Host "docker-compose logs -f rendering"
Write-Host ""
