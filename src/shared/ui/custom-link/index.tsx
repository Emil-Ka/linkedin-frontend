import { FC } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { ICustomLinkProps } from './types';
import styles from './custom-link.module.scss';

export const CustomLink: FC<ICustomLinkProps> = ({ children, className, type, ...props }) => (
  <Link
    className={cn(styles.link, className, {
      [styles.header]: type === 'header',
      [styles.footer]: type === 'footer',
      [styles.button]: type === 'button',
    })}
    {...props}
  >
    {children}
  </Link>
);
