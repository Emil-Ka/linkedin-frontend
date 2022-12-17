import { IRegistrationRequest } from '../../pages/Registration/types';

export type IUser = Omit<IRegistrationRequest, 'password'>;

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

export const instanceOfIErrorResponse = (error: any): error is IErrorResponse => 'data' in error && 'status' in error;
