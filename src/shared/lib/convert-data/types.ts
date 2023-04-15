import { IOption } from '../../../pages/add-qestion/types';

export type AddOptionParams = Pick<IOption, 'value'> & { question: number };
