export interface User {
  id?: string;
  firstname: string;
  lastname: string;
  email: string;
  password?: string;
  role: string;
}

export interface UsersListResponse {
  message: string;
  status: boolean;
  users: User[];
}

export interface Task {
  id?: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed' | 'rejected';
  userId: string;
  search?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface TasksListResponse {
  message: string;
  status: boolean;
  tasks: Task[];
}