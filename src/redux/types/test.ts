export interface IGetTestResponse {
  id: number;
  name: string;
  cover: string;
  time: number;
  desc: string | null;
}

export interface IGetTestRequest {
  id: number;
}

export interface IAddTestData {
  name: string;
  cover: FileList;
  time: number;
  desc: string;
}

export type IAddTestRequest = FormData;
