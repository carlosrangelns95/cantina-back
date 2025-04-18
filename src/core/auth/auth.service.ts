// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { AuthResponseDto } from './dto/auth.dto';
// import { compareSync as bcryptCompareSync } from 'bcrypt';
// import { JwtService } from '@nestjs/jwt';
// import { RequestPasswordResetUseCase } from './use-cases/request_password_reset.use-case';
// import { MailService } from 'src/core/mailer/mailer.service';
// import { ResetPasswordUseCase } from './use-cases/reset_password.use-case';
// import { UserEntity } from 'src/core/db/entities/users.entity';
// import { Repository } from 'typeorm';
// import { InjectRepository } from '@nestjs/typeorm';
// import { LoginDto } from './dto/login.dto';

// @Injectable()
// export class AuthService {

//   constructor(
//     @InjectRepository(UserEntity)
//     private usersRepository: Repository<UserEntity>,
//     private readonly jwtService: JwtService,
//     private readonly configService: ConfigService,
//     private readonly mailService: MailService,

//     private readonly requestPasswordResetUseCase: RequestPasswordResetUseCase,
//     private readonly resetPasswordUseCase: ResetPasswordUseCase,
//   ) { }

//   async signIn(login: LoginDto): Promise<AuthResponseDto> {

//     const foundUser = await this.usersRepository.findOneByOrFail({
//       email: login.email
//     });

//     if (!bcryptCompareSync(login.password, foundUser.password)) throw new UnauthorizedException();

//     const payload = {
//       sub: foundUser.id,
//       email: foundUser.email
//     };

//     const token = this.jwtService.sign(payload);

//     return {
//       token,
//       expiresIn: +this.configService.get<number>('JWT_EXPIRATION_TIME')!
//     };
//   }

//   async forgotPassword(email: string) {
//     return this.requestPasswordResetUseCase.execute(email);
//   }

//   async sendResetPasswordEmail(email: string, token: string) {
//     return this.mailService.sendMail(
//       email,
//       'Teste de Email',
//       '<h1>Olá!</h1><p>Este é um e-mail de teste.</p>',
//     );
//   }

//   async resetPassword(token: string, password: string, rePassword: string) {
//     return this.resetPasswordUseCase.execute(token, password, rePassword);
//   }
// }
