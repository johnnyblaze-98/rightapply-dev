# Deployment Guide - Updated Registration System

## Quick Deploy

1. **Deploy the updated stack:**
   ```bash
   deploy-updated-stack.bat
   ```

2. **Update environment variables:**
   ```bash
   update-env.bat
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

## What Changed

- **Removed AWS Secrets Manager** - passwords now stored directly in DynamoDB
- **Simplified Lambda functions** - no secret creation/management
- **Updated permissions** - removed Secrets Manager IAM policies
- **Security maintained** - passwords excluded from API responses and CSV exports

## Stack Updates

The deployment will update your existing `rightapplyphase1stack` with:
- Same DynamoDB table structure
- Same S3 bucket for backups
- Same API Gateway endpoints
- Simplified Lambda functions without Secrets Manager

## Registration Form Integration

The registration page (`/src/components/RegistrationPage.tsx`) is already integrated and will:
- Submit all form data to `POST /registrations`
- Store complete registration in DynamoDB table
- Generate unique ID and timestamp
- Validate all required fields
- Handle form submission errors

## API Endpoints

- `POST /registrations` - Save new registration
- `GET /registrations` - List all registrations (passwords excluded)
- `GET /registrations/{id}` - Get specific registration (password excluded)
- `GET /registrations?format=csv` - Export to CSV (passwords excluded)

## Testing

After deployment, test the registration form at `http://localhost:5173` to ensure data saves correctly to DynamoDB.