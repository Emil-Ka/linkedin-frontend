import { IRegistrationResponse, IRegistrationRequest, IUser } from '../types/user';
import { ILoginData } from '../../pages/Login/types';
import { baseApi } from './index';

export const userApi = baseApi.injectEndpoints({
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
