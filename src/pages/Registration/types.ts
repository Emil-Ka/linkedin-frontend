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
}
