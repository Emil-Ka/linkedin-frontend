import { ILoginData } from 'pages/login/types';
import { baseApi } from 'store';

import { IUserResponse, IRegistrationRequest, IUser } from '../model/types';

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation<IUserResponse, IRegistrationRequest>({
      query: (body) => ({
        url: '/auth/register/',
        method: 'POST',
        body,
      }),
    }),
    login: build.mutation<IUserResponse, ILoginData>({
      query: (body) => ({
        url: '/auth/login/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Resume'],
    }),
    getUser: build.query<IUser, void>({
      query: () => ({
        url: '/auth/user/',
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useGetUserQuery, useLazyGetUserQuery } =
  userApi;
