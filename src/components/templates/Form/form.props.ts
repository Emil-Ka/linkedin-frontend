import { HTMLProps, ReactNode } from 'react';
import { SubmitHandler } from 'react-hook-form';

export interface FormProps extends HTMLProps<HTMLFormElement> {
  children: ReactNode;
  submitHandler: SubmitHandler<Record<string, string>>;
  fields: Record<string, string>;
}
