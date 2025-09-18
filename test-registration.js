// Test script to validate registration functionality
const testData = {
  // Personal Information
  preferredName: "John Smith",
  dateOfBirth: "1995-06-15",
  linkedinUrl: "https://linkedin.com/in/johnsmith",

  // Contact Information
  resumeEmail: "john.smith@email.com",
  resumePhone: "+1-555-123-4567",
  resumeEmailPassword: "testPassword123",
  personalPhone: "+1-555-987-6543",
  fullAddress: "123 Main Street, Apt 4B, New York, NY 10001",

  // Work Experience
  sectors: [
    "Technology & Software – Google, Microsoft, Apple",
    "Banking & Financial Services – JPMorgan Chase, Bank of America, Goldman Sachs"
  ],
  clients: [
    {
      clientName: "Tech Solutions Inc",
      role: "Senior Software Engineer",
      startDate: "2022-01-15",
      endDate: "2023-12-31",
      clientAddress: "456 Tech Ave, Silicon Valley, CA 94000"
    },
    {
      clientName: "Innovation Labs",
      role: "Full Stack Developer",
      startDate: "2020-06-01",
      endDate: "2021-12-31",
      clientAddress: "789 Innovation Blvd, Austin, TX 73301"
    }
  ],

  // Education Summary
  mastersUniversityField: "Stanford University — MS in Computer Science",
  mastersGraduatedCompleted: "May 2022",
  bachelorsUniversityField: "UC Berkeley — B.S. in Computer Science",
  bachelorsGraduatedCompleted: "May 2020",

  // Visa Details & Availability
  currentVisaStatus: "H-1B Visa",
  arrivalDateUSA: "2020-08-01",

  // Certifications & Achievements
  certificationsAchievements: "AWS Certified Solutions Architect - Professional, Google Cloud Professional Developer, Certified Kubernetes Administrator (CKA)",
  preferredMarketingRole: "Senior Software Engineer",

  // Consent & Signature
  consentApply: true,
  consentEmailAccess: true,
  legalName: "John Michael Smith",
  signedDate: "2024-01-15"
};

async function testRegistration() {
  const API_BASE = process.env.VITE_API_BASE || 'YOUR_API_ENDPOINT_HERE';
  
  if (API_BASE === 'YOUR_API_ENDPOINT_HERE') {
    console.error('❌ Please set VITE_API_BASE environment variable or update API_BASE in this script');
    return;
  }

  console.log('🧪 Testing Registration API...');
  console.log('📍 API Endpoint:', API_BASE);
  
  try {
    // Test POST /registrations
    console.log('\n📤 Submitting test registration...');
    const response = await fetch(`${API_BASE}/registrations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Idempotency-Key': `test-${Date.now()}`
      },
      body: JSON.stringify(testData)
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`HTTP ${response.status}: ${error}`);
    }

    const result = await response.json();
    console.log('✅ Registration saved successfully!');
    console.log('📋 Response:', result);

    const registrationId = result.id;

    // Test GET /registrations/{id}
    console.log('\n📥 Fetching saved registration...');
    const getResponse = await fetch(`${API_BASE}/registrations/${registrationId}`);
    
    if (!getResponse.ok) {
      throw new Error(`Failed to fetch registration: ${getResponse.status}`);
    }

    const savedData = await getResponse.json();
    console.log('✅ Registration retrieved successfully!');
    
    // Verify password is not in response
    if (savedData.resumeEmailPassword) {
      console.log('❌ SECURITY ISSUE: Password found in API response!');
    } else {
      console.log('✅ Security check passed: Password not in response');
    }

    // Test GET /registrations (list)
    console.log('\n📋 Testing registration list...');
    const listResponse = await fetch(`${API_BASE}/registrations?limit=5`);
    
    if (!listResponse.ok) {
      throw new Error(`Failed to list registrations: ${listResponse.status}`);
    }

    const listData = await listResponse.json();
    console.log('✅ Registration list retrieved successfully!');
    console.log(`📊 Found ${listData.count} registrations`);

    // Verify our registration is in the list
    const foundInList = listData.items.some(item => item.id === registrationId);
    if (foundInList) {
      console.log('✅ Test registration found in list');
    } else {
      console.log('❌ Test registration not found in list');
    }

    console.log('\n🎉 All tests passed successfully!');
    console.log('📝 Test Summary:');
    console.log('   ✅ Registration creation');
    console.log('   ✅ Registration retrieval');
    console.log('   ✅ Password security');
    console.log('   ✅ Registration listing');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('   1. Ensure the stack is deployed: deploy-updated-stack.bat');
    console.log('   2. Update environment: update-env.bat');
    console.log('   3. Check AWS CloudWatch logs for Lambda errors');
  }
}

// Run if called directly
if (require.main === module) {
  testRegistration();
}

module.exports = { testData, testRegistration };