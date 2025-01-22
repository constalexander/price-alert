import { LinearClient } from '@linear/sdk';

export class LinearService {
  private client: LinearClient;

  constructor(apiKey: string) {
    this.client = new LinearClient({ apiKey });
  }

  async getMe() {
    return await this.client.viewer;
  }

  async getIssues() {
    return await this.client.issues();
  }
}

export const createLinearClient = (apiKey: string) => {
  return new LinearService(apiKey);
};
