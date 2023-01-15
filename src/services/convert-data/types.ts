import { IOption } from '../../pages/AddQuestion/types';

export type AddOptionParams = Pick<IOption, 'value'> & { question: number };
