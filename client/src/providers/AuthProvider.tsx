import { useEffect, useState, type PropsWithChildren } from 'react';
import { getUser, login } from '@/hooks/login';
import { AuthContext } from '@/hooks/useAuth';
import type { SignInInputData } from '@/schema/auth.schema';
import type { User } from '@/types/user';

type AuthProviderProps = PropsWithChildren;

export default function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>();
  const [currentUser, setCurrentUser] = useState<User | null>();

  // TODO: Use React Query instead of useEffect
  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await getUser();
        const { user } = response;
        //TODO: change role in backend and remove role here
        setCurrentUser({ ...user, role: 'admin' });
      } catch (err) {
        console.error(err);
        setToken(null);
        setCurrentUser(null);
      }
    }
    fetchUser();
  }, []);

  async function handleLogin(formData: SignInInputData) {
    try {
      const response = await login(formData);
      const { token, user } = response;
      localStorage.setItem('token', token);
      setToken(token);
      //TODO: change role in backend and remove role here
      setCurrentUser({ ...user, role: 'admin' });
    } catch (err) {
      console.error(err);
      setToken(null);
      setCurrentUser(null);
    }
  }

  // TODO: Make a request for log out (blacklist current token)
  async function handleLogout() {
    setToken(null);
    setCurrentUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        currentUser,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
