import React, { ForwardedRef, forwardRef, useId, useRef } from 'react';
import cn from 'classnames';

import { IChoiceInputProps } from './choice-input.props';

import styles from './choice-input.module.scss';

export const ChoiceInput = forwardRef<HTMLInputElement, IChoiceInputProps>(
  (
    { label, type, className, variant = 'round', size = 's', name, ...props },
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const id = useId();

    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleMarkerClick = () => {
      const initCheckedValue = inputRef.current?.checked;

      document.querySelectorAll<HTMLInputElement>(`input[name="${name}"]`).forEach((input) => {
        input.checked = false;
      });

      if (inputRef.current) {
        inputRef.current.checked = !initCheckedValue;
      }
    };

    return (
      <div className={cn(styles.wrapper, className)}>
        <input
          className={styles.input}
          ref={(el) => {
            inputRef.current = el;
            if (typeof ref === 'function') {
              ref(el);
            } else if (ref) {
              ref.current = el;
            }
          }}
          id={id}
          name={name}
          type={type}
          {...props}
        />
        <label htmlFor={id}>
          <button
            className={cn(styles.marker, styles[`marker_size_${size}`], {
              [styles.marker_round]: variant === 'round',
              [styles.marker_box]: variant === 'box',
            })}
            type="button"
            onClick={handleMarkerClick}
          />
        </label>
        {label && (
          <label className={styles.label} htmlFor={id}>
            {label}
          </label>
        )}
      </div>
    );
  },
);
