const API_BASE = 'https://jdxjvgs3al.execute-api.us-east-1.amazonaws.com';

async function queryBackend() {
  console.log('🔍 Querying Registration Backend...');
  console.log('📍 API Endpoint:', API_BASE);
  console.log('=' .repeat(60));

  try {
    // Query all registrations
    console.log('\n📋 Fetching all registrations...');
    const response = await fetch(`${API_BASE}/registrations?limit=10`);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${await response.text()}`);
    }

    const data = await response.json();
    
    console.log(`\n✅ Found ${data.count} registrations:`);
    console.log('=' .repeat(60));

    if (data.items && data.items.length > 0) {
      data.items.forEach((registration, index) => {
        console.log(`\n📝 Registration #${index + 1}:`);
        console.log(`   🆔 ID: ${registration.id}`);
        console.log(`   👤 Name: ${registration.preferredName || 'N/A'}`);
        console.log(`   📧 Email: ${registration.resumeEmail || 'N/A'}`);
        console.log(`   📱 Phone: ${registration.resumePhone || 'N/A'}`);
        console.log(`   🏢 Visa Status: ${registration.currentVisaStatus || 'N/A'}`);
        console.log(`   🎯 Sectors: ${registration.sectors ? registration.sectors.join(', ') : 'N/A'}`);
        console.log(`   🕒 Created: ${registration.createdAt || 'N/A'}`);
        
        if (registration.clients && registration.clients.length > 0) {
          console.log(`   💼 Clients:`);
          registration.clients.forEach((client, i) => {
            console.log(`      ${i + 1}. ${client.clientName || 'N/A'} - ${client.role || 'N/A'}`);
          });
        }
        
        // Security check
        if (registration.resumeEmailPassword) {
          console.log(`   ❌ SECURITY ISSUE: Password exposed in API response!`);
        } else {
          console.log(`   ✅ Security: Password properly hidden`);
        }
        
        console.log('   ' + '-'.repeat(50));
      });

      // Test individual registration fetch
      const firstId = data.items[0].id;
      console.log(`\n🔍 Testing individual registration fetch for ID: ${firstId}`);
      
      const individualResponse = await fetch(`${API_BASE}/registrations/${firstId}`);
      if (individualResponse.ok) {
        const individual = await individualResponse.json();
        console.log('✅ Individual fetch successful');
        console.log(`   📋 Full record contains ${Object.keys(individual).length} fields`);
        
        // Display all fields
        console.log('\n📊 Complete Registration Details:');
        Object.entries(individual).forEach(([key, value]) => {
          if (key === 'resumeEmailPassword') {
            console.log(`   ${key}: [HIDDEN FOR SECURITY]`);
          } else if (Array.isArray(value)) {
            console.log(`   ${key}: [${value.length} items] ${JSON.stringify(value)}`);
          } else if (typeof value === 'object') {
            console.log(`   ${key}: ${JSON.stringify(value)}`);
          } else {
            console.log(`   ${key}: ${value}`);
          }
        });
      }

    } else {
      console.log('\n📭 No registrations found in the database.');
      console.log('\n💡 To add test data, run: node test-registration.js');
    }

    // Test CSV export
    console.log('\n📄 Testing CSV export...');
    const csvResponse = await fetch(`${API_BASE}/registrations?format=csv&limit=5`);
    if (csvResponse.ok) {
      const csvData = await csvResponse.text();
      console.log('✅ CSV export successful');
      console.log(`📊 CSV Preview (first 200 chars):`);
      console.log(csvData.substring(0, 200) + '...');
    }

  } catch (error) {
    console.error('❌ Query failed:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('   1. Check if the stack is deployed');
    console.log('   2. Verify API endpoint is correct');
    console.log('   3. Check AWS CloudWatch logs for errors');
  }
}

// Run the query
queryBackend();