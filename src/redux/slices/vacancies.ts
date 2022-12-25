import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  ISetCurrentPage, ISetPageCount, IVacanciesState, IAddVacancies,
} from '../types/vacancies';

const initialState: IVacanciesState = {
  vacancies: {
    1: [],
  },
  currentPage: 1,
  pageCount: 1,
};

export const vacanciesSlice = createSlice({
  name: 'vacancies',
  initialState,
  reducers: {
    addVacancies: (state, { payload: { vacancies } }: PayloadAction<IAddVacancies>) => {
      if (!state.vacancies[state.currentPage].length) {
        state.vacancies[state.currentPage] = vacancies;
      }
    },
    setCurrentPage: (state, { payload: { currentPage } }: PayloadAction<ISetCurrentPage>) => {
      state.currentPage = currentPage;
    },
    setPageCount: (state, { payload: { pageCount } }: PayloadAction<ISetPageCount>) => {
      state.pageCount = pageCount;
    },
  },
});
