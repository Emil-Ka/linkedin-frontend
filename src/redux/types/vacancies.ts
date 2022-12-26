export interface IVacancy {
  id: number;
  title: string;
  company_name: string;
  salary: number;
  text: string;
  user: number;
}

export interface IVacanciesState {
  vacancies: Record<number, IVacancy[]>;
  currentPage: number;
  pageCount: number;
}

export interface IAddVacancies {
  vacancies: IVacancy[];
}

export interface ISetCurrentPage {
  currentPage: number;
}

export interface ISetPageCount {
  pageCount: number;
}

export interface IVacanciesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: IVacancy[];
}

export interface IVacanciesQueries {
  page?: number;
  pageSize?: number;
}

export type IVacancyParams = {
  id?: string;
}

export type IVacancyRequest = Omit<IVacancy, 'id' | 'user'>;
