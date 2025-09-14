Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Setting up PostgreSQL Database" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "[1/4] Checking Docker..." -ForegroundColor Yellow
try {
    $dockerVersion = docker --version 2>$null
    if ($LASTEXITCODE -ne 0) {
        throw "Docker not found"
    }
    Write-Host "Docker found: $dockerVersion" -ForegroundColor Green
}
catch {
    Write-Host "ERROR: Docker not found! Please install Docker Desktop." -ForegroundColor Red
    Write-Host "Download from: https://www.docker.com/products/docker-desktop/" -ForegroundColor Yellow
    Read-Host "Press Enter to continue"
    exit 1
}

Write-Host "[2/4] Removing old docker container..." -ForegroundColor Yellow
docker stop dishboard-dev-task-db 2>$null
docker rm dishboard-dev-task-db 2>$null

Write-Host "[3/4] Creating new PostgreSQL container..." -ForegroundColor Yellow
docker run --name dishboard-dev-task-db `
    -e POSTGRES_USER=postgres `
    -e POSTGRES_PASSWORD=postgres `
    -p 5430:5432 `
    -d postgres

if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Failed to create Docker container" -ForegroundColor Red
    Read-Host "Press Enter to continue"
    exit 1
}

Write-Host "[4/4] Waiting for database to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

Write-Host "Creating the database 'dev'..." -ForegroundColor Green
docker exec dishboard-dev-task-db sh -c "PGPASSWORD=postgres psql -U postgres -d postgres -c 'CREATE DATABASE dev;'" 

if ($LASTEXITCODE -ne 0) {
    Write-Host "WARNING: Database creation may have failed (maybe it already exists)." -ForegroundColor Yellow
}
else {
    Write-Host "Database 'dev' created successfully." -ForegroundColor Green
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  Database Setup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host "Database: PostgreSQL" -ForegroundColor White
Write-Host "Host: localhost" -ForegroundColor White
Write-Host "Port: 5430" -ForegroundColor White
Write-Host "Username: postgres" -ForegroundColor White
Write-Host "Password: postgres" -ForegroundColor White
Write-Host "Database: dev" -ForegroundColor White
Write-Host ""
Write-Host "You can now run: yarn start" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Green
