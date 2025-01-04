import { Module } from '@nestjs/common';

import { PrismaService } from '@/shared/env/services/prisma.service';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
})
export class UsersModule {}
