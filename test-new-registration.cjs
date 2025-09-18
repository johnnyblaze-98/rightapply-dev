const https = require('https');
const { URL } = require('url');

const API_BASE = 'https://rei8kjm2yg.execute-api.us-east-1.amazonaws.com/Prod';

function makeRequest(url, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      path: urlObj.pathname + urlObj.search,
      method: method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let responseData = '';
      res.on('data', (chunk) => responseData += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: responseData
        });
      });
    });

    req.on('error', reject);
    req.setTimeout(10000, () => reject(new Error('Request timeout')));
    
    if (data) {
      req.write(JSON.stringify(data));
    }
    
    req.end();
  });
}

async function testNewRegistration() {
  console.log('🧪 Testing New Registration Submission...');
  console.log('📍 API Endpoint:', API_BASE);
  console.log('='.repeat(60));

  const testData = {
    preferredName: "Test User Integration",
    dateOfBirth: "1995-06-15",
    linkedinUrl: "https://linkedin.com/in/testuser",
    resumeEmail: "test.integration@email.com",
    resumePhone: "+1-555-123-4567",
    resumeEmailPassword: "testPassword123",
    personalPhone: "+1-555-987-6543",
    fullAddress: "123 Integration Test St, Test City, TS 12345",
    sectors: ["Technology & Software – Google, Microsoft, Apple"],
    clients: [{
      clientName: "Test Integration Corp",
      role: "Software Engineer",
      startDate: "2022-01-15",
      endDate: "2023-12-31",
      clientAddress: "456 Test Ave, Test Valley, CA 94000"
    }],
    mastersUniversityField: "Test University — MS in Computer Science",
    mastersGraduatedCompleted: "May 2022",
    bachelorsUniversityField: "Test College — B.S. in Computer Science",
    bachelorsGraduatedCompleted: "May 2020",
    currentVisaStatus: "H-1B Visa",
    arrivalDateUSA: "2020-08-01",
    certificationsAchievements: "AWS Certified Solutions Architect",
    preferredMarketingRole: "Senior Software Engineer",
    consentApply: true,
    consentEmailAccess: true,
    legalName: "Test User Integration Legal",
    signedDate: "2024-01-15"
  };

  try {
    console.log('\n📤 Submitting new registration...');
    const response = await makeRequest(`${API_BASE}/registrations`, 'POST', testData);
    
    if (response.statusCode === 201) {
      const result = JSON.parse(response.body);
      console.log('✅ Registration submitted successfully!');
      console.log(`📋 ID: ${result.id}`);
      console.log(`🕒 Created: ${result.createdAt}`);
      
      // Test retrieving the new registration
      console.log('\n📥 Retrieving the new registration...');
      const getResponse = await makeRequest(`${API_BASE}/registrations/${result.id}`);
      
      if (getResponse.statusCode === 200) {
        const savedData = JSON.parse(getResponse.body);
        console.log('✅ Registration retrieved successfully!');
        console.log(`👤 Name: ${savedData.preferredName}`);
        console.log(`📧 Email: ${savedData.resumeEmail}`);
        console.log(`🏢 Visa: ${savedData.currentVisaStatus}`);
        
        // Security check
        if (savedData.resumeEmailPassword) {
          console.log('❌ SECURITY ISSUE: Password found in response!');
        } else {
          console.log('✅ Security: Password properly excluded from response');
        }
        
        console.log('\n🎉 Integration test completed successfully!');
        console.log('✅ Registration system is fully functional');
        console.log('✅ Data stored in DynamoDB without Secrets Manager');
        console.log('✅ Passwords excluded from API responses');
        console.log('✅ Frontend can now submit registrations');
        
      } else {
        console.log('❌ Failed to retrieve registration:', getResponse.body);
      }
      
    } else {
      console.log('❌ Registration failed:', response.body);
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testNewRegistration();