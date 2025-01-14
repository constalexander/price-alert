const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

// Load environment variables from .env-local
dotenv.config({ path: '.env-local' });

// Create the environment file content
const environmentFileContent = `export const environment = {
  production: false,
  METAL_PRICE_API_KEY: '${process.env['METAL_PRICE_API_KEY'] || ''}',
};
`;

// Write the environment file
fs.writeFileSync(path.join(__dirname, '../src/environments/environment.ts'), environmentFileContent);

console.log('Environment file generated!');
