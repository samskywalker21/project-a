import {Controller, Body, Post, Get, BadRequestException} from '@nestjs/common';
import {AuthService} from './auth.service';
import * as crypto from 'crypto';
import LoginDto from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async auth(@Body() body: LoginDto) {
    return this.authService.auth(body.username, body.password);
  }

  @Get('gen-jwt-key')
  async genJwtKey() {
    console.log(process.env.JWT_SECRET);
    if (process.env.JWT_SECRET.length === 0) {
      const key = await crypto.randomBytes(32).toString('hex');
      return {key};
    }
    throw new BadRequestException('JWT Secret Key Already Exists');
  }
}
