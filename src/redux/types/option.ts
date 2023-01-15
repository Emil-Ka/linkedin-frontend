export interface IOptionResponse {
  id: number;
  text: string;
  question: number;
}

export interface IOptionRequest {
  questionId: number;
}

export interface IAddOptionRequest {
  text: string;
  question: number;
}
