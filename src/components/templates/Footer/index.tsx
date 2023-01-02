import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { FooterProps } from './footer.props';
import { Container } from '../Container';
import { CustomLink, Logo } from '../../atomic';
import { useLinks } from '../../../hooks';

import TgIcon from './assets/tg.svg';
import VkIcon from './assets/vk.svg';

import styles from './footer.module.scss';

export const Footer: FC<FooterProps> = ({ className, ...props }) => {
  const { links, isShow } = useLinks();

  return (
    <footer className={cn(className, styles.footer)}>
      <Container className={styles.content}>
        <Logo isLink />
        <nav className={styles.navigation}>
          <ul className={styles.list}>
            {links.map(
              ({ path, label, show, isAuth, Component, excludeShow }) =>
                isShow('footer', {
                  path,
                  label,
                  show,
                  isAuth,
                  Component,
                  excludeShow,
                }) && (
                  <li className={styles.item} key={path}>
                    {Component || (
                      <CustomLink to={path} type="footer">
                        {label}
                      </CustomLink>
                    )}
                  </li>
                ),
            )}
          </ul>
        </nav>
        <div className={styles.icons}>
          <a href="https://t.me/em_kaaa">
            <TgIcon />
          </a>
          <a href="vk.com">
            <VkIcon />
          </a>
        </div>
      </Container>
    </footer>
  );
};
