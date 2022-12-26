import {
  IVacanciesResponse, IVacanciesQueries, IVacancy, IVacancyParams, IVacancyRequest,
} from '../types/vacancies';
import { baseApi } from './index';

export const vacancyApi = baseApi.injectEndpoints({
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
    addVacancy: build.mutation<IVacancy, IVacancyRequest>({
      query: (body) => ({
        url: '/vacancies/create/',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useGetVacanciesQuery, useGetVacancyQuery, useAddVacancyMutation } = vacancyApi;
