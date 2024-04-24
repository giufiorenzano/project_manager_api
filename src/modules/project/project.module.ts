import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Project } from './entities/project.entity';

import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';

import { PaginationModule } from '../pagination/pagination.module';

@Module({
  controllers: [ProjectController],
  imports: [PaginationModule, TypeOrmModule.forFeature([Project])],
  providers: [ProjectService],
})
export class ProjectModule {}
