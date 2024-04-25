import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Task } from './entities/task.entity';

import { TaskController } from './task.controller';
import { TaskService } from './task.service';

import { Project } from '../project/entities/project.entity';
import { User } from '../users/entities/user.entity';
import { ProjectModule } from '../project/project.module';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [TaskController],
  imports: [ProjectModule, UsersModule, TypeOrmModule.forFeature([Task, Project, User])],
  providers: [TaskService],
})
export class TaskModule {}
