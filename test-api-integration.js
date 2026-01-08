const { FortniteAPI } = require('./dist/index.js');

// You'll need to replace this with a real API key from your database
const API_KEY = process.env.API_KEY || 'test-key';
const BASE_URL = 'https://prod.api-fortnite.com/api';

async function testSDK() {
  console.log('🧪 Testing SDK v4.2.0 - API Integration\n');
  console.log(`📡 Base URL: ${BASE_URL}`);
  console.log(`🔑 API Key: ${API_KEY.substring(0, 8)}...`);
  console.log('─'.repeat(60));

  const client = new FortniteAPI({
    apiKey: API_KEY,
    baseUrl: BASE_URL
  });

  let passed = 0;
  let failed = 0;

  // Test 1: Account lookup by display name
  console.log('\n1️⃣ Testing: client.account.getByDisplayName()');
  try {
    const account = await client.account.getByDisplayName('Ninja');
    console.log('   ✅ Success! Got account:', account.id?.substring(0, 8) + '...');
    passed++;
  } catch (error) {
    console.log('   ❌ Error:', error.message);
    failed++;
  }

  // Test 2: Get enabled features
  console.log('\n2️⃣ Testing: client.fn.getEnabledFeatures()');
  try {
    const features = await client.fn.getEnabledFeatures();
    console.log('   ✅ Success! Features:', typeof features);
    passed++;
  } catch (error) {
    console.log('   ❌ Error:', error.message);
    failed++;
  }

  // Test 3: Version check
  console.log('\n3️⃣ Testing: client.fn.checkVersion()');
  try {
    const version = await client.fn.checkVersion(
      'Windows',
      '++Fortnite+Release-30.40-CL-35235494-Windows'
    );
    console.log('   ✅ Success! Version check:', version.type || 'OK');
    passed++;
  } catch (error) {
    console.log('   ❌ Error:', error.message);
    failed++;
  }

  // Test 4: Get keychain
  console.log('\n4️⃣ Testing: client.fn.getKeychain()');
  try {
    const keychain = await client.fn.getKeychain();
    console.log('   ✅ Success! Keychain:', typeof keychain);
    passed++;
  } catch (error) {
    console.log('   ❌ Error:', error.message);
    failed++;
  }

  // Test 5: Cross-platform lookup (this might fail if account doesn't exist)
  console.log('\n5️⃣ Testing: client.account.getByExternalDisplayName()');
  try {
    const account = await client.account.getByExternalDisplayName(
      'psn',
      'TestUser',
      true // case insensitive
    );
    console.log('   ✅ Success! Found PSN account:', account.id?.substring(0, 8) + '...');
    passed++;
  } catch (error) {
    if (error.status === 404) {
      console.log('   ⚠️ Expected: Account not found (404)');
      passed++;
    } else {
      console.log('   ❌ Error:', error.message);
      failed++;
    }
  }

  // Test 6: Test weapons endpoint (existing)
  console.log('\n6️⃣ Testing: client.weapons.getWeapons() (existing)');
  try {
    const weapons = await client.weapons.getWeapons();
    console.log('   ✅ Success! Weapons:', typeof weapons);
    passed++;
  } catch (error) {
    console.log('   ❌ Error:', error.message);
    failed++;
  }

  // Summary
  console.log('\n' + '─'.repeat(60));
  console.log('\n📊 Test Summary:');
  console.log(`   ✅ Passed: ${passed}`);
  console.log(`   ❌ Failed: ${failed}`);
  console.log(`   📈 Success Rate: ${Math.round((passed / (passed + failed)) * 100)}%`);

  if (failed === 0) {
    console.log('\n🎉 All tests passed! SDK v4.2.0 is working correctly!\n');
  } else {
    console.log('\n⚠️ Some tests failed. Check your API key or endpoint availability.\n');
  }
}

// Run tests
testSDK().catch(error => {
  console.error('\n❌ Fatal error:', error.message);
  process.exit(1);
});
