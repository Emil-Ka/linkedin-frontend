import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { Avatar, CustomLink, Logo } from '../../atomic';
import { Container } from '../Container';
import { HeaderProps } from './header.props';
import { useLinks } from '../../../hooks';

import styles from './header.module.scss';

export const Header: FC<HeaderProps> = ({ className, ...props }) => {
  const { links, isShow } = useLinks();

  return (
    <header className={cn(styles.header, className)} {...props}>
      <Container className={styles.content}>
        <Logo isLink className={styles.logo} />
        <nav className={styles.navigate}>
          <ul className={styles.list}>
            {links.map(
              (link) =>
                isShow('header', link) && (
                  <li className={styles.item} key={link.path}>
                    {link.Component || (
                      <CustomLink to={link.path} type="header">
                        {link.label}
                      </CustomLink>
                    )}
                  </li>
                ),
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
};
