import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import {UserService} from 'src/user/user.service';
import {JwtService} from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async auth(username: string, password: string) {
    const user = await this.userService.getUserByUsername(username);
    if (!user.username) {
      return null;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return null;
    }
    return {username: user.username, id: user.id};
  }

  async jwtHandler(user: {username: string; id: number}) {
    const payload = {username: user.username, sub: user.id};
    const access_token = await this.jwtService
      .signAsync(payload)
      .catch((error) => {
        throw new BadRequestException(
          'Error generating JWT Token. ' +
            error.message +
            '. Please generate a JWT key and place it in the src/auth/constants.ts file',
        );
      });
    return {
      access_token,
    };
  }
}
