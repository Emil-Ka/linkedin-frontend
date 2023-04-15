export interface ICheckAnswerResponse {
  result: number;
}

export type ICheckAnswerRequest = Record<string, number>;

export interface IAnswerResponse {
  id: number;
  question: number;
  option: number;
}

export interface IAddAnswerRequest {
  question: number;
  option: number;
}
