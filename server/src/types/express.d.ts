declare namespace Express {
  interface User {
    id: string;
    email?: string;
    username?: string;
    picture?: string;
    jwt?: string;
  }
}
