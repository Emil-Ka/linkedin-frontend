import { baseApi } from 'store';

import { IResultRequest, IResultResponse } from './types';

export const resultApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getResults: build.query<IResultResponse[], IResultRequest>({
      query: ({ testId }) => ({
        url: `/results?test=${testId}`,
      }),
    }),
  }),
});

export const { useLazyGetResultsQuery } = resultApi;
