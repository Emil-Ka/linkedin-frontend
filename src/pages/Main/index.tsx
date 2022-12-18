import React, { FC, useEffect } from 'react';
import { bindActionCreators } from '@reduxjs/toolkit';

import { useTypedSelector, useTypedDispatch } from '../../hooks';
import { useGetUserQuery } from '../../redux/api/user';
import { setUser } from '../../redux/slices/user-slice';
import { Page } from '../../components';

export const Main: FC = () => {
  const dispatch = useTypedDispatch();
  const { setUser: changeUser } = bindActionCreators({ setUser }, dispatch);
  const { user } = useTypedSelector((state) => state.user);
  const { data, error, isLoading } = useGetUserQuery();

  useEffect(() => {
    if (data) {
      changeUser({ user: data });
    }
  }, [data]);

  useEffect(() => {
    console.log('error', error);
  }, [error]);

  return (
    <Page>
      Главная
      {user?.email}
      {user?.first_name}
      {user?.last_name}
    </Page>
  );
};
