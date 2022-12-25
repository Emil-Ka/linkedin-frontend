import { configureStore } from '@reduxjs/toolkit';

import { userReducer } from '../slices/user';
import { userApi } from '../api/user';
import { vacanciesApi } from '../api/vacancies';

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [vacanciesApi.reducerPath]: vacanciesApi.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware, vacanciesApi.middleware),
});

export type DispatchType = typeof store.dispatch;
export type RootStateType = ReturnType<typeof store.getState>;
