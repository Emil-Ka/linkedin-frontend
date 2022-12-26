import React, { forwardRef, useId } from 'react';
import cn from 'classnames';

import { ITextareaProps } from './textarea.props';

import styles from './textarea.module.scss';

export const Textarea = forwardRef<HTMLTextAreaElement, ITextareaProps>(
  (
    {
      className, error, label, ...props
    },
    ref,
  ) => {
    const id = useId();

    return (
      <div className={styles.wrapper}>
        {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
        )}
        <textarea
          id={id}
          ref={ref}
          className={cn(styles.textarea, className)}
          {...props}
        />
        {error && <span className={styles.error}>{error.message}</span>}
      </div>
    );
  },
);
