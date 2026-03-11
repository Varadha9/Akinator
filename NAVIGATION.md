# 🗺️ AKINATOR AI - MASTER NAVIGATION INDEX

Welcome to the Akinator AI project! This document helps you navigate the entire project.

---

## 🚀 START HERE

### New Users
1. **[VISUAL_OVERVIEW.md](VISUAL_OVERVIEW.md)** - Visual project overview
2. **[GETTING_STARTED.md](GETTING_STARTED.md)** - Step-by-step setup guide
3. **[README.md](README.md)** - Complete project documentation

### Quick Start
- **Windows**: Run `start.bat`
- **Mac/Linux**: Run `./start.sh`
- **Docker**: Run `docker-compose up`

---

## 📚 DOCUMENTATION INDEX

### Essential Reading
| Document | Purpose | Read Time |
|----------|---------|-----------|
| [README.md](README.md) | Main documentation | 10 min |
| [GETTING_STARTED.md](GETTING_STARTED.md) | Quick start guide | 5 min |
| [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) | Quick reference | 3 min |
| [VISUAL_OVERVIEW.md](VISUAL_OVERVIEW.md) | Visual overview | 2 min |

### Technical Documentation
| Document | Purpose | Audience |
|----------|---------|----------|
| [docs/architecture.md](docs/architecture.md) | System architecture | Developers |
| [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) | Deployment guide | DevOps |
| [docs/API_TESTING.md](docs/API_TESTING.md) | API testing | Developers |
| [docs/DIAGRAMS.md](docs/DIAGRAMS.md) | Visual diagrams | Everyone |

### Reference Documents
| Document | Purpose |
|----------|---------|
| [FILE_INDEX.md](FILE_INDEX.md) | Complete file listing |
| [PROJECT_COMPLETE.md](PROJECT_COMPLETE.md) | Completion summary |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Contribution guidelines |
| [LICENSE](LICENSE) | MIT License |

---

## 🗂️ CODE NAVIGATION

### Backend (`/backend`)
```
backend/
├── 🧠 AI Engine
│   ├── GameManager.js          - Session management
│   ├── ProbabilityEngine.js    - Bayesian scoring
│   ├── QuestionSelector.js     - Information gain
│   └── GuessGenerator.js       - Prediction logic
│
├── 🎮 Controllers
│   └── gameController.js       - API handlers
│
├── 📊 Models
│   ├── Question.js             - Question schema
│   ├── Character.js            - Character schema
│   └── GameLog.js              - Game log schema
│
├── 🛣️ Routes
│   └── gameRoutes.js           - API endpoints
│
├── 🔌 Services
│   └── databaseService.js      - DB operations
│
└── 🚀 Entry Point
    └── server.js               - Express server
```

### Frontend (`/frontend`)
```
frontend/
├── 🖼️ Components
│   ├── StartScreen.js          - Game start
│   ├── QuestionScreen.js       - Question display
│   ├── GuessScreen.js          - AI guess
│   └── LearningScreen.js       - New character
│
├── 📄 Pages
│   └── Game.js                 - Main game logic
│
├── 🔌 Services
│   └── api.js                  - API client
│
├── 🎨 Styling
│   ├── App.css                 - Main styles
│   └── index.css               - Global styles
│
└── 🚀 Entry Point
    ├── App.js                  - Main app
    └── index.js                - React entry
```

### Database (`/database`)
```
database/
└── 🌱 Seed Data
    ├── characters.json         - 100+ characters
    ├── questions.json          - 55 questions
    └── seed.js                 - Seeding script
```

---

## 🎯 QUICK LINKS BY TASK

### I want to...

#### Run the Application
- [GETTING_STARTED.md](GETTING_STARTED.md) - Setup instructions
- `start.bat` or `start.sh` - Quick start scripts
- `docker-compose.yml` - Docker setup

#### Understand the System
- [docs/architecture.md](docs/architecture.md) - System design
- [docs/DIAGRAMS.md](docs/DIAGRAMS.md) - Visual diagrams
- [VISUAL_OVERVIEW.md](VISUAL_OVERVIEW.md) - Quick overview

#### Deploy to Production
- [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) - Deployment guide
- `Dockerfile.backend` - Backend container
- `Dockerfile.frontend` - Frontend container
- `docker-compose.yml` - Docker orchestration

#### Test the API
- [docs/API_TESTING.md](docs/API_TESTING.md) - API examples
- `backend/routes/gameRoutes.js` - API endpoints
- `backend/controllers/gameController.js` - API logic

#### Modify the AI
- `backend/ai-engine/ProbabilityEngine.js` - Scoring logic
- `backend/ai-engine/QuestionSelector.js` - Question selection
- `backend/ai-engine/GuessGenerator.js` - Prediction logic

#### Add Characters/Questions
- `database/seed-data/characters.json` - Character data
- `database/seed-data/questions.json` - Question data
- `database/seed-data/seed.js` - Seeding script

#### Customize the UI
- `frontend/src/components/` - UI components
- `frontend/src/App.css` - Styling
- `frontend/src/pages/Game.js` - Game logic

#### Contribute
- [CONTRIBUTING.md](CONTRIBUTING.md) - Contribution guidelines
- [LICENSE](LICENSE) - MIT License

---

## 📊 PROJECT STRUCTURE

```
akinator-ai/
│
├── 📖 Documentation (Root)
│   ├── README.md                    ⭐ Start here
│   ├── GETTING_STARTED.md           ⭐ Quick start
│   ├── PROJECT_SUMMARY.md           Quick reference
│   ├── VISUAL_OVERVIEW.md           Visual guide
│   ├── FILE_INDEX.md                File listing
│   ├── PROJECT_COMPLETE.md          Completion summary
│   ├── CONTRIBUTING.md              How to contribute
│   └── LICENSE                      MIT License
│
├── 📚 Documentation (docs/)
│   ├── architecture.md              ⭐ System design
│   ├── DEPLOYMENT.md                ⭐ Deploy guide
│   ├── API_TESTING.md               API examples
│   └── DIAGRAMS.md                  Visual diagrams
│
├── 🔧 Backend
│   ├── ai-engine/                   ⭐ AI algorithms
│   ├── controllers/                 Request handlers
│   ├── models/                      Database schemas
│   ├── routes/                      API endpoints
│   ├── services/                    Business logic
│   └── server.js                    ⭐ Entry point
│
├── 🎨 Frontend
│   ├── src/components/              ⭐ UI components
│   ├── src/pages/                   Game logic
│   ├── src/services/                API client
│   └── src/App.js                   ⭐ Main app
│
├── 💾 Database
│   └── seed-data/                   ⭐ Initial data
│
├── 🐳 Docker
│   ├── docker-compose.yml           ⭐ Orchestration
│   ├── Dockerfile.backend           Backend image
│   ├── Dockerfile.frontend          Frontend image
│   └── nginx.conf                   Nginx config
│
└── 🚀 Scripts
    ├── start.bat                    ⭐ Windows start
    ├── start.sh                     ⭐ Unix start
    └── verify-setup.bat             Setup verification
```

⭐ = Most important files

---

## 🎓 LEARNING PATH

### Beginner
1. Read [VISUAL_OVERVIEW.md](VISUAL_OVERVIEW.md)
2. Read [GETTING_STARTED.md](GETTING_STARTED.md)
3. Run `start.bat` or `start.sh`
4. Play the game
5. Read [README.md](README.md)

### Intermediate
1. Read [docs/architecture.md](docs/architecture.md)
2. Explore `backend/ai-engine/`
3. Explore `frontend/src/components/`
4. Read [docs/API_TESTING.md](docs/API_TESTING.md)
5. Modify and test

### Advanced
1. Read [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)
2. Study AI algorithms in detail
3. Implement new features
4. Deploy to production
5. Contribute improvements

---

## 🔍 SEARCH BY TOPIC

### AI & Algorithms
- [backend/ai-engine/ProbabilityEngine.js](backend/ai-engine/ProbabilityEngine.js)
- [backend/ai-engine/QuestionSelector.js](backend/ai-engine/QuestionSelector.js)
- [docs/architecture.md](docs/architecture.md) (Algorithms section)

### API & Backend
- [backend/server.js](backend/server.js)
- [backend/routes/gameRoutes.js](backend/routes/gameRoutes.js)
- [docs/API_TESTING.md](docs/API_TESTING.md)

### Frontend & UI
- [frontend/src/components/](frontend/src/components/)
- [frontend/src/App.css](frontend/src/App.css)
- [frontend/src/pages/Game.js](frontend/src/pages/Game.js)

### Database
- [backend/models/](backend/models/)
- [database/seed-data/](database/seed-data/)
- [docs/architecture.md](docs/architecture.md) (Database section)

### Deployment
- [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)
- [docker-compose.yml](docker-compose.yml)
- [Dockerfile.backend](Dockerfile.backend)
- [Dockerfile.frontend](Dockerfile.frontend)

---

## 📞 SUPPORT & RESOURCES

### Getting Help
- **Issues**: GitHub Issues
- **Documentation**: All docs in `/docs`
- **Examples**: [docs/API_TESTING.md](docs/API_TESTING.md)

### Contributing
- **Guidelines**: [CONTRIBUTING.md](CONTRIBUTING.md)
- **License**: [LICENSE](LICENSE)

### External Resources
- **Node.js**: https://nodejs.org/
- **React**: https://react.dev/
- **MongoDB**: https://www.mongodb.com/
- **Docker**: https://www.docker.com/

---

## ✅ CHECKLIST

### First Time Setup
- [ ] Read [GETTING_STARTED.md](GETTING_STARTED.md)
- [ ] Install prerequisites (Node.js, MongoDB)
- [ ] Run `start.bat` or `start.sh`
- [ ] Access http://localhost:3000
- [ ] Play a game

### Understanding the System
- [ ] Read [README.md](README.md)
- [ ] Read [docs/architecture.md](docs/architecture.md)
- [ ] Review [docs/DIAGRAMS.md](docs/DIAGRAMS.md)
- [ ] Explore code structure

### Development
- [ ] Set up development environment
- [ ] Read [CONTRIBUTING.md](CONTRIBUTING.md)
- [ ] Make changes
- [ ] Test locally
- [ ] Submit pull request

### Deployment
- [ ] Read [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)
- [ ] Choose deployment option
- [ ] Configure environment
- [ ] Deploy application
- [ ] Test production

---

## 🎉 QUICK WINS

### 5 Minutes
- Run the application
- Play a game
- See the AI in action

### 30 Minutes
- Read main documentation
- Understand architecture
- Explore code

### 2 Hours
- Modify UI
- Add characters
- Test changes

### 1 Day
- Deploy to production
- Customize AI
- Add features

---

## 📈 PROJECT STATS

- **Total Files**: 52
- **Documentation**: 10 files
- **Code Files**: 30+
- **Lines of Code**: 8,200+
- **Characters**: 100+
- **Questions**: 55
- **AI Algorithms**: 4
- **API Endpoints**: 5

---

## 🌟 HIGHLIGHTS

✅ Complete full-stack application
✅ Advanced AI algorithms
✅ Production-ready code
✅ Comprehensive documentation
✅ Multiple deployment options
✅ Self-learning system
✅ 100+ characters
✅ Docker support

---

**Last Updated**: 2024
**Status**: ✅ PRODUCTION READY
**Version**: 1.0.0

---

Made with ❤️ and advanced AI algorithms
