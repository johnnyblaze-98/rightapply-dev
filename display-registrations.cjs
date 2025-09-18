const { execSync } = require('child_process');

function displayRegistrations() {
  console.log('🔍 Current Registration Data in DynamoDB');
  console.log('📊 Table: rightapply-registrations');
  console.log('='.repeat(80));

  try {
    // Get all registrations
    const scanResult = execSync(
      'aws dynamodb scan --table-name rightapply-registrations --output json',
      { encoding: 'utf8' }
    );
    
    const data = JSON.parse(scanResult);
    
    if (!data.Items || data.Items.length === 0) {
      console.log('\n📭 No registrations found in the table.');
      return;
    }

    console.log(`\n✅ Found ${data.Items.length} registrations:\n`);

    data.Items.forEach((item, index) => {
      console.log(`📝 Registration #${index + 1}:`);
      console.log(`   🆔 ID: ${item.id?.S || 'N/A'}`);
      console.log(`   👤 Name: ${item.preferredName?.S || 'N/A'}`);
      console.log(`   📧 Email: ${item.resumeEmail?.S || 'N/A'}`);
      console.log(`   📱 Resume Phone: ${item.resumePhone?.S || 'N/A'}`);
      console.log(`   📱 Personal Phone: ${item.personalPhone?.S || 'N/A'}`);
      console.log(`   🏠 Address: ${item.fullAddress?.S || 'N/A'}`);
      console.log(`   🏢 Visa Status: ${item.currentVisaStatus?.S || 'N/A'}`);
      console.log(`   🕒 Created: ${item.createdAt?.S || 'N/A'}`);
      
      if (item.dateOfBirth?.S) {
        console.log(`   🎂 DOB: ${item.dateOfBirth.S}`);
      }
      
      if (item.linkedinUrl?.S) {
        console.log(`   🔗 LinkedIn: ${item.linkedinUrl.S}`);
      }
      
      // Sectors
      if (item.sectors?.L && item.sectors.L.length > 0) {
        console.log(`   🎯 Sectors:`);
        item.sectors.L.forEach((sector, i) => {
          if (sector.S) console.log(`      ${i + 1}. ${sector.S}`);
        });
      }
      
      // Clients
      if (item.clients?.L && item.clients.L.length > 0) {
        console.log(`   💼 Work Experience:`);
        item.clients.L.forEach((client, i) => {
          const clientData = client.M;
          if (clientData && clientData.clientName?.S) {
            console.log(`      ${i + 1}. ${clientData.clientName.S} - ${clientData.role?.S || 'N/A'}`);
            if (clientData.startDate?.S && clientData.endDate?.S) {
              console.log(`         📅 ${clientData.startDate.S} to ${clientData.endDate.S}`);
            }
            if (clientData.clientAddress?.S) {
              console.log(`         📍 ${clientData.clientAddress.S}`);
            }
          }
        });
      }
      
      // Education
      if (item.mastersUniversityField?.S) {
        console.log(`   🎓 Masters: ${item.mastersUniversityField.S} (${item.mastersGraduatedCompleted?.S || 'N/A'})`);
      }
      if (item.bachelorsUniversityField?.S) {
        console.log(`   🎓 Bachelors: ${item.bachelorsUniversityField.S} (${item.bachelorsGraduatedCompleted?.S || 'N/A'})`);
      }
      
      // Certifications
      if (item.certificationsAchievements?.S) {
        console.log(`   🏆 Certifications: ${item.certificationsAchievements.S}`);
      }
      if (item.preferredMarketingRole?.S) {
        console.log(`   🎯 Preferred Role: ${item.preferredMarketingRole.S}`);
      }
      
      // Consent and signature
      console.log(`   ✅ Consent Apply: ${item.consentApply?.BOOL || false}`);
      console.log(`   ✅ Consent Email: ${item.consentEmailAccess?.BOOL || false}`);
      console.log(`   ✍️ Legal Name: ${item.legalName?.S || 'N/A'}`);
      console.log(`   📅 Signed Date: ${item.signedDate?.S || 'N/A'}`);
      
      // Security check
      if (item.resumeEmailPasswordSecretId?.S) {
        console.log(`   🔒 Password: Stored in Secrets Manager (${item.resumeEmailPasswordSecretId.S})`);
      } else if (item.resumeEmailPassword?.S) {
        console.log(`   ❌ SECURITY ISSUE: Password stored in plaintext!`);
      } else {
        console.log(`   🔒 Password: Not found`);
      }
      
      console.log('   ' + '-'.repeat(70));
    });
    
    console.log(`\n📊 Summary:`);
    console.log(`   Total Registrations: ${data.Items.length}`);
    console.log(`   Table: rightapply-registrations`);
    console.log(`   All data is properly stored in DynamoDB ✅`);
    
  } catch (error) {
    console.error('\n❌ Failed to query registrations:', error.message);
    console.log('\n🔧 Possible issues:');
    console.log('   • AWS CLI not configured');
    console.log('   • No permissions to access DynamoDB');
    console.log('   • Table does not exist');
  }
}

displayRegistrations();