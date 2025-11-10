import { isAxiosError } from 'axios';
import api from '@/api/httpClient';
import type { SignInInputData } from '@/schema/auth.schema';

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
