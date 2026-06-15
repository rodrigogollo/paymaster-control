import { Link, Outlet } from 'react-router';

export default function DemoBanner({ isDemo }: { isDemo: boolean }) {
  if (!isDemo) {
    return <Outlet />;
  }
  return (
    <>
      <div className='w-full p-4 bg-amber-300 text-black flex flex-row justify-between items-center'>
        <p>
          <span className='bg-amber-200 p-1 rounded mr-auto'>⚠️</span> Demo Mode
          - Data resets every hour.
        </p>
        <Link className='bg-amber-200 p-1 rounded ml-auto' to='/signup'>
          Create account
        </Link>
      </div>

      <Outlet />
    </>
  );
}
