import TaskTypeEntity from 'src/task-type/task-type.entity';
import UserEntity from 'src/user/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity('tbl_tasks')
export default class TaskEntity {
  @PrimaryGeneratedColumn({type: 'bigint', unsigned: true})
  id: number;

  @Column({type: 'varchar'})
  description: string;

  @Column({type: 'char', length: 1})
  status: string;

  @ManyToOne(() => UserEntity, (user) => user.tasks, {nullable: false})
  user: UserEntity;

  @ManyToOne(() => TaskTypeEntity, (tasktype) => tasktype.tasks, {
    cascade: ['insert', 'update'],
    nullable: false,
  })
  taskType: TaskTypeEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
