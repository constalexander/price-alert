export interface SyncConfig {
  linearApiKey: string;
  dataDir: string; // Directory where we'll store Linear data
  syncInterval?: number;
}

export interface SyncState {
  lastSyncTimestamp: number;
}

export interface SyncResult {
  success: boolean;
  error?: string;
  syncedIssues?: number;
  syncedProjects?: number;
  timestamp: number;
}
