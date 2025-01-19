import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load environment variables from root .env-local
dotenv.config({ path: path.resolve(__dirname, '../../../.env-local') });

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      datasources: {
        db: {
          url: process.env.MONGODB_ATLAS_CONNECTION_STRING,
        },
      },
    });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
