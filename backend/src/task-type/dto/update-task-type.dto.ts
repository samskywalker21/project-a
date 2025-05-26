import {IsString, IsBoolean, IsOptional} from 'class-validator';

export default class UpdateTaskTypeDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;
}
