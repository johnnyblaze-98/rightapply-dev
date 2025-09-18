// Simple Node.js test to verify the API works with the same configuration as frontend
import fetch from 'node-fetch';

const API_BASE = 'https://rei8kjm2yg.execute-api.us-east-1.amazonaws.com/Prod';

const testData = {
  preferredName: "Frontend Test User",
  resumeEmail: "frontendtest@example.com", 
  resumePhone: "+1234567890",
  resumeEmailPassword: "testpass123",
  personalPhone: "+1234567890",
  fullAddress: "123 Frontend Test St",
  currentVisaStatus: "H-1B Visa",
  legalName: "Frontend Test User Legal",
  signedDate: "2024-01-15",
  consentApply: true,
  consentEmailAccess: true
};

async function testFrontendAPI() {
  try {
    console.log('Testing frontend-style API call...');
    
    const response = await fetch(`${API_BASE}/registrations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin': 'http://localhost:5173'
      },
      body: JSON.stringify(testData)
    });
    
    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ SUCCESS:', data);
    } else {
      const errorText = await response.text();
      console.log('❌ FAILED:', errorText);
    }
    
  } catch (error) {
    console.error('❌ ERROR:', error.message);
  }
}

testFrontendAPI();