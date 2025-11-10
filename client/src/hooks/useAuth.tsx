import type { SignInInputData } from '@/schema/auth.schema';
import type { User } from '@/types/user';
import { createContext, useContext } from 'react';

type AuthContext = {
  token?: string | null;
  currentUser?: User | null;
  authPromise?: Promise<void>;
  handleLogin: (formData: SignInInputData) => Promise<void>;
  handleLogout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContext | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used inside a AuthProvider');
  }

  if (context.authPromise) {
    throw context.authPromise;
  }
  return context;
}
