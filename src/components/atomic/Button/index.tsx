import React, { FC } from 'react';
import cn from 'classnames';

import { ButtonProps } from './button.props';

import styles from './button.module.scss';

export const Button: FC<ButtonProps> = ({
  className, loading = false, children, ...props
}) => (
  <button
    className={cn(styles.button, className, {
      [styles.button_loading]: loading,
    })}
    {...props}
  >
    {children}
  </button>
);
