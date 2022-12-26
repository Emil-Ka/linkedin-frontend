import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../services/base-query';

export const baseApi = createApi({
  reducerPath: 'api',
  tagTypes: ['Resume'],
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
