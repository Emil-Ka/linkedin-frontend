import { ITestRequest, ITestResponse } from '../types/test';
import { baseApi } from './index';

export const testApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTests: build.query<ITestResponse[], void>({
      query: () => ({
        url: '/tests',
      }),
    }),
    getTest: build.query<ITestResponse, ITestRequest>({
      query: ({ id }) => ({
        url: `/tests/${id}`,
      }),
    }),
  }),
});

export const { useGetTestsQuery, useGetTestQuery, useLazyGetTestQuery } = testApi;
