import { HTMLProps } from 'react';
import { FieldError } from 'react-hook-form';
import { Inputs } from '../../templates/Form';

export interface InputProps extends HTMLProps<HTMLInputElement> {
  error?: FieldError;
  name: keyof Inputs;
  label?: string;
}
