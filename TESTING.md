# Testing Guide - Registration System Validation

## Quick Test Execution

### 1. Deploy and Setup
```bash
# Deploy the updated stack
deploy-updated-stack.bat

# Update environment variables
update-env.bat

# Run all tests
run-tests.bat
```

### 2. Manual Testing Options

#### Option A: API Testing (Node.js)
```bash
# Set API endpoint and run tests
set VITE_API_BASE=https://your-api-id.execute-api.region.amazonaws.com
node test-registration.js
```

#### Option B: Frontend Testing (Browser)
1. Open `test-frontend.html` in browser
2. Update `API_BASE` variable with your endpoint
3. Submit the pre-filled test form

#### Option C: Full Application Testing
```bash
# Start development server
npm run dev

# Open http://localhost:5173
# Fill out registration form manually
```

## Test Data Included

The test scripts use realistic sample data:
- **Name:** John Smith
- **Email:** john.smith@email.com  
- **Phone:** +1-555-123-4567
- **Visa Status:** H-1B Visa
- **Sectors:** Technology & Software
- **Client Experience:** Tech Solutions Inc (2022-2023)
- **Education:** Stanford MS, UC Berkeley BS

## Validation Checklist

### ✅ API Functionality
- [ ] POST /registrations saves data successfully
- [ ] GET /registrations/{id} retrieves saved data
- [ ] GET /registrations lists all registrations
- [ ] Password excluded from all API responses
- [ ] Required field validation works
- [ ] Email format validation works

### ✅ Database Integration  
- [ ] Data saved to DynamoDB table
- [ ] All 22+ fields stored correctly
- [ ] Arrays (sectors, clients) stored properly
- [ ] Timestamps generated correctly
- [ ] Unique IDs generated

### ✅ Security Validation
- [ ] Passwords not returned in API responses
- [ ] Passwords not included in CSV exports
- [ ] CORS headers present for frontend
- [ ] Error messages don't leak sensitive data

### ✅ Frontend Integration
- [ ] Registration form submits successfully
- [ ] Success page displays after submission
- [ ] Form validation prevents invalid submissions
- [ ] Error handling works for API failures

## Troubleshooting

### Common Issues

**"API endpoint not configured"**
- Run `update-env.bat` to set VITE_API_BASE
- Check CloudFormation outputs for correct endpoint

**"Failed to save registration data"**
- Check AWS CloudWatch logs for Lambda errors
- Verify DynamoDB table exists and has correct permissions
- Check IAM roles have DynamoDB write permissions

**"CORS errors in browser"**
- Verify CORS_ORIGIN in template.yaml includes your domain
- Check that OPTIONS requests are handled by Lambda

**"Missing required fields"**
- Ensure all 9 required fields are provided in test data
- Check field names match exactly (case-sensitive)

### Debug Commands

```bash
# Check DynamoDB table contents
check-dynamodb.bat

# View CloudWatch logs
aws logs describe-log-groups --log-group-name-prefix "/aws/lambda/rightapplyphase1stack"

# Check stack status
aws cloudformation describe-stacks --stack-name rightapplyphase1stack
```

## Expected Test Results

### Successful API Test Output:
```
🧪 Testing Registration API...
📍 API Endpoint: https://abc123.execute-api.us-east-1.amazonaws.com
📤 Submitting test registration...
✅ Registration saved successfully!
📋 Response: { id: "uuid-here", createdAt: "2024-01-15T10:30:00.000Z" }
📥 Fetching saved registration...
✅ Registration retrieved successfully!
✅ Security check passed: Password not in response
📋 Testing registration list...
✅ Registration list retrieved successfully!
📊 Found 1 registrations
✅ Test registration found in list
🎉 All tests passed successfully!
```

### DynamoDB Validation:
- Table should contain new registration record
- All form fields should be present
- Password should be stored (but not returned via API)
- Timestamps should be in ISO format
- Arrays should be properly structured