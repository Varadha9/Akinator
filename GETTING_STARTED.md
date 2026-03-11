# 🚀 Getting Started with Akinator AI

Welcome! This guide will help you get Akinator AI up and running in minutes.

## 📋 What You'll Need

- **Node.js 16+** - [Download here](https://nodejs.org/)
- **MongoDB 5.0+** - [Download here](https://www.mongodb.com/try/download/community)
- **Git** - [Download here](https://git-scm.com/)
- **Code Editor** (VS Code recommended)

## ⚡ Quick Start (3 Minutes)

### Option 1: Automated Setup (Recommended)

**Windows:**
```bash
# Run the quick start script
start.bat
```

**Mac/Linux:**
```bash
# Make script executable
chmod +x start.sh

# Run the quick start script
./start.sh
```

The script will:
1. ✅ Check prerequisites
2. ✅ Install dependencies
3. ✅ Setup environment
4. ✅ Seed database
5. ✅ Start both servers

**Access the app:** `http://localhost:3000`

### Option 2: Docker (Easiest)

```bash
# Start everything with one command
docker-compose up --build

# Or run in background
docker-compose up -d
```

**Access the app:** `http://localhost:3000`

### Option 3: Manual Setup

#### Step 1: Clone Repository
```bash
git clone https://github.com/yourusername/akinator-ai.git
cd akinator-ai
```

#### Step 2: Setup Backend
```bash
cd backend
npm install
cp .env.example .env
```

#### Step 3: Setup Frontend
```bash
cd ../frontend
npm install
```

#### Step 4: Start MongoDB
```bash
# Option A: Local MongoDB
mongod

# Option B: Docker MongoDB
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

#### Step 5: Seed Database
```bash
cd ../backend
npm run seed
```

#### Step 6: Start Servers
```bash
# Terminal 1: Backend
cd backend
npm start

# Terminal 2: Frontend
cd frontend
npm start
```

**Access the app:** `http://localhost:3000`

## 🎮 How to Play

1. **Click "Start Game"** - Choose a category or play with all characters
2. **Think of a character** - Any real or fictional character
3. **Answer questions** - Be honest with your answers
4. **See the magic** - Watch the AI guess your character
5. **Help it learn** - If wrong, teach the AI about your character

## 📁 Project Structure

```
akinator-ai/
├── backend/              # Node.js + Express API
│   ├── ai-engine/       # AI algorithms (Bayesian, Info Gain)
│   ├── controllers/     # Request handlers
│   ├── models/         # MongoDB schemas
│   └── server.js       # Main server
│
├── frontend/            # React application
│   ├── src/
│   │   ├── components/ # UI components
│   │   └── services/   # API client
│   └── public/         # Static files
│
├── database/           # Database files
│   └── seed-data/     # 100+ characters, 55 questions
│
└── docs/              # Documentation
```

## 🔧 Configuration

### Backend Environment (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/akinator
NODE_ENV=development
MAX_QUESTIONS=20
CONFIDENCE_THRESHOLD=0.8
```

### Frontend Environment (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 🧪 Verify Setup

Run the verification script:
```bash
# Windows
verify-setup.bat

# Mac/Linux
chmod +x verify-setup.sh
./verify-setup.sh
```

This checks:
- ✅ All files present
- ✅ Prerequisites installed
- ✅ Correct versions

## 🐛 Troubleshooting

### MongoDB Connection Error
```bash
# Check if MongoDB is running
mongod --version

# Start MongoDB
mongod

# Or use Docker
docker run -d -p 27017:27017 mongo:latest
```

### Port Already in Use
```bash
# Kill process on port 5000
npx kill-port 5000

# Kill process on port 3000
npx kill-port 3000
```

### Dependencies Won't Install
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Database Seeding Fails
```bash
# Make sure MongoDB is running
# Then run seed script
cd backend
node database/seed-data/seed.js
```

## 📚 Next Steps

### Learn More
- 📖 [Full Documentation](README.md)
- 🏗️ [Architecture Guide](docs/architecture.md)
- 🚀 [Deployment Guide](docs/DEPLOYMENT.md)
- 🧪 [API Testing](docs/API_TESTING.md)

### Customize
- Add new characters to `database/seed-data/characters.json`
- Add new questions to `database/seed-data/questions.json`
- Modify UI in `frontend/src/components/`
- Adjust AI logic in `backend/ai-engine/`

### Deploy
- 🐳 Docker: `docker-compose up -d`
- ☁️ AWS: See [DEPLOYMENT.md](docs/DEPLOYMENT.md)
- 🌐 Vercel: See [DEPLOYMENT.md](docs/DEPLOYMENT.md)

## 🎯 Key Features

- **Smart AI**: Uses Bayesian probability and information gain
- **Self-Learning**: Improves with every game
- **100+ Characters**: Movies, anime, sports, tech, and more
- **Responsive Design**: Works on desktop and mobile
- **Production Ready**: Docker, AWS, Vercel deployment

## 📊 Tech Stack

- **Frontend**: React 18, CSS3, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **AI**: Custom Bayesian + Information Gain algorithms
- **Deployment**: Docker, AWS, Vercel

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md)

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/akinator-ai/issues)
- **Docs**: [Documentation](docs/)
- **Email**: support@example.com

## 📄 License

MIT License - See [LICENSE](LICENSE)

---

## 🎉 You're Ready!

Start the application and enjoy playing!

```bash
# Quick start
start.bat  # Windows
./start.sh # Mac/Linux

# Or Docker
docker-compose up
```

**Happy Guessing! 🔮**

---

Made with ❤️ by the Akinator AI Team
