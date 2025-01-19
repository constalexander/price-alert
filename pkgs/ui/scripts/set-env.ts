const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

const envLocalFilePath = path.join(__dirname, '../../../.env-local');

dotenv.config({ path: envLocalFilePath });

const environmentFileContent = `export const environment = {
  production: false,
  METAL_PRICE_API_KEY: '${process.env['METAL_PRICE_API_KEY'] || ''}',
  API_BASE_URL: '${process.env['API_BASE_URL'] || ''}',
};
`;
const environmentFilePath = path.join(__dirname, '../src/environments/environment.ts');
fs.writeFileSync(environmentFilePath, environmentFileContent);

console.log('Environment file generated!', envLocalFilePath, environmentFilePath, environmentFileContent);
