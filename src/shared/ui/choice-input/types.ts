import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';

export interface IChoiceInputProps extends Omit<React.ComponentProps<'input'>, 'size'> {
  type: 'radio' | 'checkbox';
  variant?: 'round' | 'box';
  size?: 's' | 'l';
  error?: FieldError;
  label?: string;
}
