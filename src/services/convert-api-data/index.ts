import { initRegistrationState } from '../../pages/Registration';
import { IRegistrationInitData, IRegistrationRequest } from '../../redux/types/user';

export const convertApiData = {
  registration: (data: IRegistrationInitData): IRegistrationRequest => ({
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
    password: data.password,
    role: data.isHr ? 1 : 0,
  }),
};
