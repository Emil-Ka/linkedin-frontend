import { useEffect } from 'react';
import { bindActionCreators } from '@reduxjs/toolkit';

import { useTypedSelector, useTypedDispatch } from '.';
import { useLazyGetUserQuery } from '../redux/api/user';
import * as userSlice from '../redux/slices/user';

export const useGetUser = () => {
  const dispatch = useTypedDispatch();
  const { setUser } = bindActionCreators({ setUser: userSlice.setUser }, dispatch);
  const { user } = useTypedSelector((state) => state.user);

  const [getUser, { isLoading, error }] = useLazyGetUserQuery();

  const fetchUser = async () => {
    const user = await getUser().unwrap();
    setUser({ user });
  };

  useEffect(() => {
    console.log('user', user);
    if (!user) {
      fetchUser();
    }
    // eslint-disable-next-line
  }, [user]);

  return {
    user,
    isLoading,
    error,
  };
};
