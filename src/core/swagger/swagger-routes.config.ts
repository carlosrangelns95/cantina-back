import { CreateAdminDto } from "src/core-modules/admin/dto/create-admin.dto";
import { CreateProfileDto } from "../../core-modules/profile/dto/create-profile.dto";
import { CreateUserDto } from "../../core-modules/user/dto/create-user.dto";
import { UpdateUserDto } from "../../core-modules/user/dto/update-user.dto";
import { ReadUserDto } from "../../core-modules/user/dto/read-user.dto";
import { CreateResponseDto } from "../dto/create-response.dto";
import { UpdateResponseDto } from "../dto/update-response.dto";
import { ReadProfileDto } from "src/core-modules/profile/dto/read-profile.dto";
import { UpdateProfileDto } from "src/core-modules/profile/dto/update-profile.dto";
import { FilterProfileDto } from "src/core-modules/profile/dto/filter-profile.dto";

export const SWAGGER_API_ROUTES = {

  users: {
    create: {
      method: 'post' as const,
      summary: 'Create one user',
      description: 'This function creates one user',
      bodyType: CreateUserDto,
      response: [
        { status: 201, description: 'User created successfully', type: CreateResponseDto },
      ]
    },

    getAll: {
      method: 'get' as const,
      summary: 'Find all users by filters',
      description: 'This function get all users by filters (paginated)',
      queryParams: ['page', 'name', 'email'],
      response: [
        { status: 200, description: 'Users found successfully (paginated)', type: ReadUserDto, isArray: true },
      ]
    },

    getOne: {
      method: 'get' as const,
      summary: 'Find one user by filters',
      description: 'This function get all users by filters',
      response: [
        { status: 200, description: 'User found successfully', type: ReadUserDto },
      ]
    },

    update: {
      method: 'patch' as const,
      summary: 'Update one user',
      description: 'This function update one user by id',
      bodyType: UpdateUserDto,
      response: [
        { status: 200, description: 'User updated successfully', type: ReadUserDto },
      ]
    },

    remove: {
      method: 'delete' as const,
      summary: 'Remove one user (this funcion is not implemented yet)',
      description: 'This function remove one user by id',
      response: [
        { status: 200, description: 'User removed successfully', type: UpdateResponseDto },
      ]
    }
  },

  profiles: {
    create: {
      method: 'post' as const,
      summary: 'Create one profile',
      description: 'This function creates one profile',
      bodyType: CreateProfileDto,
      response: [
        { status: 201, description: 'Profile created successfully', type: CreateResponseDto },
      ]
    },

    getAll: {
      method: 'get' as const,
      summary: 'Find all profiles by filters',
      bodyType: FilterProfileDto,
      description: 'This function get all profiles by filters (paginated)',
      queryParams: ['page', 'role', 'description', 'user_id'],
      response: [
        { status: 200, description: 'Profiles found successfully (paginated)', type: ReadProfileDto, isArray: true },
      ]
    },

    getOne: {
      method: 'get' as const,
      summary: 'Find one profile by filters',
      description: 'This function get all profiles by filters',
      response: [
        { status: 200, description: 'Profile found successfully', type: ReadProfileDto },
      ]
    },

    update: {
      method: 'patch' as const,
      summary: 'Update one profile',
      description: 'This function update one profile by id',
      bodyType: UpdateProfileDto,
      response: [
        { status: 200, description: 'Profile updated successfully', type: UpdateResponseDto },
      ]
    },

    remove: {
      method: 'delete' as const,
      summary: 'Remove one profile (this funcion is not implemented yet)',
      description: 'This function remove one profile by id',
      response: [
        { status: 200, description: 'Profile removed successfully', type: UpdateResponseDto },
      ]
    }
  },

  admin: {
    create: {
      method: 'post' as const,
      summary: 'Create one admin',
      description: 'This function creates one admin',
      bodyType: CreateAdminDto,
      response: [
        { status: 201, description: 'Admin created successfully', type: CreateAdminDto },
      ]
    },
  },

}