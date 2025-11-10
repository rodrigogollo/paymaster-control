import { useEffect, useState, type PropsWithChildren } from 'react';
import { getCurrentUser, login } from '@/hooks/login';
import { AuthContext } from '@/hooks/useAuth';
import type { SignInInputData } from '@/schema/auth.schema';
import type { User } from '@/types/user';

type AuthProviderProps = PropsWithChildren;

export default function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>();
  const [currentUser, setCurrentUser] = useState<User | null>();
  const [authPromise, setAuthPromise] = useState<Promise<void> | undefined>(
    () => {
      return new Promise((resolve) => setTimeout(resolve, 20));
    }
  );

  // TODO: Use React Query instead of useEffect
  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem('token');

      if (!storedToken) {
        setCurrentUser(null);
        return;
      }

      try {
        const user = await getCurrentUser();
        user.role = 'viewer';

        //TODO: change role in backend and remove role here
        setCurrentUser(user);
        setToken(storedToken);
      } catch (err) {
        console.error(err);
        localStorage.removeItem('token');
        setToken(null);
        setCurrentUser(null);
      }
    };
    const promise = checkAuth().then(() => {
      setAuthPromise(undefined);
      console.log(currentUser);
    });
    setAuthPromise(promise);
  }, []);

  async function handleLogin(formData: SignInInputData) {
    try {
      const { token, user } = await login(formData);
      localStorage.setItem('token', token);
      setToken(token);
      //TODO: change role in backend and remove role here
      user.role = 'viewer';
      setCurrentUser(user);
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
        authPromise,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
