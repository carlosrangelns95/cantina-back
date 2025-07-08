import { LoginDto } from "../auth/dto/login.dto";

export const AUTH_SWAGGER_CONFIG = {
    login: {
        method: 'post' as const,
        summary: 'authenticates a user',
        description: 'This function authenticates one user',
        bodyType: LoginDto,
    },
};