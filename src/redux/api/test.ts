import { IGetTestRequest, IGetTestResponse } from '../types/test';
import { baseApi } from './index';

export const testApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTests: build.query<IGetTestResponse[], void>({
      query: () => ({
        url: '/tests',
      }),
      providesTags: ['Tests'],
    }),
    getTest: build.query<IGetTestResponse, IGetTestRequest>({
      query: ({ id }) => ({
        url: `/tests/${id}`,
      }),
    }),
    addTest: build.mutation<IGetTestResponse, FormData>({
      query: (body) => ({
        url: '/tests/create/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Tests'],
    }),
  }),
});

export const { useGetTestsQuery, useGetTestQuery, useLazyGetTestQuery, useAddTestMutation } =
  testApi;
