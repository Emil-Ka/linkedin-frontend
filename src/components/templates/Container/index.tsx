import React, { FC } from 'react';
import cn from 'classnames';

import { ContainerProps } from './container.props';

import styles from './container.module.scss';

export const Container: FC<ContainerProps> = ({ children, className, ...props }) => (
  <div className={cn(styles.container, className)}>
    {children}
  </div>
);
