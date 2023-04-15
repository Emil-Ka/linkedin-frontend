import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { useLinks } from 'shared/hooks';
import { Avatar, CustomLink, Logo } from '../../../shared/ui';
import { Container } from '../../shared/ui/container';
import { HeaderProps } from './header.props';

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
