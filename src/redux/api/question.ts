import { IQuestionRequest, IQuestionResponse } from '../types/question';
import { baseApi } from './index';

export const questionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getQuestions: build.query<IQuestionResponse[], IQuestionRequest>({
      query: ({ testId }) => ({
        url: `/questions?test=${testId}`,
      }),
    }),
    addQuestion: build.mutation<IQuestionResponse, FormData>({
      query: (body) => ({
        url: '/questions/create/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Tests'],
    }),
  }),
});

export const { useGetQuestionsQuery, useLazyGetQuestionsQuery, useAddQuestionMutation } =
  questionApi;
