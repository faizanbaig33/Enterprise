# escape=`

ARG BASE_IMAGE

FROM ${BASE_IMAGE}

ARG ARTIFACT_PATH

ARG RESOURCE_ARTIFACT_PATH

SHELL ["powershell", "-Command", "$ErrorActionPreference = 'Stop'; $ProgressPreference = 'SilentlyContinue';"]

WORKDIR C:\inetpub\wwwroot

# Copy solution website files
COPY ${ARTIFACT_PATH} .

# Copy resource package files
COPY ${RESOURCE_ARTIFACT_PATH} .

# find transform files and do transformation
# Apply ConnectionString transformations (executed first in all environments)
RUN (Get-ChildItem -Path 'C:\\inetpub\\wwwroot\\App_Config\\ConnectionStrings.config.xdt' -Recurse ) | ForEach-Object { & 'C:\\tools\\scripts\\Invoke-XdtTransform.ps1' -Path 'C:\\inetpub\\wwwroot\\App_Config\\ConnectionStrings.config' -XdtPath $_.FullName -XdtDllPath 'C:\\tools\\bin\\Microsoft.Web.XmlTransform.dll'; };

## Apply GLOBAL transformations (executed first in all environments)
#RUN (Get-ChildItem -Path 'C:\\inetpub\\wwwroot\\*-GLOBAL.xdt' -Recurse) `
#    | Where-Object { $_.Name -match '-GLOBAL\.xdt$' } `
#    | % { Write-Host "Processing GLOBAL XDT transform:" $_.FullName; `
#        & 'C:\\tools\\scripts\\Invoke-XdtTransform.ps1' -Path ($_.FullName -replace '-GLOBAL.xdt','') -XdtPath $_.FullName -XdtDllPath 'C:\\tools\\bin\\Microsoft.Web.XmlTransform.dll'; }
#
## Apply PROD transformations (executed in PROD environment only)
#RUN (Get-ChildItem -Path 'C:\\inetpub\\wwwroot\\*-PROD.xdt' -Recurse) `
#    | Where-Object { $_.Name -match '-PROD\.xdt$' } `
#    | % { Write-Host "Processing PROD XDT transform:" $_.FullName; `
#        & 'C:\\tools\\scripts\\Invoke-XdtTransform.ps1' -Path ($_.FullName -replace '-PROD.xdt','') -XdtPath $_.FullName -XdtDllPath 'C:\\tools\\bin\\Microsoft.Web.XmlTransform.dll'; }
#
## Apply QA transformations (executed in QA environment only)
#RUN (Get-ChildItem -Path 'C:\\inetpub\\wwwroot\\*-QA.xdt' -Recurse) `
#    | Where-Object { $_.Name -match '-QA\.xdt$' } `
#    | % { Write-Host "Processing QA XDT transform:" $_.FullName; `
#        & 'C:\\tools\\scripts\\Invoke-XdtTransform.ps1' -Path ($_.FullName -replace '-QA.xdt','') -XdtPath $_.FullName -XdtDllPath 'C:\\tools\\bin\\Microsoft.Web.XmlTransform.dll'; }
#
## Apply DEV transformations (executed in DEV environment only)
#RUN (Get-ChildItem -Path 'C:\\inetpub\\wwwroot\\*-DEV.xdt' -Recurse) `
#    | Where-Object { $_.Name -match '-DEV\.xdt$' } `
#    | % { Write-Host "Processing DEV XDT transform:" $_.FullName; `
#        & 'C:\\tools\\scripts\\Invoke-XdtTransform.ps1' -Path ($_.FullName -replace '-DEV.xdt','') -XdtPath $_.FullName -XdtDllPath 'C:\\tools\\bin\\Microsoft.Web.XmlTransform.dll'; }