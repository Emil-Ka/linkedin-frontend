import React, { ForwardedRef, forwardRef, useId } from 'react';
import cn from 'classnames';

import { IChoiceInputProps } from './choice-input.props';

import styles from './choice-input.module.scss';

export const ChoiceInput = forwardRef<HTMLInputElement, IChoiceInputProps>(
  (
    { label, className, error, variant = 'round', size = 's', ...props },
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const id = useId();

    return (
      <div className={cn(styles.wrapper, className)}>
        <input
          className={cn(styles.input, styles[`input_size_${size}`], {
            [styles.input_round]: variant === 'round',
            [styles.input_box]: variant === 'box',
          })}
          ref={ref}
          id={id}
          {...props}
        />
        {label && (
          <label className={styles.label} htmlFor={id}>
            {label}
          </label>
        )}
        {error && <span className={styles.error}>{error.message}</span>}
      </div>
    );
  },
);
