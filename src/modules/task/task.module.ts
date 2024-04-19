import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Task } from './entities/task.entity';

import { TaskController } from './task.controller';
import { TaskService } from './task.service';

import { Project } from '../project/entities/project.entity';

@Module({
  controllers: [TaskController],
  imports: [TypeOrmModule.forFeature([Task, Project])],
  providers: [TaskService],
})
export class TaskModule {}
