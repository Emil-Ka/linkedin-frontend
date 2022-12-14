import React, { FC } from 'react';
import cn from 'classnames';

import { ButtonProps } from './button.props';

import styles from './button.module.scss';

export const Button: FC<ButtonProps> = ({ label, className, ...props }) => (
  <button className={cn(styles.button, className)} {...props}>
    <span className={styles.label}>{label}</span>
  </button>
);
