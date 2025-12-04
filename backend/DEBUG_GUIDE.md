# Debugging Guide

## Enable Debug Mode

Add to your `.env` file:
\`\`\`
DEBUG_MODE=true
NODE_ENV=development
LOG_LEVEL=debug
\`\`\`

## Debug Logging

The application includes comprehensive logging at these levels:

### 1. Request/Response Logging
All incoming requests and responses are logged with:
- HTTP method
- URL endpoint
- Status code
- Duration
- Request/response body (when DEBUG_MODE=true)

**Example:**
\`\`\`
[v0] REQUEST: POST /api/auth/register
[v0] Payload: { email: "user@example.com", ... }
[v0] RESPONSE [SUCCESS]: POST /api/auth/register - Status: 201
[v0] Data: { user_id: 123, ... }
\`\`\`

### 2. Error Logging
All errors are logged with:
- Error endpoint
- Error message
- Stack trace

**Example:**
\`\`\`
[v0] ERROR at /api/auth/register:
[v0] Message: Duplicate email address
[v0] Stack: Error: Duplicate email...
\`\`\`

### 3. Performance Logging
Long-running operations are monitored:

**Example:**
\`\`\`
[v0] PERFORMANCE: /api/company/profile took 245ms
\`\`\`

## Common Issues and Solutions

### 1. Connection Errors
**Problem:** `[v0] ERROR: Failed to connect to database`
**Solution:** 
- Check `.env` credentials
- Verify PostgreSQL is running
- Test connection: `psql -U postgres -d company_db -h localhost`

### 2. JWT Token Errors
**Problem:** `[v0] ERROR: Invalid token`
**Solution:**
- Ensure JWT_SECRET is set in `.env`
- Check token expiration (90 days)
- Verify token format: `Bearer <token>`

### 3. Firebase Errors
**Problem:** `[v0] ERROR: Firebase authentication failed`
**Solution:**
- Verify Firebase credentials in `.env`
- Check Firebase project exists
- Ensure service account has correct permissions

### 4. OTP Verification Failures
**Problem:** `[v0] ERROR: OTP verification failed`
**Solution:**
- Check Firebase SMS configuration
- Verify phone number format (+country_code format)
- Ensure mobile number is verified during registration

## Testing with Postman

1. Import the provided Postman collection
2. Set environment variables:
   - `base_url`: http://localhost:5000
   - `token`: (auto-populated after login)
3. Run requests in order
4. Check console output for debug logs

## Running Tests

\`\`\`bash
# Run all tests with verbose output
npm test -- --verbose

# Run specific test file
npm test -- auth.test.js

# Run with coverage
npm test -- --coverage

# Run integration tests
npm test -- integration.test.js
\`\`\`

## Performance Monitoring

Check response times in logs:
- < 100ms: Excellent
- 100-300ms: Good
- 300-500ms: Acceptable
- > 500ms: Investigate

## Database Debugging

Enable query logging:
\`\`\`sql
-- Check slow queries
SELECT query, calls, mean_time FROM pg_stat_statements 
ORDER BY mean_time DESC LIMIT 10;

-- Monitor active connections
SELECT * FROM pg_stat_activity;
