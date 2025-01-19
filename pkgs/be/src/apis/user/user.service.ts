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

    // Get total count and random company
    const count = await this.prisma.company.count();
    const skip = Math.floor(Math.random() * count);
    const randomCompany = await this.prisma.company.findFirst({
      skip,
      select: { name: true },
    });

    return {
      message: `Price Alert User API is running as of ${formattedDate} ${formattedTime}`,
      databaseStatus: 'Connected',
      companiesCount: count,
      randomCompanyName: randomCompany?.name || 'No companies found',
    };
  }
}
