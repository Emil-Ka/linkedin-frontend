import { baseApi } from 'store';

import { IPassedTestsResponse } from './types';

export const passedTestApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPassedTests: build.query<IPassedTestsResponse[], void>({
      query: () => ({
        url: '/passed_tests',
      }),
      providesTags: ['PassedTests'],
    }),
  }),
});

export const { useGetPassedTestsQuery, useLazyGetPassedTestsQuery } = passedTestApi;
