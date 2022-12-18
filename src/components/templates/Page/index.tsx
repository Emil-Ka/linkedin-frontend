import React, { FC } from 'react';

import { Footer } from '../Footer';
import { Header } from '../Header';
import { PageProps } from './page.props';

import styles from './page.module.scss';

export const Page: FC<PageProps> = ({ children, ...props }) => (
  <div className={styles.page}>
    <Header />
    <main {...props}>
      {children}
    </main>
    <Footer />
  </div>
);
