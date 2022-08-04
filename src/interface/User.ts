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