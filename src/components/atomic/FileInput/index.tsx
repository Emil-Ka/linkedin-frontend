import React, { forwardRef, useId, useRef, useState } from 'react';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';

import { IFileInputProps } from './file-input.props';
import PinIcon from './assets/pin.svg';

import styles from './file-input.module.scss';

export const FileInput = forwardRef<HTMLInputElement, IFileInputProps>(
  ({ className, accept, label, onChange, error, ...props }, ref) => {
    const { t } = useTranslation();
    const id = useId();

    const inputRef = useRef<HTMLInputElement | null>(null);

    const [files, setFiles] = useState<FileList | null>(null);
    const [isDragOver, setIsDragOver] = useState<boolean>(false);

    const uploadFile = () => {
      if (inputRef.current) {
        inputRef.current.click();
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e);
      }

      setFiles(e.target.files);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();

      setIsDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();

      setIsDragOver(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();

      setIsDragOver(false);

      const { files } = e.dataTransfer;

      if (inputRef.current) {
        inputRef.current.files = files;

        const changeEvent = new Event('change', { bubbles: true });
        inputRef.current.dispatchEvent(changeEvent);
      }
    };

    return (
      <div className={styles.content}>
        {label && (
          <label htmlFor={id} className={styles.label}>
            {label}
          </label>
        )}
        <div
          className={cn(styles.wrapper, className, {
            [styles.wrapper_dragOver]: isDragOver,
          })}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className={styles.labels}>
            <span className={styles.drugLabel}>{t('file_input.labels.drug_files')}</span>
            <button onClick={uploadFile} className={styles.uploadButton}>
              <PinIcon />
              {t('file_input.labels.upload_files')}
            </button>
          </div>
          <div className={styles.formats}>
            {accept
              ?.split(', ')
              .map(
                (format, index) =>
                  `${format.split('/')[1].toUpperCase()}${
                    index !== accept.split(', ').length - 1 ? ', ' : ''
                  }`,
              )}
          </div>
          <div className={styles.files}>
            {files &&
              Array.from(files).map((file) => (
                <img
                  className={styles.img}
                  key={file.name}
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                />
              ))}
          </div>
          <input
            accept={accept}
            ref={(el) => {
              inputRef.current = el;
              if (typeof ref === 'function') {
                ref(el);
              } else if (ref) {
                ref.current = el;
              }
            }}
            type="file"
            className={styles.input}
            id={id}
            onChange={handleChange}
            {...props}
          />
        </div>
        {error && <span className={styles.error}>{error.message}</span>}
      </div>
    );
  },
);
