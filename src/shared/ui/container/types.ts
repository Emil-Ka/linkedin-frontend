import React from 'react';

export interface ContainerProps extends React.ComponentProps<'div'> {
  children: React.ReactNode;
}
