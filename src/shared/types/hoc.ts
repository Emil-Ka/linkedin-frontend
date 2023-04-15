import { FC } from 'react';

export type Hoc = <T extends Record<string, unknown>>(
  Component: FC<T>,
) => (props: T) => JSX.Element;
