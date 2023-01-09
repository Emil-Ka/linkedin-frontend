import { initRegistrationState } from '../../pages/Registration';
import { IAddTestData, IAddTestRequest } from '../../redux/types/test';
import { IRegistrationInitData, IRegistrationRequest } from '../../redux/types/user';

export const convertApiData = {
  registration: ({ isHr, ...data }: IRegistrationInitData): IRegistrationRequest => ({
    ...data,
    role: isHr ? 1 : 0,
  }),
  addTest: (data: IAddTestData): IAddTestRequest => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof FileList) {
        formData.append(key, value[0]);
        return;
      }

      if (typeof value === 'number') {
        formData.append(key, value.toString());
        return;
      }

      formData.append(key, value);
    });

    return formData;
  },
};
