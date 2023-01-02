import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';

export interface IChoiceInputProps extends React.ComponentProps<'input'> {
  type: 'radio' | 'checkbox';
  error?: FieldError;
  label?: string;
}
