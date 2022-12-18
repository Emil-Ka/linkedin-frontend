import React, { FC } from 'react';
import cn from 'classnames';

import { ErrorProps } from './error.props';

import styles from './error.module.scss';

export const Error: FC<ErrorProps> = ({ errors, className, ...props }) => (
  <div className={cn(styles.wrapper, className)} {...props}>
    {errors.map((error) => (
      <span key={error} className={styles.error}>
        {error}
      </span>
    ))}
  </div>
);
