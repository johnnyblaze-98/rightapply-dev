# Complete Registration Page Fields Analysis

## ALL FIELDS FROM REGISTRATION FORM

### System Fields (Auto-generated)
- `id` (String) - Primary key UUID
- `createdAt` (String) - ISO timestamp

### Personal Information Section
- `preferredName` (String) - **REQUIRED** - "Preferred Name on Resume"
- `dateOfBirth` (String) - Optional - Date picker (YYYY-MM-DD)
- `linkedinUrl` (String) - Optional - "LinkedIn Profile"

### Contact Information Section  
- `resumeEmail` (String) - **REQUIRED** - "Email Address for Resume"
- `resumePhone` (String) - **REQUIRED** - "Phone Number for Resume"
- `resumeEmailPassword` (String) - **REQUIRED** - "Resume Email Password"
- `personalPhone` (String) - **REQUIRED** - "Personal Phone Number"
- `fullAddress` (String) - **REQUIRED** - "Full current address" (textarea)

### Work Experience Section
- `sectors` (Array) - **REQUIRED** - Selected industry sectors (1-3 items from predefined list)
- `clients` (Array) - Client work history objects (1-3 items), each containing:
  - `clientName` (String) - "Client"
  - `role` (String) - "Role"  
  - `startDate` (String) - "Start Date" (YYYY-MM-DD)
  - `endDate` (String) - "End Date" (YYYY-MM-DD)
  - `clientAddress` (String) - "Client Address"

### Education Summary Section
- `mastersUniversityField` (String) - Optional - "Masters University & Field of Study"
- `mastersGraduatedCompleted` (String) - Optional - "Graduated/Completed"
- `bachelorsUniversityField` (String) - Optional - "Bachelors University & Field of Study"  
- `bachelorsGraduatedCompleted` (String) - Optional - "Graduated/Completed"

### Visa Details & Availability Section
- `currentVisaStatus` (String) - **REQUIRED** - Dropdown with predefined options
- `arrivalDateUSA` (String) - Optional - "Date of Arrival in the USA" (YYYY-MM-DD)

### Certifications & Achievements Section
- `certificationsAchievements` (String) - Optional - "Mention any relevant certifications you have" (textarea)
- `preferredMarketingRole` (String) - Optional - "Preferred Role for Marketing (only one role)"

### Consent & Signature Section
- `consentApply` (Boolean) - **REQUIRED** - Consent checkbox for job applications
- `consentEmailAccess` (Boolean) - **REQUIRED** - Consent checkbox for email access
- `legalName` (String) - **REQUIRED** - "Your Legal Name"
- `signedDate` (String) - **REQUIRED** - "Signed Date" (YYYY-MM-DD)

## PREDEFINED OPTIONS

### Sectors (SECTORS array - max 3 selections):
1. "Technology & Software – Google, Microsoft, Apple"
2. "Healthcare & Pharmaceuticals – Pfizer, Johnson & Johnson, UnitedHealth Group"
3. "Banking & Financial Services – JPMorgan Chase, Bank of America, Goldman Sachs"
4. "Retail & E-commerce – Amazon, Walmart, Target"
5. "Manufacturing & Industrial – General Motors, Boeing, 3M"
6. "Energy (Oil, Gas, Renewables) – ExxonMobil, Chevron, NextEra Energy"
7. "Telecommunications – AT&T, Verizon, T-Mobile"
8. "Education & EdTech – Coursera, Chegg, Khan Academy"
9. "Transportation & Logistics – FedEx, UPS, Tesla"
10. "Media & Entertainment – Netflix, Disney, Warner Bros."

### Visa Options (VISA_OPTIONS):
1. "F-1 Visa"
2. "F-1 OPT"
3. "F-1 STEM OPT"
4. "OPT EAD"
5. "H-1B Visa"
6. "H-4 EAD Visa"
7. "GC (Green Card - Permanent Residency)"
8. "GC EAD"
9. "U.S. Citizenship"

## VALIDATION RULES

### Required Fields (9 total):
- preferredName, resumeEmail, resumePhone, resumeEmailPassword
- personalPhone, fullAddress, currentVisaStatus, legalName, signedDate

### Format Validations:
- Email: Must match email regex pattern
- Phone: Must match phone regex pattern (10+ digits with optional formatting)
- LinkedIn: Must contain "linkedin.com"
- Sectors: Must select at least 1, maximum 3
- Consents: Both checkboxes must be checked

### Data Constraints:
- Clients array: Minimum 1, maximum 3 client objects
- Sectors array: Minimum 1, maximum 3 selections
- All date fields: YYYY-MM-DD format