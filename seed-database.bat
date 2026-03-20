@echo off
echo ========================================
echo   Manual Database Seeding
echo ========================================
echo.

echo Make sure MongoDB is running!
echo.
pause

cd d:\Akinator\backend
echo Running seed script...
node ..\database\seed-data\seed.js

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo   SUCCESS!
    echo ========================================
    echo.
    echo Database seeded successfully!
    echo.
) else (
    echo.
    echo ========================================
    echo   FAILED
    echo ========================================
    echo.
    echo Make sure:
    echo 1. MongoDB is running (mongod)
    echo 2. MongoDB is accessible on localhost:27017
    echo.
)

pause
