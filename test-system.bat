@echo off
echo ========================================
echo   Akinator AI - System Test
echo ========================================
echo.

echo Testing system components...
echo.

REM Test 1: Node.js
echo [Test 1/5] Checking Node.js...
where node >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo [PASS] Node.js installed
    node --version
) else (
    echo [FAIL] Node.js not found
)
echo.

REM Test 2: npm
echo [Test 2/5] Checking npm...
where npm >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo [PASS] npm installed
    npm --version
) else (
    echo [FAIL] npm not found
)
echo.

REM Test 3: MongoDB
echo [Test 3/5] Checking MongoDB...
where mongod >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo [PASS] MongoDB installed
    mongod --version | findstr "version"
) else (
    echo [WARN] MongoDB not in PATH
)
echo.

REM Test 4: Backend files
echo [Test 4/5] Checking backend files...
if exist backend\server.js (
    echo [PASS] backend\server.js found
) else (
    echo [FAIL] backend\server.js missing
)

if exist backend\package.json (
    echo [PASS] backend\package.json found
) else (
    echo [FAIL] backend\package.json missing
)

if exist backend\ai-engine\GameManager.js (
    echo [PASS] AI engine files found
) else (
    echo [FAIL] AI engine files missing
)
echo.

REM Test 5: Frontend files
echo [Test 5/5] Checking frontend files...
if exist frontend\src\App.js (
    echo [PASS] frontend\src\App.js found
) else (
    echo [FAIL] frontend\src\App.js missing
)

if exist frontend\package.json (
    echo [PASS] frontend\package.json found
) else (
    echo [FAIL] frontend\package.json missing
)

if exist frontend\src\components\StartScreen.js (
    echo [PASS] Frontend components found
) else (
    echo [FAIL] Frontend components missing
)
echo.

REM Test 6: Database files
echo [Test 6/6] Checking database files...
if exist database\seed-data\characters.json (
    echo [PASS] characters.json found
) else (
    echo [FAIL] characters.json missing
)

if exist database\seed-data\questions.json (
    echo [PASS] questions.json found
) else (
    echo [FAIL] questions.json missing
)

if exist database\seed-data\seed.js (
    echo [PASS] seed.js found
) else (
    echo [FAIL] seed.js missing
)
echo.

echo ========================================
echo   Test Summary
echo ========================================
echo.
echo If all tests passed, you're ready to run!
echo.
echo Next steps:
echo 1. Make sure MongoDB is running
echo 2. Run: start-complete.bat
echo 3. Open: http://localhost:3000
echo.
pause
