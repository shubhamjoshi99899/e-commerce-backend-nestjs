import { Controller, Get, UseGuards, Req, Post, Body } from '@nestjs/common';
import { GoogleAuthGuard } from '../guards/google.guard';
import { AuthService } from '../service/auth.service';
import { OAuth2Client } from 'google-auth-library';
import { Res } from '@nestjs/common';
import { JwtStrategy } from '../strategies/jwt.strategy';

@Controller('auth')
export class AuthController {
  private readonly oauthClient: OAuth2Client;
  constructor(
    private readonly authService: AuthService,
    private readonly jwtStrategy: JwtStrategy,
  ) {}

  @Post('login')
  async login(@Body() userDto: any, @Res({ passthrough: true }) res) {
    const { email, password } = userDto;
    const userData = await this.authService.login(email, password);
    res.cookie('userdata', userData.user, {
      sameSite: 'strict',
      httpsOnly: true,
    });
    return userData;
  }

  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  googleLogin() {
    return { message: 'google login initiated' };
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  googleRedirect(@Req() req, @Res({ passthrough: true }) res) {
    res.cookie('token', req.user.token, {
      sameSite: 'strict',
      httpsOnly: true,
    });
    res.cookie('user', req.user.user._id, {
      sameSite: 'strict',
      httpsOnly: true,
    });
    res.json({ message: 'google redirect' });
  }
}
