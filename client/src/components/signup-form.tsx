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
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { Selector } from '@/shared/components/Selector';
import { USER_ROLES, type SignUpInputData } from '@/schema/auth.schema';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const { handleSignUp } = useAuth();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignUpInputData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
      // confirmPassword: '',
      role: '',
      age: 16,
    },
  });

  const navigate = useNavigate();

  const deriveRoles = () => {
    const roles = USER_ROLES.map((role) => {
      return {
        label: role.slice(0, 1).toUpperCase() + role.slice(1),
        value: role,
      };
    });
    return roles;
  };

  const roles = deriveRoles();

  const onSubmit: SubmitHandler<SignUpInputData> = async (data) => {
    console.log('submitted');
    toast.promise(handleSignUp(data), {
      loading: 'Signing up...',
      success: () => {
        navigate('/');
        return 'Sign up sucessfully!';
      },
      error: (err) => {
        const errorMessage =
          err instanceof Error ? err.message : 'Sign up failed.';
        setError('root.serverError', {
          type: 'server',
          message: errorMessage,
        });
        return errorMessage;
      },
    });
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className='text-center'>
          <CardTitle className='text-xl'>Create your account</CardTitle>
          <CardDescription>
            Enter your information below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field className='grid grid-cols-5 gap-2'>
                <Field className='col-span-2'>
                  <FieldLabel htmlFor='first-name'>First Name</FieldLabel>
                  <Input
                    id='first-name'
                    type='text'
                    placeholder='John'
                    required
                    {...register('firstName', { required: true })}
                  />
                  <p>{errors.firstName?.message}</p>
                </Field>
                <Field className='col-span-2'>
                  <FieldLabel htmlFor='last-name'>Last Name</FieldLabel>
                  <Input
                    id='last-name'
                    type='text'
                    placeholder='Doe'
                    required
                    {...register('lastName', { required: true })}
                  />
                  <p>{errors.lastName?.message}</p>
                </Field>
                <Field>
                  <FieldLabel htmlFor='age'>Age</FieldLabel>
                  <Input
                    id='age'
                    type='number'
                    min={16}
                    max={90}
                    required
                    {...register('age', { required: true })}
                  />
                  <p>{errors.lastName?.message}</p>
                </Field>
              </Field>
              <Field className='grid grid-cols-4 gap-2'>
                <Field className='col-span-3'>
                  <FieldLabel htmlFor='email'>Email</FieldLabel>
                  <Input
                    id='email'
                    type='email'
                    placeholder='john@doe.com'
                    required
                    {...register('email', { required: true })}
                  />
                  <p>{errors.email?.message}</p>
                </Field>

                <Field className='col-span-1'>
                  <FieldLabel htmlFor='role'>Role</FieldLabel>
                  <Controller
                    name='role'
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Selector
                        placeholder='Select a role'
                        label='Roles'
                        items={roles}
                        value={field.value}
                        onValueChange={field.onChange}
                      />
                    )}
                  />
                  <p>{errors.role?.message}</p>
                </Field>
              </Field>
              <Field>
                <FieldLabel htmlFor='username'>Username</FieldLabel>
                <Input
                  id='username'
                  type='test'
                  placeholder='johndoe123'
                  required
                  {...register('username', { required: true })}
                />
                <p>{errors.username?.message}</p>
              </Field>
              <Field>
                <Field className='grid grid-cols-2 gap-4'>
                  <Field>
                    <FieldLabel htmlFor='password'>Password</FieldLabel>
                    <Input
                      id='password'
                      type='password'
                      required
                      {...register('password', { required: true })}
                    />
                    <p>{errors.password?.message}</p>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor='confirm-password'>
                      Confirm Password
                    </FieldLabel>
                    {/* <p>{errors.confirmPassword?.message}</p> */}
                    <Input id='confirm-password' type='password' required />
                  </Field>
                </Field>
                {/* <FieldDescription> */}
                {/*   Must be at least 8 characters long. */}
                {/* </FieldDescription> */}
              </Field>
              <Field>
                <Button type='submit'>Create Account</Button>
                <FieldDescription className='text-center'>
                  Already have an account? <a href='/signin'>Sign in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className='px-6 text-center'>
        By clicking continue, you agree to our <a href='#'>Terms of Service</a>{' '}
        and <a href='#'>Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
