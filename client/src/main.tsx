import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router';
import AuthProvider from '@/providers/AuthProvider.tsx';
import router from '@/providers/RouterProvider.tsx';
import { Suspense } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <Suspense
        fallback={
          <div className='flex items-center justify-center min-h-screen'>
            <div className='text-center'>
              <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto'></div>
              <p className='mt-4 text-gray-600'>Loading...</p>
            </div>
          </div>
        }
      >
        <RouterProvider router={router} />
      </Suspense>
    </AuthProvider>
  </QueryClientProvider>
);
