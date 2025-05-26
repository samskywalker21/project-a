import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Not, Repository} from 'typeorm';
import TaskTypeEntity from './task-type.entity';
import {error} from 'console';

@Injectable()
export class TaskTypeService {
  constructor(
    @InjectRepository(TaskTypeEntity)
    private taskTypeRepository: Repository<TaskTypeEntity>,
  ) {}

  async getAllTaskTypes() {
    try {
      const data = await this.taskTypeRepository.find();
      if (!data || data.length === 0) {
        throw new NotFoundException('No Task Types Found');
      }
    } catch (error) {
      return error;
    }
  }

  async getTaskTypeById(id: number) {
    try {
      const data = await this.taskTypeRepository.findOneBy({id});
      if (!data) {
        throw new NotFoundException('No Task Type Found');
      }
      return data;
    } catch (error) {
      return error;
    }
  }

  async addTaskType(name: string) {
    try {
      const newData = this.taskTypeRepository.create({name});
      const result = await this.taskTypeRepository.save(newData);
      if (!result || !result.id) {
        throw new BadRequestException('Task Type Creation Failed');
      }
      return result;
    } catch (error) {
      return error;
    }
  }

  async updateTaskType(id: number, name?: string, isActive?: boolean) {
    try {
      const found = await this.taskTypeRepository.findOneBy({id});
      if (!found) {
        throw new NotFoundException('No Task Type Found');
      }
      found.name = name ? name : found.name;
      found.isActive =
        isActive !== undefined && isActive !== null ? isActive : found.isActive;
      const result = await this.taskTypeRepository.save(found);
      return result;
    } catch (error) {
      return error;
    }
  }
}
