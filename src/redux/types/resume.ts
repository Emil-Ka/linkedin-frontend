export interface IResumeResponse {
  id: number;
  title: string;
  text: string;
  salary: number | null;
  user: number;
}

export interface IResumeRequest {
  title: string;
  text: string;
  salary: number;
}

export interface IGetResumeRequest {
  id: number;
}
