import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IRegistrationResponse, IRegistrationRequest } from '../../pages/Registration/types';
import { HTTP_PATH } from '../helper/http';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${HTTP_PATH}/auth`,
  }),
  endpoints: (build) => ({
    register: build.mutation<IRegistrationResponse, IRegistrationRequest>({
      query: (body) => ({
        url: '/register/',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useRegisterMutation } = userApi;
