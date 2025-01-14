import { config } from 'dotenv';
import { writeFileSync } from 'fs';
import { join } from 'path';

// Load environment variables from .env-local
config({ path: '.env-local' });

// Create the environment file content
const environmentFileContent = `export const environment = {
  production: false,
  METAL_PRICE_API_KEY: '${process.env['METAL_PRICE_API_KEY'] || ''}',
};
`;

// Write the environment file
writeFileSync(join(__dirname, '../src/environments/environment.ts'), environmentFileContent);

console.log('Environment file generated!');
