import { useEffect, useState } from 'react';
import { SerializedError, bindActionCreators } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { useNavigate } from 'react-router-dom';

import { useTypedSelector, useTypedDispatch } from '.';
import { useLazyGetUserQuery } from '../redux/api/user';
import { IUser, USER_ROLE } from '../redux/types/user';
import * as userSlice from '../redux/slices/user';
import { PATHS } from '../constants/paths';

interface IUseGetUserParams {
  navigateTo?: PATHS;
  role?: USER_ROLE;
}

interface IUseGetUserReturn {
  user: IUser | null;
  isLoading: boolean;
  error?: FetchBaseQueryError | SerializedError;
}

type UseGetUserHookType = (params?: IUseGetUserParams) => IUseGetUserReturn;

const defaultParams: Required<IUseGetUserParams> = {
  navigateTo: PATHS.LOGIN,
  role: USER_ROLE.USER,
};

export const useGetUser: UseGetUserHookType = (params = defaultParams) => {
  const { navigateTo = defaultParams.navigateTo, role = defaultParams.role } = params;

  const navigate = useNavigate();
  const dispatch = useTypedDispatch();
  const [loading, setLoading] = useState<boolean>(true);

  const { setUser } = bindActionCreators({ setUser: userSlice.setUser }, dispatch);
  const user = useTypedSelector((state) => state.user.user);

  const [getUser, { data: userData, isLoading, error, isUninitialized, isFetching }] =
    useLazyGetUserQuery();

  useEffect(() => {
    if (!user) {
      getUser();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    if (userData) {
      setUser({ user: userData });
    }
    // eslint-disable-next-line
  }, [userData]);

  useEffect(() => {
    if (!isUninitialized && !isFetching && (!userData || userData.role < role)) {
      navigate(navigateTo);
    }
    // eslint-disable-next-line
  }, [isUninitialized, userData, isFetching, navigateTo, role]);

  useEffect(() => {
    if (!isUninitialized && !isLoading) {
      setLoading(false);
    }
  }, [isLoading, isUninitialized]);

  return {
    user,
    isLoading: loading,
    error,
  };
};
