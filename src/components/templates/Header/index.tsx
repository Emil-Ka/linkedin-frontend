import React, { FC } from 'react';
import cn from 'classnames';

import { Link } from 'react-router-dom';
import { Avatar, Logo } from '../../atomic';
import { Container } from '../Container';
import { HeaderProps } from './header.props';
import { useTypedSelector } from '../../../hooks';
import { usePaths } from '../../../hooks/use-paths';

import styles from './header.module.scss';

export const Header: FC<HeaderProps> = ({ className, ...props }) => {
  const paths = usePaths();
  const { user } = useTypedSelector((state) => state.user);

  return (
    <header className={cn(styles.header, className)} {...props}>
      <Container className={styles.content}>
        <Logo isLink className={styles.logo} />
        <nav className={styles.navigate}>
          <ul className={styles.list}>
            {paths.map(({
              path, label, show, isAuth,
            }) => (
              show.includes('header')
              && isAuth.includes(!!user)
              && (
              <li className={styles.item} key={path}>
                <Link className={styles.link} to={path}>
                  {label}
                </Link>
              </li>
              )
            ))}
          </ul>
        </nav>
        <Avatar className={styles.avatar} />
      </Container>
    </header>
  );
};
