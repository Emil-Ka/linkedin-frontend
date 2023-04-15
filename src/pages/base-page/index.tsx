import React, { FC } from 'react';

import { Footer } from '../../widgets/Footer';
import { Header } from '../../widgets/Header';
import { PageProps } from './types';

import styles from './page.module.scss';

export const Page: FC<PageProps> = ({ children, ...props }) => (
  <div className={styles.page}>
    <Header />
    <main {...props}>{children}</main>
    <Footer />
  </div>
);
