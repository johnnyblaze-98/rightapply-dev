const https = require('https');
const { URL } = require('url');

const API_BASE = 'https://o8pftjfy17.execute-api.us-east-1.amazonaws.com/prod';

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

async function testExistingAPI() {
  console.log('🔍 Testing Existing API Structure...');
  console.log('📍 API Endpoint:', API_BASE);
  console.log('='.repeat(60));

  try {
    // Test root endpoint
    console.log('\n📋 Testing root endpoint...');
    const rootResponse = await makeRequest(API_BASE);
    console.log(`Status: ${rootResponse.statusCode}`);
    console.log(`Response: ${rootResponse.body.substring(0, 200)}...`);

    // Test /admin/devices endpoint
    console.log('\n📋 Testing /admin/devices endpoint...');
    const devicesResponse = await makeRequest(`${API_BASE}/admin/devices`);
    console.log(`Status: ${devicesResponse.statusCode}`);
    console.log(`Response: ${devicesResponse.body.substring(0, 200)}...`);

    // Test if /registrations endpoint exists
    console.log('\n📋 Testing /registrations endpoint...');
    const registrationsResponse = await makeRequest(`${API_BASE}/registrations`);
    console.log(`Status: ${registrationsResponse.statusCode}`);
    console.log(`Response: ${registrationsResponse.body.substring(0, 200)}...`);

    // Test POST to /registrations with sample data
    console.log('\n📋 Testing POST to /registrations...');
    const testData = {
      preferredName: "Test User",
      resumeEmail: "test@example.com",
      resumePhone: "+1-555-123-4567",
      resumeEmailPassword: "testpass",
      personalPhone: "+1-555-987-6543",
      fullAddress: "123 Test St, Test City, TS 12345",
      currentVisaStatus: "H-1B Visa",
      sectors: ["Technology & Software – Google, Microsoft, Apple"],
      clients: [{
        clientName: "Test Corp",
        role: "Developer",
        startDate: "2022-01-01",
        endDate: "2023-12-31",
        clientAddress: "456 Corp Ave"
      }],
      consentApply: true,
      consentEmailAccess: true,
      legalName: "Test User Legal",
      signedDate: "2024-01-15"
    };

    const postResponse = await makeRequest(`${API_BASE}/registrations`, 'POST', testData);
    console.log(`Status: ${postResponse.statusCode}`);
    console.log(`Response: ${postResponse.body.substring(0, 300)}...`);

    console.log('\n📊 Summary:');
    console.log('   - This is a device authentication API');
    console.log('   - No registration endpoints exist yet');
    console.log('   - Need to add registration functionality to existing stack');

  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
  }
}

testExistingAPI();