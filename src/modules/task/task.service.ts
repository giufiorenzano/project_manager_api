import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

import { Task } from './entities/task.entity';

import { Project } from '../project/entities/project.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(userEmail: string, createTaskDto: CreateTaskDto) {
    const user = await this.userRepository.findOneByOrFail({
      email: userEmail,
    });

    const project = await this.projectRepository.findOneByOrFail({
      id: createTaskDto.projectId,
      user,
    });

    return this.tasksRepository.save({ ...createTaskDto, project, user });
  }

  async findAll(userEmail: string) {
    const user = await this.userRepository.findOneByOrFail({
      email: userEmail,
    });

    return this.tasksRepository.find({
      relations: ['project'],
      where: { user },
    });
  }

  async findOne(userEmail: string, id: number) {
    const user = await this.userRepository.findOneByOrFail({
      email: userEmail,
    });

    return this.tasksRepository.findOne({
      where: { id, user },
      relations: ['project'],
    });
  }

  async update(userEmail: string, id: number, updateTaskDto: UpdateTaskDto) {
    const user = await this.userRepository.findOneByOrFail({
      email: userEmail,
    });

    const task = await this.tasksRepository.findOneByOrFail({ id, user });

    if (!task) {
      throw new UnauthorizedException();
    }

    return this.tasksRepository.update(id, updateTaskDto);
  }

  remove(id: number) {
    return this.tasksRepository.softDelete(id);
  }
}
