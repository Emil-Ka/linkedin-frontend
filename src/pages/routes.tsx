import React from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';

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
  AddTest,
  AddQuestion,
  AddResume,
  Resume,
  Admin,
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
  {
    path: PATHS.VACANCIES,
    element: <Vacancies />,
  },
  {
    path: PATHS.VACANCY_ID,
    element: <Vacancy />,
  },
  {
    path: PATHS.ADD_VACANCY,
    element: <AddVacancy />,
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
  {
    path: PATHS.ADD_TEST,
    element: <AddTest />,
  },
  {
    path: PATHS.ADD_QUESTION,
    element: <AddQuestion />,
  },
  {
    path: PATHS.ADD_RESUME,
    element: <AddResume />,
  },
  {
    path: PATHS.RESUME_ID,
    element: <Resume />,
  },
  {
    path: PATHS.ADMIN,
    element: <Admin />,
  },
];

export const AppRouter = () => {
  const component = useRoutes(routes);

  return component;
};
