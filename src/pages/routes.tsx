import React from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';

import {
  Registration,
  Main,
  Account,
  Login,
  Vacancies,
  Vacancy,
  AddVacancy,
  TestsPage,
  TestPage,
  Result,
} from './index';
import { PATHS } from '../constants/paths';
import { useTypedSelector } from '../hooks';
import { IUser, USER_ROLE } from '../redux/types/user';

const routes = (user: IUser | null): RouteObject[] => [
  {
    path: PATHS.MAIN,
    element: <Main />,
  },
  {
    path: PATHS.REGISTRATION,
    element: <Registration />,
  },
  {
    path: PATHS.LOGIN,
    element: <Login />,
  },
  {
    path: PATHS.ACCOUNT,
    element: <Account />,
  },
  {
    path: PATHS.VACANCIES,
    element: user ? <Vacancies /> : <Navigate to={PATHS.LOGIN} />,
  },
  {
    path: PATHS.VACANCY_ID,
    element: user ? <Vacancy /> : <Navigate to={PATHS.LOGIN} />,
  },
  {
    path: PATHS.ADD_VACANCY,
    element:
      (user?.role || USER_ROLE.USER) >= USER_ROLE.HR ? (
        <AddVacancy />
      ) : (
        <Navigate to={PATHS.LOGIN} />
      ),
  },
  {
    path: PATHS.TESTS,
    element: <TestsPage />,
  },
  {
    path: PATHS.TEST_ID,
    element: <TestPage />,
  },
  {
    path: PATHS.RESULT_ID,
    element: <Result />,
  },
];

export const AppRouter = () => {
  const { user } = useTypedSelector((state) => state.user);
  const component = useRoutes(routes(user));

  return component;
};
