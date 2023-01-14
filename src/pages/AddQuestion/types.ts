export interface ITestOption {
  value: string | number;
  label: string;
}

export interface IAddQuestionData {
  test: ITestOption['value'];
  question: string;
  cover: FileList;
  answer: string;
}

export interface IOption {
  id: number;
  value: string;
}
