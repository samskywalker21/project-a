import TaskEntity from 'src/task/task.entity';
import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';

@Entity('tbl_users')
export default class UserEntity {
  @PrimaryGeneratedColumn({type: 'int', unsigned: true})
  id: number;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  section: string;

  @Column()
  position: string;

  @OneToMany(() => TaskEntity, (task) => task.user)
  tasks: TaskEntity[];

  @Column({type: 'boolean', default: true})
  isActive: boolean;
}
