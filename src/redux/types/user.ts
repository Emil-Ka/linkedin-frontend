export interface IUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  photo: string | null;
  bio: string | null;
  is_active: boolean;
  role: 0 | 1 | 2;
}

export interface InitialState {
  user: IUser | null;
  token: string | null;
}

export interface ISetUserPayload {
  user: IUser;
}

export interface ISetTokenPayload {
  token: string;
}

export interface IErrorResponse {
  data: Record<string, string[]>;
  status: number;
}

// Type Guard
export const instanceOfIErrorResponse = (error: any): error is IErrorResponse => 'data' in error && 'status' in error;
