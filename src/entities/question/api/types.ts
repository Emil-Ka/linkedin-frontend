export interface IQuestionResponse {
  id: number;
  text: string;
  photo: string | null;
  test: number;
}

export interface IQuestionRequest {
  testId: number;
}
