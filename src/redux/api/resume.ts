import { IResumeResponse } from '../types/resume';
import { baseApi } from './index';

export const resumeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getResumes: build.query<IResumeResponse[], void>({
      query: () => ({
        url: '/resumes',
      }),
      providesTags: ['Resume'],
    }),
  }),
});

export const { useGetResumesQuery } = resumeApi;
