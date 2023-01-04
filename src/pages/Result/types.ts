import { IOptionResponse } from '../../redux/types/option';

export type ResultParamsType = {
  id: string;
};

export type IOptions = Record<number, IOptionResponse[]>;
