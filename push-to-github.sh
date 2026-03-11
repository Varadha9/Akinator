#!/bin/bash

echo "========================================"
echo "  Push to GitHub - Akinator AI"
echo "========================================"
echo ""

echo "Repository: https://github.com/Varadha9/Akinator.git"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo -e "${RED}ERROR: Git is not installed!${NC}"
    echo "Please install Git from: https://git-scm.com/"
    exit 1
fi

echo "[1/5] Checking git status..."
if [ -d .git ]; then
    echo "Git repository already initialized."
else
    echo "Initializing git repository..."
    git init
    if [ $? -ne 0 ]; then
        echo -e "${RED}ERROR: Failed to initialize git repository${NC}"
        exit 1
    fi
fi
echo ""

echo "[2/5] Adding all files..."
git add .
if [ $? -ne 0 ]; then
    echo -e "${RED}ERROR: Failed to add files${NC}"
    exit 1
fi
echo -e "${GREEN}Files added successfully.${NC}"
echo ""

echo "[3/5] Creating commit..."
git commit -m "Initial commit: Complete Akinator AI system with advanced algorithms"
if [ $? -ne 0 ]; then
    echo -e "${YELLOW}Note: No changes to commit or already committed${NC}"
fi
echo ""

echo "[4/5] Adding remote repository..."
git remote remove origin 2>/dev/null
git remote add origin https://github.com/Varadha9/Akinator.git
if [ $? -ne 0 ]; then
    echo -e "${YELLOW}Note: Remote may already exist${NC}"
fi
git remote -v
echo ""

echo "[5/5] Pushing to GitHub..."
echo ""
echo -e "${YELLOW}You may be prompted for GitHub credentials.${NC}"
echo "Use your GitHub username and Personal Access Token."
echo ""
echo "To create a token:"
echo "1. Go to GitHub.com"
echo "2. Settings > Developer settings > Personal access tokens"
echo "3. Generate new token with 'repo' scope"
echo ""
read -p "Press Enter to continue..."

git branch -M main
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "========================================"
    echo -e "${GREEN}  SUCCESS!${NC}"
    echo "========================================"
    echo ""
    echo "Your project has been pushed to GitHub!"
    echo ""
    echo "Repository: https://github.com/Varadha9/Akinator"
    echo ""
    echo "Next steps:"
    echo "1. Visit your repository on GitHub"
    echo "2. Add description and topics"
    echo "3. Enable GitHub Pages (optional)"
    echo "4. Share your project!"
    echo ""
else
    echo ""
    echo "========================================"
    echo -e "${RED}  PUSH FAILED${NC}"
    echo "========================================"
    echo ""
    echo "Common issues:"
    echo "1. Authentication failed - Use Personal Access Token"
    echo "2. Repository doesn't exist - Create it on GitHub first"
    echo "3. No write access - Check repository permissions"
    echo ""
    echo "For help, see GITHUB_SETUP.md"
    echo ""
fi
