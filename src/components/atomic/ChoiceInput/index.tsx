import React, { ForwardedRef, forwardRef, useId } from 'react';
import cn from 'classnames';

import { IChoiceInputProps } from './choice-input.props';

import styles from './choice-input.module.scss';

export const ChoiceInput = forwardRef<HTMLInputElement, IChoiceInputProps>(
  ({
    label, type, className, ...props
  }, ref: ForwardedRef<HTMLInputElement>) => {
    const id = useId();

    return (
      <div className={cn(styles.wrapper, className)}>
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
