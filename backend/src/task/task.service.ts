import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import TaskEntity from './task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
  ) {}

  async getAllTasks() {
    try {
      const data = await this.taskRepository.find({
        relations: {user: true, taskType: true},
        select: {
          user: {
            name: true,
          },
          taskType: {
            name: true,
          },
        },
      });
      if (!data || data.length === 0) {
        throw new NotFoundException('No Tasks Found');
      }
      return data;
    } catch (error) {
      return error;
    }
  }

  async getAllCompleted() {
    try {
      const data = await this.taskRepository.find({
        where: {
          status: 'C',
        },
        relations: {user: true, taskType: true},
        select: {
          user: {
            name: true,
          },
          taskType: {
            name: true,
          },
        },
      });
      if (!data || data.length === 0) {
        throw new NotFoundException('No Completed Tasks Found');
      }
      return data;
    } catch (error) {
      return error;
    }
  }

  async getAllPending() {
    try {
      const data = await this.taskRepository.find({
        where: {
          status: 'P',
        },
        relations: {user: true, taskType: true},
        select: {
          user: {
            name: true,
          },
          taskType: {
            name: true,
          },
        },
      });
      if (!data || data.length === 0) {
        throw new NotFoundException('No Pending Tasks Found');
      }
      return data;
    } catch (error) {
      return error;
    }
  }

  async getAllTaskById(id: number) {
    try {
      const data = await this.taskRepository.find({
        where: {
          id,
        },
        relations: {user: true, taskType: true},
        select: {
          user: {
            name: true,
          },
          taskType: {
            name: true,
          },
        },
      });
      if (!data || data.length === 0) {
        throw new NotFoundException('No Tasks Found by this User');
      }
      return data;
    } catch (error) {
      return error;
    }
  }

  async getAllCompletedById(id: number) {
    try {
      const data = await this.taskRepository.find({
        where: {
          status: 'C',
          id,
        },
        relations: {user: true, taskType: true},
        select: {
          user: {
            name: true,
          },
          taskType: {
            name: true,
          },
        },
      });
      if (!data || data.length === 0) {
        throw new NotFoundException('No Completed Tasks Found by this User');
      }
      return data;
    } catch (error) {
      return error;
    }
  }

  async getAllPendingById(id: number) {
    try {
      const data = await this.taskRepository.find({
        where: {
          status: 'P',
          id,
        },
        relations: {user: true, taskType: true},
        select: {
          user: {
            name: true,
          },
          taskType: {
            name: true,
          },
        },
      });
      if (!data || data.length === 0) {
        throw new NotFoundException('No Pending Tasks Found by this User');
      }
      return data;
    } catch (error) {
      return error;
    }
  }

  async addTask(body: any) {
    try {
      const newData = this.taskRepository.create({
        ...body,
        user: {
          id: body.userId,
        },
        taskType: {
          id: body.taskTypeId,
        },
      });
      const result = await this.taskRepository.save(newData);
      if (!result || result.length === 0) {
        throw new BadRequestException('Task was not saved');
      }
      return result;
    } catch (error) {}
  }

  async updateTask(id: number, body: any) {
    try {
      const found = await this.taskRepository.findOneByOrFail({id});
      if (!found || found === null) {
        throw new NotFoundException('No Task Found');
      }
      found.description = body.description
        ? body.description
        : found.description;
      found.status = body.status ? body.status : found.status;
      found.taskType = body.taskType ? body.taskType : found.taskType;
      const result = await this.taskRepository.save(found);
      if (!result) {
        throw new BadRequestException('Task was not updated');
      }
      return result;
    } catch (error) {}
  }
}
