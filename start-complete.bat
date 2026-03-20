@echo off
echo ========================================
echo   Akinator AI - Complete Setup
echo ========================================
echo.

REM Check Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js is not installed!
    echo Please install from: https://nodejs.org/
    pause
    exit /b 1
)
echo [OK] Node.js found: 
node --version
echo.

REM Check MongoDB
echo Checking MongoDB...
where mongod >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo WARNING: MongoDB not found in PATH
    echo.
    echo Please ensure MongoDB is running on localhost:27017
    echo.
    echo Options:
    echo 1. Start local MongoDB: mongod
    echo 2. Use Docker: docker run -d -p 27017:27017 mongo:latest
    echo.
    pause
) else (
    echo [OK] MongoDB found
    echo.
)

echo ========================================
echo   Installing Dependencies
echo ========================================
echo.

echo [1/4] Installing backend dependencies...
cd backend
if not exist node_modules (
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo ERROR: Failed to install backend dependencies
        pause
        exit /b 1
    )
) else (
    echo Backend dependencies already installed
)
echo.

echo [2/4] Setting up backend environment...
if not exist .env (
    copy .env.example .env
    echo Created .env file
) else (
    echo .env file already exists
)
echo.

echo [3/4] Installing frontend dependencies...
cd ..\frontend
if not exist node_modules (
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo ERROR: Failed to install frontend dependencies
        pause
        exit /b 1
    )
) else (
    echo Frontend dependencies already installed
)
echo.

echo [4/4] Seeding database...
cd ..\backend
call npm run seed
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo WARNING: Database seeding failed
    echo Make sure MongoDB is running!
    echo.
    echo You can seed later with: cd backend ^&^& npm run seed
    echo.
    pause
)
echo.

echo ========================================
echo   Starting Services
echo ========================================
echo.
echo Backend will start on: http://localhost:5000
echo Frontend will start on: http://localhost:3000
echo.
echo Press Ctrl+C in each window to stop
echo.
pause

REM Start backend in new window
start "Akinator Backend" cmd /k "cd /d %~dp0backend && npm start"

REM Wait a bit for backend to start
timeout /t 5 /nobreak >nul

REM Start frontend in new window
start "Akinator Frontend" cmd /k "cd /d %~dp0frontend && npm start"

echo.
echo ========================================
echo   Services Started!
echo ========================================
echo.
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo The game will open in your browser automatically.
echo.
echo To stop: Close the terminal windows or press Ctrl+C
echo.
echo Enjoy playing Akinator AI!
echo.
pause
