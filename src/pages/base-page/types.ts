import React from 'react';

export interface PageProps extends React.ComponentProps<'main'> {
  children: React.ReactNode;
}
