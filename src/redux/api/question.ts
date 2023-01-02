import { IQuestionRequest, IQuestionResponse } from '../types/question';
import { baseApi } from './index';

export const questionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getQuestions: build.query<IQuestionResponse[], IQuestionRequest>({
      query: ({ testId }) => ({
        url: `/questions?test=${testId}`,
      }),
    }),
  }),
});

export const { useGetQuestionsQuery, useLazyGetQuestionsQuery } = questionApi;
