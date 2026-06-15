export type CurrentUser = {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'manager' | 'viewer';
  name: string;
  avatar: string;
};

export type User = {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  age: number;
  avatar: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};
