# DynamoDB Implementation Plan - Complete Registration System

## Plan Overview
Store all registration data directly in DynamoDB without AWS Secrets Manager encryption.

## Table Structure

**Table Name:** `rightapply-registrations`
**Primary Key:** `id` (String)
**Billing:** Pay-per-request
**Backup:** Point-in-time recovery enabled

## Complete Field Schema

### Item Structure
```json
{
  "id": "string",                           // UUID primary key
  "createdAt": "string",                    // ISO timestamp
  
  // Personal Information
  "preferredName": "string",                // REQUIRED
  "dateOfBirth": "string",                  // Optional (YYYY-MM-DD)
  "linkedinUrl": "string",                  // Optional
  
  // Contact Information  
  "resumeEmail": "string",                  // REQUIRED
  "resumePhone": "string",                  // REQUIRED
  "resumeEmailPassword": "string",          // REQUIRED - stored directly
  "personalPhone": "string",                // REQUIRED
  "fullAddress": "string",                  // REQUIRED
  
  // Work Experience
  "sectors": ["string"],                    // REQUIRED array (1-3 items)
  "clients": [                             // Array (1-3 objects)
    {
      "clientName": "string",
      "role": "string", 
      "startDate": "string",               // YYYY-MM-DD
      "endDate": "string",                 // YYYY-MM-DD
      "clientAddress": "string"
    }
  ],
  
  // Education
  "mastersUniversityField": "string",       // Optional
  "mastersGraduatedCompleted": "string",    // Optional
  "bachelorsUniversityField": "string",     // Optional
  "bachelorsGraduatedCompleted": "string",  // Optional
  
  // Visa & Availability
  "currentVisaStatus": "string",            // REQUIRED (from predefined list)
  "arrivalDateUSA": "string",              // Optional (YYYY-MM-DD)
  
  // Certifications
  "certificationsAchievements": "string",   // Optional (textarea)
  "preferredMarketingRole": "string",       // Optional
  
  // Consent & Signature
  "consentApply": true,                     // REQUIRED boolean
  "consentEmailAccess": true,               // REQUIRED boolean  
  "legalName": "string",                    // REQUIRED
  "signedDate": "string"                    // REQUIRED (YYYY-MM-DD)
}
```

## Implementation Steps

### 1. Create DynamoDB Table
```bash
aws dynamodb create-table --cli-input-json file://dynamodb-schema-complete.json
```

### 2. Update Lambda Function (save.js)
- Remove Secrets Manager integration
- Store `resumeEmailPassword` directly in DynamoDB item
- Remove `resumeEmailPasswordSecretId` field
- Simplify error handling

### 3. Update Lambda Function (query.js)  
- Remove password field from query responses for security
- Update CSV export to exclude password field
- Keep all other fields in responses

### 4. Security Considerations
- **Risk:** Password stored in plaintext in DynamoDB
- **Mitigation:** Use DynamoDB encryption at rest (enabled by default)
- **Access Control:** Restrict Lambda IAM permissions to minimum required
- **Monitoring:** Enable CloudTrail for DynamoDB access logging

### 5. Query Patterns Supported
- Get registration by ID
- Scan with filters (visa status, sectors, date range)
- Export to CSV (excluding password)
- List all registrations with pagination

## Required Lambda Updates

### save.js Changes:
1. Remove Secrets Manager client and operations
2. Store password directly in DynamoDB item
3. Remove secret creation logic
4. Simplify payload structure

### query.js Changes:
1. Remove password from response objects
2. Update CSV headers to exclude password
3. Keep all other functionality intact

## Data Sample
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "preferredName": "John Doe",
  "resumeEmail": "john.doe@email.com",
  "resumeEmailPassword": "userPassword123",
  "resumePhone": "+1-555-123-4567",
  "personalPhone": "+1-555-987-6543",
  "fullAddress": "123 Main St, Anytown, ST 12345",
  "sectors": ["Technology & Software – Google, Microsoft, Apple"],
  "clients": [{
    "clientName": "Tech Corp",
    "role": "Software Engineer", 
    "startDate": "2022-01-15",
    "endDate": "2023-12-31",
    "clientAddress": "456 Tech Ave, Silicon Valley, CA 94000"
  }],
  "currentVisaStatus": "H-1B Visa",
  "consentApply": true,
  "consentEmailAccess": true,
  "legalName": "John Michael Doe",
  "signedDate": "2024-01-15"
}
```