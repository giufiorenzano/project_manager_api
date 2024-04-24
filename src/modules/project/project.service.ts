import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

import { Project } from './entities/project.entity';

import { DEFAULT_PAGE_SIZE, FilterDto } from '../pagination/dto/filter.dto';
import { PaginationService } from '../pagination/pagination.service';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    private readonly paginationService: PaginationService,
  ) {}

  create(createProjectDto: CreateProjectDto) {
    return this.projectRepository.save(createProjectDto);
  }

  findAll() {
    return this.projectRepository.find();
  }

  findAllPaginated(filter?: FilterDto) {
    if (!filter) {
      return this.findAll();
    }

    return this.paginationService.paginate<Project>(
      this.projectRepository,
      filter,
    );
  }

  findOne(id: number) {
    return this.projectRepository.findOne({
      where: { id },
      relations: ['tasks'],
    });

    /* another way:
    return this.projectRepository.findBy({ id }); */
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return this.projectRepository.update(id, updateProjectDto);
  }

  remove(id: number) {
    return this.projectRepository.delete(id);

    /* soft delete:
    return this.projectRepository.softDelete(id); */
  }
}
