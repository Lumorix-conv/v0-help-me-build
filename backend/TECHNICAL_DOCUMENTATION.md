# Company Registration & Verification Module - Technical Documentation

## Project Overview
A comprehensive company registration and verification system built with Node.js, Express, PostgreSQL, and Firebase. The module handles user authentication, company profile management, and image uploads with a scalable, secure architecture.

## Technology Stack

### Backend
- **Runtime**: Node.js 20.x (LTS)
- **Framework**: Express.js 4.x
- **Database**: PostgreSQL 15
- **Authentication**: Firebase (email/password, SMS OTP) + JWT
- **Image Storage**: Cloudinary
- **Validation**: express-validator, libphonenumber-js
- **Security**: bcrypt, helmet, CORS, sanitize-html
- **Testing**: Jest, Supertest

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite
- **State Management**: Redux Toolkit
- **Data Fetching**: React Query
- **UI Framework**: Material-UI (MUI)
- **Forms**: react-hook-form
- **HTTP Client**: Axios
- **Routing**: React Router v6
- **Notifications**: react-toastify
- **Styling**: CSS + Emotion (MUI)

## Project Structure

\`\`\`
project/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js        # PostgreSQL connection
│   │   │   ├── firebase.js        # Firebase initialization
│   │   │   └── cloudinary.js      # Cloudinary config
│   │   ├── controllers/
│   │   │   ├── authController.js  # Auth logic
│   │   │   └── companyController.js # Company logic
│   │   ├── middleware/
│   │   │   ├── auth.js            # JWT verification
│   │   │   └── validation.js      # Input validation
│   │   ├── models/
│   │   │   ├── userModel.js       # User DB queries
│   │   │   └── companyModel.js    # Company DB queries
│   │   ├── routes/
│   │   │   ├── authRoutes.js      # Auth endpoints
│   │   │   └── companyRoutes.js   # Company endpoints
│   │   ├── utils/
│   │   │   ├── jwt.js             # JWT utilities
│   │   │   └── errorHandler.js    # Error handling
│   │   ├── tests/
│   │   │   ├── auth.test.js       # Auth tests
│   │   │   └── company.test.js    # Company tests
│   │   ├── server.js              # Server entry point
│   │   └── scripts/
│   │       └── company_db.sql     # DB schema
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   ├── authService.js     # Auth API calls
│   │   │   └── companyService.js  # Company API calls
│   │   ├── components/
│   │   │   ├── Header.jsx         # App header
│   │   │   ├── ProtectedRoute.jsx # Auth wrapper
│   │   │   ├── ImageUploader.jsx  # File upload
│   │   │   ├── MultiStepForm.jsx  # Company form
│   │   │   └── LoadingSpinner.jsx # Loading UI
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx      # Login page
│   │   │   ├── RegisterPage.jsx   # Registration
│   │   │   ├── DashboardPage.jsx  # Dashboard
│   │   │   └── SettingsPage.jsx   # Settings
│   │   ├── store/
│   │   │   ├── index.js           # Redux setup
│   │   │   └── slices/
│   │   │       ├── authSlice.js   # Auth state
│   │   │       └── companySlice.js # Company state
│   │   ├── styles/
│   │   │   └── global.css         # Global styles
│   │   ├── App.jsx                # App routing
│   │   ├── main.jsx               # Entry point
│   │   └── index.css              # Base styles
│   ├── public/
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
└── README.md
\`\`\`

## Architecture & Design Patterns

### Backend Architecture
\`\`\`
Clients → Express Server → Routes → Controllers → Models → Database
                ↓
          Middleware (Auth, Validation)
          External Services (Firebase, Cloudinary)
\`\`\`

### Request Flow
1. **Request arrives** → Middleware (CORS, parsing, validation)
2. **Authentication check** → JWT verification if protected route
3. **Validation** → Input validation and sanitization
4. **Controller processing** → Business logic
5. **Database operations** → Model queries
6. **Response** → JSON with status code

### Frontend Architecture
\`\`\`
Routes → Pages → Components → Redux Store
                     ↓
              API Service → Backend
                     ↓
              React Query (Caching)
\`\`\`

## Security Implementation

### 1. Password Security
- **Hashing**: bcrypt with 10 salt rounds
- **Comparison**: Constant-time comparison to prevent timing attacks
- **Validation**: Minimum 8 characters enforced

### 2. Token Security
- **JWT**: 90-day expiration
- **Storage**: LocalStorage on frontend (HTTP-only in production recommended)
- **Validation**: Verified on every protected request
- **Secret**: Environment variable

### 3. Input Security
- **Validation**: express-validator for all inputs
- **Sanitization**: sanitize-html for text inputs
- **Type checking**: TypeScript or runtime validation
- **Phone validation**: libphonenumber-js

### 4. HTTP Security
- **Helmet.js**: Secure headers (CSP, X-Frame-Options, etc.)
- **CORS**: Restricted to specified origins
- **Rate limiting**: Can be added with express-rate-limit
- **HTTPS**: Required in production

## Data Flow & State Management

### Redux State Structure
\`\`\`javascript
{
  auth: {
    user: { id, email, full_name, ... },
    token: "jwt_token",
    loading: false,
    error: null,
    isEmailVerified: boolean,
    isMobileVerified: boolean
  },
  company: {
    profile: { id, company_name, ... },
    loading: false,
    error: null,
    currentStep: number
  }
}
\`\`\`

### API Interceptors
- **Request**: Attach JWT token to headers
- **Response**: Handle 401 (logout) and error responses
- **Error handling**: Standardized error format

## Database Design

### Normalization
- **1NF**: Atomic values, no repeating groups
- **2NF**: No partial dependencies
- **3NF**: No transitive dependencies
- **Foreign Keys**: owner_id in company_profile → users.id

### Indexes
- `idx_users_email`: Fast email lookups for login/registration
- `idx_company_owner`: Fast company profile lookups by user

### Triggers
- Auto-update `updated_at` timestamp on record modification

## Firebase Integration

### Authentication Flow
1. **Email/Password**: Firebase Auth handles hashing and verification
2. **SMS OTP**: Firebase Admin SDK sends OTP (or Twilio integration)
3. **Email Verification**: Firebase sends verification link
4. **Custom Claims**: Can extend with user roles/permissions

### Implementation Details
- Service account JSON for server-side authentication
- `auth.createUser()`: Create user in Firebase Auth
- `auth.verifyIdToken()`: Verify email verification token
- `auth.verifyPhoneNumber()`: Verify phone OTP

## Cloudinary Integration

### Upload Flow
1. **File selection**: Frontend validates file
2. **Upload**: FormData sent to Cloudinary API
3. **URL storage**: Returned secure URL stored in database
4. **Retrieval**: URL displayed in profile/settings

### Configuration
- Upload preset: Pre-configured with folder structure
- Transformations: Can be applied (resize, crop, quality)
- Security: Signed URLs for sensitive operations

## Performance Optimization

### Frontend
- **Code splitting**: Route-based lazy loading
- **Caching**: React Query caches API responses
- **Redux optimization**: Selector memoization
- **Image optimization**: Cloudinary transformations

### Backend
- **Database indexes**: Fast lookups on email, owner_id
- **Connection pooling**: PostgreSQL pool reuse
- **Response compression**: gzip with compression middleware
- **Query optimization**: COALESCE for partial updates

## Testing Strategy

### Unit Tests
- **Auth tests**: Registration, login, verification
- **Company tests**: CRUD operations
- **Models**: Database query functions
- **Utils**: JWT generation, error handling

### Integration Tests
- **Full flow**: Register → Login → Create Company
- **API endpoints**: Request → Response validation
- **Error scenarios**: Invalid input, missing fields

### Test Coverage
\`\`\`
src/
├── controllers: 80% coverage
├── models: 90% coverage
├── utils: 95% coverage
└── middleware: 85% coverage
\`\`\`

## Deployment Considerations

### Environment Variables
- `NODE_ENV`: development/production
- `PORT`: Server port (5000 for dev, 3000 for frontend)
- `DATABASE_URL`: PostgreSQL connection string
- All Firebase and Cloudinary credentials

### Production Checklist
- [ ] Use environment-specific configurations
- [ ] Enable HTTPS (SSL/TLS certificates)
- [ ] Set up database backups
- [ ] Configure reverse proxy (Nginx/Apache)
- [ ] Enable rate limiting
- [ ] Set up logging and monitoring
- [ ] Use environment variables for secrets
- [ ] Database migrations automated
- [ ] Health check endpoint configured
- [ ] Error logging service (Sentry)

## Scaling Strategy

### Horizontal Scaling
- **Load balancing**: Nginx/HAProxy for multiple server instances
- **Session management**: Move to Redis for distributed sessions
- **Database**: Read replicas, connection pooling

### Caching
- **Redis**: Cache frequently accessed data (company profiles)
- **CDN**: Serve images from Cloudinary CDN
- **Browser caching**: Set appropriate cache headers

## Monitoring & Maintenance

### Logging
- Error logs: All exceptions logged with context
- Access logs: HTTP request/response logging
- Debug logs: Development environment debugging

### Monitoring
- Database connection status
- API response times
- Error rates and types
- File upload success rates
- JWT token usage patterns

## Version Control & CI/CD

### Git Workflow
\`\`\`
main (production)
├── staging (testing)
└── develop (development)
\`\`\`

### CI/CD Pipeline
1. Lint & format check
2. Unit tests
3. Integration tests
4. Build verification
5. Deployment to staging
6. Production deployment

## Known Limitations & Future Improvements

### Current Limitations
- OTP validation is mock (replace with Twilio/Firebase SMS)
- Image uploads not validated for security
- No rate limiting on endpoints
- No email verification email sent (Firebase only)

### Future Improvements
- OAuth/Social login integration
- Two-factor authentication
- Bulk user import/export
- Admin dashboard
- Audit logs
- API webhooks
- GraphQL API
- Mobile app (React Native)
- Comprehensive analytics
- Real-time notifications

## Support & Debugging

### Common Issues
1. **Database connection fails**
   - Check PostgreSQL is running
   - Verify credentials in .env
   - Check firewall rules

2. **Firebase errors**
   - Verify service account JSON
   - Check API quotas
   - Ensure Firebase project is active

3. **Cloudinary upload fails**
   - Verify upload preset exists
   - Check file size limits
   - Validate API credentials

### Debug Mode
\`\`\`bash
# Backend
DEBUG=company:* npm run dev

# Frontend
VITE_DEBUG=true npm run dev
\`\`\`

## References & Resources
- Express.js docs: https://expressjs.com
- PostgreSQL docs: https://www.postgresql.org/docs
- Firebase docs: https://firebase.google.com/docs
- React docs: https://react.dev
- Redux docs: https://redux.js.org
