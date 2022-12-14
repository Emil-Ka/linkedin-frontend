import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from './redux/store';
import { AppRouter } from './pages/routes';

import './locales/i18n';
import './design/index.scss';

const htmlRoot = document.querySelector('#root');

if (!htmlRoot) {
  throw new Error('Element with id root not found');
}

const reactRoot = createRoot(htmlRoot);

reactRoot.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
