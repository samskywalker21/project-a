import {Module} from '@nestjs/common';
import {TaskTypeService} from './task-type.service';
import {TaskTypeController} from './task-type.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import TaskTypeEntity from './task-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskTypeEntity])],
  controllers: [TaskTypeController],
  providers: [TaskTypeService],
})
export class TaskTypeModule {}
