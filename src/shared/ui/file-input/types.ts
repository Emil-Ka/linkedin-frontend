import React from 'react';
import { DeepRequired, FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

export interface IFileInputProps extends React.ComponentProps<'input'> {
  label?: string;
  error?: Merge<FieldError, FieldErrorsImpl<DeepRequired<FileList>>>;
}
