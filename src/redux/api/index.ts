import { createApi } from '@reduxjs/toolkit/query/react';
import { TagDescription } from '@reduxjs/toolkit/dist/query';

import { baseQueryWithReauth } from '../services/base-query';
import { store } from '../store';

const tags = ['Resume', 'PassedTests'] as const;

export const baseApi = createApi({
  reducerPath: 'api',
  tagTypes: tags,
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});

export const resetCacheByTag = (tag: TagDescription<typeof tags[number]>) => {
  store.dispatch(baseApi.util.invalidateTags([tag]));
};
