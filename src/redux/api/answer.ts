import { IAnswerRequest, IAnswerResponse } from '../types/answer';
import { baseApi } from './index';

export const answerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    checkAnswer: build.mutation<IAnswerResponse, IAnswerRequest>({
      query: (body) => ({
        url: '/answers/check/',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useCheckAnswerMutation } = answerApi;
