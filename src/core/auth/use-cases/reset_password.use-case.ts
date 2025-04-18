// import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
// import { ConfigService } from "@nestjs/config";
// import { JwtService } from "@nestjs/jwt";
// import { InjectRepository } from "@nestjs/typeorm";
// import { UserEntity } from "src/core/db/entities/users.entity";
// import { MailService } from "src/core/mailer/mailer.service";
// import { Repository } from "typeorm";
// import { hashSync as bcryptHashSync } from 'bcrypt';

// @Injectable()
// export class ResetPasswordUseCase {

//   constructor(
//     @InjectRepository(UserEntity)
//     private usersRepository: Repository<UserEntity>,
//     private readonly jwtService: JwtService,
//     private readonly configService: ConfigService,
//     private readonly mailService: MailService,
//   ) { }

//   async execute(token: string, password: string, rePassword: string) {

//     if (password !== rePassword) throw new HttpException('Passwords do not match', HttpStatus.BAD_REQUEST);

//     const payload = this.jwtService.verify(token, {
//       secret: this.configService.get<string>('JWT_FORGOT_PASSWORD_SECRET'),
//     });

//     const { id, ...user } = await this.usersRepository.findOneOrFail({
//       where: { id: payload.sub }
//     });

//     user.password = bcryptHashSync(password, 10);

//     await this.usersRepository.update(id, user);

//     this.mailService.sendMail(
//       user.email,
//       'Reset de senha',
//       `<h1>Olá, ${user.name}!</h1>
//       <p>Sua senha foi redefinida com sucesso.</p>`,
//     );

//     return {
//       message: 'your password has been sucessfully changed'
//     };
//   }
// }