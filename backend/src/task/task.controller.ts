import {Controller, Get, Post, Patch, Param, Body} from '@nestjs/common';
import {TaskService} from './task.service';
import CreateTaskDto from './dto/create-task.dto';
import UpdateTaskDto from './dto/update-task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('all')
  async getAllTasks() {
    return await this.taskService.getAllTasks();
  }

  @Get('all/completed')
  async getAllCompleted() {
    return await this.taskService.getAllCompleted();
  }

  @Get('all/pending')
  async getAllPending() {
    return await this.taskService.getAllPending();
  }

  @Get('id/:id')
  async getAllTaskById(@Param('id') id: number) {
    return await this.taskService.getAllTaskById(id);
  }

  @Get('all/completed/:id')
  async getAllCompletedById(@Param('id') id: number) {
    return await this.taskService.getAllCompletedById(id);
  }

  @Get('all/pending/:id')
  async getAllPendingById(@Param('id') id: number) {
    return await this.taskService.getAllPendingById(id);
  }

  @Post('add')
  async addTask(@Body() body: CreateTaskDto) {
    return await this.taskService.addTask(body);
  }

  @Patch('update/:id')
  async updateTask(@Param('id') id: number, @Body() body: UpdateTaskDto) {
    return await this.taskService.updateTask(id, body);
  }
}
