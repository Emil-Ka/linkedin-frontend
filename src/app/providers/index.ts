import compose from 'compose-function';

import { withStrictMode } from './with-strict-mode';
import { withStore } from './with-store';
import { withRouter } from './with-router';
import { withI18N } from './with-i18n';

export const withProviders = compose(withStrictMode, withStore, withRouter, withI18N);
