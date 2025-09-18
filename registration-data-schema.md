# Registration Page Data Schema for DynamoDB

## Table Structure

**Table Name:** `rightapply-registrations`
**Primary Key:** `id` (String) - UUID generated for each registration

## Data Fields Schema

### System Fields
- `id` (String) - Primary key, UUID
- `createdAt` (String) - ISO timestamp of registration
- `resumeEmailPasswordSecretId` (String) - AWS Secrets Manager secret ID for email password

### Personal Information
- `preferredName` (String) - Required. Name to appear on resume
- `dateOfBirth` (String) - Optional. Date in YYYY-MM-DD format
- `linkedinUrl` (String) - Optional. LinkedIn profile URL

### Contact Information
- `resumeEmail` (String) - Required. Email address for resume and job applications
- `resumePhone` (String) - Required. Phone number for resume
- `personalPhone` (String) - Required. Personal contact phone number
- `fullAddress` (String) - Required. Complete current address

### Work Experience
- `sectors` (List) - Array of selected industry sectors (max 3)
- `clients` (List) - Array of client objects with structure:
  ```json
  {
    "clientName": "string",
    "role": "string", 
    "startDate": "string",
    "endDate": "string",
    "clientAddress": "string"
  }
  ```

### Education Summary
- `mastersUniversityField` (String) - Optional. Masters university and field of study
- `mastersGraduatedCompleted` (String) - Optional. Masters graduation/completion date
- `bachelorsUniversityField` (String) - Optional. Bachelors university and field of study
- `bachelorsGraduatedCompleted` (String) - Optional. Bachelors graduation/completion date

### Visa Details & Availability
- `currentVisaStatus` (String) - Required. Current US visa status
- `arrivalDateUSA` (String) - Optional. Date of arrival in USA (YYYY-MM-DD)

### Certifications & Achievements
- `certificationsAchievements` (String) - Optional. Text description of certifications
- `preferredMarketingRole` (String) - Optional. Preferred role for job marketing

### Consent & Signature
- `consentApply` (Boolean) - Required. Consent to apply for jobs
- `consentEmailAccess` (Boolean) - Required. Consent for email access
- `legalName` (String) - Required. Legal name for signature
- `signedDate` (String) - Required. Date of signature (YYYY-MM-DD)

## Security Considerations

1. **Password Storage**: The `resumeEmailPassword` field is NOT stored in DynamoDB. Instead, it's stored in AWS Secrets Manager with the ID referenced in `resumeEmailPasswordSecretId`.

2. **Encryption**: All data is encrypted at rest using DynamoDB's default encryption.

3. **Access Control**: Lambda functions have minimal required permissions for DynamoDB operations.

## Sample Data Structure

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "resumeEmailPasswordSecretId": "rightapply/registration/550e8400-e29b-41d4-a716-446655440000/resumeEmailPassword",
  "preferredName": "John Doe",
  "dateOfBirth": "1995-06-15",
  "linkedinUrl": "https://linkedin.com/in/johndoe",
  "resumeEmail": "john.doe@email.com",
  "resumePhone": "+1-555-123-4567",
  "personalPhone": "+1-555-987-6543",
  "fullAddress": "123 Main St, Anytown, ST 12345",
  "sectors": [
    "Technology & Software – Google, Microsoft, Apple",
    "Healthcare & Pharmaceuticals – Pfizer, Johnson & Johnson, UnitedHealth Group"
  ],
  "clients": [
    {
      "clientName": "Tech Corp",
      "role": "Software Engineer",
      "startDate": "2022-01-15",
      "endDate": "2023-12-31",
      "clientAddress": "456 Tech Ave, Silicon Valley, CA 94000"
    }
  ],
  "mastersUniversityField": "Stanford University — MS in Computer Science",
  "mastersGraduatedCompleted": "May 2021",
  "bachelorsUniversityField": "UC Berkeley — B.S. in Computer Science",
  "bachelorsGraduatedCompleted": "May 2019",
  "currentVisaStatus": "H-1B Visa",
  "arrivalDateUSA": "2021-08-01",
  "certificationsAchievements": "AWS Certified Solutions Architect, Google Cloud Professional",
  "preferredMarketingRole": "Senior Software Engineer",
  "consentApply": true,
  "consentEmailAccess": true,
  "legalName": "John Michael Doe",
  "signedDate": "2024-01-15"
}
```

## Query Patterns

The current implementation supports:
- **Get by ID**: Direct lookup using primary key
- **Scan with filters**: Filter by visa status, sectors, date ranges
- **Export to CSV**: All registrations with sensitive data excluded

## Backup & Recovery

- Point-in-time recovery is enabled
- Data is also backed up to S3 in JSON format (without passwords)
- Retention policy should be configured based on business requirements