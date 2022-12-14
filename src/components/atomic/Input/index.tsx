import React, {
  ForwardedRef, forwardRef, useId, useState,
} from 'react';
import cn from 'classnames';

import { InputProps } from './input.props';
import EyeIcon from './assets/eye.svg';

import styles from './input.module.scss';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className, error, label, type, ...props
    },
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const id = useId();
    const [inputType, setInputType] = useState(type);

    const changeInputType = () => {
      setInputType((type) => (type === 'password' ? 'text' : 'password'));
    };

    return (
      <div className={styles.wrapper}>
        {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
        )}
        <div className={styles.inputWrapper}>
          <input
            id={id}
            ref={ref}
            type={inputType}
            className={cn(styles.input, className)}
            {...props}
          />
          {type === 'password' && <EyeIcon onClick={changeInputType} className={styles.eyeIcon} />}
        </div>
        {error && <span className={styles.error}>{error.message}</span>}
      </div>
    );
  },
);
