@echo off
echo ========================================
echo   Updating GitHub with Fixes
echo ========================================
echo.

cd d:\Akinator

echo Adding updated files...
git add .

echo Creating commit...
git commit -m "Fix: Update game flow and add comprehensive setup scripts

- Fixed backend to return first question on game start
- Fixed frontend to handle first question properly
- Added start-complete.bat for full automated setup
- Added test-system.bat to verify installation
- Added SETUP_AND_RUN.md with detailed instructions
- Added QUICK_RUN.md for quick reference
- Improved error handling and user experience"

echo Pushing to GitHub...
git push

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo   SUCCESS!
    echo ========================================
    echo.
    echo Changes pushed to GitHub!
    echo Visit: https://github.com/Varadha9/Akinator
    echo.
) else (
    echo.
    echo ========================================
    echo   PUSH FAILED
    echo ========================================
    echo.
    echo Please check your internet connection
    echo and GitHub credentials.
    echo.
)

pause
