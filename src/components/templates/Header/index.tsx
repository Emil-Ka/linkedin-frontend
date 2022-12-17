import React, { FC } from 'react';
import cn from 'classnames';

import { Logo } from '../../atomic';
import { Container } from '../Container';
import { HeaderProps } from './header.props';

import styles from './header.module.scss';

export const Header: FC<HeaderProps> = ({ className, ...props }) => (
  <header className={cn(styles.header, className)} {...props}>
    <Container className={styles.content}>
      <Logo isLink className={styles.logo} />
    </Container>
  </header>
);
