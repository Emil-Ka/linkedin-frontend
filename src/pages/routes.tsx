import React from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';

import { Registration } from './Registration';

const routes: RouteObject[] = [
  {
    path: '/reg',
    element: <Registration />,
  },
];

export const AppRouter = () => {
  const component = useRoutes(routes);

  return component;
};
