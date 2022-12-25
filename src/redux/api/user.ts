import { createApi } from '@reduxjs/toolkit/query/react';

import { IRegistrationResponse, IRegistrationRequest, IUser } from '../types/user';
import { ILoginData } from '../../pages/Login/types';
import { baseQueryWithReauth } from '../services/base-query';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    register: build.mutation<IRegistrationResponse, IRegistrationRequest>({
      query: (body) => ({
        url: '/auth/register/',
        method: 'POST',
        body,
      }),
    }),
    login: build.mutation<IRegistrationResponse, ILoginData>({
      query: (body) => ({
        url: '/auth/login/',
        method: 'POST',
        body,
      }),
    }),
    getUser: build.query<IUser, void>({
      query: () => ({
        url: '/auth/user/',
      }),
    }),
  }),
});

export const {
  useRegisterMutation, useLoginMutation, useGetUserQuery, useLazyGetUserQuery,
} = userApi;
