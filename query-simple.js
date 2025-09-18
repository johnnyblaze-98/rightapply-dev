const https = require('https');
const { URL } = require('url');

const API_BASE = 'https://jdxjvgs3al.execute-api.us-east-1.amazonaws.com';

function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      path: urlObj.pathname + urlObj.search,
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            resolve(data); // Return raw data if not JSON
          }
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.setTimeout(10000, () => reject(new Error('Request timeout')));
    req.end();
  });
}

async function queryRegistrations() {
  console.log('🔍 Querying Registration Backend...');
  console.log('📍 API Endpoint:', API_BASE);
  console.log('='.repeat(60));

  try {
    console.log('\n📋 Fetching registrations...');
    const data = await makeRequest(`${API_BASE}/registrations?limit=10`);
    
    console.log(`\n✅ Query successful! Found ${data.count || 0} registrations`);
    
    if (data.items && data.items.length > 0) {
      console.log('\n📊 Registration Details:');
      console.log('='.repeat(60));
      
      data.items.forEach((reg, index) => {
        console.log(`\n📝 Registration #${index + 1}:`);
        console.log(`   🆔 ID: ${reg.id}`);
        console.log(`   👤 Name: ${reg.preferredName}`);
        console.log(`   📧 Email: ${reg.resumeEmail}`);
        console.log(`   📱 Resume Phone: ${reg.resumePhone}`);
        console.log(`   📱 Personal Phone: ${reg.personalPhone}`);
        console.log(`   🏠 Address: ${reg.fullAddress}`);
        console.log(`   🏢 Visa Status: ${reg.currentVisaStatus}`);
        console.log(`   🎯 Sectors: ${reg.sectors ? reg.sectors.join(', ') : 'None'}`);
        console.log(`   🕒 Created: ${reg.createdAt}`);
        
        if (reg.dateOfBirth) console.log(`   🎂 DOB: ${reg.dateOfBirth}`);
        if (reg.linkedinUrl) console.log(`   🔗 LinkedIn: ${reg.linkedinUrl}`);
        if (reg.arrivalDateUSA) console.log(`   ✈️ Arrival Date: ${reg.arrivalDateUSA}`);
        
        // Education
        if (reg.mastersUniversityField) {
          console.log(`   🎓 Masters: ${reg.mastersUniversityField} (${reg.mastersGraduatedCompleted || 'N/A'})`);
        }
        if (reg.bachelorsUniversityField) {
          console.log(`   🎓 Bachelors: ${reg.bachelorsUniversityField} (${reg.bachelorsGraduatedCompleted || 'N/A'})`);
        }
        
        // Work Experience
        if (reg.clients && reg.clients.length > 0) {
          console.log(`   💼 Work Experience:`);
          reg.clients.forEach((client, i) => {
            console.log(`      ${i + 1}. ${client.clientName} - ${client.role}`);
            console.log(`         📅 ${client.startDate} to ${client.endDate}`);
            if (client.clientAddress) console.log(`         📍 ${client.clientAddress}`);
          });
        }
        
        // Certifications
        if (reg.certificationsAchievements) {
          console.log(`   🏆 Certifications: ${reg.certificationsAchievements}`);
        }
        if (reg.preferredMarketingRole) {
          console.log(`   🎯 Preferred Role: ${reg.preferredMarketingRole}`);
        }
        
        // Consent
        console.log(`   ✅ Consent Apply: ${reg.consentApply}`);
        console.log(`   ✅ Consent Email: ${reg.consentEmailAccess}`);
        console.log(`   ✍️ Legal Name: ${reg.legalName}`);
        console.log(`   📅 Signed Date: ${reg.signedDate}`);
        
        // Security check
        if (reg.resumeEmailPassword) {
          console.log(`   ❌ SECURITY ISSUE: Password exposed!`);
        } else {
          console.log(`   🔒 Security: Password properly hidden`);
        }
        
        console.log('   ' + '-'.repeat(50));
      });
      
      console.log(`\n📊 Summary:`);
      console.log(`   Total Registrations: ${data.count}`);
      console.log(`   Scanned Count: ${data.scannedCount || 'N/A'}`);
      
    } else {
      console.log('\n📭 No registrations found.');
      console.log('💡 Run test-registration.js to add sample data');
    }
    
  } catch (error) {
    console.error('\n❌ Query failed:', error.message);
    console.log('\n🔧 Possible issues:');
    console.log('   • Stack not deployed or API endpoint incorrect');
    console.log('   • Network connectivity issues');
    console.log('   • Lambda function errors (check CloudWatch logs)');
  }
}

queryRegistrations();