import React, { FC, useMemo } from 'react';
import { createPortal } from 'react-dom';

import { IModalProps } from './modal.props';

export const Modal: FC<IModalProps> = ({ children }) => {
  const modalElement = useMemo(() => {
    let modalElement = document.getElementById('modal');

    if (!modalElement) {
      const rootElement = document.getElementById('root');
      modalElement = document.createElement('div');

      modalElement.id = 'modal';
      rootElement?.insertAdjacentElement('afterend', modalElement);
    }

    return modalElement;
  }, []);

  return createPortal(children, modalElement);
};
