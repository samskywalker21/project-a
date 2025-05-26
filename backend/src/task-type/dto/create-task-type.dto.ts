import {IsNotEmpty, IsString} from 'class-validator';

export default class CreateTaskTypeDto {
  @IsString({message: 'Task Type must be a string'})
  @IsNotEmpty()
  name: string;
}
