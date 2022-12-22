import { configureStore } from '@reduxjs/toolkit';

import { userReducer } from '../slices/user';
import { userApi } from '../api/user';

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware),
});

export type DispatchType = typeof store.dispatch;
export type RootStateType = ReturnType<typeof store.getState>;
