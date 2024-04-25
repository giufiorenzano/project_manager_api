import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

import { Project } from './entities/project.entity';

import { DEFAULT_PAGE_SIZE, FilterDto } from '../pagination/dto/filter.dto';
import { PaginationService } from '../pagination/pagination.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    private readonly paginationService: PaginationService,
    private readonly userService: UsersService,
  ) {}

  async create(userEmail: string, createProjectDto: CreateProjectDto) {
    const user = await this.userService.findOneOrFail({
      email: userEmail,
    });

    return this.projectRepository.save({
      ...createProjectDto,
      user,
    });
  }

  async findAll(userEmail: string) {
    const user = await this.userService.findOneBy({
      email: userEmail,
    });

    return this.projectRepository.find({ where: { user } });
  }

  async findAllPaginated(userEmail: string, filter?: FilterDto) {
    if (!filter) {
      return this.findAll(userEmail);
    }

    const user = await this.userService.findOneBy({
      email: userEmail,
    });

    return this.paginationService.paginate<Project>(
      this.projectRepository,
      {
        page: filter.page,
        pageSize: DEFAULT_PAGE_SIZE,
      },
      { user },
    );
  }

  async findOne(userEmail: string, id: number) {
    const user = await this.userService.findOneBy({
      email: userEmail,
    });

    return this.projectRepository.findOne({
      where: { id, user },
      relations: { tasks: true },
    });
  }

  async update(
    userEmail: string,
    id: number,
    updateProjectDto: UpdateProjectDto,
  ) {
    const user = await this.userService.findOneBy({
      email: userEmail,
    });
    const project = this.findOne(user.email, id);

    if (!project) {
      throw new NotFoundException();
    }

    return this.projectRepository.update(id, updateProjectDto);
  }

  async remove(id: number) {
    return this.projectRepository.softDelete(id);
  }
}
