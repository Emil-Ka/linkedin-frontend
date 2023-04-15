import { configureStore } from '@reduxjs/toolkit';

import { userReducer } from 'entities/user';
import { baseApi } from './api/base-api';

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
});

export type DispatchType = typeof store.dispatch;
export type RootStateType = ReturnType<typeof store.getState>;
