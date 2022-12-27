export interface ITestResponse {
  id: number;
  name: string;
  cover: string;
  time: number;
  desc: string | null;
}

export type ITestParams = {
  id?: string;
}

export type IClientAnswersData = Record<string, number>;
