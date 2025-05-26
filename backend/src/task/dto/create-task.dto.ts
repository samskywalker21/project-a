import {IsString, IsNumber} from 'class-validator';

export default class CreateTaskDto {
  @IsString()
  description: string;

  @IsString()
  status: string;

  @IsNumber({allowNaN: false})
  userId: number;

  @IsNumber({allowNaN: false})
  taskTypeId: number;
}
