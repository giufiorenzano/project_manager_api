import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Project } from './entities/project.entity';

import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';

import { PaginationModule } from '../pagination/pagination.module';
import { User } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [ProjectController],
  imports: [PaginationModule, TypeOrmModule.forFeature([Project, User]), UsersModule],
  providers: [ProjectService],
  exports: [ProjectService]
})
export class ProjectModule {}
