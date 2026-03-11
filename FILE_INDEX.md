# 📑 Akinator AI - Complete File Index

## 📂 Root Directory

| File | Description |
|------|-------------|
| `README.md` | Main project documentation with overview, installation, and usage |
| `PROJECT_SUMMARY.md` | Quick reference guide with key statistics and commands |
| `GETTING_STARTED.md` | Step-by-step guide for new users |
| `CONTRIBUTING.md` | Guidelines for contributing to the project |
| `LICENSE` | MIT License |
| `.gitignore` | Git ignore rules |
| `docker-compose.yml` | Docker orchestration configuration |
| `Dockerfile.backend` | Backend Docker container definition |
| `Dockerfile.frontend` | Frontend Docker container definition |
| `nginx.conf` | Nginx configuration for frontend |
| `start.bat` | Windows quick start script |
| `start.sh` | Unix/Linux/Mac quick start script |
| `verify-setup.bat` | Setup verification script |

## 🔧 Backend (`/backend`)

### Core Files
| File | Description |
|------|-------------|
| `server.js` | Express server entry point |
| `package.json` | Backend dependencies and scripts |
| `.env.example` | Environment variables template |

### AI Engine (`/backend/ai-engine`)
| File | Description | Lines | Purpose |
|------|-------------|-------|---------|
| `GameManager.js` | Session state management | ~100 | Manages game sessions, coordinates AI components |
| `ProbabilityEngine.js` | Bayesian probability calculator | ~90 | Calculates character probabilities from answers |
| `QuestionSelector.js` | Information gain algorithm | ~100 | Selects most informative questions |
| `GuessGenerator.js` | Character prediction logic | ~50 | Decides when and what to guess |

### Controllers (`/backend/controllers`)
| File | Description |
|------|-------------|
| `gameController.js` | API request handlers for all game endpoints |

### Models (`/backend/models`)
| File | Description | Schema |
|------|-------------|--------|
| `Question.js` | Question schema | text, category, createdAt |
| `Character.js` | Character schema | name, category, answers[], createdAt |
| `GameLog.js` | Game log schema | sessionId, answers[], success, timestamp |

### Routes (`/backend/routes`)
| File | Description |
|------|-------------|
| `gameRoutes.js` | API route definitions |

### Services (`/backend/services`)
| File | Description |
|------|-------------|
| `databaseService.js` | MongoDB operations wrapper |

## 🎨 Frontend (`/frontend`)

### Core Files
| File | Description |
|------|-------------|
| `package.json` | Frontend dependencies and scripts |

### Source (`/frontend/src`)
| File | Description |
|------|-------------|
| `index.js` | React entry point |
| `index.css` | Global CSS reset |
| `App.js` | Main application component |
| `App.css` | Complete application styling (500+ lines) |

### Components (`/frontend/src/components`)
| File | Description | Features |
|------|-------------|----------|
| `StartScreen.js` | Game start screen | Category selection, instructions |
| `QuestionScreen.js` | Question display | Progress bar, 5 answer buttons |
| `GuessScreen.js` | AI guess display | Character card, confidence meter |
| `LearningScreen.js` | New character form | Character input, question input |

### Pages (`/frontend/src/pages`)
| File | Description |
|------|-------------|
| `Game.js` | Main game logic and state management |

### Services (`/frontend/src/services`)
| File | Description |
|------|-------------|
| `api.js` | Axios API client with all endpoints |

### Public (`/frontend/public`)
| File | Description |
|------|-------------|
| `index.html` | HTML template |

## 💾 Database (`/database`)

### Seed Data (`/database/seed-data`)
| File | Description | Content |
|------|-------------|---------|
| `characters.json` | Character database | 100+ characters with profiles |
| `questions.json` | Question database | 55 strategic questions |
| `seed.js` | Database seeding script | Populates MongoDB with initial data |

## 📚 Documentation (`/docs`)

| File | Description | Pages |
|------|-------------|-------|
| `architecture.md` | Complete system architecture | ~15 | Detailed technical documentation |
| `DEPLOYMENT.md` | Deployment guide | ~12 | AWS, Docker, Vercel instructions |
| `API_TESTING.md` | API testing guide | ~10 | Endpoint examples, testing tools |

## 📊 File Statistics

### Total Files: 47

#### By Category:
- **Backend**: 12 files
- **Frontend**: 13 files
- **Database**: 3 files
- **Documentation**: 7 files
- **Configuration**: 8 files
- **Scripts**: 4 files

#### By Type:
- **JavaScript**: 24 files
- **JSON**: 4 files
- **Markdown**: 8 files
- **CSS**: 2 files
- **HTML**: 1 file
- **Config**: 5 files
- **Scripts**: 3 files

#### Lines of Code:
- **Backend**: ~1,500 lines
- **Frontend**: ~1,200 lines
- **Database**: ~3,000 lines (data)
- **Documentation**: ~2,500 lines
- **Total**: ~8,200 lines

## 🎯 Key Files to Understand

### For Developers:
1. `backend/ai-engine/ProbabilityEngine.js` - Core AI logic
2. `backend/ai-engine/QuestionSelector.js` - Question selection algorithm
3. `frontend/src/pages/Game.js` - Game state management
4. `backend/controllers/gameController.js` - API logic

### For Deployment:
1. `docker-compose.yml` - Docker setup
2. `docs/DEPLOYMENT.md` - Deployment instructions
3. `.env.example` - Configuration template

### For Understanding:
1. `README.md` - Project overview
2. `docs/architecture.md` - System design
3. `PROJECT_SUMMARY.md` - Quick reference

## 🔍 File Dependencies

### Backend Dependencies (package.json):
```json
{
  "express": "^4.18.2",
  "mongoose": "^7.5.0",
  "cors": "^2.8.5",
  "dotenv": "^16.3.1",
  "uuid": "^9.0.0",
  "body-parser": "^1.20.2"
}
```

### Frontend Dependencies (package.json):
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-scripts": "5.0.1",
  "axios": "^1.5.0"
}
```

## 📝 File Naming Conventions

- **Components**: PascalCase (e.g., `StartScreen.js`)
- **Services**: camelCase (e.g., `databaseService.js`)
- **Config**: kebab-case (e.g., `docker-compose.yml`)
- **Docs**: UPPERCASE (e.g., `README.md`)

## 🔄 File Relationships

```
server.js
  ├── routes/gameRoutes.js
  │   └── controllers/gameController.js
  │       ├── ai-engine/GameManager.js
  │       │   ├── QuestionSelector.js
  │       │   ├── ProbabilityEngine.js
  │       │   └── GuessGenerator.js
  │       └── services/databaseService.js
  │           └── models/*.js
  │
App.js
  └── pages/Game.js
      ├── components/StartScreen.js
      ├── components/QuestionScreen.js
      ├── components/GuessScreen.js
      ├── components/LearningScreen.js
      └── services/api.js
```

## 🎨 CSS Files

| File | Lines | Purpose |
|------|-------|---------|
| `App.css` | ~500 | Complete application styling |
| `index.css` | ~15 | Global CSS reset |

## 🗄️ Data Files

| File | Size | Records |
|------|------|---------|
| `characters.json` | ~50KB | 100+ characters |
| `questions.json` | ~5KB | 55 questions |

## 🚀 Executable Scripts

| Script | Platform | Purpose |
|--------|----------|---------|
| `start.bat` | Windows | Quick start |
| `start.sh` | Unix/Linux/Mac | Quick start |
| `verify-setup.bat` | Windows | Verify installation |

## 📦 Build Outputs (Not in Repo)

```
backend/node_modules/     # Backend dependencies
frontend/node_modules/    # Frontend dependencies
frontend/build/           # Production build
backend/.env             # Environment variables
```

## 🔐 Sensitive Files (Gitignored)

- `.env` - Environment variables
- `node_modules/` - Dependencies
- `build/` - Build outputs
- `*.log` - Log files

## 📈 File Growth Potential

### Easy to Extend:
- `characters.json` - Add unlimited characters
- `questions.json` - Add more questions
- `components/` - Add new UI components
- `ai-engine/` - Add new AI algorithms

### Scalability:
- Modular architecture allows easy addition of:
  - New categories
  - New question types
  - New AI algorithms
  - New features

## 🎯 Critical Files (Don't Delete!)

1. `backend/server.js` - Server entry point
2. `backend/ai-engine/*.js` - Core AI logic
3. `frontend/src/App.js` - Frontend entry
4. `database/seed-data/*.json` - Initial data
5. `docker-compose.yml` - Docker setup

## 📞 File Support

For questions about specific files:
- **Backend**: Check `docs/architecture.md`
- **Frontend**: Check component comments
- **Database**: Check `database/seed-data/seed.js`
- **Deployment**: Check `docs/DEPLOYMENT.md`

---

**Last Updated**: 2024
**Total Project Size**: ~60MB (with node_modules)
**Core Code Size**: ~8,200 lines
**Documentation**: ~2,500 lines

---

This index is maintained automatically. For the latest file structure, run:
```bash
tree /F  # Windows
tree -L 3  # Unix/Linux/Mac
```
