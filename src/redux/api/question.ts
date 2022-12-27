import { IQuestionParams, IQuestionResponse } from '../types/question';
import { baseApi } from './index';

export const questionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getQuestions: build.query<IQuestionResponse[], IQuestionParams>({
      query: ({ id }) => ({
        url: `/questions?test=${id}`,
      }),
    }),
  }),
});

export const { useGetQuestionsQuery } = questionApi;
