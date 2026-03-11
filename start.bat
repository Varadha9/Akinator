@echo off
echo ========================================
echo   Akinator AI - Quick Start Script
echo ========================================
echo.

echo [1/6] Checking prerequisites...
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)
echo Node.js: OK

where mongod >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo WARNING: MongoDB not found in PATH
    echo Make sure MongoDB is running on localhost:27017
    echo Or update MONGODB_URI in backend\.env
)
echo.

echo [2/6] Installing backend dependencies...
cd backend
if not exist node_modules (
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo ERROR: Failed to install backend dependencies
        pause
        exit /b 1
    )
)
echo Backend dependencies: OK
echo.

echo [3/6] Setting up backend environment...
if not exist .env (
    copy .env.example .env
    echo Created .env file - please configure if needed
)
echo Backend environment: OK
echo.

echo [4/6] Installing frontend dependencies...
cd ..\frontend
if not exist node_modules (
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo ERROR: Failed to install frontend dependencies
        pause
        exit /b 1
    )
)
echo Frontend dependencies: OK
echo.

echo [5/6] Seeding database...
cd ..\backend
call npm run seed
if %ERRORLEVEL% NEQ 0 (
    echo WARNING: Database seeding failed
    echo Make sure MongoDB is running
    echo You can seed later with: cd backend ^&^& npm run seed
)
echo.

echo [6/6] Starting services...
echo.
echo ========================================
echo   Setup Complete!
echo ========================================
echo.
echo Starting backend server on http://localhost:5000
echo Starting frontend server on http://localhost:3000
echo.
echo Press Ctrl+C to stop the servers
echo.

start "Akinator Backend" cmd /k "cd backend && npm start"
timeout /t 3 /nobreak >nul
start "Akinator Frontend" cmd /k "cd frontend && npm start"

echo.
echo Services started in separate windows
echo Close those windows to stop the servers
echo.
pause
