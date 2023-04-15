import React from 'react';

export interface ErrorProps extends React.ComponentProps<'div'> {
  errors: string[];
}
