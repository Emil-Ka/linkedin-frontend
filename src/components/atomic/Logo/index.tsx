import React, { FC } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';

import styles from './logo.module.scss';
import { LogoProps } from './logo.props';

export const Logo: FC<LogoProps> = ({ className, isLink = false, ...props }) => (
  <Link to={isLink ? '/' : ''} className={cn(styles.logo, className)} {...props}>
    <span className={styles.label}>Собес</span>
  </Link>
);
