import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IUserState, ISetTokenPayload, ISetUserPayload } from './types';

const initialState: IUserState = {
  user: null,
  token: '',
};

export const { actions: userActions, reducer: userReducer } = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload: { user } }: PayloadAction<ISetUserPayload>) => {
      state.user = user;
    },
    setToken: (state, { payload: { token } }: PayloadAction<ISetTokenPayload>) => {
      state.token = token;
    },
    resetUser: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});
