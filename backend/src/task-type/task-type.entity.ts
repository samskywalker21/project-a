import TaskEntity from 'src/task/task.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  VersionColumn,
  OneToMany,
} from 'typeorm';

@Entity('tbl_tasktype')
export default class TaskTypeEntity {
  @PrimaryGeneratedColumn({type: 'int', unsigned: true})
  id: number;

  @Column({type: 'varchar', length: 255})
  name: string;

  @OneToMany(() => TaskEntity, (task) => task.taskType)
  tasks: TaskEntity[];

  @Column({type: 'boolean', default: true})
  isActive: boolean;

  @VersionColumn()
  version: number;
}
