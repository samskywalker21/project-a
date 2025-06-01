import {
  Controller,
  Body,
  Post,
  Get,
  BadRequestException,
  UseGuards,
  Request,
  Response,
} from '@nestjs/common';
import {AuthService} from './auth.service';
import * as crypto from 'crypto';
import LoginDto from './dto/login.dto';
import {jwtConstants} from './constants';
import {LocalAuthGuard} from './local-auth.guard';
import {JwtAuthGuard} from './jwt-auth.guard';
import {AllowAnon} from 'src/decorators/allowAnon.decorator';
import {access} from 'fs';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @AllowAnon()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async auth(@Request() req, @Response() res) {
    const token = await this.authService.jwtHandler(req.user);
    return res.status(201).json({access_token: token.access_token});
    // const token = await this.authService.jwtHandler(req.user);
    // res.cookie('accessToken', `Bearer ${token}`, {
    //   httpOnly: true,
    //   sameSite: 'Strict',
    // });
    // return res.status(200).json({message: 'Login successful', statusCode: 201});
  }

  @Get('gen-jwt-key')
  async genJwtKey() {
    if (jwtConstants.secret === null) {
      const key = await crypto.randomBytes(32).toString('hex');
      return {key};
    }
    throw new BadRequestException('JWT Secret Key Already Exists');
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
