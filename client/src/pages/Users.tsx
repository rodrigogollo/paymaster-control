import { AppSidebar } from '@/components/app-sidebar';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { api } from '@/api/httpClient';
import UsersTable from '@/shared/components/UsersTable';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { Suspense } from 'react';

const UsersPage = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await api.get('/users');
      const users = await response.data.users;
      return users;
    },
  });

  if (isPending) return 'Loading...';
  if (error) return 'An errror has occurred: ' + error.message;

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className='flex h-16 shrink-0 items-center gap-2 border-b px-4'>
            <SidebarTrigger className='-ml-1' />
            <div className='h-4 w-px bg-border' />
            <span className='text-sm font-medium'>Users Directory</span>
          </header>

          <div className='p-4'>
            {/* The Suspense boundary is HERE. 
            Everything outside this (Sidebar, Header) remains visible.
            Everything inside this waits for data.
          */}
            <Suspense fallback={<p>Loading...</p>}>
              <UsersListContainer />
            </Suspense>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
};

function UsersListContainer() {
  // usage of useSuspenseQuery ensures 'data' is always defined.
  // If it's loading, this component 'suspends' and triggers the parent fallback.
  // If there is an error, it bubbles to the nearest ErrorBoundary.
  const { data: users } = useSuspenseQuery({
    queryKey: ['users'],
    queryFn: async () => {
      // slightly artificial delay to demonstrate the skeleton
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const response = await api.get('/users');
      // Ensure we return the array directly
      return response.data.users;
    },
  });

  return <UsersTable users={users} />;
}

export default UsersPage;
