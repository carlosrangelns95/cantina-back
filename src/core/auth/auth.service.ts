import { HttpException, HttpStatus, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from 'src/core-modules/user/user.service';
import { UserEntity } from 'src/core-modules/user/entities/user.entity';
import { AuthResponseDto } from 'src/core/auth/dto/AuthResponse.dto';
import { LoginDto } from 'src/core/auth/dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  logger = new Logger();
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly configService: ConfigService,
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  async findUserById(id: string) {
    return await this.usersService.findOne(id);
  }

  async validateUser(data: LoginDto): Promise<AuthResponseDto> {
    const { email, password } = data;

    const user = await this.usersRepository.findOneOrFail({
      where: { email },
      relations: ['profile', 'profile.admin'],
    });

    if (!(await bcrypt.compare(password, user.password_crypt)))
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.profiles,
    };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  async login(data: LoginDto): Promise<AuthResponseDto> {
    const { email, password } = data;
    const user = await this.usersRepository.findOneOrFail({
      where: { email },
      relations: ['profiles'],
    });

    this.logger.debug(`Usuário ${user.email} encontrado. Dados: ${JSON.stringify(user)}`);

    if (!(await bcrypt.compare(password, user.password_crypt)))
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);

    const payload = {
      sub: user.id,
      email: user.email,
    };

    console.log({
      expiresIn: process.env.JWT_EXPIRATION_TIME,
      secret: process.env.JWT_SECRET,
    });

    return {
      token: this.jwtService.sign(payload, {
        expiresIn: process.env.JWT_EXPIRATION_TIME,
        secret: process.env.JWT_SECRET,
      }),
    };
  }

  // refatorar essa parte depois para um guard que valida o token e anexa o user a request
  async me(accessToken: string) {
    try {
      const payload = this.jwtService.verify(accessToken, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      this.logger.debug(`Dados do token descriptografado:  ${JSON.stringify(payload)}`);

      // 2. Com o payload validado, busque o usuário
      return await this.usersRepository.findOneOrFail({
        where: { id: payload.sub },
        relations: ['profiles'],
      });
    } catch (error) {
      // 3. **Tratamento de erros para o JWT**
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token de acesso expirado.');
      }
      if (error.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('Token de acesso inválido.');
      }
      // Se não for um erro de JWT, relance o erro original
      throw new HttpException('Erro ao buscar dados do usuário.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
