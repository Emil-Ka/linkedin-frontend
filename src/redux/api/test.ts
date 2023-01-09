import { IAddTestRequest, IGetTestRequest, IGetTestResponse } from '../types/test';
import { baseApi } from './index';

export const testApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTests: build.query<IGetTestResponse[], void>({
      query: () => ({
        url: '/tests',
      }),
    }),
    getTest: build.query<IGetTestResponse, IGetTestRequest>({
      query: ({ id }) => ({
        url: `/tests/${id}`,
      }),
    }),
    addTest: build.mutation<IGetTestResponse, IAddTestRequest>({
      query: (body) => ({
        url: '/tests/create/',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useGetTestsQuery, useGetTestQuery, useLazyGetTestQuery, useAddTestMutation } =
  testApi;
