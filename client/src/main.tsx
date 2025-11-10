import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router';
import AuthProvider from '@/providers/AuthProvider.tsx';
import router from '@/providers/RouterProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
