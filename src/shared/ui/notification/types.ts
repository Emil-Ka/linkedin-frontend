import React from 'react';

export interface INotificationProps extends React.ComponentProps<'div'> {
  status: 'success' | 'failed';
  children?: string;
  time?: number;
  isVisible?: boolean;
}
