import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { api } from '../../api';
import { User } from '../../api/types';

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

const registerUser = async (userData: Omit<User, 'id'>): Promise<User> => {
  try {
    const response = await api.user.register(userData);
    return response;
  } catch (error) {
    console.error('Failed to register user:', error);
    throw error;
  }
};

const updateUser = async (
  userId: string,
  userData: Partial<User>,
): Promise<User> => {
  try {
    const response = await api.user.update(userId, userData);
    return response;
  } catch (error) {
    console.error('Failed to update user:', error);
    throw error;
  }
};

const deleteUser = async (userId: string): Promise<void> => {
  try {
    await api.user.delete(userId);
  } catch (error) {
    console.error('Failed to delete user:', error);
    throw error;
  }
};

const USERS_QUERY_KEY = ['users'];

export const useTab2Screen = () => {
  const queryClient = useQueryClient();

  // Form states
  const [registerForm, setRegisterForm] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    role: 'user',
  });

  const [updateForm, setUpdateForm] = useState({
    firstname: '',
    lastname: '',
    email: '',
    role: 'user',
  });

  // Local state
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  //! Get all users
  const {
    data: users = [],
    isLoading: usersLoading,
    error: usersError,
    refetch: refetchUsers,
  } = useQuery({
    queryKey: USERS_QUERY_KEY,
    queryFn: getAllUsers,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  //! create user
  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY });
    },
    onError: error => {
      console.error('Register failed:', error);
    },
  });

  //! Update user
  const updateMutation = useMutation({
    mutationFn: ({ userId, data }: { userId: string; data: Partial<User> }) =>
      updateUser(userId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY });
      setSelectedUserId(null);
    },
    onError: error => {
      console.error('Update failed:', error);
    },
  });

  //! Delete user
  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY });
      setSelectedUserId(null);
    },
    onError: error => {
      console.error('Delete failed:', error);
    },
  });

  //! Handler functions
  const handleRegister = () => {
    const { firstname, lastname, email, password, role } = registerForm;

    if (!firstname || !lastname || !email || !password) {
      throw new Error('Please fill all fields');
    }

    registerMutation.mutate({ firstname, lastname, email, password, role });
    setRegisterForm({
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      role: 'user',
    });
  };

  const handleSelectUser = (user: User) => {
    setSelectedUserId(user.id || null);
    if (user.id) {
      setUpdateForm({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
      });
    }
  };

  const handleUpdateUser = () => {
    if (!selectedUserId) {
      throw new Error('No user selected');
    }

    const { firstname, lastname, email, role } = updateForm;

    if (!firstname || !lastname || !email) {
      throw new Error('Please fill all fields');
    }

    updateMutation.mutate({
      userId: selectedUserId,
      data: { firstname, lastname, email, role },
    });
    setSelectedUserId(null);
    setUpdateForm({
      firstname: '',
      lastname: '',
      email: '',
      role: 'user',
    });
  };

  const handleDeleteUser = () => {
    if (!selectedUserId) {
      throw new Error('No user selected');
    }

    deleteMutation.mutate(selectedUserId);
    setSelectedUserId(null);
    setUpdateForm({
      firstname: '',
      lastname: '',
      email: '',
      role: 'user',
    });
  };

  return {
    // Users data
    users,
    usersLoading,
    usersError,
    refetchUsers,

    // Register
    registerForm,
    setRegisterForm,
    handleRegister,
    isRegistering: registerMutation.isPending,

    // Update
    updateForm,
    setUpdateForm,
    handleUpdateUser,
    handleSelectUser,
    isUpdating: updateMutation.isPending,

    // Delete
    handleDeleteUser,
    isDeleting: deleteMutation.isPending,

    // UI State
    selectedUserId,
    setSelectedUserId,
  };
};
