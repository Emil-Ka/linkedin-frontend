import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IRegistrationResponse, IRegistrationRequest } from '../../pages/Registration/types';
import { HTTP_PATH } from '../helper/http';
import { RootStateType } from '../store';
import { IUser } from '../types/user-slice';
import { getCookie } from '../../models/cookie';

const baseQuery = fetchBaseQuery({
  baseUrl: `${HTTP_PATH}/auth`,
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

type BaseQueryParams = Parameters<typeof baseQuery>;

const baseQueryWithReauth = async (args: BaseQueryParams[0], api: BaseQueryParams[1], extraOptions: BaseQueryParams[2]) => {
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
    getUser: build.query<IUser, void>({
      query: () => ({
        url: '/user/',
      }),
    }),
  }),
});

export const { useRegisterMutation, useGetUserQuery } = userApi;
