export const enum USER_ROLE {
  USER,
  HR,
  ADMIN,
}

export interface IUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  photo: string | null;
  bio: string;
  is_active: boolean;
  role: USER_ROLE;
}

export interface IUserState {
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

export interface IRegistrationData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface IRegistrationInitData extends IRegistrationData {
  isHr?: boolean;
}

export interface IRegistrationRequest extends IRegistrationData {
  role: 0 | 1;
}

export interface IRegistrationResponse {
  access: string;
  data: IUser;
}
