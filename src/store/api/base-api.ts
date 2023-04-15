import { createApi } from '@reduxjs/toolkit/query/react';
import { TagDescription } from '@reduxjs/toolkit/dist/query';

import { baseQueryWithReauth } from './base-query-with-reauth';

const tags = ['Resume', 'PassedTests', 'Tests'] as const;

export const baseApi = createApi({
  reducerPath: 'api',
  tagTypes: tags,
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});

// export const resetCacheByTag = (tag: TagDescription<typeof tags[number]>) => {
//   store.dispatch(baseApi.util.invalidateTags([tag]));
// };
