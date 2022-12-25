import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithReauth } from '../services/base-query';
import {
  IVacanciesResponse, IVacanciesQueries, IVacancy, IVacancyParams,
} from '../types/vacancies';

export const vacanciesApi = createApi({
  reducerPath: 'vacanciesApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    getVacancies: build.query<IVacanciesResponse, IVacanciesQueries>({
      query: ({ page = 1, pageSize = 10 }) => ({
        url: `/vacancies?page=${page}&page_size=${pageSize}`,
      }),
    }),
    getVacancy: build.query<IVacancy, IVacancyParams>({
      query: ({ id = 1 }) => ({
        url: `/vacancies/${id}`,
      }),
    }),
  }),
});

export const { useGetVacanciesQuery, useGetVacancyQuery } = vacanciesApi;
