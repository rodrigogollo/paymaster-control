import { useEffect } from 'react';
import { useNavigate } from 'react-router';

export default function LoginSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      localStorage.setItem('token', token);
      navigate('/dashboard');
    }
  }, [navigate]);

  return <div>Logging you in...</div>;
}
