# 🎮 QUICK RUN GUIDE

## 🚀 Get Started in 3 Steps

### Step 1: Test Your System
```bash
test-system.bat
```
This checks if everything is installed correctly.

### Step 2: Start MongoDB
```bash
# Option A: Local MongoDB
mongod

# Option B: Docker
docker run -d -p 27017:27017 --name akinator-mongo mongo:latest
```

### Step 3: Run the Application
```bash
start-complete.bat
```

**That's it!** The game will open at http://localhost:3000

---

## 📋 What Each Script Does

### `test-system.bat`
- ✅ Checks Node.js installation
- ✅ Checks npm installation
- ✅ Checks MongoDB installation
- ✅ Verifies all project files exist

### `start-complete.bat`
- ✅ Installs all dependencies
- ✅ Sets up environment
- ✅ Seeds database with 100+ characters
- ✅ Starts backend server (port 5000)
- ✅ Starts frontend server (port 3000)
- ✅ Opens browser automatically

### `start.bat` (Simple version)
- Starts backend and frontend
- Assumes dependencies are already installed

---

## 🎯 First Time Setup

If this is your first time running:

```bash
# 1. Test system
test-system.bat

# 2. Start MongoDB (keep this running)
mongod

# 3. Run complete setup (in new terminal)
start-complete.bat
```

---

## 🔄 Running After First Setup

After the first setup, you can use the simple start:

```bash
# Make sure MongoDB is running
mongod

# Then start the app (in new terminal)
start.bat
```

---

## 🌐 Access Points

Once running:

- **Frontend (Game)**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/health

---

## 🛑 How to Stop

Press `Ctrl + C` in each terminal window:
1. Backend terminal
2. Frontend terminal
3. MongoDB terminal

Or simply close the terminal windows.

---

## 🐛 Common Issues

### "MongoDB connection failed"
**Solution**: Make sure MongoDB is running
```bash
mongod
```

### "Port already in use"
**Solution**: Kill the process
```bash
npx kill-port 5000
npx kill-port 3000
```

### "Module not found"
**Solution**: Reinstall dependencies
```bash
cd backend && npm install
cd ../frontend && npm install
```

---

## ✅ Verify It's Working

1. **Backend**: Visit http://localhost:5000/health
   - Should see: `{"status":"OK"}`

2. **Frontend**: Visit http://localhost:3000
   - Should see: Akinator AI start screen

3. **Test Game**:
   - Click "Start Game"
   - Answer a question
   - Should get next question

---

## 📊 What's Running

When everything is started:

```
Terminal 1: MongoDB (port 27017)
Terminal 2: Backend (port 5000)
Terminal 3: Frontend (port 3000)
```

---

## 🎮 How to Play

1. Open http://localhost:3000
2. Click "Start Game"
3. Think of any character
4. Answer the questions
5. AI will guess your character!

---

## 📞 Need Help?

Check these files:
- `SETUP_AND_RUN.md` - Detailed setup guide
- `GETTING_STARTED.md` - Complete documentation
- `README.md` - Full project documentation

---

**Enjoy your AI-powered Akinator game!** 🔮
