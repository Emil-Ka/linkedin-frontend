import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { Avatar, Logo } from '../../atomic';
import { Container } from '../Container';
import { HeaderProps } from './header.props';
import { useLinks } from '../../../hooks/use-links';

import styles from './header.module.scss';

export const Header: FC<HeaderProps> = ({ className, ...props }) => {
  const { links, isShow } = useLinks();

  return (
    <header className={cn(styles.header, className)} {...props}>
      <Container className={styles.content}>
        <Logo isLink className={styles.logo} />
        <nav className={styles.navigate}>
          <ul className={styles.list}>
            {links.map(({
              path, label, show, isAuth, Component, excludeShow,
            }) => (
              isShow('header', {
                path, label, show, isAuth, Component, excludeShow,
              }) && (
                <li className={styles.item} key={path}>
                  { Component || (
                  <Link className={styles.link} to={path}>
                    {label}
                  </Link>
                  ) }
                </li>
              )
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
};
