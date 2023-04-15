import { baseApi } from 'store';

import {
  IAddAnswerRequest,
  ICheckAnswerRequest,
  IAnswerResponse,
  ICheckAnswerResponse,
} from './types';

export const answerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    checkAnswer: build.mutation<ICheckAnswerResponse, ICheckAnswerRequest>({
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
    addAnswer: build.mutation<IAnswerResponse[], IAddAnswerRequest>({
      query: (body) => ({
        url: '/answers/create/',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useCheckAnswerMutation, useGetAnswersQuery, useAddAnswerMutation } = answerApi;
