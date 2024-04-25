import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Project } from 'src/modules/project/entities/project.entity';
import { User } from 'src/modules/users/entities/user.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'status', nullable: false })
  status: TaskStatus;

  @ManyToOne(() => Project, (project) => project.tasks, {
    cascade: true,
    nullable: false,
  })
  project: Project;

  @ManyToOne(() => User, (user) => user.tasks)
  @JoinColumn()
  user: User;
}

export enum TaskStatus {
  pending = 'pending',
  completed = 'completed',
}
