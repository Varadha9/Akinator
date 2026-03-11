@echo off
echo ========================================
echo   Push to GitHub - Akinator AI
echo ========================================
echo.

echo Repository: https://github.com/Varadha9/Akinator.git
echo.

REM Check if git is installed
where git >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Git is not installed!
    echo Please install Git from: https://git-scm.com/
    pause
    exit /b 1
)

echo [1/5] Checking git status...
if exist .git (
    echo Git repository already initialized.
) else (
    echo Initializing git repository...
    git init
    if %ERRORLEVEL% NEQ 0 (
        echo ERROR: Failed to initialize git repository
        pause
        exit /b 1
    )
)
echo.

echo [2/5] Adding all files...
git add .
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to add files
    pause
    exit /b 1
)
echo Files added successfully.
echo.

echo [3/5] Creating commit...
git commit -m "Initial commit: Complete Akinator AI system with advanced algorithms"
if %ERRORLEVEL% NEQ 0 (
    echo Note: No changes to commit or already committed
)
echo.

echo [4/5] Adding remote repository...
git remote remove origin 2>nul
git remote add origin https://github.com/Varadha9/Akinator.git
if %ERRORLEVEL% NEQ 0 (
    echo Note: Remote may already exist
)
git remote -v
echo.

echo [5/5] Pushing to GitHub...
echo.
echo You may be prompted for GitHub credentials.
echo Use your GitHub username and Personal Access Token.
echo.
echo To create a token:
echo 1. Go to GitHub.com
echo 2. Settings ^> Developer settings ^> Personal access tokens
echo 3. Generate new token with 'repo' scope
echo.
pause

git branch -M main
git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo   SUCCESS! 
    echo ========================================
    echo.
    echo Your project has been pushed to GitHub!
    echo.
    echo Repository: https://github.com/Varadha9/Akinator
    echo.
    echo Next steps:
    echo 1. Visit your repository on GitHub
    echo 2. Add description and topics
    echo 3. Enable GitHub Pages (optional)
    echo 4. Share your project!
    echo.
) else (
    echo.
    echo ========================================
    echo   PUSH FAILED
    echo ========================================
    echo.
    echo Common issues:
    echo 1. Authentication failed - Use Personal Access Token
    echo 2. Repository doesn't exist - Create it on GitHub first
    echo 3. No write access - Check repository permissions
    echo.
    echo For help, see GITHUB_SETUP.md
    echo.
)

pause
