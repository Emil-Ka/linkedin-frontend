import React, { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends React.ComponentProps<'button'> {
  customType?: 'pagination';
  selected?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}
