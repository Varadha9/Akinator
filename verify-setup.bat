@echo off
echo ========================================
echo   Akinator AI - Setup Verification
echo ========================================
echo.

set ERRORS=0

echo Checking project structure...
echo.

REM Check backend files
if exist "backend\package.json" (
    echo [OK] backend\package.json
) else (
    echo [ERROR] backend\package.json missing
    set /a ERRORS+=1
)

if exist "backend\server.js" (
    echo [OK] backend\server.js
) else (
    echo [ERROR] backend\server.js missing
    set /a ERRORS+=1
)

if exist "backend\ai-engine\GameManager.js" (
    echo [OK] backend\ai-engine\GameManager.js
) else (
    echo [ERROR] backend\ai-engine\GameManager.js missing
    set /a ERRORS+=1
)

if exist "backend\ai-engine\ProbabilityEngine.js" (
    echo [OK] backend\ai-engine\ProbabilityEngine.js
) else (
    echo [ERROR] backend\ai-engine\ProbabilityEngine.js missing
    set /a ERRORS+=1
)

if exist "backend\ai-engine\QuestionSelector.js" (
    echo [OK] backend\ai-engine\QuestionSelector.js
) else (
    echo [ERROR] backend\ai-engine\QuestionSelector.js missing
    set /a ERRORS+=1
)

if exist "backend\models\Character.js" (
    echo [OK] backend\models\Character.js
) else (
    echo [ERROR] backend\models\Character.js missing
    set /a ERRORS+=1
)

echo.
REM Check frontend files
if exist "frontend\package.json" (
    echo [OK] frontend\package.json
) else (
    echo [ERROR] frontend\package.json missing
    set /a ERRORS+=1
)

if exist "frontend\src\App.js" (
    echo [OK] frontend\src\App.js
) else (
    echo [ERROR] frontend\src\App.js missing
    set /a ERRORS+=1
)

if exist "frontend\src\components\StartScreen.js" (
    echo [OK] frontend\src\components\StartScreen.js
) else (
    echo [ERROR] frontend\src\components\StartScreen.js missing
    set /a ERRORS+=1
)

if exist "frontend\src\components\QuestionScreen.js" (
    echo [OK] frontend\src\components\QuestionScreen.js
) else (
    echo [ERROR] frontend\src\components\QuestionScreen.js missing
    set /a ERRORS+=1
)

echo.
REM Check database files
if exist "database\seed-data\characters.json" (
    echo [OK] database\seed-data\characters.json
) else (
    echo [ERROR] database\seed-data\characters.json missing
    set /a ERRORS+=1
)

if exist "database\seed-data\questions.json" (
    echo [OK] database\seed-data\questions.json
) else (
    echo [ERROR] database\seed-data\questions.json missing
    set /a ERRORS+=1
)

if exist "database\seed-data\seed.js" (
    echo [OK] database\seed-data\seed.js
) else (
    echo [ERROR] database\seed-data\seed.js missing
    set /a ERRORS+=1
)

echo.
REM Check documentation
if exist "README.md" (
    echo [OK] README.md
) else (
    echo [ERROR] README.md missing
    set /a ERRORS+=1
)

if exist "docs\architecture.md" (
    echo [OK] docs\architecture.md
) else (
    echo [ERROR] docs\architecture.md missing
    set /a ERRORS+=1
)

if exist "docs\DEPLOYMENT.md" (
    echo [OK] docs\DEPLOYMENT.md
) else (
    echo [ERROR] docs\DEPLOYMENT.md missing
    set /a ERRORS+=1
)

echo.
REM Check Docker files
if exist "docker-compose.yml" (
    echo [OK] docker-compose.yml
) else (
    echo [ERROR] docker-compose.yml missing
    set /a ERRORS+=1
)

if exist "Dockerfile.backend" (
    echo [OK] Dockerfile.backend
) else (
    echo [ERROR] Dockerfile.backend missing
    set /a ERRORS+=1
)

if exist "Dockerfile.frontend" (
    echo [OK] Dockerfile.frontend
) else (
    echo [ERROR] Dockerfile.frontend missing
    set /a ERRORS+=1
)

echo.
echo ========================================
echo   Verification Complete
echo ========================================
echo.

if %ERRORS%==0 (
    echo [SUCCESS] All files present! ✓
    echo.
    echo You can now run:
    echo   - start.bat (Quick start)
    echo   - docker-compose up (Docker deployment)
    echo.
) else (
    echo [WARNING] %ERRORS% file(s) missing!
    echo Please check the errors above.
    echo.
)

echo Checking prerequisites...
echo.

where node >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo [OK] Node.js installed
    node --version
) else (
    echo [ERROR] Node.js not found
    echo Install from: https://nodejs.org/
)

where npm >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo [OK] npm installed
    npm --version
) else (
    echo [ERROR] npm not found
)

where mongod >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo [OK] MongoDB installed
    mongod --version
) else (
    echo [WARNING] MongoDB not found in PATH
    echo Install from: https://www.mongodb.com/try/download/community
)

where docker >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo [OK] Docker installed
    docker --version
) else (
    echo [INFO] Docker not found (optional)
)

echo.
echo ========================================
pause
