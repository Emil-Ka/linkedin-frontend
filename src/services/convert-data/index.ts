import { IAddQuestionData, IOption } from '../../pages/AddQuestion/types';
import { initRegistrationState } from '../../pages/Registration';
import { IAddOptionRequest } from '../../redux/types/option';
import { IAddTestData } from '../../redux/types/test';
import { IRegistrationInitData, IRegistrationRequest } from '../../redux/types/user';
import { AddOptionParams } from './types';

export const convertData = {
  registration: ({ isHr, ...data }: IRegistrationInitData): IRegistrationRequest => ({
    ...data,
    role: isHr ? 1 : 0,
  }),
  addTest: (data: IAddTestData): FormData => {
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
  addQuestion: ({ test, question, cover }: IAddQuestionData): FormData => {
    const formData = new FormData();

    console.log('cover', cover);

    formData.append('test', test.toString());
    formData.append('text', question);

    if (cover.length) {
      formData.append('photo', cover[0]);
    }

    return formData;
  },
  addOption: ({ value, question }: AddOptionParams): IAddOptionRequest => {
    return {
      text: value,
      question,
    };
  },
};
