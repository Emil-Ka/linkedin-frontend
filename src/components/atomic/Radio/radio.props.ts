import React from 'react';
import { FieldError } from 'react-hook-form';

export interface InputProps extends React.ComponentProps<'input'> {
  error?: FieldError;
  label?: string;
}
