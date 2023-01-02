import { IOptionRequest, IOptionResponse } from '../types/option';
import { baseApi } from './index';

export const optionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getOptions: build.query<IOptionResponse[], IOptionRequest>({
      query: ({ questionId }) => ({
        url: `/options?question=${questionId}`,
      }),
    }),
  }),
});

export const { useGetOptionsQuery, useLazyGetOptionsQuery } = optionApi;
