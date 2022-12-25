import React, { FC } from 'react';
import cn from 'classnames';

import { ButtonProps } from './button.props';

import styles from './button.module.scss';

export const Button: FC<ButtonProps> = ({
  className,
  type = 'button',
  loading = false,
  selected,
  children,
  customType,
  ...props
}) => (
  <button
    className={cn(styles.button, className, {
      [styles.button_loading]: loading,
      [styles.button_pagination]: customType === 'pagination',
      [styles.selected]: selected,
    })}
    type={type}
    {...props}
  >
    {children}
  </button>
);
