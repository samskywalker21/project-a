import {IsString} from 'class-validator';

export default class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  section: string;

  @IsString()
  position: string;
}
