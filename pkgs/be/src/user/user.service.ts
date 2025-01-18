import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  healthCheck(): string {
    const date = new Date();
    const formattedDate = date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    const formattedTime = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
    return `Price Check User API is running as of ${formattedDate} ${formattedTime}`;
  }
}
