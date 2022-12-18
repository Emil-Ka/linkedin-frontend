import React from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';

import { Registration, Main } from './index';

export const PATHS = {
  MAIN: '/',
  REGISTRATION: '/reg',
};

const routes: RouteObject[] = [
  {
    path: PATHS.MAIN,
    element: <Main />,
  },
  {
    path: PATHS.REGISTRATION,
    element: <Registration />,
  },
];

export const AppRouter = () => {
  const component = useRoutes(routes);

  return component;
};
