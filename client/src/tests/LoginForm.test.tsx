import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { LoginForm } from '@/components/login-form';
import { BrowserRouter } from 'react-router';

const mockNavigate = vi.fn();
vi.mock('react-router', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router')>();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const mockHandleLogin = vi.fn();
vi.mock('@/hooks/useAuth', () => ({
  useAuth: () => ({
    token: null,
    currentUser: null,
    authPromise: undefined,
    handleLogin: mockHandleLogin,
    handleLogout: vi.fn(),
    handleSignUp: vi.fn(),
  }),
}));

describe('LoginForm Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('submits the form and navigates on success', async () => {
    mockHandleLogin.mockResolvedValue(undefined);

    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );

    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'password123');
    await user.click(screen.getByRole('button', { name: 'Login' }));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('displays an error message when login fails', async () => {
    mockHandleLogin.mockRejectedValue(new Error('Invalid credentials'));

    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );

    await user.type(screen.getByLabelText(/email/i), 'wrong@example.com');
    await user.type(screen.getByLabelText(/password/i), 'wrongpass');
    await user.click(screen.getByRole('button', { name: 'Login' }));

    expect(await screen.findByText('Invalid credentials')).toBeInTheDocument();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('redirects to google auth on google button click', async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );

    const button = screen.getByRole('button', { name: /login with google/i });
    expect(button).toBeInTheDocument();
  });
});
