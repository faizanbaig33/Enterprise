Write-Host "Down containers..." -ForegroundColor Green
docker-compose down
if ($LASTEXITCODE -ne 0) {
  Write-Error "Container down failed, see errors above."
}

Write-Host "Cleaning up images..." -ForegroundColor Green
docker system prune -f
