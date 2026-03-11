#!/bin/bash

echo "========================================"
echo "  Akinator AI - Quick Start Script"
echo "========================================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Node.js
echo "[1/6] Checking prerequisites..."
if ! command -v node &> /dev/null; then
    echo -e "${RED}ERROR: Node.js is not installed!${NC}"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi
echo -e "${GREEN}Node.js: OK${NC}"

# Check MongoDB
if ! command -v mongod &> /dev/null; then
    echo -e "${YELLOW}WARNING: MongoDB not found in PATH${NC}"
    echo "Make sure MongoDB is running on localhost:27017"
    echo "Or update MONGODB_URI in backend/.env"
fi
echo ""

# Install backend dependencies
echo "[2/6] Installing backend dependencies..."
cd backend
if [ ! -d "node_modules" ]; then
    npm install
    if [ $? -ne 0 ]; then
        echo -e "${RED}ERROR: Failed to install backend dependencies${NC}"
        exit 1
    fi
fi
echo -e "${GREEN}Backend dependencies: OK${NC}"
echo ""

# Setup backend environment
echo "[3/6] Setting up backend environment..."
if [ ! -f ".env" ]; then
    cp .env.example .env
    echo "Created .env file - please configure if needed"
fi
echo -e "${GREEN}Backend environment: OK${NC}"
echo ""

# Install frontend dependencies
echo "[4/6] Installing frontend dependencies..."
cd ../frontend
if [ ! -d "node_modules" ]; then
    npm install
    if [ $? -ne 0 ]; then
        echo -e "${RED}ERROR: Failed to install frontend dependencies${NC}"
        exit 1
    fi
fi
echo -e "${GREEN}Frontend dependencies: OK${NC}"
echo ""

# Seed database
echo "[5/6] Seeding database..."
cd ../backend
npm run seed
if [ $? -ne 0 ]; then
    echo -e "${YELLOW}WARNING: Database seeding failed${NC}"
    echo "Make sure MongoDB is running"
    echo "You can seed later with: cd backend && npm run seed"
fi
echo ""

# Start services
echo "[6/6] Starting services..."
echo ""
echo "========================================"
echo "  Setup Complete!"
echo "========================================"
echo ""
echo "Starting backend server on http://localhost:5000"
echo "Starting frontend server on http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop the servers"
echo ""

# Start backend in background
cd ../backend
npm start &
BACKEND_PID=$!

# Wait a bit for backend to start
sleep 3

# Start frontend
cd ../frontend
npm start &
FRONTEND_PID=$!

# Wait for user interrupt
wait

# Cleanup
kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
