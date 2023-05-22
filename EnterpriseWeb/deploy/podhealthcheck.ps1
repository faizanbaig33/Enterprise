Param(
    # Name of the resource group that contains the App Service.
    [Parameter(Mandatory=$false)]
    [string] $appname = $null, 

    [Parameter(Mandatory=$false)]
    [string] $service = $null,

    [Parameter(Mandatory=$false)]
    [string] $namespace = "sitecore"
    )

    Write-Host $appname
    $cdsvc = kubectl get svc $service -n $namespace -o jsonpath='{.spec.selector.app}'
    Write-Host $cdsvc
    
    Start-Sleep -Seconds 30

    if($appname -eq "cm" -or $appname -eq "cm-dev" -or $appname -eq "cm-uat"){
    do{
    $containerStatus = kubectl get pods -l app=$appname -n $namespace -o jsonpath='{.items[0].status.containerStatuses[0].ready}'
    Write-Host "waiting for pod, retrying after 10 seconds.."
    Start-Sleep -Seconds 10
    }
    until($containerStatus -eq "true")
    $containerStatus
    }
    else
    {
    Write-Host "No service found"
    }