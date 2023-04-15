import { I18nextProvider } from 'react-i18next';

import { Hoc } from 'shared/types';

import i18n from '../locales';

export const withI18N: Hoc = (Component) => (props) =>
  (
    <I18nextProvider i18n={i18n}>
      <Component {...props} />
    </I18nextProvider>
  );
