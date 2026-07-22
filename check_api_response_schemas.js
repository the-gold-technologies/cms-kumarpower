const http = require('http');

const API_BASE = 'http://localhost:3000';

function getAPI(endpoint) {
  return new Promise((resolve, reject) => {
    http.get(`${API_BASE}${endpoint}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve({ raw: data });
        }
      });
    }).on('error', reject);
  });
}

async function checkResponses() {
  console.log('--- CHECKING API RESPONSES FOR CMS FIELDS ---');
  const endpoints = [
    '/api/home',
    '/api/our-profile',
    '/api/certifications',
    '/api/products',
    '/api/kirloskar-diesel-generator',
    '/api/kirloskar-gas-generator',
    '/api/kirloskar-portable-generator',
    '/api/optiprime',
    '/api/panels',
    '/api/servo-stabilizer',
    '/api/transformers',
    '/api/our-clients',
    '/api/photo-gallery',
    '/api/testimonials',
    '/api/annual-maintenance',
    '/api/installation',
    '/api/repair-overhaul',
    '/api/emergency-support'
  ];

  for (const ep of endpoints) {
    try {
      const res = await getAPI(ep);
      if (res.success && res.data) {
        const keys = Object.keys(res.data);
        console.log(`✅ ${ep.padEnd(35)} -> Keys: [${keys.join(', ')}]`);
      } else {
        console.log(`⚠️ ${ep.padEnd(35)} -> Response:`, res);
      }
    } catch (err) {
      console.error(`❌ ${ep} error:`, err.message);
    }
  }
}

checkResponses();
