import type { SignInInputData, SignUpInputData } from '@/schema/auth.schema';
import type { CurrentUser } from '@/types/user';
import { createContext, useContext } from 'react';

type AuthContext = {
  token?: string | null;
  currentUser?: CurrentUser | null;
  authPromise?: Promise<void>;
  handleLogin: (formData: SignInInputData) => Promise<void>;
  handleLogout: () => Promise<void>;
  handleSignUp: (formData: SignUpInputData) => Promise<void>;
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
