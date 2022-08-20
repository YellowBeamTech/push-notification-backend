import 'express';
export interface userInterface {
  id: string;
  firstName?: string;
  lastName?: string;
  age?: number;
  gender?: string;
}

export interface UserTokenData {
  user_id: string;
  email: string;
  is_admin: boolean;
}

declare module 'express' {
  interface Request {
    user: {
      id: string;
      email: string;
      is_admin: boolean;
    };
  }
}