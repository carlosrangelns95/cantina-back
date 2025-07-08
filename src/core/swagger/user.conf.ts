import { CreateUserDto } from "src/core-modules/user/dto/create-user.dto";
import { CreateResponseDto } from "../dto/create-response.dto";
import { ReadUserDto } from "src/core-modules/user/dto/read-user.dto";
import { UpdateUserDto } from "src/core-modules/user/dto/update-user.dto";
import { UpdateResponseDto } from "../dto/update-response.dto";

export const USER_SWAGGER_CONFIG = {
    create: {
        method: 'post' as const,
        summary: 'Create one user',
        description: 'This function creates one user',
        bodyType: CreateUserDto,
        response: [
            {
                status: 201,
                description: 'User created successfully',
                type: CreateResponseDto,
            },
        ],
    },

    getAll: {
        method: 'get' as const,
        summary: 'Find all users by filters',
        description: 'This function get all users by filters (paginated)',
        queryParams: ['page', 'name', 'email'],
        response: [
            {
                status: 200,
                description: 'Users found successfully (paginated)',
                type: ReadUserDto,
                isArray: true,
            },
        ],
    },

    getOne: {
        method: 'get' as const,
        summary: 'Find one user by filters',
        description: 'This function get all users by filters',
        response: [
            {
                status: 200,
                description: 'User found successfully',
                type: ReadUserDto,
            },
        ],
    },

    update: {
        method: 'patch' as const,
        summary: 'Update one user',
        description: 'This function update one user by id',
        bodyType: UpdateUserDto,
        response: [
            {
                status: 200,
                description: 'User updated successfully',
                type: ReadUserDto,
            },
        ],
    },

    remove: {
        method: 'delete' as const,
        summary: 'Remove one user (this funcion is not implemented yet)',
        description: 'This function remove one user by id',
        response: [
            {
                status: 200,
                description: 'User removed successfully',
                type: UpdateResponseDto,
            },
        ],
    },
};