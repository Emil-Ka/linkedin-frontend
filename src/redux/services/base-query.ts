import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BACKEND_URL } from '../../config/backend.config';
import { RootStateType } from '../store';
import { getCookie } from '../../models/cookie';

export const baseQuery = fetchBaseQuery({
  baseUrl: `${BACKEND_URL.api}`,
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

export const baseQueryWithReauth: typeof baseQuery = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  // Здесь будет логика по извлечению нового access токена по refresh токену взамен истёкшего access токена

  return result;
};
