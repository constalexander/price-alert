import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto, LoginUserDto, AuthResponse } from './user.types';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() dto: RegisterUserDto): Promise<AuthResponse> {
    return this.userService.register(dto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() dto: LoginUserDto): Promise<AuthResponse> {
    return this.userService.login(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('refresh-token')
  async refreshToken(@Request() req) {
    const { userId, refreshToken } = req.body;
    return this.userService.refreshToken(userId, refreshToken);
  }

  @Get('health')
  async healthCheck() {
    return this.userService.healthCheck();
  }
}
