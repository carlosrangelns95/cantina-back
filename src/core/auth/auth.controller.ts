import { Controller, Post, Body, Headers, HttpException, HttpStatus, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthResponseDto } from 'src/core/auth/dto/AuthResponse.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Faz login' })
  login(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
    return this.authService.login(loginDto);
  }

 @Get('/me')
  async me(@Headers('authorization') authorizationHeader: string) {
    if (!authorizationHeader) {
      throw new HttpException('Token de autenticação não fornecido.', HttpStatus.UNAUTHORIZED);
    }

    const [bearer, token] = authorizationHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      throw new HttpException('Formato do token inválido.', HttpStatus.UNAUTHORIZED);
    }

    return this.authService.me(token);
  }
}
