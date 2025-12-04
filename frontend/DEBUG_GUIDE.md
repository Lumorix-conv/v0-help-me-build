# Frontend Debugging Guide

## Enable Debug Logging

Add to your `.env.local`:
\`\`\`
VITE_DEBUG_MODE=true
\`\`\`

## Debug Console Output

The application logs important operations with `[v0]` prefix:

### API Calls
\`\`\`
[v0] Login attempt with email: user@example.com
[v0] Login successful, token received
[v0] Failed to load company profile
\`\`\`

### State Changes
\`\`\`
[v0] Redux state updated: auth
[v0] Company profile loaded: { company_name: "...", ... }
\`\`\`

### Error Tracking
\`\`\`
[v0] Error occurred: Failed to upload image
[v0] API Error: 401 - Unauthorized
\`\`\`

## Browser DevTools

### 1. Console Tab
- Look for `[v0]` prefixed messages
- Check for JavaScript errors
- Monitor API response times

### 2. Network Tab
- Check API request/response
- Verify status codes (200, 400, 401, 500)
- Monitor payload sizes
- Identify slow requests

### 3. Application Tab
- Check localStorage for token
- Verify Redux state in React DevTools
- Check cookies and session storage

## Common Frontend Issues

### 1. Login Fails
**Symptoms:**
- Form submitted but no redirect
- No console errors

**Solutions:**
- Check browser console for `[v0]` messages
- Verify backend server is running
- Check API endpoint in `frontend/src/api/authService.js`
- Ensure token is being saved to localStorage

### 2. Images Not Loading
**Symptoms:**
- Blank image placeholders
- 403/404 errors in Network tab

**Solutions:**
- Verify Cloudinary credentials
- Check image upload completed successfully
- Verify CORS settings on backend
- Check image URLs in Redux state

### 3. Form Validation Issues
**Symptoms:**
- Error messages not showing
- Form won't submit

**Solutions:**
- Check console for validation errors
- Verify regex patterns in validation
- Check input values in React DevTools
- Inspect element to see error classes

### 4. State Not Updating
**Symptoms:**
- Data loads but doesn't display
- UI doesn't refresh

**Solutions:**
- Open Redux DevTools
- Check action dispatch in Network tab
- Verify state structure matches selectors
- Use React DevTools to inspect component props

## Performance Optimization

### Check Performance
1. Open DevTools → Performance tab
2. Record user interaction
3. Look for long tasks
4. Identify bottlenecks

### Common Issues
- Large image uploads
- Unoptimized re-renders
- Excessive API calls
- Slow image processing

## Testing in Development

\`\`\`bash
# Start with debug logging
npm run dev

# Watch for console errors
# Use React DevTools to inspect components
# Use Redux DevTools to monitor state changes
\`\`\`

## Redux DevTools Integration

1. Install Redux DevTools browser extension
2. Open DevTools → Redux tab
3. Monitor all state changes
4. Time-travel debug actions
5. Export/import state snapshots

## Removing Debug Statements

Before production, search for and remove all `console.log("[v0]")` statements:
\`\`\`bash
grep -r "\[v0\]" frontend/src
