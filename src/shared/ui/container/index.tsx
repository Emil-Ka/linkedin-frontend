import { forwardRef } from 'react';
import cn from 'classnames';

import { ContainerProps } from './types';
import styles from './container.module.scss';

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, className, ...props }, ref) => (
    <div className={cn(styles.container, className)} ref={ref} {...props}>
      {children}
    </div>
  ),
);
