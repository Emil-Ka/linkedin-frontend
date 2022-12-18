import React, { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends React.ComponentProps<'button'> {
  type: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  loading?: boolean;
  children: React.ReactNode;
}
