import HomePage from '@/pages/Home';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router';

function App() {
  const { token } = useAuth();
  return (
    <>
      <Link to='/protected'>Protected Route</Link>
      {token && <HomePage />}
      {!token && <p>Not Logged</p>}
    </>
  );
}

export default App;
