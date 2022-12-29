import { IOptionRequest, IOptionResponse } from '../types/option';
import { baseApi } from './index';

export const optionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getOptions: build.query<IOptionResponse[], IOptionRequest>({
      query: ({ id }) => ({
        url: `/options?question=${id}`,
      }),
    }),
  }),
});

export const { useGetOptionsQuery, useLazyGetOptionsQuery } = optionApi;
