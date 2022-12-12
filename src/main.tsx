import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './locales/i18n';
import { AppRouter } from './pages/routes';

import './design/index.scss';

const htmlRoot = document.querySelector('#root');

if (htmlRoot) {
  const reactRoot = createRoot(htmlRoot);
  reactRoot.render(
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>,
  );
} else {
  throw new Error('Element with id root not found');
}
