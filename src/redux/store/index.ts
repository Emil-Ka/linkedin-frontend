import { configureStore } from '@reduxjs/toolkit';

import { userReducer } from '../slices/user';
import { baseApi } from '../api';

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
});

export type DispatchType = typeof store.dispatch;
export type RootStateType = ReturnType<typeof store.getState>;
