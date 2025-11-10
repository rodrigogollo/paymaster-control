import { isAxiosError } from 'axios';
import api from '@/api/httpClient';
import type { SignInInputData, SignUpInputData } from '@/schema/auth.schema';

export const login = async (formData: SignInInputData) => {
  try {
    const response = await api.post('/auth/login', formData, {
      headers: { 'Skip-Auth': 'true' },
    });
    return response.data;
  } catch (err) {
    if (isAxiosError(err)) {
      const message = err.response?.data.message || 'Login failed.';
      throw new Error(message);
    }
  }
};

export const register = async (formData: SignUpInputData) => {
  try {
    formData.age = Number(formData.age);
    const response = await api.post('/auth/register', formData, {
      headers: { 'Skip-Auth': 'true' },
    });
    return response.data;
  } catch (err) {
    if (isAxiosError(err)) {
      const message = err.response?.data.message || 'Registration failed.';
      throw new Error(message);
    }
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get('/users/me');
    return response.data;
  } catch (err) {
    if (isAxiosError(err)) {
      const message = err.response?.data.message || 'Validation failed.';
      throw new Error(message);
    }
  }
};
