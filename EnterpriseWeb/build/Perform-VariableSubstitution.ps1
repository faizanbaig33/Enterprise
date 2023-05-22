Param(
    [Parameter(Mandatory=$true)]
    [string] $xmlFilePath
    
)

#$pattern = "SUPERLONGSECRETHERE"

function Perform-VariableSubstitution($xmlFilePath, $pattern, $newPattern) {
	$SEL = Select-String -Path $xmlFilePath -Pattern $pattern
	if( $SEL.Length -gt 0)
	{
		Write-Host 'Contains variable for substitution'
		$Content = Get-Content -Path $xmlFilePath -Raw
		$Target = $Content -replace $pattern,$newPattern
		$Target | Set-Content -Path $xmlFilePath
	}
	else
	{
		Write-Host 'Error: Does not contain variable for substitution'
        exit 1
	}
}


Perform-VariableSubstitution -xmlFilePath $xmlFilePath -pattern ${env:PATTERN} -newPattern ${env:CLIENTID}
Perform-VariableSubstitution -xmlFilePath $xmlFilePath -pattern ${env:PATTERN1} -newPattern ${env:TENANTID}
Perform-VariableSubstitution -xmlFilePath $xmlFilePath -pattern ${env:PATTERN2} -newPattern ${env:BSWAuthorGroupID}
Perform-VariableSubstitution -xmlFilePath $xmlFilePath -pattern ${env:PATTERN3} -newPattern ${env:BSWApproverGroupID}
Perform-VariableSubstitution -xmlFilePath $xmlFilePath -pattern ${env:PATTERN4} -newPattern ${env:BSWPublisherGroupID}
Perform-VariableSubstitution -xmlFilePath $xmlFilePath -pattern ${env:PATTERN5} -newPattern ${env:BSWAdminGroupID}

Get-Content $xmlFilePath