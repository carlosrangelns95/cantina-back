import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly configService: ConfigService,
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async findUserById(id: number) {
    return await this.usersService.findOne(id);
  }

  login(user: { id: number; email: string }) {
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload, {
        expiresIn: this.configService.get('JWT_EXPIRATION_TIME'),
      }),
    };
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
      role: user.profile,
    };

    return {
      token: this.jwtService.sign(payload),
      expiresIn: this.configService.get('JWT_EXPIRATION_TIME')!,
    };
  }
}
