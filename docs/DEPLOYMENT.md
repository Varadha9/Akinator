# Deployment Guide

## Table of Contents
1. [Local Development Setup](#local-development-setup)
2. [Docker Deployment](#docker-deployment)
3. [AWS Deployment](#aws-deployment)
4. [Vercel + MongoDB Atlas](#vercel-mongodb-atlas)
5. [Environment Configuration](#environment-configuration)
6. [Troubleshooting](#troubleshooting)

---

## Local Development Setup

### Prerequisites
- Node.js 16+ installed
- MongoDB 5.0+ installed
- Git installed

### Step 1: Clone Repository
```bash
git clone https://github.com/yourusername/akinator-ai.git
cd akinator-ai
```

### Step 2: Setup Backend
```bash
cd backend
npm install

# Create .env file
cp .env.example .env

# Edit .env with your MongoDB URI
# MONGODB_URI=mongodb://localhost:27017/akinator
```

### Step 3: Setup Frontend
```bash
cd ../frontend
npm install

# Create .env file (optional)
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env
```

### Step 4: Start MongoDB
```bash
# Option 1: Local MongoDB
mongod

# Option 2: Docker MongoDB
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### Step 5: Seed Database
```bash
cd ../backend
npm run seed
```

### Step 6: Start Services
```bash
# Terminal 1: Start Backend
cd backend
npm start

# Terminal 2: Start Frontend
cd frontend
npm start
```

### Step 7: Access Application
Open browser: `http://localhost:3000`

---

## Docker Deployment

### Prerequisites
- Docker installed
- Docker Compose installed

### Quick Start
```bash
# Build and start all services
docker-compose up --build

# Run in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Seed Database in Docker
```bash
# Access backend container
docker exec -it akinator-backend sh

# Run seed script
node database/seed-data/seed.js

# Exit container
exit
```

### Access Application
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000`
- MongoDB: `localhost:27017`

---

## AWS Deployment

### Architecture
```
CloudFront → S3 (Frontend)
              ↓
         ALB → EC2 (Backend) → MongoDB Atlas
```

### Step 1: Setup MongoDB Atlas
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create cluster (Free tier available)
3. Create database user
4. Whitelist IP addresses (0.0.0.0/0 for testing)
5. Get connection string

### Step 2: Deploy Backend to EC2

#### Launch EC2 Instance
```bash
# Amazon Linux 2 or Ubuntu
# t2.micro (Free tier eligible)
# Security Group: Allow ports 22, 5000
```

#### SSH into EC2
```bash
ssh -i your-key.pem ec2-user@your-ec2-ip
```

#### Install Dependencies
```bash
# Update system
sudo yum update -y

# Install Node.js
curl -sL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs

# Install Git
sudo yum install -y git

# Install PM2
sudo npm install -g pm2
```

#### Deploy Application
```bash
# Clone repository
git clone https://github.com/yourusername/akinator-ai.git
cd akinator-ai/backend

# Install dependencies
npm install --production

# Create .env file
cat > .env << EOF
PORT=5000
MONGODB_URI=your-mongodb-atlas-connection-string
NODE_ENV=production
EOF

# Seed database
npm run seed

# Start with PM2
pm2 start server.js --name akinator-backend
pm2 startup
pm2 save
```

#### Configure Nginx (Optional)
```bash
sudo yum install -y nginx

# Create nginx config
sudo nano /etc/nginx/conf.d/akinator.conf
```

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
sudo systemctl start nginx
sudo systemctl enable nginx
```

### Step 3: Deploy Frontend to S3 + CloudFront

#### Build Frontend
```bash
cd frontend

# Update API URL in .env
echo "REACT_APP_API_URL=http://your-ec2-ip:5000/api" > .env

# Build
npm run build
```

#### Create S3 Bucket
```bash
aws s3 mb s3://akinator-frontend
aws s3 website s3://akinator-frontend --index-document index.html
```

#### Upload Build
```bash
aws s3 sync build/ s3://akinator-frontend --acl public-read
```

#### Setup CloudFront
1. Go to CloudFront console
2. Create distribution
3. Origin: S3 bucket
4. Default root object: index.html
5. Create distribution

#### Update CORS on Backend
```javascript
// backend/server.js
app.use(cors({
  origin: 'https://your-cloudfront-domain.cloudfront.net'
}));
```

---

## Vercel + MongoDB Atlas

### Step 1: Setup MongoDB Atlas
(Same as AWS Step 1)

### Step 2: Deploy Backend to Vercel

#### Install Vercel CLI
```bash
npm install -g vercel
```

#### Create vercel.json
```json
{
  "version": 2,
  "builds": [
    {
      "src": "backend/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "backend/server.js"
    }
  ],
  "env": {
    "MONGODB_URI": "@mongodb-uri",
    "NODE_ENV": "production"
  }
}
```

#### Deploy
```bash
cd backend
vercel --prod

# Add environment variables
vercel env add MONGODB_URI
```

### Step 3: Deploy Frontend to Vercel

```bash
cd frontend

# Update .env
echo "REACT_APP_API_URL=https://your-backend.vercel.app/api" > .env

# Deploy
vercel --prod
```

---

## Environment Configuration

### Backend (.env)
```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/akinator

# Game Settings
MAX_QUESTIONS=20
CONFIDENCE_THRESHOLD=0.8

# Security (Production)
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Production Environment Variables

#### Backend
```env
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/akinator
MAX_QUESTIONS=20
CONFIDENCE_THRESHOLD=0.8
CORS_ORIGIN=https://your-frontend-domain.com
```

#### Frontend
```env
REACT_APP_API_URL=https://your-backend-domain.com/api
```

---

## Troubleshooting

### MongoDB Connection Issues
```bash
# Check MongoDB is running
mongod --version

# Test connection
mongo mongodb://localhost:27017/akinator

# Check firewall
sudo ufw allow 27017
```

### Backend Not Starting
```bash
# Check logs
npm start

# Check port availability
lsof -i :5000

# Kill process on port
kill -9 $(lsof -t -i:5000)
```

### Frontend Build Errors
```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install

# Check Node version
node --version  # Should be 16+
```

### CORS Errors
```javascript
// backend/server.js
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
}));
```

### Docker Issues
```bash
# Remove all containers
docker-compose down -v

# Rebuild
docker-compose build --no-cache

# Check logs
docker-compose logs backend
docker-compose logs frontend
```

### Database Seeding Fails
```bash
# Check MongoDB connection
mongo $MONGODB_URI

# Run seed manually
cd backend
node database/seed-data/seed.js

# Check for duplicate keys
# Drop database and reseed
```

### PM2 Issues
```bash
# View logs
pm2 logs akinator-backend

# Restart
pm2 restart akinator-backend

# Delete and restart
pm2 delete akinator-backend
pm2 start server.js --name akinator-backend
```

---

## Performance Optimization

### Backend
- Enable compression
- Add Redis caching
- Use connection pooling
- Implement rate limiting

### Frontend
- Enable code splitting
- Optimize images
- Use CDN
- Enable gzip compression

### Database
- Add indexes
- Use aggregation pipelines
- Enable sharding (large scale)

---

## Monitoring

### Backend Monitoring
```bash
# PM2 monitoring
pm2 monit

# Install monitoring tools
npm install --save express-status-monitor
```

### Application Monitoring
- AWS CloudWatch
- Datadog
- New Relic
- Sentry (Error tracking)

---

## Backup & Recovery

### Database Backup
```bash
# Backup
mongodump --uri="$MONGODB_URI" --out=/backup/$(date +%Y%m%d)

# Restore
mongorestore --uri="$MONGODB_URI" /backup/20231201
```

### Automated Backups
```bash
# Cron job (daily at 2 AM)
0 2 * * * mongodump --uri="$MONGODB_URI" --out=/backup/$(date +\%Y\%m\%d)
```

---

## Security Checklist

- [ ] Use environment variables for secrets
- [ ] Enable MongoDB authentication
- [ ] Use HTTPS in production
- [ ] Implement rate limiting
- [ ] Validate all inputs
- [ ] Use helmet.js for security headers
- [ ] Keep dependencies updated
- [ ] Use strong passwords
- [ ] Whitelist IPs for database
- [ ] Enable CORS properly

---

## Support

For issues and questions:
- GitHub Issues: https://github.com/yourusername/akinator-ai/issues
- Documentation: https://github.com/yourusername/akinator-ai/docs
- Email: support@example.com
