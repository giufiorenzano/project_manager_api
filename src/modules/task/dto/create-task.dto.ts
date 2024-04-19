import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { TaskStatus } from '../entities/task.entity';

export class CreateTaskDto {
  @IsNotEmpty({ message: 'O nome da tarefa precisa ser definido'})
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'O status da tarefa precisa ser definido'})
  @IsEnum(TaskStatus)
  status: TaskStatus;

  projectId: number;
}
