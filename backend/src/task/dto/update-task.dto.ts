import {IsString, IsNumber, IsOptional} from 'class-validator';

export default class UpdateTaskDto {
  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  status: string;

  @IsNumber({allowNaN: false})
  @IsOptional()
  taskTypeId: number;
}
