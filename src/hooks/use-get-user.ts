import { useEffect } from 'react';
import { bindActionCreators } from '@reduxjs/toolkit';

import { useTypedSelector, useTypedDispatch } from '.';
import { useGetUserQuery } from '../redux/api/user';
import * as userSlice from '../redux/slices/user';

export const useGetUser = () => {
  const dispatch = useTypedDispatch();
  const { setUser } = bindActionCreators({ setUser: userSlice.setUser }, dispatch);
  const { user } = useTypedSelector((state) => state.user);

  const userQuery = useGetUserQuery(undefined, {
    skip: !!user,
  });

  useEffect(() => {
    if (userQuery.data) {
      setUser({ user: userQuery.data });
    }
  }, [userQuery.data]);

  return {
    user,
    setUser,
    ...userQuery,
  };
};
