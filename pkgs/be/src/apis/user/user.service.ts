import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async healthCheck() {
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

    // Get total count of companies
    const count = await this.prisma.company.count();

    // Get a random company
    const randomCompany = await this.prisma.company.findFirst({
      skip: Math.floor(Math.random() * count),
    });

    // Create health check record
    const healthCheck = await this.prisma.healthCheck.create({
      data: {
        status: 'OK',
      },
    });

    return {
      message: `Price Check User API is running as of ${formattedDate} ${formattedTime}`,
      databaseStatus: 'Connected',
      randomCompanyName: randomCompany?.name || 'No companies found',
      lastCheck: healthCheck,
    };
  }
}
