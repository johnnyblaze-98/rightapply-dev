# AWS Registration System Deployment Guide

## Prerequisites

1. **AWS CLI installed and configured**
   ```bash
   aws configure --profile <AWS_PROFILE_NAME>
   ```

2. **SAM CLI installed**
   ```bash
   # macOS
   brew install aws-sam-cli
   
   # Windows/Linux - see AWS documentation
   ```

3. **Node.js 18+ installed**

## Configuration

### 1. Update Placeholders

Replace these placeholders in your files:

- Update the default values in `template.yaml` Parameters section:
  - `DDBTableName` → Your DynamoDB table name
  - `S3BucketName` → Your S3 bucket name (must be globally unique)
  - `SecretPrefix` → Your Secrets Manager prefix
  - `FrontendOrigin` → Your frontend URL
- Set your AWS profile: `export AWS_PROFILE=your-profile-name`

### 2. Environment Variables

Create `.env` file:
```bash
cp .env.example .env
```

Update the `VITE_API_BASE` value after deployment.

## Deployment Steps

### 1. Install Lambda Dependencies
```bash
cd lambda
npm install
cd ..
```

### 2. Build and Deploy
```bash
# Set your AWS profile
export AWS_PROFILE=<AWS_PROFILE_NAME>

# Build the SAM application
sam build

# Deploy with guided setup (first time)
sam deploy --guided

# For subsequent deployments
sam deploy
```

### 3. Update Frontend Configuration

After deployment, SAM will output the API endpoint URL. Update your `.env` file:
```bash
VITE_API_BASE=https://xxxxx.execute-api.<AWS_REGION>.amazonaws.com
```

### 4. Test the Deployment

1. **Test the API directly:**
   ```bash
   # Health check (should return 404 - expected)
   curl https://your-api-url.execute-api.region.amazonaws.com/registrations
   
   # Test CORS
   curl -X OPTIONS https://your-api-url.execute-api.region.amazonaws.com/registrations \
     -H "Origin: https://your-frontend-domain.com"
   ```

2. **Test the frontend:**
   - Start your development server: `npm run dev`
   - Navigate to `/registration`
   - Fill out and submit the form
   - Check AWS Console for:
     - DynamoDB item created
     - S3 object created
     - Secrets Manager secret created

## API Endpoints

### POST /registrations
Submit a new registration.

**Request:**
```json
{
  "preferredName": "John Doe",
  "resumeEmail": "john@example.com",
  "resumeEmailPassword": "password123",
  "resumePhone": "+1234567890",
  "personalPhone": "+1234567890",
  "fullAddress": "123 Main St, City, State 12345",
  "currentVisaStatus": "F-1 Visa",
  "legalName": "John Doe",
  "signedDate": "2024-01-15",
  "sectors": ["Technology & Software"],
  "clients": [
    {
      "clientName": "Tech Corp",
      "role": "Software Engineer",
      "startDate": "2023-01-01",
      "endDate": "2023-12-31",
      "clientAddress": "456 Tech Ave"
    }
  ]
}
```

**Response:**
```json
{
  "id": "uuid-here",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "message": "Registration saved successfully"
}
```

### GET /registrations/{id}
Get a specific registration by ID.

### GET /registrations
List registrations with optional filters.

**Query Parameters:**
- `visa` - Filter by visa status
- `sector` - Filter by sector (contains)
- `date_from` - Filter by creation date (YYYY-MM-DD)
- `date_to` - Filter by creation date (YYYY-MM-DD)
- `limit` - Limit results (max 100, default 50)
- `format` - Set to `csv` for CSV download

## Security Features

1. **Password Security**: Email passwords are stored in AWS Secrets Manager, not in DynamoDB
2. **CORS Protection**: API only accepts requests from configured frontend origin
3. **Encryption**: All data encrypted at rest in DynamoDB and S3
4. **IAM Permissions**: Lambda functions have minimal required permissions
5. **Input Validation**: Server-side validation of all required fields

## Monitoring and Troubleshooting

### CloudWatch Logs
- Lambda function logs: `/aws/lambda/registration-save` and `/aws/lambda/registration-query`
- API Gateway logs: Enable in API Gateway console if needed

### Common Issues

1. **CORS Errors**: Ensure `FRONTEND_ORIGIN` matches your actual frontend URL
2. **Permission Errors**: Check IAM roles have correct permissions
3. **Timeout Errors**: Increase Lambda timeout if needed (currently 30s)
4. **DynamoDB Errors**: Check table exists and has correct key schema

### Cost Optimization

- DynamoDB: Using PAY_PER_REQUEST billing
- Lambda: Only charged for actual usage
- S3: Standard storage class, consider lifecycle policies for old data
- Secrets Manager: Charged per secret per month

## Cleanup

To remove all AWS resources:
```bash
sam delete
```

This will remove the CloudFormation stack and all associated resources.