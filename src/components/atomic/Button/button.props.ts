import React, { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends React.ComponentProps<'button'> {
  label: string;
  type: ButtonHTMLAttributes<HTMLButtonElement>['type'];
}
