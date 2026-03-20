# 🚀 COMPLETE SETUP & RUN GUIDE

## ✅ Step-by-Step Instructions to Get Everything Working

---

## 📋 Prerequisites Check

Before starting, make sure you have:

1. **Node.js 16+** installed
   ```bash
   node --version
   ```
   If not installed: https://nodejs.org/

2. **MongoDB** installed and running
   ```bash
   mongod --version
   ```
   If not installed: https://www.mongodb.com/try/download/community

3. **Git** installed (already done ✅)
   ```bash
   git --version
   ```

---

## 🎯 OPTION 1: Quick Start (Automated)

### Windows:
```bash
cd d:\Akinator
start.bat
```

### Mac/Linux:
```bash
cd /path/to/Akinator
chmod +x start.sh
./start.sh
```

**This will automatically:**
- Install all dependencies
- Setup environment
- Seed database
- Start both servers

---

## 🎯 OPTION 2: Manual Setup (Step by Step)

### Step 1: Start MongoDB

**Option A - Local MongoDB:**
```bash
# Open a new terminal/command prompt
mongod
```

**Option B - Docker MongoDB:**
```bash
docker run -d -p 27017:27017 --name akinator-mongodb mongo:latest
```

Keep this terminal open!

---

### Step 2: Setup Backend

Open a new terminal/command prompt:

```bash
# Navigate to backend
cd d:\Akinator\backend

# Install dependencies
npm install

# Create environment file
copy .env.example .env

# Seed the database
npm run seed

# Start backend server
npm start
```

You should see:
```
✅ Connected to MongoDB
🚀 Server running on port 5000
```

Keep this terminal open!

---

### Step 3: Setup Frontend

Open another new terminal/command prompt:

```bash
# Navigate to frontend
cd d:\Akinator\frontend

# Install dependencies
npm install

# Start frontend
npm start
```

Browser will automatically open at `http://localhost:3000`

---

## 🎯 OPTION 3: Docker (Easiest)

If you have Docker installed:

```bash
cd d:\Akinator
docker-compose up --build
```

Wait for all services to start, then visit:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

---

## ✅ Verify Everything is Working

### 1. Check Backend
Open browser: http://localhost:5000/health

Should see:
```json
{
  "status": "OK",
  "timestamp": "2024-..."
}
```

### 2. Check Frontend
Open browser: http://localhost:3000

Should see the Akinator AI start screen with:
- Title: "🔮 Akinator AI"
- Start Game button
- Category selection

### 3. Test the Game
1. Click "Start Game"
2. You should see a question appear
3. Click any answer (Yes/No/etc)
4. Continue answering questions
5. AI should make a guess after 8-12 questions

---

## 🐛 Troubleshooting

### Problem: "MongoDB connection failed"

**Solution:**
```bash
# Make sure MongoDB is running
mongod

# Or check if it's already running
netstat -an | findstr 27017
```

### Problem: "Port 5000 already in use"

**Solution:**
```bash
# Kill process on port 5000
npx kill-port 5000

# Then restart backend
cd backend
npm start
```

### Problem: "Port 3000 already in use"

**Solution:**
```bash
# Kill process on port 3000
npx kill-port 3000

# Then restart frontend
cd frontend
npm start
```

### Problem: "npm install fails"

**Solution:**
```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Problem: "Database seeding fails"

**Solution:**
```bash
# Make sure MongoDB is running first
# Then run seed script directly
cd backend
node ../database/seed-data/seed.js
```

### Problem: "Cannot find module"

**Solution:**
```bash
# Reinstall dependencies
cd backend
npm install

cd ../frontend
npm install
```

---

## 📊 Expected Output

### Backend Terminal:
```
🌱 Starting database seeding...
✅ Connected to MongoDB
🗑️  Cleared existing data
✅ Inserted 55 questions
✅ Inserted 100 characters
🎉 Database seeding completed successfully!
✅ Connected to MongoDB
🚀 Server running on port 5000
📡 API available at http://localhost:5000/api
```

### Frontend Terminal:
```
Compiled successfully!

You can now view akinator-frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000

Note that the development build is not optimized.
To create a production build, use npm run build.

webpack compiled successfully
```

---

## 🎮 How to Use

1. **Start Game**
   - Click "Start Game" or choose a category
   - First question appears immediately

2. **Answer Questions**
   - Click one of 5 answer options:
     - ✓ Yes
     - 👍 Probably
     - 🤷 Don't Know
     - 👎 Probably Not
     - ✗ No

3. **AI Makes Guess**
   - After 8-12 questions, AI guesses your character
   - Shows confidence level

4. **Provide Feedback**
   - Click "Correct" if AI guessed right
   - Click "Wrong" if AI guessed wrong

5. **Teach AI (if wrong)**
   - Enter the correct character name
   - Choose category
   - Optionally add a distinguishing question
   - Click Submit

6. **Play Again**
   - Click "Play Again" to start a new game

---

## 🔧 Configuration

### Backend (.env)
Located at: `backend/.env`

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/akinator
NODE_ENV=development
MAX_QUESTIONS=20
CONFIDENCE_THRESHOLD=0.8
```

### Frontend (.env)
Create at: `frontend/.env`

```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 📈 Performance Tips

1. **Use SSD** for better MongoDB performance
2. **Close unnecessary apps** to free up ports
3. **Use Chrome/Firefox** for best experience
4. **Clear browser cache** if UI doesn't update

---

## 🛑 How to Stop

### Stop All Services:

**Backend:**
- Press `Ctrl + C` in backend terminal

**Frontend:**
- Press `Ctrl + C` in frontend terminal

**MongoDB:**
- Press `Ctrl + C` in MongoDB terminal

**Docker:**
```bash
docker-compose down
```

---

## 🔄 Restart After Changes

### Backend Changes:
```bash
# Stop backend (Ctrl+C)
# Restart
cd backend
npm start
```

### Frontend Changes:
```bash
# Frontend auto-reloads on save
# If not, restart:
cd frontend
npm start
```

### Database Changes:
```bash
# Re-seed database
cd backend
npm run seed
```

---

## 📦 What Gets Installed

### Backend Dependencies:
- express (Web framework)
- mongoose (MongoDB ODM)
- cors (Cross-origin requests)
- dotenv (Environment variables)
- uuid (Session IDs)
- body-parser (Request parsing)

### Frontend Dependencies:
- react (UI library)
- react-dom (React rendering)
- react-scripts (Build tools)
- axios (HTTP client)

---

## ✅ Success Checklist

- [ ] MongoDB running on port 27017
- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000
- [ ] Database seeded with 100+ characters
- [ ] Can access http://localhost:3000
- [ ] Can start a game
- [ ] Can answer questions
- [ ] AI makes guesses
- [ ] Can teach new characters

---

## 🎉 You're All Set!

If all steps completed successfully:
1. Open http://localhost:3000
2. Click "Start Game"
3. Think of a character
4. Answer questions
5. Watch the AI guess!

---

## 📞 Need Help?

- Check troubleshooting section above
- Review error messages in terminal
- Check MongoDB is running
- Verify ports are not in use
- Restart all services

---

**Enjoy your AI-powered Akinator game!** 🔮
