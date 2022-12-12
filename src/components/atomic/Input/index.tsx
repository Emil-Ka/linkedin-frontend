import React, { FC, ForwardedRef, forwardRef } from 'react';
import cn from 'classnames';

import { InputProps } from './input.props';
import { useFormContext } from '../../../hooks';

import styles from './input.module.scss';

export const Input = ({
  className,
  error,
  name,
  label,
  ...props
}: InputProps) => {
  const { register } = useFormContext();

  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
      )}
      <input
        id={name}
        className={cn(styles.input, className)}
        {...register(name)}
        {...props}
      />
      {error && <span className={styles.error}>{error.message}</span>}
    </div>
  );
};
