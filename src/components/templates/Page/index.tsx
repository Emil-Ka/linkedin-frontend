import React, { FC } from 'react';

import { Footer } from '../Footer';
import { Header } from '../Header';
import { PageProps } from './page.props';

export const Page: FC<PageProps> = ({ children, ...props }) => (
  <>
    <Header />
    <main {...props}>
      {children}
    </main>
    <Footer />
  </>
);
