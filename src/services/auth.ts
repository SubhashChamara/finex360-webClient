import apiClient from './apiClient';

export const login = async (username: string, password: string) => {
  try {
    const response = await apiClient.post('/auth/sign-in', { username, password });
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};
