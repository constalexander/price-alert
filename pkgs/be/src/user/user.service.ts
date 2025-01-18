import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  healthCheck(): string {
    return `Price Check User API is running as of ${new Date().toISOString()}`;
  }
}
