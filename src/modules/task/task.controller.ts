import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Req() request, @Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(request.user.userEmail, createTaskDto);
  }

  @Get()
  findAll(@Req() request) {
    return this.taskService.findAll(request.user?.username);
  }

  @Get(':id')
  findOne(@Req() request, @Param('id') id: string) {
    return this.taskService.findOne(request.user?.username, +id);
  }

  @Patch(':id')
  update(
    @Req() request,
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.taskService.update(request.user?.username, +id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }
}
