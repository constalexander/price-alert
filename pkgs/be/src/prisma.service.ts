import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load environment variables from root .env-local
const envPath = path.resolve(__dirname, '../../../.env-local');
dotenv.config({ path: envPath });

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
