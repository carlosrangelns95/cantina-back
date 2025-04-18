// import { Injectable } from "@nestjs/common";
// import { ConfigService } from "@nestjs/config";
// import { JwtService } from "@nestjs/jwt";
// import { InjectRepository } from "@nestjs/typeorm";
// import { UserEntity } from "src/core/db/entities/users.entity";
// import { MailService } from "src/core/mailer/mailer.service";
// import { Repository } from "typeorm";

// @Injectable()
// export class RequestPasswordResetUseCase {

//   private jwtForgotPassword: number;
//   private jwtForgotPasswordSecret: string;

//   constructor(
//     @InjectRepository(UserEntity)
//     private usersRepository: Repository<UserEntity>,
//     private readonly jwtService: JwtService,
//     private readonly configService: ConfigService,
//     private readonly mailService: MailService,
//   ) {
//     this.jwtForgotPassword = +this.configService.get<number>('JWT_FORGOT_PASSWORD_EXPIRATION_TIME')!;
//     this.jwtForgotPasswordSecret = this.configService.get<string>('JWT_FORGOT_PASSWORD_SECRET')!;
//   }

//   async execute(email: string) {
//     const user = await this.usersRepository.findOneOrFail({ where: { email } });

//     const payload = {
//       sub: user.id,
//       email: user.email,
//       role: user.role,
//     };

//     const token = this.jwtService.sign(payload, {
//       secret: this.jwtForgotPasswordSecret,
//       expiresIn: this.jwtForgotPassword
//     });

//     console.log(token)

//     const info = this.mailService.sendMail(
//       email,
//       'Reset de senha',
//       `<h1>Olá, ${user.name}!</h1>
//       <p>Clique no link abaixo para redefinir sua senha:</p>
//       <a href="https://seudominio.com/resetar-senha/${token}">Redefinir Senha</a>
//       <p>Se você não solicitou essa redefinição de senha, por favor ignore este e-mail.</p>`,
//     );

//     return {
//       message: 'email sent successfully'
//     };
//   }

// }