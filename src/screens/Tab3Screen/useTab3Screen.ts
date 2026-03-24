import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { api } from '../../api';
import { Task, User } from '../../api/types';

//! API Functions
const getAllUsers = async (): Promise<User[]> => {
  try {
    const response = await api.user.getAll();
    return response.users || [];
  } catch (error) {
    console.error('Failed to fetch users:', error);
    throw error;
  }
};

const getAllTasks = async (): Promise<Task[]> => {
  try {
    const response = await api.task.getAll();
    return response.tasks || [];
  } catch (error) {
    console.error('Failed to fetch tasks:', error);
    throw error;
  }
};

const createTask = async (taskData: Omit<Task, 'id'>): Promise<Task> => {
  try {
    const payload = {
      title: taskData.title,
      description: taskData.description,
      priority: taskData.priority,
      status: taskData.status,
      user_id: taskData.userId,
    };
    const response = await api.task.create(payload as any);
    return response;
  } catch (error) {
    console.error('Failed to create task:', error);
    throw error;
  }
};

const updateTask = async (
  taskId: string,
  taskData: Partial<Task>,
): Promise<Task> => {
  try {
    const payload: any = {
      title: taskData.title,
      description: taskData.description,
      priority: taskData.priority,
      status: taskData.status,
    };
    if (taskData.userId) {
      payload.user_id = taskData.userId;
    }
    const response = await api.task.update(taskId, payload);
    return response;
  } catch (error) {
    console.error('Failed to update task:', error);
    throw error;
  }
};

const deleteTask = async (taskId: string): Promise<void> => {
  try {
    await api.task.delete(taskId);
  } catch (error) {
    console.error('Failed to delete task:', error);
    throw error;
  }
};

const TASKS_QUERY_KEY = ['tasks'];
const USERS_QUERY_KEY = ['users'];

export const useTab3Screen = () => {
  const queryClient = useQueryClient();

  // Form states
  const [createForm, setCreateForm] = useState<{
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    status: 'pending' | 'in-progress' | 'completed' | 'rejected';
    userId: string;
  }>({
    title: '',
    description: '',
    priority: 'low',
    status: 'pending',
    userId: '',
  });

  const [updateForm, setUpdateForm] = useState<{
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    status: 'pending' | 'in-progress' | 'completed' | 'rejected';
  }>({
    title: '',
    description: '',
    priority: 'low',
    status: 'pending',
  });

  // Local state
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  //! Get all users
  const {
    data: users = [],
    isLoading: usersLoading,
    error: usersError,
  } = useQuery({
    queryKey: USERS_QUERY_KEY,
    queryFn: getAllUsers,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  //! Get all tasks
  const {
    data: tasks = [],
    isLoading: tasksLoading,
    error: tasksError,
    refetch: refetchTasks,
  } = useQuery({
    queryKey: TASKS_QUERY_KEY,
    queryFn: getAllTasks,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  //! Create task
  const createMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEY });
    },
    onError: error => {
      console.error('Create task failed:', error);
    },
  });

  //! Update task
  const updateMutation = useMutation({
    mutationFn: ({ taskId, data }: { taskId: string; data: Partial<Task> }) =>
      updateTask(taskId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEY });
      setSelectedTaskId(null);
    },
    onError: error => {
      console.error('Update task failed:', error);
    },
  });

  //! Delete task
  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEY });
      setSelectedTaskId(null);
    },
    onError: error => {
      console.error('Delete task failed:', error);
    },
  });

  //! Handler functions
  const handleCreate = () => {
    const { title, description, priority, status, userId } = createForm;

    if (!title || !title.trim()) {
      throw new Error('Please enter a task title');
    }

    if (!description || !description.trim()) {
      throw new Error('Please enter a task description');
    }

    if (!userId || !userId.trim()) {
      throw new Error('Please select a user for this task');
    }

    createMutation.mutate({ title, description, priority, status, userId });
    setCreateForm({
      title: '',
      description: '',
      priority: 'low',
      status: 'pending',
      userId: '',
    });
  };

  const handleSelectTask = (task: Task) => {
    setSelectedTaskId(task.id || null);
    if (task.id) {
      setUpdateForm({
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: task.status,
      });
    }
  };

  const handleUpdateTask = () => {
    if (!selectedTaskId) {
      throw new Error('No task selected');
    }

    const { title, description, priority, status } = updateForm;

    if (!title || !description) {
      throw new Error('Please fill all fields');
    }

    updateMutation.mutate({
      taskId: selectedTaskId,
      data: { title, description, priority, status },
    });
    setSelectedTaskId(null);
    setUpdateForm({
      title: '',
      description: '',
      priority: 'low',
      status: 'pending',
    });
  };

  const handleDeleteTask = () => {
    if (!selectedTaskId) {
      throw new Error('No task selected');
    }

    deleteMutation.mutate(selectedTaskId);
    setSelectedTaskId(null);
    setUpdateForm({
      title: '',
      description: '',
      priority: 'low',
      status: 'pending',
    });
  };

  const tasksList = Array.isArray(tasks) ? tasks : [];

  return {
    // Users data
    users,
    usersLoading,
    usersError,

    // Tasks data
    tasks: tasksList,
    tasksLoading,
    tasksError,
    refetchTasks,

    // Create
    createForm,
    setCreateForm,
    handleCreate,
    isCreating: createMutation.isPending,

    // Update
    updateForm,
    setUpdateForm,
    handleUpdateTask,
    handleSelectTask,
    isUpdating: updateMutation.isPending,

    // Delete
    handleDeleteTask,
    isDeleting: deleteMutation.isPending,

    // UI State
    selectedTaskId,
    setSelectedTaskId,
  };
};
