import React, { FC } from 'react';
import cn from 'classnames';

import { ICardProps } from './card.props';

import styles from './card.module.scss';

export const Card: FC<ICardProps> = ({ className, children, ...props }) => (
  <div className={cn(styles.box, className)} {...props}>
    {children}
  </div>
);
