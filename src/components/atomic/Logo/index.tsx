import React, { FC } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';

import { LogoProps } from './logo.props';
import { PATHS } from '../../../constants/paths';
import styles from './logo.module.scss';

export const Logo: FC<LogoProps> = ({ className, isLink = false, ...props }) => (
  <Link to={isLink ? PATHS.MAIN : ''} className={cn(styles.logo, className)} {...props}>
    <span className={styles.label}>Собес</span>
  </Link>
);
