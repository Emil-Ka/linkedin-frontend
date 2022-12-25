import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IUserState, ISetTokenPayload, ISetUserPayload } from '../types/user';

const initialState: IUserState = {
  user: null,
  token: '',
};

const userSlice = createSlice({
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

export const { setUser, setToken, resetUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
