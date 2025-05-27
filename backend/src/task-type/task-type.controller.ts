import {Controller, Get, Post, Patch, Param, Body} from '@nestjs/common';
import {TaskTypeService} from './task-type.service';
import CreateTaskTypeDto from './dto/create-task-type.dto';
import UpdateTaskTypeDto from './dto/update-task-type.dto';

@Controller('task-type')
export class TaskTypeController {
  constructor(private readonly taskTypeService: TaskTypeService) {}

  @Get('all')
  async getAllTaskTypes() {
    return await this.taskTypeService.getAllTaskTypes();
  }

  @Get('id/:id')
  async getTaskTypeById(@Param('id') id: number) {
    return await this.taskTypeService.getTaskTypeById(id);
  }

  @Post('add')
  async addTaskType(@Body() body: CreateTaskTypeDto) {
    const {name} = body;
    return await this.taskTypeService.addTaskType(name);
  }

  @Patch('update/:id')
  async updateTaskType(
    @Param('id') id: number,
    @Body() body: UpdateTaskTypeDto,
  ) {
    const {name, isActive} = body;
    return await this.taskTypeService.updateTaskType(id, name, isActive);
  }
}
