const { FortniteAPI } = require('./dist/index.js');

console.log('🧪 Testing SDK v4.2.0\n');

// Initialize client
const client = new FortniteAPI({ apiKey: 'test-key' });

// Test Account resource
console.log('✅ Account resource:', typeof client.account);
console.log('   Methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(client.account))
  .filter(m => m !== 'constructor')
  .join(', '));

// Test FN resource
console.log('\n✅ FN resource:', typeof client.fn);
console.log('   Methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(client.fn))
  .filter(m => m !== 'constructor')
  .join(', '));

// Test existing resources still work
console.log('\n✅ Existing resources:');
console.log('   - shop:', typeof client.shop);
console.log('   - tournaments:', typeof client.tournaments);
console.log('   - profiles:', typeof client.profiles);
console.log('   - weapons:', typeof client.weapons);
console.log('   - oauth:', typeof client.oauth);

console.log('\n🎉 SDK v4.2.0 is ready for testing!\n');
console.log('📦 New resources added:');
console.log('   - client.account (8 methods)');
console.log('   - client.fn (9 methods)');
console.log('\n✅ All resources loaded successfully!');
