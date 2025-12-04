# Deployment Guide

## Environments

### Development
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- Database: PostgreSQL on localhost:5432

### Production
- Frontend: https://your-domain.com
- Backend: https://api.your-domain.com
- Database: Remote PostgreSQL instance

---

## Local Development Setup

### Prerequisites
- Node.js 18+
- PostgreSQL 13+
- Docker (optional)
- Git

### Without Docker

1. **Backend Setup:**
\`\`\`bash
cd backend
npm install
cp .env.example .env
# Configure .env with your Firebase and Cloudinary credentials
npm run dev
\`\`\`

2. **Frontend Setup:**
\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`

3. **Database Setup:**
\`\`\`bash
createdb company_db
psql -U postgres -d company_db -f backend/scripts/company_db.sql
\`\`\`

### With Docker

\`\`\`bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
\`\`\`

---

## Testing

### Backend Tests

\`\`\`bash
cd backend

# Run all tests
npm test

# Run specific test suite
npm test -- auth.test.js

# Run with coverage
npm test -- --coverage

# Run integration tests
npm test -- integration.test.js
\`\`\`

### Frontend Testing

\`\`\`bash
cd frontend

# Lint code
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
\`\`\`

---

## Production Deployment

### Option 1: Vercel (Recommended for Frontend)

1. **Frontend Deployment:**
\`\`\`bash
# Push code to GitHub
git push origin main

# Connect repository to Vercel
# Vercel will auto-deploy on push
\`\`\`

**Vercel Configuration:**
- Build Command: `npm run build`
- Output Directory: `dist`
- Environment Variables: Set `VITE_API_URL` to production backend URL

### Option 2: Docker on VPS

1. **Build Docker Images:**
\`\`\`bash
# Backend
docker build -t company-registration-backend:latest ./backend

# Frontend
docker build -t company-registration-frontend:latest ./frontend
\`\`\`

2. **Push to Registry:**
\`\`\`bash
# Tag images
docker tag company-registration-backend:latest username/company-registration-backend:latest
docker tag company-registration-frontend:latest username/company-registration-frontend:latest

# Push to Docker Hub
docker push username/company-registration-backend:latest
docker push username/company-registration-frontend:latest
\`\`\`

3. **Deploy on VPS:**
\`\`\`bash
# SSH into VPS
ssh user@your-vps-ip

# Create docker-compose.prod.yml with production settings
# Pull images and start services
docker-compose -f docker-compose.prod.yml up -d
\`\`\`

### Option 3: Traditional Server Deployment

1. **Backend on Node.js:**
\`\`\`bash
# SSH into server
ssh user@your-server-ip

# Clone repository
git clone https://github.com/your-repo.git
cd company-registration/backend

# Install dependencies
npm install --only=production

# Set environment variables
cp .env.production .env

# Run with PM2
npm install -g pm2
pm2 start src/server.js --name "company-registration"
pm2 startup
pm2 save
\`\`\`

2. **Frontend on Nginx:**
\`\`\`bash
# Build frontend
cd ../frontend
npm run build

# Copy dist to Nginx
sudo cp -r dist /var/www/company-registration

# Configure Nginx
sudo nano /etc/nginx/sites-available/company-registration
\`\`\`

**Nginx Configuration:**
\`\`\`nginx
server {
    listen 80;
    server_name your-domain.com;

    root /var/www/company-registration;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
\`\`\`

3. **SSL Certificate (Let's Encrypt):**
\`\`\`bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
\`\`\`

---

## Environment Variables

### Backend (.env.production)

| Variable | Description | Example |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| NODE_ENV | Environment | production |
| DB_HOST | Database host | db.example.com |
| DB_USER | Database user | postgres |
| DB_PASSWORD | Database password | secure_password |
| DB_NAME | Database name | company_db_prod |
| FIREBASE_PROJECT_ID | Firebase project ID | your-project-id |
| JWT_SECRET | JWT secret key | secure-key-min-32-chars |
| CLIENT_URL | Frontend URL | https://your-domain.com |
| CLOUDINARY_CLOUD_NAME | Cloudinary cloud name | your-cloud |
| DEBUG_MODE | Enable debugging | false |

### Frontend (.env.production)

| Variable | Description | Example |
|----------|-------------|---------|
| VITE_API_URL | Backend API URL | https://api.your-domain.com |

---

## Monitoring

### Backend Health Check

\`\`\`bash
# Check if API is running
curl http://localhost:5000/api/health

# Response:
# {"success":true,"message":"Server is running","environment":"production"}
\`\`\`

### Database Monitoring

\`\`\`bash
# Connect to database
psql -U postgres -d company_db_prod

# Check active connections
SELECT * FROM pg_stat_activity;

# Check slow queries
SELECT query, calls, mean_time FROM pg_stat_statements ORDER BY mean_time DESC LIMIT 10;
\`\`\`

### Application Logs

\`\`\`bash
# With PM2
pm2 logs company-registration

# With Docker
docker logs -f company-registration-backend
\`\`\`

---

## Troubleshooting

### Database Connection Failed

\`\`\`bash
# Check PostgreSQL is running
psql -U postgres -c "SELECT version();"

# Check connection settings in .env
# Verify firewall rules allow port 5432
\`\`\`

### JWT Token Errors

\`\`\`bash
# Ensure JWT_SECRET is set
echo $JWT_SECRET

# Check token expiration (90 days)
# Verify token format in Authorization header
\`\`\`

### CORS Errors

\`\`\`bash
# Verify CLIENT_URL in backend .env
# Check browser console for exact error
# Ensure credentials: true is set in frontend API calls
\`\`\`

### Image Upload Failures

\`\`\`bash
# Verify Cloudinary credentials
# Check file size (max 5MB)
# Ensure upload preset exists
# Check Cloudinary dashboard for uploads
\`\`\`

---

## Backup and Recovery

### Database Backup

\`\`\`bash
# Backup database
pg_dump -U postgres -d company_db_prod > backup.sql

# Restore from backup
psql -U postgres -d company_db_prod < backup.sql

# Automated daily backups (cron job)
0 2 * * * pg_dump -U postgres -d company_db_prod > /backups/$(date +\%Y\%m\%d).sql
\`\`\`

### Application Files

\`\`\`bash
# Backup entire application
tar -czf app_backup.tar.gz /path/to/app

# Backup environment variables
cp .env .env.backup
\`\`\`

---

## Performance Optimization

### Backend

- Enable compression middleware (already configured)
- Use connection pooling for database
- Cache frequently accessed data
- Monitor slow queries

### Frontend

- Enable gzip compression in Nginx
- Use CDN for static assets
- Implement lazy loading for images
- Minify and bundle JavaScript/CSS

### Database

- Add indexes to frequently queried columns
- Archive old records
- Regular VACUUM and ANALYZE

---

## Security Checklist

- [ ] All environment variables set securely
- [ ] CORS properly configured
- [ ] JWT secret is strong (32+ characters)
- [ ] SSL/TLS enabled
- [ ] Database backups configured
- [ ] Firewall rules configured
- [ ] Rate limiting enabled
- [ ] Input validation on all endpoints
- [ ] Sensitive data not logged
- [ ] Regular security updates applied

---

## Rollback Procedure

\`\`\`bash
# If deployment fails
git revert <commit-hash>
git push origin main

# Docker rollback
docker-compose down
docker-compose pull
docker-compose up -d

# Or use PM2 to restart previous version
pm2 restart company-registration
