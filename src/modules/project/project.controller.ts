import {
  CACHE_MANAGER,
  CacheInterceptor,
  CacheTTL,
} from '@nestjs/cache-manager';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  Inject,
  Req,
} from '@nestjs/common';

import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

import { ProjectService } from './project.service';

import { FilterDto } from '../pagination/dto/filter.dto';
import { Cache } from 'cache-manager';

@Controller('project')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Post()
  create(@Req() request, @Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(request.user?.username, createProjectDto);
  }

  @Get()
  findAll(@Req() request, @Query() filter?: FilterDto) {
    return this.projectService.findAllPaginated(request.user?.username, filter);
  }

  @Get(':id')
  findOne(@Req() request, @Param('id') id: string) {
    return this.projectService.findOne(request.user?.username, +id);
  }

  @Patch(':id')
  update(
    @Req() request,
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectService.update(
      request.user?.username,
      +id,
      updateProjectDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(+id);
  }
}
