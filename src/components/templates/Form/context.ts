import { createContext } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { Inputs } from './index';

export const FormContext = createContext<Pick<UseFormReturn<Inputs>, 'register'> | null>(null);
