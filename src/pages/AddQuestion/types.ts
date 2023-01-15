export interface ITestOption {
  value: number;
  label: string;
}

export interface IOption {
  _id: number;
  value: string;
}

export interface IAddQuestionData {
  test: ITestOption['value'];
  question: string;
  cover: FileList;
  answer: string; // IOption['_id'] to string
  options: IOption[];
}
