import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IRegistrationResponse, IRegistrationRequest } from '../../pages/Registration/types';
import { BACKEND_URL } from '../../config/backend.config';
import { RootStateType } from '../store';
import { IUser } from '../types/user';
import { getCookie } from '../../models/cookie';
import { ILoginData } from '../../pages/Login/types';

const baseQuery = fetchBaseQuery({
  baseUrl: `${BACKEND_URL.api}/auth`,
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootStateType;
    const cookieToken = getCookie('token');

    if (state.user.token) {
      headers.set('Authorization', `Bearer ${state.user.token}`);
    } else if (cookieToken) {
      headers.set('Authorization', `Bearer ${cookieToken}`);
    }

    return headers;
  },
});

const baseQueryWithReauth: typeof baseQuery = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  // Здесь будет логика по извлечению нового access токена по refresh токену взамен истёкшего access токена

  return result;
};

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    register: build.mutation<IRegistrationResponse, IRegistrationRequest>({
      query: (body) => ({
        url: '/register/',
        method: 'POST',
        body,
      }),
    }),
    login: build.mutation<IRegistrationResponse, ILoginData>({
      query: (body) => ({
        url: '/login/',
        method: 'POST',
        body,
      }),
    }),
    getUser: build.query<IUser, void>({
      query: () => ({
        url: '/user/',
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useGetUserQuery } = userApi;
