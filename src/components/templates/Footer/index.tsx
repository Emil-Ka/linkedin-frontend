import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { FooterProps } from './footer.props';
import { Container } from '../Container';
import { Logo } from '../../atomic';
import { usePaths } from '../../../hooks/use-paths';
import { useTypedSelector } from '../../../hooks';

import TgIcon from './assets/tg.svg';
import VkIcon from './assets/vk.svg';

import styles from './footer.module.scss';

export const Footer: FC<FooterProps> = ({ className, ...props }) => {
  const links = usePaths();
  const { user } = useTypedSelector((state) => state.user);

  return (
    <footer className={cn(className, styles.footer)}>
      <Container className={styles.content}>
        <Logo isLink />
        <nav className={styles.navigation}>
          <ul className={styles.list}>
            {links.map(({
              path, label, show, isAuth,
            }) => (
              show.includes('footer')
              && isAuth.includes(!!user)
              && (
              <li key={path}>
                <Link className={styles.link} to={path}>{label}</Link>
              </li>
              )
            ))}
          </ul>
        </nav>
        <div className={styles.icons}>
          <a href="https://t.me/em_kaaa"><TgIcon /></a>
          <a href="vk.com"><VkIcon /></a>
        </div>
      </Container>
    </footer>
  );
};
