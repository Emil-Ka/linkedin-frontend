import { ITestParams, ITestResponse } from '../types/test';
import { baseApi } from './index';

export const testApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTests: build.query<ITestResponse[], void>({
      query: () => ({
        url: '/tests',
      }),
    }),
    getTest: build.query<ITestResponse, ITestParams>({
      query: ({ id }) => ({
        url: `/tests/${id}`,
      }),
    }),
  }),
});

export const { useGetTestsQuery, useGetTestQuery } = testApi;
