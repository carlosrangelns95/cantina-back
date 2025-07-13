import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserEntity } from 'src/core-modules/user/entities/user.entity';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt } from 'passport-jwt';
import { Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'fallback-secret-key',
    });
  }

  async validate(payload: { sub: string; email: string; role?: any }) {
    const user = await this.usersRepository.findOne({
      where: { id: payload.sub },
      relations: ['profile'],
    });

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }


    return {
      id: user.id,
      email: user.email,
    };
  }
}
