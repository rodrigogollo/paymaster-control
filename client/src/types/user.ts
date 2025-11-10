export type User = {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'manager' | 'viewer';
  name: string;
};
