# Testing Guide

## Backend Testing

### Setup Test Environment

\`\`\`bash
cd backend

# Install test dependencies
npm install --save-dev jest supertest

# Create test database
createdb company_db_test
\`\`\`

### Run Tests

\`\`\`bash
# Run all tests
npm test

# Run specific test file
npm test -- auth.test.js

# Run with coverage report
npm test -- --coverage

# Run in watch mode
npm test -- --watch

# Run integration tests
npm test -- integration.test.js
\`\`\`

### Test Structure

Tests are organized in `backend/src/tests/`:
- `auth.test.js` - Authentication API tests
- `company.test.js` - Company profile API tests
- `integration.test.js` - Full user flow tests

### Writing New Tests

\`\`\`javascript
import request from "supertest"
import app from "../server"

describe("My Feature", () => {
  it("should do something", async () => {
    const response = await request(app)
      .post("/api/my-endpoint")
      .send({ data: "value" })

    expect(response.status).toBe(200)
    expect(response.body.success).toBe(true)
  })
})
\`\`\`

---

## Frontend Testing

### Lint Code

\`\`\`bash
cd frontend
npm run lint
\`\`\`

### Manual Testing Checklist

#### User Registration
- [ ] Form validates email format
- [ ] Password must be 8+ characters
- [ ] Passwords must match
- [ ] Phone input accepts international numbers
- [ ] Gender field is required
- [ ] Success message shows after registration

#### OTP Verification
- [ ] OTP input accepts 6 digits only
- [ ] Error if OTP length != 6
- [ ] Back button returns to previous step
- [ ] Resend OTP functionality (if implemented)

#### Company Profile
- [ ] All required fields show validation errors
- [ ] Company name is required
- [ ] Industry field accepts text input
- [ ] Address fields populate correctly
- [ ] Founded date picker works
- [ ] Description accepts long text
- [ ] Save button shows success message

#### Image Upload
- [ ] Drag and drop accepts images
- [ ] Click to browse also works
- [ ] File size validation (max 5MB)
- [ ] File type validation (image only)
- [ ] Preview shows before upload
- [ ] Remove button clears image
- [ ] Progress indicator shows during upload
- [ ] Error message if upload fails

#### Dashboard
- [ ] User information displays correctly
- [ ] Company information displays correctly
- [ ] Verification status shows as chips
- [ ] Images display if uploaded
- [ ] Edit Profile button navigates to settings

#### Settings
- [ ] Company profile tab shows all fields
- [ ] Media tab shows upload interfaces
- [ ] Save button updates profile
- [ ] Images can be updated
- [ ] Error messages show if validation fails

#### Navigation & Authentication
- [ ] Navigation bar shows user name
- [ ] Menu dropdown has correct options
- [ ] Logout clears token and navigates to login
- [ ] Protected routes require authentication
- [ ] Cannot access dashboard without token

---

## API Testing with Postman

### Import Collection

1. Open Postman
2. Click "Import"
3. Select `postman_collection.json` (if available)

### Manual API Testing

**1. Register User**
\`\`\`
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "TestPassword123",
  "full_name": "Test User",
  "gender": "m",
  "mobile_no": "+919876543210"
}
\`\`\`

**2. Verify Mobile**
\`\`\`
POST http://localhost:5000/api/auth/verify-mobile
Content-Type: application/json

{
  "user_id": 1,
  "otp": "123456"
}
\`\`\`

**3. Login**
\`\`\`
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "TestPassword123"
}
\`\`\`

**4. Create Company Profile**
\`\`\`
POST http://localhost:5000/api/company/register
Authorization: Bearer <token>
Content-Type: application/json

{
  "company_name": "Test Company",
  "industry": "Technology",
  "address": "123 Main St",
  "city": "New York",
  "state": "NY",
  "country": "USA",
  "postal_code": "10001",
  "website": "https://example.com"
}
\`\`\`

---

## Performance Testing

### Load Testing

\`\`\`bash
# Install loadtest
npm install -g loadtest

# Test endpoint with 100 concurrent requests
loadtest -c 100 http://localhost:5000/api/health

# Expected: < 5% error rate
\`\`\`

### Lighthouse (Frontend Performance)

1. Open Chrome DevTools
2. Go to "Lighthouse" tab
3. Click "Generate report"
4. Review Performance, Accessibility, Best Practices scores

**Targets:**
- Performance: > 90
- Accessibility: > 90
- Best Practices: > 90

---

## Security Testing

### OWASP Top 10

1. **SQL Injection:** Try `" OR "1"="1` in login
2. **XSS:** Try `<script>alert('xss')</script>` in forms
3. **CSRF:** Verify token validation
4. **Authentication:** Try accessing without token
5. **Sensitive Data:** Check no passwords in logs

### Tools

\`\`\`bash
# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix

# Security scan
npm audit --security-severity=high
\`\`\`

---

## Continuous Integration

### GitHub Actions Example

\`\`\`yaml
name: CI

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: password
          POSTGRES_DB: company_db_test
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432

    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install backend dependencies
        run: cd backend && npm install
      
      - name: Run backend tests
        run: cd backend && npm test
        env:
          DB_HOST: localhost
          DB_PASSWORD: password
      
      - name: Install frontend dependencies
        run: cd frontend && npm install
      
      - name: Build frontend
        run: cd frontend && npm run build
\`\`\`
