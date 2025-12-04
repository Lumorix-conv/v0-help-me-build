# Company Registration & Verification Module - API Documentation

## Overview
This document provides comprehensive API documentation for the Company Registration & Verification module backend. All endpoints return JSON responses with consistent status codes and error messages.

## Base URL
\`\`\`
http://localhost:5000/api
\`\`\`

## Authentication
Protected endpoints require a JWT token in the Authorization header:
\`\`\`
Authorization: Bearer <token>
\`\`\`

## Global Response Format
All responses follow this structure:
\`\`\`json
{
  "success": boolean,
  "message": string,
  "data": object | array,
  "errors": array (optional)
}
\`\`\`

## Error Codes
- `400`: Bad Request - Invalid input or validation error
- `401`: Unauthorized - Missing or invalid token
- `404`: Not Found - Resource not found
- `500`: Internal Server Error - Server-side error

---

## Authentication Endpoints

### 1. Register User
**POST** `/auth/register`

Register a new user with email, password, and personal details.

**Request Body:**
\`\`\`json
{
  "email": "company@example.com",
  "password": "Password123!",
  "full_name": "John Doe",
  "gender": "m",
  "mobile_no": "+919876543210",
  "signup_type": "e"
}
\`\`\`

**Response (201):**
\`\`\`json
{
  "success": true,
  "message": "User registered successfully. Please verify mobile OTP.",
  "data": {
    "user_id": 1,
    "email": "company@example.com"
  }
}
\`\`\`

**Validation Rules:**
- Email: Must be valid email format and unique
- Password: Minimum 8 characters
- Gender: m, f, or o
- Mobile: Valid international phone number

**Error Response (400):**
\`\`\`json
{
  "success": false,
  "message": "Email already registered",
  "errors": []
}
\`\`\`

---

### 2. Login User
**POST** `/auth/login`

Authenticate user and receive JWT token.

**Request Body:**
\`\`\`json
{
  "email": "company@example.com",
  "password": "Password123!"
}
\`\`\`

**Response (200):**
\`\`\`json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "email": "company@example.com",
      "full_name": "John Doe",
      "mobile_no": "+919876543210",
      "is_email_verified": false,
      "is_mobile_verified": false
    }
  }
}
\`\`\`

**Error Response (401):**
\`\`\`json
{
  "success": false,
  "message": "Invalid email or password"
}
\`\`\`

---

### 3. Verify Email
**GET** `/auth/verify-email`

Verify user email via Firebase verification link.

**Query Parameters:**
\`\`\`
?token=<firebase_verification_token>
\`\`\`

**Response (200):**
\`\`\`json
{
  "success": true,
  "message": "Email verified successfully",
  "data": {
    "id": 1,
    "email": "company@example.com",
    "is_email_verified": true
  }
}
\`\`\`

---

### 4. Verify Mobile
**POST** `/auth/verify-mobile`

Verify mobile number via OTP.

**Request Body:**
\`\`\`json
{
  "userId": 1,
  "otp": "123456"
}
\`\`\`

**Response (200):**
\`\`\`json
{
  "success": true,
  "message": "Mobile verified successfully",
  "data": {
    "id": 1,
    "mobile_no": "+919876543210",
    "is_mobile_verified": true
  }
}
\`\`\`

**Error Response (400):**
\`\`\`json
{
  "success": false,
  "message": "Invalid OTP"
}
\`\`\`

---

## Company Profile Endpoints

All company endpoints require authentication (JWT token).

### 5. Register Company Profile
**POST** `/company/register`

Create a new company profile for authenticated user.

**Authentication:** Required (Bearer token)

**Request Body:**
\`\`\`json
{
  "company_name": "Tech Startup Inc",
  "address": "123 Tech Street",
  "city": "San Francisco",
  "state": "California",
  "country": "USA",
  "postal_code": "94105",
  "website": "https://techstartup.com",
  "industry": "Technology",
  "founded_date": "2020-01-15",
  "description": "A leading technology company",
  "social_links": {
    "linkedin": "https://linkedin.com/company/tech",
    "twitter": "https://twitter.com/tech"
  }
}
\`\`\`

**Response (201):**
\`\`\`json
{
  "success": true,
  "message": "Company profile created successfully",
  "data": {
    "id": 1,
    "owner_id": 1,
    "company_name": "Tech Startup Inc",
    "address": "123 Tech Street",
    "city": "San Francisco",
    "state": "California",
    "country": "USA",
    "postal_code": "94105",
    "website": "https://techstartup.com",
    "industry": "Technology",
    "founded_date": "2020-01-15",
    "description": "A leading technology company",
    "logo_url": null,
    "banner_url": null,
    "social_links": {...},
    "created_at": "2025-08-07T10:30:00Z",
    "updated_at": "2025-08-07T10:30:00Z"
  }
}
\`\`\`

**Validation Rules:**
- All fields except website, founded_date, description, social_links are required
- Company name: Non-empty string
- Address: Non-empty string

---

### 6. Get Company Profile
**GET** `/company/profile`

Retrieve company profile for authenticated user.

**Authentication:** Required

**Response (200):**
\`\`\`json
{
  "success": true,
  "data": {
    "id": 1,
    "owner_id": 1,
    "company_name": "Tech Startup Inc",
    "address": "123 Tech Street",
    "city": "San Francisco",
    "state": "California",
    "country": "USA",
    "postal_code": "94105",
    "website": "https://techstartup.com",
    "industry": "Technology",
    "founded_date": "2020-01-15",
    "description": "A leading technology company",
    "logo_url": "https://cloudinary.com/...",
    "banner_url": "https://cloudinary.com/...",
    "created_at": "2025-08-07T10:30:00Z",
    "updated_at": "2025-08-07T10:30:00Z"
  }
}
\`\`\`

**Error Response (404):**
\`\`\`json
{
  "success": false,
  "message": "Company profile not found"
}
\`\`\`

---

### 7. Update Company Profile
**PUT** `/company/profile`

Update company profile information.

**Authentication:** Required

**Request Body:** (All fields optional - only include fields to update)
\`\`\`json
{
  "company_name": "Tech Startup Inc Updated",
  "website": "https://newwebsite.com",
  "description": "Updated description"
}
\`\`\`

**Response (200):**
\`\`\`json
{
  "success": true,
  "message": "Company profile updated successfully",
  "data": {
    "id": 1,
    "company_name": "Tech Startup Inc Updated",
    "...": "...",
    "updated_at": "2025-08-07T11:00:00Z"
  }
}
\`\`\`

---

### 8. Upload Company Logo
**POST** `/company/upload-logo`

Upload company logo image to Cloudinary.

**Authentication:** Required

**Request:** Multipart form data with file
\`\`\`
Content-Type: multipart/form-data
file: <image_file>
\`\`\`

**Response (200):**
\`\`\`json
{
  "success": true,
  "message": "Logo uploaded successfully",
  "data": {
    "logo_url": "https://cloudinary.com/...",
    "company": {
      "id": 1,
      "logo_url": "https://cloudinary.com/...",
      "...": "..."
    }
  }
}
\`\`\`

**Validation:**
- Only image files (JPG, PNG, GIF)
- Maximum file size: 5MB

---

### 9. Upload Company Banner
**POST** `/company/upload-banner`

Upload company banner image to Cloudinary.

**Authentication:** Required

**Request:** Multipart form data with file
\`\`\`
Content-Type: multipart/form-data
file: <image_file>
\`\`\`

**Response (200):**
\`\`\`json
{
  "success": true,
  "message": "Banner uploaded successfully",
  "data": {
    "banner_url": "https://cloudinary.com/...",
    "company": {
      "id": 1,
      "banner_url": "https://cloudinary.com/...",
      "...": "..."
    }
  }
}
\`\`\`

---

## Testing with Postman/Thunder Client

### Setup
1. Create environment variable:
   - `base_url`: `http://localhost:5000/api`
   - `token`: (will be set after login)

2. Collections:
   - Create folders: Auth, Company

### Test Workflow
\`\`\`
1. Register → Get user_id
2. Login → Save token to {{token}}
3. Verify Mobile → Use user_id
4. Register Company → Use {{token}}
5. Get Company → Use {{token}}
6. Update Company → Use {{token}}
7. Upload Logo → Use {{token}}
8. Upload Banner → Use {{token}}
\`\`\`

### Example Postman Script
\`\`\`javascript
// Save token after login (in Tests tab)
if (pm.response.code === 200) {
  pm.environment.set("token", pm.response.json().data.token);
}
\`\`\`

---

## Rate Limiting & Security

- All endpoints validate and sanitize inputs
- Passwords are hashed with bcrypt (10 rounds)
- JWT tokens expire in 90 days
- CORS enabled for specified origins
- Helmet.js headers for security
- Input validation with express-validator

---

## Database Schema Reference

### users table
| Column | Type | Constraints |
|--------|------|-------------|
| id | SERIAL | PRIMARY KEY, AUTO-INCREMENT |
| email | VARCHAR(255) | UNIQUE, NOT NULL |
| password | TEXT | NOT NULL (bcrypt hashed) |
| full_name | VARCHAR(255) | NOT NULL |
| gender | CHAR(1) | m, f, o |
| mobile_no | VARCHAR(20) | UNIQUE, NOT NULL |
| is_email_verified | BOOLEAN | DEFAULT false |
| is_mobile_verified | BOOLEAN | DEFAULT false |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP | AUTO-UPDATED |

### company_profile table
| Column | Type | Constraints |
|--------|------|-------------|
| id | SERIAL | PRIMARY KEY, AUTO-INCREMENT |
| owner_id | INTEGER | FOREIGN KEY (users.id) |
| company_name | TEXT | NOT NULL |
| address | TEXT | NOT NULL |
| city | VARCHAR(50) | NOT NULL |
| state | VARCHAR(50) | NOT NULL |
| country | VARCHAR(50) | NOT NULL |
| postal_code | VARCHAR(20) | NOT NULL |
| website | TEXT | OPTIONAL |
| logo_url | TEXT | Cloudinary URL |
| banner_url | TEXT | Cloudinary URL |
| industry | TEXT | NOT NULL |
| founded_date | DATE | OPTIONAL |
| description | TEXT | OPTIONAL |
| social_links | JSONB | OPTIONAL |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP | AUTO-UPDATED |

---

## Environment Variables

\`\`\`env
# Database
DB_USER=postgres
DB_PASSWORD=password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=company_db

# Firebase
FIREBASE_TYPE=service_account
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY_ID=your-key-id
FIREBASE_PRIVATE_KEY=your-private-key
FIREBASE_CLIENT_EMAIL=your-email@your-project.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=your-client-id
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
FIREBASE_AUTH_PROVIDER_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
FIREBASE_CLIENT_CERT_URL=your-cert-url

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
CLOUDINARY_UPLOAD_PRESET=your-upload-preset

# JWT
JWT_SECRET=your-jwt-secret-key

# Server
PORT=5000
CLIENT_URL=http://localhost:3000
\`\`\`

---

## Support & Troubleshooting

### Common Issues

1. **401 Unauthorized**
   - Check if token is included in Authorization header
   - Verify token hasn't expired (90 days)
   - Ensure token format: `Bearer <token>`

2. **400 Validation Error**
   - Check all required fields are provided
   - Verify data types and formats
   - Ensure email is unique for registration

3. **PostgreSQL Connection Error**
   - Verify database is running on localhost:5432
   - Check credentials in .env file
   - Ensure company_db exists

4. **Cloudinary Upload Fails**
   - Verify upload preset exists and is configured
   - Check file size and format
   - Ensure CLOUDINARY credentials are correct

For additional support, contact via WhatsApp: 9209550273
