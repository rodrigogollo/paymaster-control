import z from 'zod';

export const signInFormSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const USER_ROLES = ['admin', 'manager', 'viewer'];

export const signUpFormSchema = z.object({
  email: z.email('Invalid email address'),
  firstName: z.string(),
  lastName: z.string(),
  age: z.number().min(18).max(90),
  username: z.string(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(USER_ROLES).default('viewer'),
});

export type SignInInputData = z.infer<typeof signInFormSchema>;
export type SignUpInputData = z.infer<typeof signUpFormSchema>;

export type SignInResponse = {
  message: string;
  user: {
    id: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    createdAt: string;
  };
  token: string;
};

export type SignInErrorResponse = {
  error: string;
};
