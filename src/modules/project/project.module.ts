import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';

@Module({
  controllers: [ProjectController],
  imports: [TypeOrmModule.forFeature([Project])],
  providers: [ProjectService],
})
export class ProjectModule {}
