import { baseApi } from 'store';

import { IAddOptionRequest, IOptionRequest, IOptionResponse } from './types';

export const optionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getOptions: build.query<IOptionResponse[], IOptionRequest>({
      query: ({ questionId }) => ({
        url: `/options?question=${questionId}`,
      }),
    }),
    addOption: build.mutation<IOptionResponse, IAddOptionRequest>({
      query: (body) => ({
        url: '/options/create/',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useGetOptionsQuery, useLazyGetOptionsQuery, useAddOptionMutation } = optionApi;
