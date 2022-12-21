import React from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';

import { Registration, Main } from './index';
import { PATHS } from '../constants/paths';
import Login from './Login';

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
];

export const AppRouter = () => {
  const component = useRoutes(routes);

  return component;
};
