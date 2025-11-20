// src/utils/testApiEndpoints.ts
export async function testApiEndpoints() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
  const endpoints = [
    '/admin/clients',
    '/admin/clients/stats'
  ];

  console.log('🔍 Testing API endpoints...');
  
  for (const endpoint of endpoints) {
    try {
      const url = `${baseUrl}${endpoint}`;
      console.log(`Testing: ${url}`);
      
      const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      console.log(`✅ ${endpoint}: ${response.status} ${response.statusText}`);
      
      if (!response.ok) {
        console.log(`❌ ${endpoint} failed: ${response.status}`);
      }
    } catch (error) {
      console.error(`❌ ${endpoint} error:`, error);
    }
  }
}