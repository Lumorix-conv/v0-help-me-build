# Getting Started Guide

## Quick Start (5 minutes)

### Prerequisites
- Node.js 18+ installed
- PostgreSQL installed and running
- Firebase project created
- Cloudinary account (optional for image uploads)

### Step 1: Clone and Setup Backend

\`\`\`bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Edit .env with your credentials
nano .env  # or use your preferred editor
\`\`\`

**Required .env values:**
- Database credentials (DB_USER, DB_PASSWORD, DB_NAME)
- Firebase credentials (FIREBASE_PROJECT_ID, etc.)
- JWT secret: Generate with `openssl rand -base64 32`

### Step 2: Setup Database

\`\`\`bash
# Create database
createdb company_db

# Load schema
psql -U postgres -d company_db -f scripts/company_db.sql

# Verify tables
psql -U postgres -d company_db -c "\\dt"
\`\`\`

### Step 3: Start Backend

\`\`\`bash
# Start development server
npm run dev

# Check if running
curl http://localhost:5000/api/health

# Expected response:
# {"success":true,"message":"Server is running","environment":"development"}
\`\`\`

### Step 4: Setup Frontend

\`\`\`bash
# In new terminal, navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Frontend will open at http://localhost:3000
\`\`\`

### Step 5: Test the Application

1. Open browser: http://localhost:3000
2. Click "Create one" to register
3. Fill in registration form
4. Verify OTP (check Firebase console for test credentials)
5. Create company profile
6. Upload logo and banner
7. View dashboard

---

## Environment Variables Explained

### Backend (.env)

| Variable | Purpose | Example |
|----------|---------|---------|
| **Database** | | |
| DB_USER | PostgreSQL user | postgres |
| DB_PASSWORD | PostgreSQL password | mypassword |
| DB_HOST | Database host | localhost |
| DB_PORT | Database port | 5432 |
| DB_NAME | Database name | company_db |
| **Firebase** | Auth & OTP | |
| FIREBASE_PROJECT_ID | Firebase project | my-project-123 |
| FIREBASE_PRIVATE_KEY | Service account key | (long string) |
| FIREBASE_CLIENT_EMAIL | Service account email | firebase-adminsdk@... |
| **Cloudinary** | Image uploads | |
| CLOUDINARY_CLOUD_NAME | Cloud name | my-cloud |
| CLOUDINARY_API_KEY | API key | 123456789 |
| CLOUDINARY_API_SECRET | API secret | (secret) |
| **JWT & Server** | | |
| JWT_SECRET | Token secret | (min 32 chars) |
| PORT | Server port | 5000 |
| CLIENT_URL | Frontend URL | http://localhost:3000 |
| DEBUG_MODE | Enable logs | false |
| NODE_ENV | Environment | development |

---

## API Endpoints

### Authentication

**POST /api/auth/register**
- Register new user with email, password, phone
- Response: user_id (needed for OTP verification)

**POST /api/auth/verify-mobile**
- Verify phone number with OTP
- Response: verification status

**POST /api/auth/login**
- Login with email and password
- Response: JWT token and user data

### Company Profile

**POST /api/company/register**
- Create company profile
- Requires: Authentication token
- Response: Company profile with ID

**GET /api/company/profile**
- Fetch user's company profile
- Requires: Authentication token
- Response: Company data

**PUT /api/company/profile**
- Update company profile
- Requires: Authentication token
- Response: Updated profile

**POST /api/company/upload-logo**
- Upload company logo
- Requires: Authentication token
- Response: Logo URL

**POST /api/company/upload-banner**
- Upload company banner
- Requires: Authentication token
- Response: Banner URL

---

## Common Tasks

### Generate JWT Secret

\`\`\`bash
# Linux/Mac
openssl rand -base64 32

# Windows (PowerShell)
[Convert]::ToBase64String((1..32 | ForEach-Object {[byte](Get-Random -Max 256)}))
\`\`\`

### Reset Database

\`\`\`bash
# Delete database
dropdb company_db

# Recreate
createdb company_db
psql -U postgres -d company_db -f backend/scripts/company_db.sql
\`\`\`

### View Database

\`\`\`bash
# Connect to database
psql -U postgres -d company_db

# Common queries
SELECT * FROM users;
SELECT * FROM company_profile;
\`\`\`

### Build for Production

\`\`\`bash
# Backend
cd backend
npm run build  # (if applicable)

# Frontend
cd frontend
npm run build

# Output in frontend/dist
\`\`\`

---

## Troubleshooting

### Backend won't start

**Error: "Cannot connect to database"**
\`\`\`bash
# Check PostgreSQL is running
sudo systemctl status postgresql

# Verify credentials in .env
# Test connection
psql -U postgres -h localhost -d company_db
\`\`\`

**Error: "FIREBASE_PRIVATE_KEY not found"**
\`\`\`bash
# Ensure .env file exists
ls -la backend/.env

# Check Firebase credentials are properly formatted
grep FIREBASE_PRIVATE_KEY backend/.env
\`\`\`

### Frontend shows blank page

**Issue: API calls failing**
\`\`\`bash
# Check backend is running
curl http://localhost:5000/api/health

# Check browser console for errors (DevTools)
# Verify CORS settings in backend .env
\`\`\`

### Images not uploading

**Issue: Cloudinary errors**
\`\`\`bash
# Verify Cloudinary credentials
# Check upload preset exists in Cloudinary dashboard
# Ensure file size < 5MB
# Check browser console for exact error
\`\`\`

### OTP not working

**Issue: Firebase SMS not sending**
\`\`\`bash
# Check Firebase project has SMS API enabled
# Verify phone number format (+country_code format)
# Check Firebase quota and usage
# Use test phone numbers in development
\`\`\`

---

## Testing

### Manual Testing

1. **User Registration:**
   - Fill form with valid email
   - Check password requirements (8+ chars)
   - Enter phone number
   - Verify OTP arrives

2. **Company Profile:**
   - Fill all required fields
   - Try uploading images
   - Verify data saves to database

3. **Error Cases:**
   - Try duplicate email
   - Try wrong password
   - Try invalid phone number

### Automated Testing

\`\`\`bash
# Run backend tests
cd backend
npm test

# Run specific test
npm test -- auth.test.js

# With verbose output
npm test -- --verbose
\`\`\`

---

## Next Steps

1. **Customize Branding:**
   - Update Header.jsx (company name)
   - Modify colors in theme.css
   - Add company logo

2. **Add More Features:**
   - User profile editing
   - Company document uploads
   - Email notifications
   - Admin dashboard

3. **Deploy:**
   - Follow DEPLOYMENT_GUIDE.md
   - Choose hosting option (Vercel, Docker, VPS)
   - Configure production environment

4. **Monitor:**
   - Setup error tracking (Sentry)
   - Enable performance monitoring
   - Configure automated backups

---

## Support

### Debug Mode

Enable detailed logging:
\`\`\`bash
# Backend
DEBUG_MODE=true NODE_ENV=development npm run dev

# Check logs
tail -f server.log
\`\`\`

### Browser DevTools

1. **Console Tab:** Check for errors
2. **Network Tab:** Verify API responses
3. **Application Tab:** Check localStorage tokens
4. **React DevTools:** Inspect component state

### Check Logs

\`\`\`bash
# View recent logs
tail -50 server.log

# Search for errors
grep "[ERROR]" server.log

# Monitor in real-time
tail -f server.log
\`\`\`
