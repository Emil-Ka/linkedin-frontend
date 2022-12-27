import React, { ForwardedRef, forwardRef, useId } from 'react';

import styles from './radio.module.scss';
import { InputProps } from './radio.props';

export const CheckBox = forwardRef<HTMLInputElement, InputProps>(
  ({ label, type = 'checkbox', ...props }, ref: ForwardedRef<HTMLInputElement>) => {
    const id = useId();

    return (
      <div className={styles.wrapper}>
        <input
          className={styles.input}
          ref={ref}
          id={id}
          type={type}
          {...props}
        />
        <div className={styles.marker} />
        {label && (
          <label className={styles.label} htmlFor={id}>
            {label}
          </label>
        )}
      </div>
    );
  },
);
