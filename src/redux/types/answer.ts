export interface ICheckAnswerResponse {
  result: number;
}

export type IAnswerRequest = Record<string, number>;

export interface IAnswerResponse {
  id: number;
  question: number;
  option: number;
}
