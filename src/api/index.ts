import client from './client';
import { METHODS } from '../utils/constant';
import { User, UsersListResponse, Task, TasksListResponse } from './types';

export const api = {
  user: {
    getAll: () =>
      client<UsersListResponse>({
        method: METHODS.GET,
        url: `/users/`,
      }),
    register: (userData: Omit<User, 'id'>) =>
      client<User>({
        method: METHODS.POST,
        url: `/users/register`,
        data: userData,
      }),
    update: (userId: string, userData: Partial<User>) =>
      client<User>({
        method: METHODS.PUT,
        url: `/users/${userId}`,
        data: userData,
      }),
    delete: (userId: string) =>
      client<void>({
        method: METHODS.DELETE,
        url: `/users/${userId}`,
      }),
  },
  task: {
    getAll: () =>
      client<TasksListResponse>({
        method: METHODS.GET,
        url: `/tasks/`,
      }),
    create: (taskData: Omit<Task, 'id'>) =>
      client<Task>({
        method: METHODS.POST,
        url: `/tasks/`,
        data: taskData,
      }),
    update: (taskId: string, taskData: Partial<Task>) =>
      client<Task>({
        method: METHODS.PUT,
        url: `/tasks/${taskId}`,
        data: taskData,
      }),
    delete: (taskId: string) =>
      client<void>({
        method: METHODS.DELETE,
        url: `/task/${taskId}`,
      }),
  },
};
