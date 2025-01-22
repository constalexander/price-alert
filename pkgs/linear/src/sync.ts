import {
  LinearClient,
  Issue,
  WorkflowState,
  IssueConnection,
  Team,
  Project,
} from '@linear/sdk';
import { SyncConfig, SyncResult, SyncState } from './types';
import * as fs from 'fs/promises';
import * as path from 'path';

export class LinearSyncService {
  private linearClient: LinearClient;
  private syncState: SyncState;
  private isInitialSync: boolean = true;

  constructor(config: SyncConfig) {
    this.linearClient = new LinearClient({ apiKey: config.linearApiKey });
    this.syncState = {
      lastSyncTimestamp: Date.now(),
    };
  }

  private async cleanDataDir(dataDir: string) {
    try {
      await fs.rm(dataDir, { recursive: true, force: true });
      console.log('Cleaned data directory');
    } catch (error) {
      console.error('Error cleaning data directory:', error);
    }
  }

  private async ensureDataDir(dataDir: string) {
    if (this.isInitialSync) {
      await this.cleanDataDir(dataDir);
    }
    await fs.mkdir(dataDir, { recursive: true });
    await fs.mkdir(path.join(dataDir, 'issues'), { recursive: true });
    await fs.mkdir(path.join(dataDir, 'projects'), { recursive: true });
    await fs.mkdir(path.join(dataDir, 'teams'), { recursive: true });
    await fs.mkdir(path.join(dataDir, 'states'), { recursive: true });
  }

  private async fetchLinearIssues(): Promise<Issue[]> {
    try {
      console.log('Fetching Linear issues...');
      const issues = (await this.linearClient.issues({
        filter: this.isInitialSync
          ? undefined
          : {
              updatedAt: {
                gt: new Date(this.syncState.lastSyncTimestamp),
              },
            },
      })) as IssueConnection;
      console.log(`Found ${issues.nodes.length} issues`);
      return issues.nodes;
    } catch (error) {
      console.error('Error fetching Linear issues:', error);
      throw error;
    }
  }

  private async fetchLinearProjects(): Promise<Project[]> {
    try {
      console.log('Fetching Linear projects...');
      const projects = await this.linearClient.projects();
      console.log(`Found ${projects.nodes.length} projects`);
      return projects.nodes;
    } catch (error) {
      console.error('Error fetching Linear projects:', error);
      throw error;
    }
  }

  private async fetchLinearTeams(): Promise<Team[]> {
    try {
      console.log('Fetching Linear teams...');
      const teams = await this.linearClient.teams();
      console.log(`Found ${teams.nodes.length} teams`);
      return teams.nodes;
    } catch (error) {
      console.error('Error fetching Linear teams:', error);
      throw error;
    }
  }

  private async fetchLinearStates(): Promise<WorkflowState[]> {
    try {
      console.log('Fetching Linear workflow states...');
      const states = await this.linearClient.workflowStates();
      console.log(`Found ${states.nodes.length} workflow states`);
      return states.nodes;
    } catch (error) {
      console.error('Error fetching Linear workflow states:', error);
      throw error;
    }
  }

  private async saveData(
    dataDir: string,
    type: string,
    id: string,
    data: unknown,
  ) {
    let filename = `${id}.json`;
    if (type === 'issues' && 'identifier' in (data as Issue)) {
      filename = `${(data as Issue).identifier}-${id}.json`;
    }
    const filePath = path.join(dataDir, type, filename);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  }

  public async sync(dataDir: string): Promise<SyncResult> {
    try {
      const now = new Date().toISOString();
      console.log(
        `[${now}] Starting ${this.isInitialSync ? 'initial' : 'incremental'} sync...`,
      );

      // Clean and recreate data directory
      await this.ensureDataDir(dataDir);

      // Fetch all data
      const [issues, projects, teams, states] = await Promise.all([
        this.fetchLinearIssues(),
        this.fetchLinearProjects(),
        this.fetchLinearTeams(),
        this.fetchLinearStates(),
      ]);

      // Save issues
      for (const issue of issues) {
        await this.saveData(dataDir, 'issues', issue.id, issue);
      }

      // Save projects
      for (const project of projects) {
        await this.saveData(dataDir, 'projects', project.id, project);
      }

      // Save teams
      for (const team of teams) {
        await this.saveData(dataDir, 'teams', team.id, team);
      }

      // Save workflow states
      for (const state of states) {
        await this.saveData(dataDir, 'states', state.id, state);
      }

      this.syncState.lastSyncTimestamp = Date.now();
      this.isInitialSync = false;

      console.log(
        `Sync completed. Saved ${issues.length} issues, ${projects.length} projects, ${teams.length} teams, and ${states.length} states.`,
      );
      return {
        success: true,
        syncedIssues: issues.length,
        syncedProjects: projects.length,
        timestamp: this.syncState.lastSyncTimestamp,
      };
    } catch (error) {
      console.error('Sync failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
        timestamp: Date.now(),
      };
    }
  }

  public async startSync(
    dataDir: string,
    interval: number = 5000,
  ): Promise<void> {
    try {
      // Initial sync
      await this.sync(dataDir);

      setInterval(async () => {
        await this.sync(dataDir);
      }, interval);
    } catch (error) {
      console.error('Error in sync process:', error);
      throw error;
    }
  }
}
