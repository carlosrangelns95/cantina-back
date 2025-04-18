// import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { AuthResponseDto } from './dto/auth.dto';
// import { LoginDto } from './dto/login.dto';
// import { ApiBody } from '@nestjs/swagger';

// @Controller('auth')
// export class AuthController {
//   constructor(private readonly authService: AuthService) { }

//   @Post('login')
//   @HttpCode(HttpStatus.OK)
//   @ApiBody({ type: LoginDto })
//   async signIn(@Body('username') login: LoginDto): Promise<AuthResponseDto> {
//     return this.authService.signIn(login);
//   }

//   @HttpCode(HttpStatus.OK)
//   @Post('password/forgot')
//   async forgotPassword(@Body('email') email: string): Promise<{ message: string }> {
//     return this.authService.forgotPassword(email);
//   }

//   @HttpCode(HttpStatus.OK)
//   @Post('reset-password')
//   async resetPassword(
//     @Body('token') token: string,
//     @Body('password') password: string,
//     @Body('rePassword') rePassword: string): Promise<{ message: string }> {
//     return this.authService.resetPassword(token, password, rePassword);
//   }

// }