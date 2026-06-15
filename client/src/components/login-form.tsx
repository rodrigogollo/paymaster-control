import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router';
import type { SignInInputData } from '@/schema/auth.schema';
import { toast, Toaster } from 'sonner';
import { useAuth } from '@/hooks/useAuth';

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const navigate = useNavigate();
  const { handleLogin } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignInInputData>({
    defaultValues: {
      // typecheck if input name exists
      email: '',
      password: '',
    },
  });

  //TODO: Use SignInInputData from Zod instead of FormData
  const onSubmit: SubmitHandler<SignInInputData> = async (data) => {
    toast.promise(handleLogin(data), {
      loading: 'Logging in...',
      success: () => {
        navigate('/dashboard');
        return 'Login sucessful!';
      },
      error: (err) => {
        const errorMessage =
          err instanceof Error ? err.message : 'Login failed.';
        setError('root.serverError', {
          type: 'server',
          message: errorMessage,
        });
        return errorMessage;
      },
    });
  };

  const handleGoogleLogin = async () => {
    window.location.assign('http://localhost:3000/api/v1/auth/google');
    // const res = await api.post('/auth/google');
    // console.log('google login', res);
  };

  return (
    <>
      <div className={cn('flex flex-col gap-6', className)} {...props}>
        <Card>
          <CardHeader className='text-center'>
            <CardTitle className='text-xl'>Welcome back</CardTitle>
            <CardDescription>Login with your Google account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FieldGroup>
                <Field>
                  <Button
                    onMouseDown={handleGoogleLogin}
                    variant='outline'
                    type='button'
                  >
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
                      <path
                        d='M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z'
                        fill='currentColor'
                      />
                    </svg>
                    Login with Google
                  </Button>
                </Field>
                <FieldSeparator className='*:data-[slot=field-separator-content]:bg-card'>
                  Or continue with
                </FieldSeparator>
                <Field>
                  <FieldLabel htmlFor='email'>Email</FieldLabel>
                  <Input
                    id='email'
                    type='email'
                    placeholder='m@example.com'
                    {...register('email', {
                      required: 'This is required.',
                    })}
                  />
                  <p>{errors.email?.message}</p>
                </Field>
                <Field>
                  <div className='flex items-center'>
                    <FieldLabel htmlFor='password'>Password</FieldLabel>
                  </div>
                  <Input
                    id='password'
                    type='password'
                    {...register('password', {
                      required: 'This is requried.',
                    })}
                  />
                  <p>{errors.password?.message}</p>
                  <a
                    href='#'
                    className='ml-auto text-sm underline-offset-4 hover:underline'
                  >
                    Forgot your password?
                  </a>
                </Field>
                <Field>
                  <Button type='submit'>Login</Button>
                  <FieldDescription className='text-center'>
                    Don&apos;t have an account? <a href='/signup'>Sign up</a>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
        <FieldDescription className='px-6 text-center'>
          By clicking continue, you agree to our{' '}
          <a href='#'>Terms of Service</a> and <a href='#'>Privacy Policy</a>.
        </FieldDescription>
      </div>

      <Toaster position='top-right' />
    </>
  );
}
