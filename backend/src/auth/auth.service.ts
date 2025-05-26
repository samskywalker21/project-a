import {Injectable, UnauthorizedException} from '@nestjs/common';
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
    if (!user || user.username.length === 0) {
      throw new UnauthorizedException('Invalid Login');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid Login');
    }

    const payload = {username: user.username, sub: user.id};
    return {
      access_token: await this.jwtService.signAsync(payload),
      name: user.name,
      position: user.position,
      section: user.section,
    };
  }
}
