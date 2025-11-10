import z from 'zod';

export const formSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export type SignInInputData = z.infer<typeof formSchema>;

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
