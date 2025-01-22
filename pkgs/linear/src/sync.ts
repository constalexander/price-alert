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
    this.ensureDataDir(config.dataDir);
  }

  private async ensureDataDir(dataDir: string) {
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
    const filePath = path.join(dataDir, type, `${id}.json`);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  }

  public async sync(dataDir: string): Promise<SyncResult> {
    try {
      console.log(
        `Starting ${this.isInitialSync ? 'initial' : 'incremental'} sync...`,
      );

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
    interval: number = 300000,
  ): Promise<void> {
    try {
      // Initial sync
      await this.sync(dataDir);

      // Sync every 5 minutes by default
      setInterval(async () => {
        await this.sync(dataDir);
      }, interval);
    } catch (error) {
      console.error('Error in sync process:', error);
      throw error;
    }
  }
}
