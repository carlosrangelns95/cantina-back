// import { Module } from '@nestjs/common';
// import { AuthController } from './auth.controller';
// import { AuthService } from './auth.service';
// import { UsersModule } from '../modules/users/users.module';
// import { JwtModule } from '@nestjs/jwt';
// import { RequestPasswordResetUseCase } from './use-cases/request_password_reset.use-case';
// import { UserEntity } from 'src/core/db/entities/users.entity';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { MailService } from 'src/core/mailer/mailer.service';
// import { ResetPasswordUseCase } from './use-cases/reset_password.use-case';
// import { ConfigService } from '@nestjs/config';

// @Module({
//   imports: [
//     JwtModule.registerAsync({
//       global: true,
//       imports: [],
//       useFactory: async (configService: ConfigService) => ({
//         secret: configService.get<string>('JWT_SECRET'),
//         signOptions: {
//           expiresIn: +configService.get<number>('JWT_EXPIRATION_TIME')!,
//         },
//       }),
//       inject: [ConfigService],
//     }),
//     TypeOrmModule.forFeature([UserEntity]),
//     UsersModule,
//   ],
//   controllers: [AuthController],
//   providers: [AuthService, MailService, RequestPasswordResetUseCase, ResetPasswordUseCase],
// })
// export class AuthModule { }
