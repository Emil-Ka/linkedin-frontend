export interface IQuestionResponse {
  id: number;
  text: string;
  photo: string | null;
  test: number;
}

export type IQuestionParams = {
  id?: string;
}
