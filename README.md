# Company Registration & Verification Module

A comprehensive full-stack application for managing company registrations and verification, built with React, Express, and PostgreSQL.

## Features

- User registration with email and phone verification
- OTP-based mobile verification via Firebase
- Company profile management with multi-step form
- Image upload for logos and banners via Cloudinary
- JWT-based authentication (90-day tokens)
- Protected routes and API endpoints
- Responsive design with Material-UI
- Comprehensive error handling
- Production-ready deployment configuration

## Tech Stack

### Frontend
- React 19 with Vite
- Redux Toolkit for state management
- Material-UI for components
- React Hook Form for form handling
- Axios for API calls
- Firebase for authentication

### Backend
- Node.js with Express
- PostgreSQL database
- Firebase Admin SDK
- Cloudinary for image storage
- JWT for token generation
- Jest for testing

## Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL
- Firebase project
- Cloudinary account (optional)

### Installation

\`\`\`bash
# Backend
cd backend
npm install
cp .env.example .env
# Configure .env with your credentials
npm run dev

# Frontend (in new terminal)
cd frontend
npm install
npm run dev
\`\`\`

Visit http://localhost:3000 to see the application.

## Documentation

- [Getting Started Guide](./GETTING_STARTED.md) - Step-by-step setup
- [Testing Guide](./TESTING_GUIDE.md) - Backend & frontend testing
- [Deployment Guide](./DEPLOYMENT_GUIDE.md) - Production deployment
- [API Documentation](./backend/API_DOCUMENTATION.md) - API endpoints reference
- [Technical Documentation](./backend/TECHNICAL_DOCUMENTATION.md) - Architecture details
- [Debug Guide](./backend/DEBUG_GUIDE.md) - Debugging guide

## Project Structure

\`\`\`
├── frontend/                 # React + Vite frontend
│   ├── src/
│   │   ├── pages/           # Page components
│   │   ├── components/      # Reusable components
│   │   ├── store/           # Redux store
│   │   ├── api/             # API services
│   │   └── styles/          # Global styles
│   └── package.json
│
├── backend/                  # Express + Node.js backend
│   ├── src/
│   │   ├── routes/          # API routes
│   │   ├── models/          # Data models
│   │   ├── middleware/      # Express middleware
│   │   ├── config/          # Configuration
│   │   └── tests/           # Test files
│   ├── scripts/             # Database scripts
│   └── package.json
│
├── DEPLOYMENT_GUIDE.md       # Deployment instructions
├── TESTING_GUIDE.md          # Testing guide
└── README.md                 # This file
\`\`\`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/verify-mobile` - Verify mobile OTP
- `POST /api/auth/login` - Login user

### Company Profile
- `POST /api/company/register` - Create company profile
- `GET /api/company/profile` - Get company profile
- `PUT /api/company/profile` - Update company profile
- `POST /api/company/upload-logo` - Upload logo
- `POST /api/company/upload-banner` - Upload banner

## Environment Variables

See `.env.example` files in `backend/` and `frontend/` directories.

## Testing

\`\`\`bash
# Backend tests
cd backend
npm test

# Frontend linting
cd frontend
npm run lint

# Production build
cd frontend
npm run build
\`\`\`

## Deployment

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed deployment instructions.

Quick options:
- Vercel (Frontend)
- Docker (Full Stack)
- Traditional Server (VPS/Dedicated)

## Troubleshooting

Refer to:
- [Getting Started Guide](./GETTING_STARTED.md#troubleshooting)
- [API Documentation](./backend/API_DOCUMENTATION.md)
- [Debug Guide](./backend/DEBUG_GUIDE.md)

## License

ISC

## Support

For issues and questions, refer to the documentation in this repository.
