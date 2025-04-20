import { CreateAdminDto } from "src/core-modules/admin/dto/create-admin.dto";
import { CreateProfileDto } from "../../core-modules/profile/dto/create-profile.dto";
import { CreateUserDto } from "../../core-modules/user/dto/create-user.dto";
import { UpdateUserDto } from "../../core-modules/user/dto/update-user.dto";
import { ViewUserDto } from "../../core-modules/user/dto/view-user.dto";

export const SWAGGER_API_ROUTES = {

  users: {
    create: {
      method: 'post' as const,
      summary: 'Create one user',
      description: 'This function creates one user',
      bodyType: CreateUserDto,
      response: [
        { status: 201, description: 'User created successfully', type: ViewUserDto },
      ]
    },

    getAll: {
      method: 'get' as const,
      summary: 'Find all users by filters',
      description: 'This function get all users by filters (paginated)',
      queryParams: ['page', 'name', 'email', 'role'],
      response: [
        { status: 200, description: 'Users found successfully (paginated)', type: CreateUserDto, isArray: true },
      ]
    },

    getOne: {
      method: 'get' as const,
      summary: 'Find one user by filters',
      description: 'This function get all users by filters',
      response: [
        { status: 200, description: 'User found successfully', type: ViewUserDto },
      ]
    },

    update: {
      method: 'patch' as const,
      summary: 'Update one user',
      description: 'This function update one user by id',
      bodyType: UpdateUserDto,
      response: [
        { status: 200, description: 'User updated successfully', type: ViewUserDto },
      ]
    },

    remove: {
      method: 'delete' as const,
      summary: 'Remove one user (this funcion is not implemented yet)',
      description: 'This function remove one user by id',
      response: [
        { status: 200, description: 'User removed successfully', type: ViewUserDto },
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
        { status: 201, description: 'Profile created successfully', type: CreateProfileDto },
      ]
    },
  },


  admin: {
    create: {
      method: 'post' as const,
      summary: 'Create one admin',
      description: 'This function creates one admin',
      bodyType: CreateAdminDto,
      response: [
        { status: 201, description: 'Admin created successfully', type: CreateAdminDto},
      ]
    },
  },

}