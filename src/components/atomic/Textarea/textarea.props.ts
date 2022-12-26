import React from 'react';
import { FieldError } from 'react-hook-form';

export interface ITextareaProps extends React.ComponentProps<'textarea'> {
  error?: FieldError;
  label?: string;
}
