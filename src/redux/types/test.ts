export interface ITestResponse {
  id: number;
  name: string;
  cover: string;
  time: number;
  desc: string | null;
}

export interface ITestRequest {
  id: number;
}
