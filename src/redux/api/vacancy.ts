import {
  IVacanciesResponse,
  IVacanciesQueries,
  IVacancy,
  IVacancyRequest,
  IGetVacancyRequest,
} from '../types/vacancies';
import { baseApi } from './index';

export const vacancyApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getVacancies: build.query<IVacanciesResponse, IVacanciesQueries>({
      query: ({ page = 1, pageSize = 10 }) => ({
        url: `/vacancies?page=${page}&page_size=${pageSize}`,
      }),
    }),
    getVacancy: build.query<IVacancy, IGetVacancyRequest>({
      query: ({ id }) => ({
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

export const { useGetVacanciesQuery, useLazyGetVacancyQuery, useAddVacancyMutation } = vacancyApi;
