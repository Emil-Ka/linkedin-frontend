import React, { forwardRef, useId, useState } from 'react';
import cn from 'classnames';

import { InputProps } from './input.props';
import EyeIcon from './assets/eye.svg';
import CrossIcon from './assets/cross.svg';

import styles from './input.module.scss';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, label, type, handleDelete, ...props }, ref) => {
    const id = useId();
    const [inputType, setInputType] = useState(type);

    const changeInputType = () => {
      setInputType((type) => (type === 'password' ? 'text' : 'password'));
    };

    const renderError = () => {
      if (typeof error === 'string') {
        return error;
      }

      return error?.message;
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
          {handleDelete && <CrossIcon onClick={handleDelete} className={styles.crossIcon} />}
        </div>
        {error && <span className={styles.error}>{renderError()}</span>}
      </div>
    );
  },
);
