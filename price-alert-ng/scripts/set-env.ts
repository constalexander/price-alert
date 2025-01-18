const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config({ path: '../.env-local' });

const environmentFileContent = `export const environment = {
  production: false,
  METAL_PRICE_API_KEY: '${process.env['METAL_PRICE_API_KEY'] || ''}',
};
`;
const environmentFilePath = path.join(__dirname, '../src/environments/environment.ts');
fs.writeFileSync(environmentFilePath, environmentFileContent);

console.log('Environment file generated!');
