import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { InitialState, ISetTokenPayload, ISetUserPayload } from '../types/user';

const initialState: InitialState = {
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
    },
  },
});

export const { setUser, setToken } = userSlice.actions;
export const userReducer = userSlice.reducer;
