import { IGetResumeRequest, IResumeRequest, IResumeResponse } from '../types/resume';
import { baseApi } from './index';

export const resumeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getResumes: build.query<IResumeResponse[], void>({
      query: () => ({
        url: '/resumes',
      }),
      providesTags: ['Resume'],
    }),
    getResume: build.query<IResumeResponse, IGetResumeRequest>({
      query: ({ id }) => ({
        url: `/resumes/${id}`,
      }),
    }),
    addResume: build.mutation<IResumeResponse, IResumeRequest>({
      query: (body) => ({
        url: '/resumes/create/',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useGetResumesQuery, useAddResumeMutation, useLazyGetResumeQuery } = resumeApi;
