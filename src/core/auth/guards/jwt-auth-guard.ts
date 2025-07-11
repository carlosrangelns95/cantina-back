import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Inject } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Request } from 'express';
import { UserEntity } from 'src/core-modules/user/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

interface JwtPayload {
    userId: string;
    email: string;
    profile: string;

}

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepo: Repository<UserEntity>,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException('Token de autenticação não fornecido.');
        }

        try {
            const secret = process.env.JWT_SECRET;
            if (!secret) {
                console.error('JWT_SECRET não está definido nas variáveis de ambiente!');
                throw new Error('Configuração de servidor inválida: chave secreta JWT ausente.');
            }

            const payload = jwt.verify(token, secret) as JwtPayload;
            const user = await this.userRepo.findOneByOrFail({ id: payload.userId });

            if (!user) {
                throw new UnauthorizedException('Usuário associado ao token não encontrado ou inativo.');
            }

            request['user'] = {
                userId: user.id,
                email: user.email,
            };

        } catch (error) {
            console.error('Erro de validação do JWT:', error.message);
            throw new UnauthorizedException('Token de autenticação inválido ou expirado.');
        }

        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}