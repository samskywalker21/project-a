import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import UserEntity from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async getAllUsers() {
    try {
      const data = await this.userRepository.find();
      if (!data || data.length === 0) {
        throw new NotFoundException('No Users Found');
      }
      return data;
    } catch (error) {
      return error;
    }
  }

  async getUserById(id: number) {
    try {
      const found = await this.userRepository.findOneByOrFail({id});
      if (!found) {
        throw new NotFoundException('No User Found');
      }
      return found;
    } catch (error) {
      return error;
    }
  }

  async getUserByUsername(username: string) {
    try {
      const data = await this.userRepository.findOneByOrFail({username});
      if (!data || !data.username) {
        throw new NotFoundException('No User Found');
      }
      return data;
    } catch (error) {
      return error;
    }
  }

  async addUser(body: any) {
    try {
      const {password} = body;
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      const newData = this.userRepository.create({
        ...body,
        password: hashedPassword,
      });
      const result = await this.userRepository.save(newData);
      if (!result) {
        throw new NotFoundException('User Creation Failed');
      }
      return result;
    } catch (error) {
      return error;
    }
  }

  async updateUser(id: number, body: any) {
    try {
      const found = await this.userRepository.findOneByOrFail({id});
      if (!found || !found.id) {
        throw new NotFoundException('No User Found');
      }
      found.name = body.name ? body?.name : found.name;
      found.password = body.password ? body?.password : found.password;
      found.section = body.section ? body?.section : found.section;
      found.position = body.position ? body?.position : found.position;
      found.isActive =
        body.isActive !== undefined && body.isActive !== null
          ? body?.isActive
          : found.isActive;
      const result = await this.userRepository.save(found);
      return result;
    } catch (error) {
      return error;
    }
  }
}
