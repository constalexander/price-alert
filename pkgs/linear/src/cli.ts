import { LinearSyncService } from './sync';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from root .env-local
const envPath = path.resolve(__dirname, '../../../.env-local');
dotenv.config({ path: envPath });

const dataDir = path.resolve(__dirname, '../data');
const linearApiKey = process.env.LINEAR_API_KEY;

if (!linearApiKey) {
  console.error('LINEAR_API_KEY not found in .env-local');
  process.exit(1);
}

const config = {
  linearApiKey,
  dataDir,
  syncInterval: 5000,
};

const syncService = new LinearSyncService(config);

// Start sync
syncService.startSync(dataDir, config.syncInterval).catch((error) => {
  console.error('Sync failed:', error);
  process.exit(1);
});
