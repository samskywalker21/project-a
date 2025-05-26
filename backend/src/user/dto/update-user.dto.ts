import {IsString, IsBoolean, IsOptional} from 'class-validator';

export default class UpdateUserDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  password: string;

  @IsString()
  @IsOptional()
  section: string;

  @IsString()
  @IsOptional()
  position: string;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;
}
