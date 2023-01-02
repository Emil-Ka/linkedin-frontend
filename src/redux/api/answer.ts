import { IAnswerRequest, IAnswerResponse, ICheckAnswerResponse } from '../types/answer';
import { baseApi } from './index';

export const answerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    checkAnswer: build.mutation<ICheckAnswerResponse, IAnswerRequest>({
      query: (body) => ({
        url: '/answers/check/',
        method: 'POST',
        body,
      }),
    }),
    getAnswers: build.query<IAnswerResponse[], void>({
      query: () => ({
        url: '/answers',
      }),
    }),
  }),
});

export const { useCheckAnswerMutation, useGetAnswersQuery } = answerApi;
