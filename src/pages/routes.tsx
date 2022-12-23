import React from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';

import {
  Registration, Main, Account, Login,
} from './index';
import { PATHS } from '../constants/paths';

const routes: RouteObject[] = [
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
];

export const AppRouter = () => {
  const component = useRoutes(routes);

  return component;
};
