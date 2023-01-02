import { IPassedTestsResponse } from '../types/passed-test';
import { baseApi } from './index';

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

export const { useLazyGetPassedTestsQuery } = passedTestApi;
